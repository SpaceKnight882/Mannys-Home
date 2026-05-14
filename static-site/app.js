const PASS='ecm-was here';
function unlock(){const v=document.getElementById('pass').value;if(v===PASS){localStorage.setItem('unlocked','1');document.getElementById('lock').style.display='none';}else alert('Wrong passcode');}
function initLock(){if(localStorage.getItem('unlocked')==='1')document.getElementById('lock').style.display='none';}

const list=document.getElementById('songList'); const audio=document.getElementById('audio');
function addSong(title,url){const songs=JSON.parse(localStorage.getItem('songs')||'[]');songs.push({title,url});localStorage.setItem('songs',JSON.stringify(songs));renderSongs();}
function renderSongs(){if(!list) return; const songs=JSON.parse(localStorage.getItem('songs')||'[]');list.innerHTML='';songs.forEach((s,i)=>{const li=document.createElement('li');li.innerHTML=`<button onclick="playSong(${i})">▶</button> ${s.title}`;list.appendChild(li);});}
function playSong(i){const songs=JSON.parse(localStorage.getItem('songs')||'[]');if(!songs[i])return;audio.src=songs[i].url;audio.play();}
function wireUploader(){const f=document.getElementById('fileUpload');const u=document.getElementById('urlInput');const t=document.getElementById('titleInput');document.getElementById('addUrl').onclick=()=>{if(u.value)addSong(t.value||'URL Song',u.value)};f.onchange=(e)=>{[...e.target.files].forEach(file=>addSong(file.name,URL.createObjectURL(file)));};}
initLock();renderSongs();if(document.getElementById('addUrl'))wireUploader();
