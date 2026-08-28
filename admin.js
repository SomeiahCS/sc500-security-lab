const csrf=()=>document.cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith('__Host-sc500_csrf='))?.split('=')[1]||'';
async function loadJson(path,options={}){
  const response=await fetch(path,{credentials:'same-origin',cache:'no-store',...options});
  const data=await response.json().catch(()=>({}));
  if(!response.ok)throw new Error(data.error||'Request failed');
  return data;
}
function addRow(parent,title,detail){
  const box=document.createElement('div');
  box.className='row';
  const a=document.createElement('strong');
  const b=document.createElement('span');
  a.textContent=title;b.textContent=detail;
  box.append(a,b);parent.append(box);
}
async function refresh(){
  const users=await loadJson('/app-api/admin/users');
  const invites=await loadJson('/app-api/admin/invitations');
  const userList=document.getElementById('userList');
  const inviteList=document.getElementById('inviteList');
  userList.textContent='';inviteList.textContent='';
  for(const u of users.users||[])addRow(userList,u.email,u.role);
  for(const i of invites.invitations||[])addRow(inviteList,i.email,i.used_at?'Used':'Pending');
}
document.getElementById('inviteForm').addEventListener('submit',async event=>{
  event.preventDefault();
  const message=document.getElementById('inviteMessage');
  try{
    const data=await loadJson('/app-api/admin/invitations',{
      method:'POST',
      headers:{'content-type':'application/json','x-csrf-token':csrf()},
      body:JSON.stringify({email:document.getElementById('inviteEmail').value.trim()})
    });
    message.textContent='Invitation created.';
    const result=document.getElementById('inviteResult');
    result.textContent=data.inviteUrl;
    result.className='invite-result';
    await refresh();
  }catch(error){message.textContent=error.message;}
});
refresh().catch(error=>{document.getElementById('inviteMessage').textContent=error.message;});