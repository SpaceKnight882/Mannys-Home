'use client';
import { useState } from 'react';

export function SpotifyPlayer() {
  const [token, setToken] = useState('');
  return (
    <div className="rounded border border-cyan-300/50 bg-black/60 p-4">
      <h3 className="font-pixel text-xs text-pink-300">Galactic Music Console</h3>
      <p className="mt-2 text-xs">Paste an OAuth access token for demo playback controls.</p>
      <input value={token} onChange={(e) => setToken(e.target.value)} placeholder="Spotify access token" className="mt-2 w-full border bg-black/70 p-2 text-xs" />
      <div className="mt-3 flex gap-2 text-xs">
        <button className="border px-3 py-1">⏮</button><button className="border px-3 py-1">⏯</button><button className="border px-3 py-1">⏭</button>
      </div>
      <div className="mt-4 h-16 rounded bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-purple-500/20 p-2">
        <div className="flex h-full items-end gap-1">{Array.from({ length: 24 }).map((_, i) => <div key={i} className="w-1 animate-pulse bg-cyan-300" style={{ height: `${20 + (i % 5) * 12}%` }} />)}</div>
      </div>
      <iframe title="spotify-fallback" className="mt-3 w-full" height="152" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd" loading="lazy" />
      {token && <p className="mt-2 text-[10px] text-green-300">Token provided. Integrate Web Playback SDK in production using this token and PKCE flow.</p>}
    </div>
  );
}
