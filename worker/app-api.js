import {json,loginUser,logoutUser,recoverAdminPassword,registerUser,registrationStatus,requireSession,sameOrigin,validCsrf} from './auth.js';
import {handleProgressApi} from './progress-api.js';
import {handleAdminApi} from './admin-api.js';

export async function handleAppApi(request,env,url){
  const path=url.pathname;
  if(path==='/app-api/auth/registration-status'&&request.method==='GET') return registrationStatus(env);
  if(path==='/app-api/auth/register'&&request.method==='POST') return registerUser(request,env,url);
  if(path==='/app-api/auth/login'&&request.method==='POST') return loginUser(request,env,url);
  if(path==='/app-api/auth/admin-recover'&&request.method==='POST') return recoverAdminPassword(request,env,url);

  const auth=await requireSession(request,env);
  if(!auth.ok) return json({error:'Authentication required'},401);

  if(path==='/app-api/auth/logout'&&request.method==='POST') return logoutUser(request,env,auth,url);
  if(path==='/app-api/me'&&request.method==='GET') return json({email:auth.user.email,role:auth.user.role});

  if(request.method==='POST'){
    if(!sameOrigin(request,url)) return json({error:'Invalid request origin'},403);
    if(!(await validCsrf(request,auth.session))) return json({error:'Invalid CSRF token'},403);
  }

  const progress=await handleProgressApi(request,env,path,auth.user.email);
  if(progress)return progress;

  const admin=await handleAdminApi(request,env,url,auth);
  if(admin)return admin;

  return json({error:'Not found'},404);
}
