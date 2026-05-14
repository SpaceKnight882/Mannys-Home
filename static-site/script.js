const API = '/api';
function nav(){return `<header><div id='marqueeBar' class='hidden'></div><nav>
<a href='/index.html'>Home</a><a href='/music.html'>Music</a><a href='/gallery.html'>Gallery</a><a href='/blog.html'>Blog</a><a href='/pdfs.html'>PDFs</a><a href='/guestbook.html'>Guestbook</a><a href='/links.html'>Links</a><a href='/uploads.html'>Uploads</a><a href='/admin.html'>Admin</a></nav></header><footer>✨ Manny's Galaxy Site</footer>`}
document.body.insertAdjacentHTML('afterbegin',nav());
(async function loadAds(){
  try{const ads=await fetch(`${API}/ads`).then(r=>r.json());
    const enabled=ads.scrolling.filter(x=>x.enabled!==false);
    if(enabled.length){const bar=document.getElementById('marqueeBar'); bar.classList.remove('hidden'); bar.innerHTML=`<div class='marquee-track'>${enabled.map(a=>`<a style="color:#fff;margin:0 18px" href="${a.link||'#'}">✦ ${a.text}</a>`).join('')}</div>`;}
    spawnPopups(ads.popups.filter(x=>x.enabled!==false));
  }catch(e){console.warn('ads unavailable',e)}
})();
function spawnPopups(popups){let visible=0;popups.forEach(p=>{setInterval(()=>{if(visible>=3)return;const el=document.createElement('div');el.className='popup';el.style.left=Math.random()*Math.max(200,window.innerWidth-320)+'px';el.style.top=Math.random()*Math.max(120,window.innerHeight-260)+'px';el.innerHTML=`<div class='title'><span>${p.title||'Ad'}</span><span><button data-min>_</button><button data-close>x</button></span></div><div class='content'>${p.image?`<img src='${p.image}'>`:''}<p>${p.text||''}</p>${p.link?`<a href='${p.link}'>Visit</a>`:''}</div>`;document.body.appendChild(el);visible++;drag(el);
      el.querySelector('[data-close]').onclick=()=>{el.remove();visible--}; el.querySelector('[data-min]').onclick=()=>{const c=el.querySelector('.content'); c.classList.toggle('hidden');};
    }, Math.max(10, Number(p.frequency||45))*1000)})}
function drag(el){const t=el.querySelector('.title');let x=0,y=0,dx=0,dy=0;t.onmousedown=e=>{e.preventDefault();dx=e.clientX;dy=e.clientY;document.onmouseup=()=>document.onmousemove=null;document.onmousemove=ev=>{x=dx-ev.clientX;y=dy-ev.clientY;dx=ev.clientX;dy=ev.clientY;el.style.top=(el.offsetTop-y)+'px';el.style.left=(el.offsetLeft-x)+'px';}}}
