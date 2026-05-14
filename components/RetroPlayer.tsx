'use client';
import { useRef, useState } from 'react';
export default function RetroPlayer() {
  const a = useRef<HTMLAudioElement>(null);
  const [url,setUrl]=useState('');
  return <div className='window'><h3>WINAMP://GALAXY DECK</h3>
    <input placeholder='paste mp3 url' value={url} onChange={e=>setUrl(e.target.value)} />
    <div><button onClick={()=>{if(a.current){a.current.src=url;a.current.play();}}}>PLAY</button><button onClick={()=>a.current?.pause()}>PAUSE</button></div>
    <audio ref={a} controls className='w-full' loop/>
    <div className='bars'>{Array.from({length:20}).map((_,i)=><span key={i} style={{animationDelay:`${i*0.1}s`}} />)}</div>
  </div>
}
