const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const UPLOADS = path.join(ROOT, 'uploads');

const dirs = [
  'images','pdfs','music','blog','files','ads'
].map(d => path.join(UPLOADS, d));
[DATA_DIR, UPLOADS, ...dirs].forEach(d => fs.mkdirSync(d, { recursive: true }));

const dataFiles = {
  blogs: path.join(DATA_DIR, 'blogs.json'),
  files: path.join(DATA_DIR, 'files.json'),
  ads: path.join(DATA_DIR, 'ads.json')
};

function ensureJson(file, fallback) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify(fallback, null, 2));
}
ensureJson(dataFiles.blogs, { blogs: [] });
ensureJson(dataFiles.files, { images: [], pdfs: [], music: [], files: [] });
ensureJson(dataFiles.ads, { popups: [], scrolling: [], enabled: true });

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function writeJson(file, data) { fs.writeFileSync(file, JSON.stringify(data, null, 2)); }
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(UPLOADS));
app.use(express.static(ROOT));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = req.body.type || req.query.type || 'files';
    const map = { image: 'images', gif: 'images', pdf: 'pdfs', music: 'music', blog: 'blog', file: 'files', ads: 'ads' };
    const folder = map[type] || 'files';
    cb(null, path.join(UPLOADS, folder));
  },
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}_${safe}`);
  }
});
const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const category = req.body.category || req.query.category || 'files';
  const db = readJson(dataFiles.files);
  const key = ['images','pdfs','music','files'].includes(category) ? category : 'files';
  const item = { id: uid(), name: req.file.originalname, storedName: req.file.filename, url: `/uploads/${path.basename(path.dirname(req.file.path))}/${req.file.filename}`, date: new Date().toISOString(), metadata: req.body.metadata ? JSON.parse(req.body.metadata) : {} };
  db[key].push(item);
  writeJson(dataFiles.files, db);
  res.json(item);
});

app.get('/api/files', (req, res) => res.json(readJson(dataFiles.files)));
app.delete('/api/files/:category/:id', (req, res) => {
  const { category, id } = req.params;
  const db = readJson(dataFiles.files);
  if (!db[category]) return res.status(400).json({ error: 'bad category' });
  const item = db[category].find(x => x.id === id);
  db[category] = db[category].filter(x => x.id !== id);
  writeJson(dataFiles.files, db);
  if (item) {
    const fp = path.join(ROOT, item.url.replace(/^\//, ''));
    if (fs.existsSync(fp)) fs.unlinkSync(fp);
  }
  res.json({ ok: true });
});
app.patch('/api/files/:category/:id', (req,res)=>{
  const { category,id } = req.params; const { name } = req.body;
  const db=readJson(dataFiles.files); if(!db[category]) return res.status(400).json({error:'bad category'});
  const it=db[category].find(x=>x.id===id); if(!it) return res.status(404).json({error:'not found'});
  it.name=name||it.name; writeJson(dataFiles.files,db); res.json(it);
});

app.get('/api/blogs', (req, res) => res.json(readJson(dataFiles.blogs)));
app.post('/api/blogs', (req, res) => {
  const db = readJson(dataFiles.blogs);
  const post = { id: uid(), title: req.body.title, date: req.body.date || new Date().toISOString().slice(0,10), content: req.body.content, image: req.body.image || '', tags: req.body.tags || '' };
  db.blogs.unshift(post); writeJson(dataFiles.blogs, db); res.json(post);
});
app.put('/api/blogs/:id', (req,res)=>{ const db=readJson(dataFiles.blogs); const p=db.blogs.find(b=>b.id===req.params.id); if(!p) return res.status(404).json({error:'not found'}); Object.assign(p, req.body); writeJson(dataFiles.blogs, db); res.json(p);});
app.delete('/api/blogs/:id',(req,res)=>{const db=readJson(dataFiles.blogs); db.blogs=db.blogs.filter(b=>b.id!==req.params.id); writeJson(dataFiles.blogs,db); res.json({ok:true});});

app.get('/api/ads', (req,res)=> res.json(readJson(dataFiles.ads)));
app.post('/api/ads/popup', (req,res)=>{const db=readJson(dataFiles.ads); db.popups.push({id:uid(), enabled:true, ...req.body}); writeJson(dataFiles.ads,db); res.json(db);});
app.post('/api/ads/scrolling', (req,res)=>{const db=readJson(dataFiles.ads); db.scrolling.push({id:uid(), enabled:true, ...req.body}); writeJson(dataFiles.ads,db); res.json(db);});
app.delete('/api/ads/:type/:id',(req,res)=>{const db=readJson(dataFiles.ads); db[req.params.type]=db[req.params.type].filter(i=>i.id!==req.params.id); writeJson(dataFiles.ads,db); res.json(db);});
app.put('/api/ads',(req,res)=>{writeJson(dataFiles.ads,req.body); res.json(req.body);});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
