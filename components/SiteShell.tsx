'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PasswordGate from './PasswordGate';
const nav=[['/','Home Station'],['/music','Music Archive'],['/astronaut-log','Astronaut Log'],['/gallery','Cosmic Gallery'],['/transmission-board','Transmission Board'],['/secret-black-hole','Secret Black Hole'],['/admin','Admin Upload Center'],['/links','Space Links Directory'],['/downloads','Retro Downloads']];
const popups=['SIGNAL DETECTED','ALIEN TRANSMISSION FOUND','YOU ARE THE 1,000,000TH SPACE TRAVELER','FREE GALACTIC MP3 DOWNLOAD','WARNING: COSMIC VIRUS DETECTED'];
export function SiteShell({children}:{children:React.ReactNode}){const [ok,setOk]=useState(false);const [p,setP]=useState<string[]>([]);
useEffect(()=>setOk(localStorage.getItem('cosmic_access')==='1'),[]);
useEffect(()=>{const t=setInterval(()=>setP(s=>[...s,popups[Math.floor(Math.random()*popups.length)]]),9000);return()=>clearInterval(t);},[]);
if(!ok)return <PasswordGate onUnlock={()=>setOk(true)} />;
return <div className='site-wrap'>
<div className='crt'/><div className='equations'>{['E=mc²','iħ∂ψ/∂t=Ĥψ','010101 SPACE','λx. alien(x)','F=Gm1m2/r²'].map((e,i)=><motion.span key={e+i} animate={{x:[0,40,-20,0],y:[0,-50,30,0],opacity:[.2,.9,.2]}} transition={{duration:20+i,repeat:Infinity}}>{e}</motion.span>)}</div>
<header><div className="blink">WELCOME TO THE ABANDONED COSMIC PORTAL :: INTERSTELLAR CONNECTION UNSTABLE :: BEST VIEWED ON WINDOWS XP</div></header>
<div className='layout'><aside className='left'>{nav.map(([u,t])=><Link key={u} href={u}>{t}</Link>)}<div className='widget blink'>VISITOR #0001337</div></aside><main>{children}</main><aside className='right'><div className='widget'>CHATROOM OFFLINE</div><div className='widget'>UFO RADAR ACTIVE</div></aside></div>
<footer>© 2009-2099 Manny's Home • Under Galactic Construction</footer>
{p.map((x,i)=><div key={i} className='popup' style={{top:`${20+i*40}px`,left:`${40+i*55}px`}}><b>{x}</b><button onClick={()=>setP(s=>s.filter((_,idx)=>idx!==i))}>x</button></div>)}
</div>}
