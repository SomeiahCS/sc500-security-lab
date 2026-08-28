import {requireSession,json} from './auth.js';
import {ensureSchema} from './db.js';
import {handleAppApi} from './app-api.js';

export default {
  async fetch(request,env){
    const url=new URL(request.url);
    const path=url.pathname;

    if(path.startsWith('/app-api/')){
      await ensureSchema(env.DB);
      return handleAppApi(request,env,url);
    }

    if(path==='/app'||path==='/app/'||path==='/lab.html'){
      await ensureSchema(env.DB);
      const auth=await requireSession(request,env);
      if(!auth.ok)return redirect('/login.html');
      const response=await env.ASSETS.fetch(new Request(new URL('/lab.html',url.origin),request));
      return secure(response);
    }

    if(path==='/admin'||path==='/admin/'||path==='/admin.html'){
      await ensureSchema(env.DB);
      const auth=await requireSession(request,env);
      if(!auth.ok)return redirect('/login.html');
      if(auth.user.role!=='admin')return json({error:'Forbidden'},403);
      const response=await env.ASSETS.fetch(new Request(new URL('/admin.html',url.origin),request));
      return secure(response);
    }

    return env.ASSETS.fetch(request);
  }
};

function redirect(path){
  return new Response(null,{status:302,headers:{location:path,'cache-control':'no-store'}});
}
function secure(response){
  const headers=new Headers(response.headers);
  headers.set('cache-control','no-store');
  headers.set('x-content-type-options','nosniff');
  headers.set('x-frame-options','DENY');
  headers.set('referrer-policy','no-referrer');
  headers.set('permissions-policy','camera=(), microphone=(), geolocation=()');
  headers.set('content-security-policy',"default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");
  return new Response(response.body,{status:response.status,statusText:response.statusText,headers});
}
