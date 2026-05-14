import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 });
  const bytes = Buffer.from(await file.arrayBuffer());
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await mkdir(dir, { recursive: true });
  const safe = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  await writeFile(path.join(dir, safe), bytes);
  return NextResponse.json({ url: `/uploads/${safe}` });
}
