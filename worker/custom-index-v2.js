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
      if(!auth.ok)return new Response(null,{status:302,headers:{location:'/login.html','cache-control':'no-store'}});
      return env.ASSETS.fetch(new Request(new URL('/lab.html',url.origin),request));
    }

    if(path==='/admin'||path==='/admin/'||path==='/admin.html'){
      await ensureSchema(env.DB);
      const auth=await requireSession(request,env);
      if(!auth.ok)return new Response(null,{status:302,headers:{location:'/login.html','cache-control':'no-store'}});
      if(auth.user.role!=='admin')return json({error:'Forbidden'},403);
      return env.ASSETS.fetch(new Request(new URL('/admin.html',url.origin),request));
    }

    return env.ASSETS.fetch(request);
  }
};
