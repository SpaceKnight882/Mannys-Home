import './globals.css';
import { SiteShell } from '@/components/SiteShell';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang='en'><body><SiteShell>{children}</SiteShell></body></html>;
}
