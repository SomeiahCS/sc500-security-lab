const SESSION_COOKIE='__Host-sc500_session';
const CSRF_COOKIE='__Host-sc500_csrf';
const SESSION_SECONDS=43200;
const PBKDF2_ITERATIONS=310000;
const RATE_WINDOW_SECONDS=900;
const MAX_ATTEMPTS=5;

export async function registerUser(request,env,url){
  if(!sameOrigin(request,url)) return json({error:'Invalid request origin'},403);
  const body=await safeJson(request);
  const email=normalizeEmail(body?.email);
  const password=typeof body?.password==='string'?body.password:'';
  const invite=typeof body?.invite==='string'?body.invite.trim():'';
  const bootstrapCode=typeof body?.bootstrapCode==='string'?body.bootstrapCode.trim():'';
  if(!email||password.length<12||password.length>128) return json({error:'Unable to create account'},400);
  if(!(await rateLimit(env.DB,request,'register',email))) return json({error:'Too many attempts. Try again later.'},429);
  if(await env.DB.prepare('SELECT email FROM app_users WHERE email=?').bind(email).first()) return json({error:'Unable to create account'},400);

  let role='user', invitation=null;
  if(invite){
    const tokenHash=await sha256Hex(invite);
    invitation=await env.DB.prepare('SELECT token_hash,email,expires_at,used_at FROM app_invitations WHERE token_hash=?').bind(tokenHash).first();
    if(!invitation||invitation.used_at||Number(invitation.expires_at)<=now()||normalizeEmail(invitation.email)!==email) return json({error:'Invitation is invalid or expired'},400);
  }else{
    const admins=await env.DB.prepare("SELECT COUNT(*) c FROM app_users WHERE role='admin'").first();
    if(Number(admins?.c||0)>0) return json({error:'An invitation is required'},403);
    const configuredSecret=typeof env.SC500_BOOTSTRAP_SECRET==='string'?env.SC500_BOOTSTRAP_SECRET:'';
    if(!configuredSecret) return json({error:'Admin setup is not configured'},503);
    if(!bootstrapCode) return json({error:'Admin setup code is required'},403);
    const [providedHash,secretHash]=await Promise.all([sha256Hex(bootstrapCode),sha256Hex(configuredSecret)]);
    if(!constantTimeEqual(providedHash,secretHash)){
      await audit(env.DB,email,'bootstrap_failed',request);
      return json({error:'Invalid admin setup code'},403);
    }
    role='admin';
  }

  const salt=randomToken(16);
  const passwordHash=await derivePassword(password,salt,PBKDF2_ITERATIONS);
  await env.DB.prepare('INSERT INTO app_users(email,password_hash,salt,iterations,role,disabled) VALUES(?,?,?,?,?,0)').bind(email,passwordHash,salt,PBKDF2_ITERATIONS,role).run();
  if(invitation) await env.DB.prepare('UPDATE app_invitations SET used_at=CURRENT_TIMESTAMP WHERE token_hash=?').bind(invitation.token_hash).run();
  await clearRateLimit(env.DB,request,'register',email);
  await audit(env.DB,email,'register',request);
  const session=await createSession(env.DB,email,request);
  return authResponse({ok:true,email,role},session);
}

export async function loginUser(request,env,url){
  if(!sameOrigin(request,url)) return json({error:'Invalid request origin'},403);
  const body=await safeJson(request);
  const email=normalizeEmail(body?.email);
  const password=typeof body?.password==='string'?body.password:'';
  if(!email||!password) return json({error:'Invalid email or password'},401);
  if(!(await rateLimit(env.DB,request,'login',email))) return json({error:'Too many attempts. Try again later.'},429);
  const user=await env.DB.prepare('SELECT email,password_hash,salt,iterations,role,disabled FROM app_users WHERE email=?').bind(email).first();
  let valid=false;
  if(user&&!user.disabled){
    const candidate=await derivePassword(password,user.salt,Number(user.iterations));
    valid=constantTimeEqual(candidate,user.password_hash);
  }else{
    await derivePassword(password||'invalid-password',randomToken(16),PBKDF2_ITERATIONS);
  }
  if(!valid){await audit(env.DB,email,'login_failed',request);return json({error:'Invalid email or password'},401);}
  await clearRateLimit(env.DB,request,'login',email);
  const session=await createSession(env.DB,email,request);
  await audit(env.DB,email,'login',request);
  return authResponse({ok:true,email,role:user.role},session);
}

export async function requireSession(request,env){
  const token=getCookie(request.headers.get('cookie')||'',SESSION_COOKIE);
  if(!token) return {ok:false};
  const tokenHash=await sha256Hex(token);
  const row=await env.DB.prepare("SELECT s.token_hash,s.csrf_hash,s.expires_at,s.user_agent_hash,u.email,u.role,u.disabled FROM app_sessions s JOIN app_users u ON u.email=s.user_email WHERE s.token_hash=?").bind(tokenHash).first();
  if(!row||row.disabled||Number(row.expires_at)<=now()){
    if(row) await env.DB.prepare('DELETE FROM app_sessions WHERE token_hash=?').bind(tokenHash).run();
    return {ok:false};
  }
  const ua=await sha256Hex(request.headers.get('user-agent')||'');
  if(row.user_agent_hash&&!constantTimeEqual(row.user_agent_hash,ua)) return {ok:false};
  return {ok:true,user:{email:row.email,role:row.role},session:{token_hash:row.token_hash,csrf_hash:row.csrf_hash}};
}

export async function logoutUser(request,env,auth,url){
  if(!sameOrigin(request,url)||!(await validCsrf(request,auth.session))) return json({error:'Invalid request'},403);
  await env.DB.prepare('DELETE FROM app_sessions WHERE token_hash=?').bind(auth.session.token_hash).run();
  await audit(env.DB,auth.user.email,'logout',request);
  return clearAuthResponse({ok:true});
}

export async function validCsrf(request,session){
  const header=request.headers.get('x-csrf-token')||'';
  const cookie=getCookie(request.headers.get('cookie')||'',CSRF_COOKIE)||'';
  if(!header||!cookie||!constantTimeEqual(header,cookie)) return false;
  return constantTimeEqual(await sha256Hex(header),session.csrf_hash);
}
export function sameOrigin(request,url){const origin=request.headers.get('origin');return !!origin&&origin===url.origin;}
export function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:baseHeaders()});}
export function normalizeEmail(value){if(typeof value!=='string')return null;const s=value.trim().toLowerCase();return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)&&s.length<=254?s:null;}
export async function sha256Hex(value){const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');}
export async function audit(db,email,action,request){const ip=await sha256Hex(request.headers.get('cf-connecting-ip')||'unknown');await db.prepare('INSERT INTO app_audit_log(actor_email,action,ip_hash) VALUES(?,?,?)').bind(email||null,action,ip).run();}

async function createSession(db,email,request){
  const token=randomToken(32),csrf=randomToken(24),tokenHash=await sha256Hex(token),csrfHash=await sha256Hex(csrf),uaHash=await sha256Hex(request.headers.get('user-agent')||''),expires=now()+SESSION_SECONDS;
  await db.prepare('INSERT INTO app_sessions(token_hash,user_email,csrf_hash,expires_at,user_agent_hash) VALUES(?,?,?,?,?)').bind(tokenHash,email,csrfHash,expires,uaHash).run();
  return {token,csrf};
}
async function rateLimit(db,request,action,email){
  const key=await sha256Hex(action+'|'+(request.headers.get('cf-connecting-ip')||'unknown')+'|'+email),t=now();
  const row=await db.prepare('SELECT attempts,window_start FROM app_rate_limits WHERE rate_key=?').bind(key).first();
  if(!row||t-Number(row.window_start)>=RATE_WINDOW_SECONDS){await db.prepare('INSERT OR REPLACE INTO app_rate_limits(rate_key,attempts,window_start) VALUES(?,1,?)').bind(key,t).run();return true;}
  if(Number(row.attempts)>=MAX_ATTEMPTS)return false;
  await db.prepare('UPDATE app_rate_limits SET attempts=attempts+1 WHERE rate_key=?').bind(key).run();return true;
}
async function clearRateLimit(db,request,action,email){const key=await sha256Hex(action+'|'+(request.headers.get('cf-connecting-ip')||'unknown')+'|'+email);await db.prepare('DELETE FROM app_rate_limits WHERE rate_key=?').bind(key).run();}
async function derivePassword(password,salt,iterations){
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:decodeToken(salt),iterations},key,256);
  return [...new Uint8Array(bits)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
function randomToken(bytes){const a=new Uint8Array(bytes);crypto.getRandomValues(a);let s='';for(const b of a)s+=String.fromCharCode(b);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
function decodeToken(v){const s=v.replace(/-/g,'+').replace(/_/g,'/'),p=s+'='.repeat((4-s.length%4)%4),bin=atob(p),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a;}
function getCookie(header,name){for(const part of header.split(';')){const i=part.indexOf('=');if(i>0&&part.slice(0,i).trim()===name)return part.slice(i+1).trim();}return null;}
function constantTimeEqual(a,b){if(typeof a!=='string'||typeof b!=='string'||a.length!==b.length)return false;let d=0;for(let i=0;i<a.length;i++)d|=a.charCodeAt(i)^b.charCodeAt(i);return d===0;}
function now(){return Math.floor(Date.now()/1000);}
function baseHeaders(){return new Headers({'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff','x-frame-options':'DENY','referrer-policy':'no-referrer','permissions-policy':'camera=(), microphone=(), geolocation=()'});}
function authResponse(data,s){const h=baseHeaders();h.append('Set-Cookie',SESSION_COOKIE+'='+s.token+'; Path=/; Max-Age='+SESSION_SECONDS+'; HttpOnly; Secure; SameSite=Strict');h.append('Set-Cookie',CSRF_COOKIE+'='+s.csrf+'; Path=/; Max-Age='+SESSION_SECONDS+'; Secure; SameSite=Strict');return new Response(JSON.stringify(data),{headers:h});}
function clearAuthResponse(data){const h=baseHeaders();h.append('Set-Cookie',SESSION_COOKIE+'=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict');h.append('Set-Cookie',CSRF_COOKIE+'=; Path=/; Max-Age=0; Secure; SameSite=Strict');return new Response(JSON.stringify(data),{headers:h});}
async function safeJson(request){try{return await request.json();}catch{return null;}}
