
(async function(){
  const p=location.pathname.split('/').pop();
  const files=await fetch('/api/files').then(r=>r.json()).catch(()=>({images:[],pdfs:[],music:[],files:[]}));
  if(p==='gallery.html'){document.getElementById('galleryGrid').innerHTML=files.images.map(i=>`<div class='card'><img src='${i.url}' alt='${i.name}'></div>`).join('');}
  if(p==='music.html'){document.getElementById('musicList').innerHTML=files.music.map(m=>`<div class='audio-item'><strong>${m.name}</strong><audio controls src='${m.url}'></audio></div>`).join('');}
  if(p==='pdfs.html'){const l=document.getElementById('pdfList');const f=document.getElementById('pdfFrame');l.innerHTML=files.pdfs.map(p=>`<div class='list-item'><span>${p.name}</span><button onclick="document.getElementById('pdfFrame').src='${p.url}'">Open</button></div>`).join('');}
  if(p==='uploads.html'){document.getElementById('fileList').innerHTML=[...files.files,...files.pdfs,...files.music,...files.images].map(x=>`<div class='list-item'><a href='${x.url}' download>${x.name}</a></div>`).join('');}
  if(p==='blog.html'){const blogs=await fetch('/api/blogs').then(r=>r.json()).catch(()=>({blogs:[]}));document.getElementById('blogList').innerHTML=blogs.blogs.map(b=>`<article class='panel'><h3>${b.title}</h3><small>${b.date} • ${b.tags||''}</small>${b.image?`<img style='width:100%;max-width:340px' src='${b.image}'>`:''}<p>${b.content}</p></article>`).join('');}
})();
