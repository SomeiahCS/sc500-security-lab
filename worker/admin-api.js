import {audit,json,normalizeEmail,sha256Hex} from './auth.js';
import {safeJson} from './db.js';

export async function handleAdminApi(request,env,url,auth){
  if(auth.user.role!=='admin') return null;
  const path=url.pathname;

  if(path==='/app-api/admin/invitations'){
    if(request.method==='GET'){
      const rows=await env.DB.prepare('SELECT email,created_at,expires_at,used_at FROM app_invitations ORDER BY created_at DESC LIMIT 100').all();
      return json({invitations:rows.results||[]});
    }
    if(request.method==='POST'){
      const body=await safeJson(request),email=normalizeEmail(body?.email);
      if(!email)return json({error:'Invalid email'},400);
      const token=makeToken(32),tokenHash=await sha256Hex(token),expiresAt=Math.floor(Date.now()/1000)+604800;
      await env.DB.prepare('INSERT OR REPLACE INTO app_invitations(token_hash,email,created_by,expires_at,used_at,created_at) VALUES(?,?,?,?,NULL,CURRENT_TIMESTAMP)').bind(tokenHash,email,auth.user.email,expiresAt).run();
      await audit(env.DB,auth.user.email,'invite:'+email,request);
      return json({ok:true,email,inviteUrl:url.origin+'/register.html?invite='+encodeURIComponent(token)});
    }
  }

  if(path==='/app-api/admin/users'&&request.method==='GET'){
    const rows=await env.DB.prepare('SELECT email,role,disabled,created_at FROM app_users ORDER BY created_at DESC LIMIT 100').all();
    return json({users:rows.results||[]});
  }
  return null;
}

function makeToken(bytes){
  const a=new Uint8Array(bytes);crypto.getRandomValues(a);let s='';
  for(const b of a)s+=String.fromCharCode(b);
  return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
