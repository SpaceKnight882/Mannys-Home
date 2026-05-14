export default function HomePage() {
  return (
    <main className="grid gap-4 md:grid-cols-2">
      <section className="border border-purple-400/40 bg-black/50 p-4">
        <h1 className="font-pixel text-sm text-cyan-300">Home Station</h1>
        <p className="mt-3 text-sm">A forgotten cosmic profile page from 2009. Click around for hidden wormholes and weird transmissions.</p>
        <p className="mt-3 blink text-xs text-pink-300">⚠ Spacecraft antivirus expired 6,203 days ago.</p>
      </section>
      <section className="border border-fuchsia-400/40 bg-black/50 p-4 text-xs">
        <h2 className="font-pixel">Signal Feed</h2>
        <ul className="mt-3 list-disc pl-4">
          <li>Guestbook currently accepting interstellar postcards.</li>
          <li>Click the black hole link if you dare.</li>
          <li>MIDI ambience toggle available in settings (coming soon).</li>
        </ul>
      </section>
    </main>
  );
}
