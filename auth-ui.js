const form=document.getElementById('authForm');
const message=document.getElementById('message');
const mode=document.body.dataset.page;
if(mode==='register'){
  const invite=new URLSearchParams(location.search).get('invite')||'';
  const bootstrapField=document.getElementById('bootstrapField');
  const bootstrapInput=document.getElementById('bootstrapCode');
  const intro=document.getElementById('registerIntro');
  if(invite){
    if(bootstrapField)bootstrapField.hidden=true;
    if(bootstrapInput)bootstrapInput.required=false;
    if(intro)intro.textContent='Registration is invite-only. Use the email address your invitation was created for.';
  }else{
    if(bootstrapField)bootstrapField.hidden=false;
    if(bootstrapInput)bootstrapInput.required=true;
    if(intro)intro.textContent='Initial administrator setup. Enter the one-time admin setup code configured for this deployment.';
  }
}
if(form){
  form.addEventListener('submit',async event=>{
    event.preventDefault();
    const data=new FormData(form);
    const payload=Object.fromEntries(data.entries());
    if(mode==='register'){
      if(payload.password!==payload.confirmPassword){message.textContent='Passwords do not match.';message.className='message error';return;}
      payload.invite=new URLSearchParams(location.search).get('invite')||'';
      if(payload.invite)delete payload.bootstrapCode;
      delete payload.confirmPassword;
    }
    message.textContent=mode==='register'?'Creating account…':'Signing in…';
    try{
      const response=await fetch(mode==='register'?'/app-api/auth/register':'/app-api/auth/login',{
        method:'POST',
        headers:{'content-type':'application/json'},
        credentials:'same-origin',
        body:JSON.stringify(payload)
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok)throw new Error(result.error||'Request failed');
      location.replace('/app');
    }catch(error){
      message.textContent=error.message;
      message.className='message error';
    }
  });
}