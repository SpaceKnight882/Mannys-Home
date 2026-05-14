# Manny's Home Static Retro Site

## Run
```bash
cd static-site
npm install express multer
node server.js
```
Open http://localhost:3000/index.html

## Features
- Multi-page HTML site (`index.html`, `music.html`, `gallery.html`, `blog.html`, `pdfs.html`, `guestbook.html`, `links.html`, `admin.html`, `uploads.html`)
- Functional Express backend with persistent JSON storage in `/data`
- Multer upload system with category folders in `/uploads`
- Admin login gate (password: `ecm-was here .`) + session in localStorage
- Blog CRUD, file rename/delete, PDF listing and in-page viewer
- Music autoplay list from uploaded MP3s
- Gallery auto-load for images/GIFs
- Retro popup ads + scrolling marquee ads, configurable in admin

## Data files
- `data/blogs.json`
- `data/files.json`
- `data/ads.json`
