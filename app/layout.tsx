import './globals.css';
import type { Metadata } from 'next';
import { SiteShell } from '@/components/SiteShell';

export const metadata: Metadata = {
  title: 'Manny\'s Cosmic Home',
  description: 'Retro spacecore personal site with Spotify player.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="scanline">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
