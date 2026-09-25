import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'public');

async function processProfileIcon() {
  const iconSrc = path.join(rootDir, 'profile icon.png');
  if (!fs.existsSync(iconSrc)) {
    console.error('profile icon.png not found');
    return;
  }

  console.log('Processing profile icon.png without cropping...');

  // Make square 512x512 with fit: 'contain' and transparent background
  // This preserves 100% of the original image without any crop
  const baseSquare = await sharp(iconSrc)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  // Save full-res square png in public
  fs.writeFileSync(path.join(publicDir, 'profile-icon.png'), baseSquare);
  console.log('✓ Saved public/profile-icon.png (512x512 contain, no crop)');

  // Generate apple-touch-icon (180x180)
  // Apple touch icons standardly need a solid/soft background or clean look
  await sharp(baseSquare)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  await sharp(baseSquare)
    .resize(180, 180)
    .webp({ quality: 95 })
    .toFile(path.join(publicDir, 'apple-touch-icon.webp'));
  console.log('✓ Saved apple-touch-icon.png and apple-touch-icon.webp (180x180)');

  // Generate 192x192 and 512x512
  await sharp(baseSquare)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'icon-192.png'));

  await sharp(baseSquare)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'icon-512.png'));

  // Generate standard favicons: 16x16, 32x32, 48x48
  await sharp(baseSquare)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  await sharp(baseSquare)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // Generate multi-size favicon.ico (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const pngBuffers = [];
  for (const s of icoSizes) {
    const buf = await sharp(baseSquare).resize(s, s).png().toBuffer();
    pngBuffers.push({ size: s, buffer: buf });
  }

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  let offset = 6 + (16 * pngBuffers.length);
  const entries = [];
  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 0);
    entry.writeUInt8(item.size >= 256 ? 0 : item.size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(item.buffer.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += item.buffer.length;
  }

  const icoBuffer = Buffer.concat([header, ...entries, ...pngBuffers.map(p => p.buffer)]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✓ Saved multi-resolution public/favicon.ico');
}

processProfileIcon().catch(console.error);
