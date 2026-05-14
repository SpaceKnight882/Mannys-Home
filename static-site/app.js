const $ = (id) => document.getElementById(id);
const store = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, d) => JSON.parse(localStorage.getItem(k) || JSON.stringify(d));

const songs = load('songs', []); let songIndex = 0;
const audio = $('audio');
function paintSong(){ $('nowPlaying').textContent = songs[songIndex] ? `Now playing: ${songs[songIndex].title}` : 'Now playing: Nothing yet'; }
$('addSong').onclick = () => { const url=$('songUrl').value.trim(); const title=$('songTitle').value.trim()||'Untitled'; if(!url) return; songs.push({url,title}); store('songs',songs); songIndex=songs.length-1; audio.src=url; audio.play(); paintSong(); spawnPopup('New song added!'); };
$('prevSong').onclick=()=>{ if(!songs.length) return; songIndex=(songIndex-1+songs.length)%songs.length; audio.src=songs[songIndex].url; audio.play(); paintSong();};
$('nextSong').onclick=()=>{ if(!songs.length) return; songIndex=(songIndex+1)%songs.length; audio.src=songs[songIndex].url; audio.play(); paintSong();};
$('playPause').onclick=()=> audio.paused?audio.play():audio.pause();

let admin = false; $('unlockAdmin').onclick=()=>{admin=$('adminPass').value==='Ecm'; if(admin){$('adminTools').classList.remove('hidden'); spawnPopup('Admin mode unlocked');} };
const guests = load('guestbook', []);
function renderGuests(){ $('guestList').innerHTML = guests.map(g=>`<li><b>${g.n}</b>: ${g.m}</li>`).join(''); }
$('guestAdd').onclick=()=>{ const n=$('guestName').value.trim(),m=$('guestMsg').value.trim(); if(!n||!m)return; guests.push({n,m}); store('guestbook',guests); renderGuests();};

let admin = false; $('unlockAdmin').onclick=()=>{admin=$('adminPass').value==='ecm-was here .'; if(admin){$('adminTools').classList.remove('hidden'); spawnPopup('Admin mode unlocked');} };
const media = load('galleryMedia', []);
function renderGallery(){ $('galleryGrid').innerHTML = media.map((m,i)=>`<div class='card'><p>${m.name}</p>${m.type.startsWith('image/')?`<img src='${m.data}'/>`:m.type==='application/pdf'?'<p>PDF saved in archive</p>':`<audio controls src='${m.data}'></audio>`}${admin?`<button data-del='${i}'>Delete</button>`:''}</div>`).join(''); [...document.querySelectorAll('[data-del]')].forEach(b=>b.onclick=()=>{media.splice(+b.dataset.del,1);store('galleryMedia',media);renderGallery();}); }
$('saveFile').onclick=()=>{ const f=$('fileUpload').files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{const item={name:f.name,type:f.type||'application/octet-stream',data:r.result}; media.push(item); store('galleryMedia',media); if(f.type==='application/pdf') addPdf({title:f.name,data:r.result}); renderGallery();}; r.readAsDataURL(f); };

const popTexts=['Welcome to my space site!','Check out the galaxy gallery!','You discovered a hidden star!'];
function spawnPopup(t=popTexts[Math.floor(Math.random()*popTexts.length)]){ const d=document.createElement('div'); d.className='popup'; d.innerHTML=`<div data-drag='handle'>${t} <button>x</button></div>`; document.body.appendChild(d); d.style.top=Math.random()*300+100+'px'; d.style.left=Math.random()*600+20+'px'; d.querySelector('button').onclick=()=>d.remove(); makeDraggable(d); }
$('spawnPopup').onclick=()=>spawnPopup(); setInterval(()=>Math.random()>.75&&spawnPopup(),18000);

function makeDraggable(el){ const h=el.querySelector('[data-drag="handle"]')||el; let ox=0,oy=0,drag=false; h.onmousedown=(e)=>{drag=true;ox=e.clientX-el.offsetLeft;oy=e.clientY-el.offsetTop;}; window.onmouseup=()=>drag=false; window.onmousemove=(e)=>{if(!drag)return; el.style.left=(e.clientX-ox)+'px'; el.style.top=(e.clientY-oy)+'px';}; }
makeDraggable($('pdfWindow'));

// PDF Archive + Reader
const pdfs = load('pdfs', []);
function addPdf(p){ pdfs.push(p); store('pdfs',pdfs); renderPdfList(); }
function renderPdfList(){ $('pdfList').innerHTML = pdfs.map((p,i)=>`<li><button data-open='${i}'>${p.title}</button>${admin?`<button data-rm='${i}'>del</button>`:''}</li>`).join(''); document.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openPdfData(pdfs[+b.dataset.open].data)); document.querySelectorAll('[data-rm]').forEach(b=>b.onclick=()=>{pdfs.splice(+b.dataset.rm,1);store('pdfs',pdfs);renderPdfList();}); }

let pdfDoc=null,page=1,zoom=1; const canvas=$('pdfCanvas'),ctx=canvas.getContext('2d');
import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.min.mjs').then(pdfjsLib=>{
  pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.5.136/pdf.worker.min.mjs';
  async function render(){ if(!pdfDoc) return; const pg=await pdfDoc.getPage(page); const vp=pg.getViewport({scale:zoom}); canvas.width=vp.width; canvas.height=vp.height; await pg.render({canvasContext:ctx, viewport:vp}).promise; $('pdfMeta').textContent=`Page ${page} / ${pdfDoc.numPages}`; }
  async function openPdfData(src){ $('pdfWindow').classList.remove('hidden'); pdfDoc = await pdfjsLib.getDocument(src).promise; page=1; zoom=1; render(); }
  window.openPdfData=openPdfData;
  $('openPdfBtn').onclick=()=>$('pdfWindow').classList.remove('hidden');
  $('pdfClose').onclick=()=>$('pdfWindow').classList.add('hidden'); $('pdfMin').onclick=()=>$('pdfBody').classList.toggle('hidden');
  $('pdfPrev').onclick=()=>{if(page>1){page--;render();}}; $('pdfNext').onclick=()=>{if(pdfDoc&&page<pdfDoc.numPages){page++;render();}};
  $('pdfIn').onclick=()=>{zoom=Math.min(zoom+.2,3);render();}; $('pdfOut').onclick=()=>{zoom=Math.max(zoom-.2,.5);render();};
  $('loadPdfUrl').onclick=()=>openPdfData($('pdfUrl').value.trim());
  $('pdfFile').onchange=(e)=>{const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{addPdf({title:f.name,data:r.result}); openPdfData(r.result);}; r.readAsDataURL(f);};
});

renderGallery(); renderPdfList(); paintSong();


// 3D Earth Globe (Three.js)
import('https://unpkg.com/three@0.165.0/build/three.module.js').then(async THREE=>{
  const {OrbitControls}=await import('https://unpkg.com/three@0.165.0/examples/jsm/controls/OrbitControls.js');
  const canvas=$('earthCanvas'); if(!canvas) return;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(45,canvas.clientWidth/canvas.clientHeight,0.1,1000); camera.position.set(0,0,3);
  const controls=new OrbitControls(camera,renderer.domElement); controls.enablePan=false; controls.minDistance=2; controls.maxDistance=6;
  const light=new THREE.DirectionalLight(0xffffff,1.2); light.position.set(5,2,5); scene.add(light); scene.add(new THREE.AmbientLight(0x446688,0.7));
  const loader=new THREE.TextureLoader();
  const earthMap=loader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg');
  const bump=loader.load('https://threejs.org/examples/textures/planets/earth_bump_2048.jpg');
  const spec=loader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg');
  const earth=new THREE.Mesh(new THREE.SphereGeometry(1,64,64),new THREE.MeshPhongMaterial({map:earthMap,bumpMap:bump,bumpScale:0.03,specularMap:spec,specular:new THREE.Color('grey')}));
  const clouds=new THREE.Mesh(new THREE.SphereGeometry(1.01,64,64),new THREE.MeshPhongMaterial({map:loader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png'),transparent:true,opacity:0.35}));
  scene.add(earth); scene.add(clouds);
  function size(){ const w=canvas.clientWidth,h=canvas.clientHeight; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); }
  size(); window.addEventListener('resize',size);
  (function animate(){ requestAnimationFrame(animate); earth.rotation.y+=0.0015; clouds.rotation.y+=0.002; controls.update(); renderer.render(scene,camera); })();
});
renderGuests(); renderGallery(); renderPdfList(); paintSong();
