'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const equations = ['E=mc²', 'iħ∂ψ/∂t=Ĥψ', 'N=R*×fp×ne×fl×fi×fc×L', 'F=G(m1m2/r²)', 'Δv = Isp g0 ln(m0/mf)'];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<string | null>(null);
  useEffect(() => {
    const id = setInterval(() => setPopup(Math.random() > 0.5 ? 'SIGNAL DETECTED' : 'ALIEN TRANSMISSION FOUND'), 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen p-4">
      <header className="mb-4 border border-cyan-300/40 bg-black/40 p-3">
        <p className="marquee font-pixel text-xs text-fuchsia-300">WELCOME TO MANNY&apos;S INTERSTELLAR TERMINAL // VISITOR #1000000 // UNDER COSMIC CONSTRUCTION</p>
        <nav className="mt-2 flex flex-wrap gap-3 text-sm">
          {['/','/music','/about','/guestbook','/links','/black-hole'].map((p) => <Link key={p} href={p} className="rounded border border-cyan-400/40 px-2 py-1 hover:bg-cyan-500/20">{p === '/' ? 'Home Station' : p.slice(1)}</Link>)}
        </nav>
      </header>
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {equations.map((eq, i) => <motion.div key={eq} className="absolute text-xs text-cyan-200/40" initial={{ x: i * 120, y: i * 80 }} animate={{ y: [null, i * 80 + 60, i * 80], opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 14 + i, repeat: Infinity }}>{eq}</motion.div>)}
      </div>
      {popup && <div className="fixed bottom-4 right-4 max-w-xs border border-fuchsia-400 bg-black p-3 text-xs text-fuchsia-200"><p className="font-pixel blink">{popup}</p><button onClick={() => setPopup(null)} className="mt-2 border px-2">close</button></div>}
      {children}
    </div>
  );
}
