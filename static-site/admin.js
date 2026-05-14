
const PASS='ecm-was here .';
const authed=()=>localStorage.getItem('adminAuth')==='1';
function gate(){if(!authed()){loginPanel.classList.remove('hidden');adminPanel.classList.add('hidden')}else{loginPanel.classList.add('hidden');adminPanel.classList.remove('hidden');loadAdmin();}}
loginBtn.onclick=()=>{if(pw.value===PASS){localStorage.setItem('adminAuth','1');gate()}else alert('access denied')};
logoutBtn.onclick=()=>{localStorage.removeItem('adminAuth');gate()};
if(location.pathname.endsWith('admin.html'))gate();

async function loadAdmin(){
  const blogs=await fetch('/api/blogs').then(r=>r.json());
  adminBlogs.innerHTML=blogs.blogs.map(b=>`<div class='list-item'><span>${b.title}</span><span><button onclick="editBlog('${b.id}')">Edit</button><button onclick="delBlog('${b.id}')">Delete</button></span></div>`).join('');
  const files=await fetch('/api/files').then(r=>r.json());
  adminFiles.innerHTML=['images','pdfs','music','files'].map(c=>`<h4>${c}</h4>${files[c].map(f=>`<div class='list-item'>${f.name}<span><button onclick="renFile('${c}','${f.id}')">Rename</button><button onclick="delFile('${c}','${f.id}')">Delete</button></span></div>`).join('')}`).join('');
  const ads=await fetch('/api/ads').then(r=>r.json());
  adsList.innerHTML=`<h4>Popups</h4>${ads.popups.map(a=>`<div class='list-item'>${a.title}<button onclick="delAd('popups','${a.id}')">Delete</button></div>`).join('')}<h4>Scrolling</h4>${ads.scrolling.map(a=>`<div class='list-item'>${a.text}<button onclick="delAd('scrolling','${a.id}')">Delete</button></div>`).join('')}`;
}
blogForm.onsubmit=async e=>{e.preventDefault();const fd=Object.fromEntries(new FormData(blogForm).entries());await fetch('/api/blogs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(fd)});blogForm.reset();loadAdmin()}
uploadForm.onsubmit=async e=>{e.preventDefault();const fd=new FormData(uploadForm);fd.append('type',fd.get('category')==='pdfs'?'pdf':fd.get('category')==='music'?'music':'image');await fetch('/api/upload?category='+fd.get('category'),{method:'POST',body:fd});uploadForm.reset();loadAdmin()}
popupForm.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(popupForm).entries());await fetch('/api/ads/popup',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});popupForm.reset();loadAdmin()}
scrollForm.onsubmit=async e=>{e.preventDefault();const d=Object.fromEntries(new FormData(scrollForm).entries());await fetch('/api/ads/scrolling',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});scrollForm.reset();loadAdmin()}
async function delBlog(id){await fetch('/api/blogs/'+id,{method:'DELETE'});loadAdmin()} 
async function editBlog(id){const t=prompt('New title'); if(!t)return; await fetch('/api/blogs/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({title:t})});loadAdmin()}
async function delFile(c,id){await fetch(`/api/files/${c}/${id}`,{method:'DELETE'});loadAdmin()}
async function renFile(c,id){const n=prompt('New file name'); if(!n)return; await fetch(`/api/files/${c}/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n})});loadAdmin()}
async function delAd(t,id){await fetch(`/api/ads/${t}/${id}`,{method:'DELETE'});loadAdmin()}
