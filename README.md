# Manny's Home (Dynamic HTML + Upload + Lock)

## Features
- GIF background set to requested cosmic GIF.
- Password lock gate (`ecm-was here`).
- Music player supports URL songs + file uploads.
- Uploaded/added songs are saved in browser localStorage playlist.
- Two template-based layouts: `index.html` and `content.html`.

## Run
```bash
python3 -m http.server 8080 --directory static-site
```
Visit `http://localhost:8080/index.html`.
# Manny's Home — Retro Cosmic Personal Site

A Next.js + TypeScript retro spacecore personal website with chaotic 2009 vibes and Spotify music integration.

## Stack
- Next.js 14 + TypeScript
- Tailwind CSS
- Framer Motion
- Spotify Web API + Web Playback SDK-ready architecture

## Local setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env vars:
   ```bash
   cp .env.example .env.local
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

## Spotify OAuth PKCE setup
1. Create a Spotify app at Spotify Developer Dashboard.
2. Add redirect URI (for example `http://localhost:3000/music`).
3. Copy the Client ID into `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`.
4. Implement production token exchange from the browser PKCE flow (no client secret in frontend).
5. Never expose Spotify Client Secret in Next.js client code.

## Deployment (Vercel)
1. Push repository to GitHub.
2. Import project in Vercel.
3. Add environment variables from `.env.example` in Vercel project settings.
4. Deploy using default Next.js build command (`npm run build`).

## Notes
- Includes fallback Spotify iframe for cases where Web Playback SDK is unavailable.
- UI includes CRT scanlines, equations, fake popups, and retro web chaos.
