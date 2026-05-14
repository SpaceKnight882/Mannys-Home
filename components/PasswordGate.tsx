'use client';
import { useState } from 'react';
export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  return <div className='gate'><h1>ORBITAL ACCESS TERMINAL</h1><p>ENTER PASSCODE:</p>
    <input value={value} onChange={e=>setValue(e.target.value)} />
    <button onClick={()=>{if(value=== (process.env.NEXT_PUBLIC_SITE_PASSWORD || 'Ecm')){localStorage.setItem('cosmic_access','1');onUnlock();}else{setError('ACCESS DENIED // COSMIC ALARM');}}}>UNLOCK</button>
    <p className='blink'>{error}</p></div>;
}
