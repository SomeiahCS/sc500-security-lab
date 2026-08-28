function csrfToken(){
  const name='__Host-sc500_csrf=';
  for(const part of document.cookie.split(';')){
    const item=part.trim();
    if(item.startsWith(name))return item.slice(name.length);
  }
  return '';
}
window.SC500_AUTH={csrfToken};

(async()=>{
  const userBox=document.getElementById('sessionUser');
  const logout=document.getElementById('logoutButton');
  const admin=document.getElementById('adminLink');
  if(!userBox||!logout)return;
  try{
    const response=await fetch('/app-api/me',{credentials:'same-origin',cache:'no-store'});
    if(!response.ok){location.replace('/login.html');return;}
    const me=await response.json();
    userBox.textContent=me.email;
    if(admin&&me.role==='admin')admin.hidden=false;
  }catch{return;}

  logout.addEventListener('click',async()=>{
    await fetch('/app-api/auth/logout',{
      method:'POST',
      credentials:'same-origin',
      headers:{'x-csrf-token':csrfToken()}
    }).catch(()=>{});
    location.replace('/login.html');
  });
})();