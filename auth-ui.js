const form=document.getElementById('authForm');
const message=document.getElementById('message');
const mode=document.body.dataset.page;

async function configureRegistration(){
  if(mode!=='register')return;
  const params=new URLSearchParams(location.search);
  const invite=params.get('invite')||'';
  const bootstrapField=document.getElementById('bootstrapField');
  const bootstrapInput=document.getElementById('bootstrapCode');
  const intro=document.getElementById('registerIntro');

  if(invite){
    if(bootstrapField)bootstrapField.hidden=true;
    if(bootstrapInput)bootstrapInput.required=false;
    if(intro)intro.textContent='Use the email address your invitation was created for.';
    return;
  }

  if(form)form.hidden=true;
  if(intro)intro.textContent='Checking registration access…';

  try{
    const response=await fetch('/app-api/auth/registration-status',{credentials:'same-origin',cache:'no-store'});
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.error||'Unable to check registration');

    if(!result.bootstrapRequired){
      location.replace('/login.html?registration=invite-required');
      return;
    }

    if(bootstrapField)bootstrapField.hidden=false;
    if(bootstrapInput)bootstrapInput.required=true;
    if(intro)intro.textContent='Initial administrator setup. Enter the one-time admin setup code configured for this deployment.';
    if(form)form.hidden=false;
  }catch(error){
    if(intro)intro.textContent='Unable to verify registration access. Please try again.';
    if(message){message.textContent=error.message;message.className='message error';}
  }
}

if(mode==='login'){
  const reason=new URLSearchParams(location.search).get('registration');
  if(reason==='invite-required'&&message){
    message.textContent='Registration requires a valid invitation.';
    message.className='message error';
  }
}

configureRegistration();

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