const form=document.getElementById('recoveryForm');
const message=document.getElementById('message');
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=new FormData(form);
  const payload=Object.fromEntries(data.entries());
  if(payload.password!==payload.confirmPassword){
    message.textContent='Passwords do not match.';
    message.className='message error';
    return;
  }
  delete payload.confirmPassword;
  message.textContent='Resetting password…';
  try{
    const response=await fetch('/app-api/auth/admin-recover',{
      method:'POST',
      headers:{'content-type':'application/json'},
      credentials:'same-origin',
      body:JSON.stringify(payload)
    });
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(result.error||'Password reset failed');
    message.textContent='Password reset. Redirecting to sign in…';
    message.className='message ok';
    setTimeout(()=>location.replace('/login.html?reset=success'),700);
  }catch(error){
    message.textContent=error.message;
    message.className='message error';
  }
});