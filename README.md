# Manny's Haunted Cosmic Portal

Next.js + TypeScript retro-space website rebuilt in chaotic 2009 style.

## Setup
1. `npm install`
2. `cp .env.example .env`
3. `npx prisma generate`
4. `npm run dev`

## Features
- Password gate (`ecm-was here .`)
- Animated galaxy GIF background + CRT scanlines
- Left/right sidebar + center layout
- Floating equations and popup alerts
- Custom retro music player (URL-based now, MP3 upload via admin)
- Admin upload endpoint (`/api/upload`)
- Prisma schema for media, tracks, posts

## Deploy
- Vercel or any Node host.
- For persistence, use Postgres and object storage.
