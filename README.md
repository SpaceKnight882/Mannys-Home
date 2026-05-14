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
