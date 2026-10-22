import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const certsDir = path.join(publicDir, 'cirtificats');

async function optimizeImages() {
  console.log('--- Preserving Original Full-Quality Profile Image ---');
  let profileSrc = path.join(__dirname, 'new profile.png');
  if (!fs.existsSync(profileSrc)) {
    profileSrc = path.join(__dirname, 'profile pic.png');
  }
  if (!fs.existsSync(profileSrc)) {
    profileSrc = path.join(__dirname, 'profile.png');
  }
  if (!fs.existsSync(profileSrc)) {
    profileSrc = path.join(publicDir, 'profile.png');
  }
  if (!fs.existsSync(profileSrc)) {
    profileSrc = path.join(publicDir, 'profile.webp');
  }
  if (fs.existsSync(profileSrc)) {
    // Copy original image
    if (profileSrc !== path.join(publicDir, 'profile.png') && fs.existsSync(profileSrc) && profileSrc.endsWith('.png')) {
      fs.copyFileSync(profileSrc, path.join(publicDir, 'profile.png'));
    }
    // Generate lossless / high-quality full resolution profile.webp
    await sharp(profileSrc)
      .webp({ lossless: true, effort: 6 })
      .toFile(path.join(publicDir, 'profile.webp'));

    // Remove any resized / low-quality variants
    const lowQualityFiles = [
      'profile-400.webp', 'profile-400.avif',
      'profile-760.webp', 'profile-760.avif',
      'profile-1000.webp', 'profile-1000.avif'
    ];
    for (const file of lowQualityFiles) {
      const p = path.join(publicDir, file);
      if (fs.existsSync(p)) fs.unlinkSync(p);
    }
    console.log('✓ Kept original full-resolution profile image');
  }

  const profileIconSrc = path.join(__dirname, 'profile icon.png');
  if (fs.existsSync(profileIconSrc)) {
    const iconSizes = [
      { name: 'favicon-16x16.png', size: 16 },
      { name: 'favicon-32x32.png', size: 32 },
      { name: 'favicon-48x48.png', size: 48 },
      { name: 'favicon-96x96.png', size: 96 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'icon-192.png', size: 192 },
      { name: 'icon-512.png', size: 512 },
      { name: 'profile-icon.png', size: 512 }
    ];
    for (const icon of iconSizes) {
      await sharp(profileIconSrc)
        .resize(icon.size, icon.size, { fit: 'cover' })
        .png({ compressionLevel: 9 })
        .toFile(path.join(publicDir, icon.name));
    }
    fs.copyFileSync(path.join(publicDir, 'favicon-32x32.png'), path.join(publicDir, 'favicon.ico'));
    console.log('✓ Generated profile face favicons (16, 32, 48, 96, 180, 192, 512, ico)');
  }

  console.log('--- Optimizing Chatbot Image ---');
  const chatbotSrc = path.join(publicDir, 'chatbot.webp');
  if (fs.existsSync(chatbotSrc)) {
    const chatbotImg = sharp(chatbotSrc);
    const meta = await chatbotImg.metadata();
    const aspect = (meta.height && meta.width) ? meta.height / meta.width : 1.1;

    await sharp(chatbotSrc)
      .resize(80, Math.round(80 * aspect), { fit: 'inside' })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, 'chatbot-80.webp'));

    await sharp(chatbotSrc)
      .resize(80, Math.round(80 * aspect), { fit: 'inside' })
      .avif({ quality: 75, effort: 6 })
      .toFile(path.join(publicDir, 'chatbot-80.avif'));

    await sharp(chatbotSrc)
      .resize(160, Math.round(160 * aspect), { fit: 'inside' })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, 'chatbot-160.webp'));

    await sharp(chatbotSrc)
      .resize(160, Math.round(160 * aspect), { fit: 'inside' })
      .avif({ quality: 75, effort: 6 })
      .toFile(path.join(publicDir, 'chatbot-160.avif'));

    console.log('✓ Generated chatbot-80, chatbot-160 (webp + avif)');
  }

  console.log('--- Optimizing Root Certificate if present ---');
  const rootCert = path.join(__dirname, 'certificate pgdca.jpg');
  if (fs.existsSync(rootCert)) {
    if (!fs.existsSync(certsDir)) {
      fs.mkdirSync(certsDir, { recursive: true });
    }
    const destJpg = path.join(certsDir, 'PG-DCA Diploma in Computer Application — IACT.jpg');
    fs.copyFileSync(rootCert, destJpg);
    console.log('✓ Copied certificate pgdca.jpg to public/cirtificats/');
  }

  console.log('--- Optimizing Certificates in public/cirtificats/ ---');
  if (fs.existsSync(certsDir)) {
    const certFiles = fs.readdirSync(certsDir);
    for (const file of certFiles) {
      if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
        const inputPath = path.join(certsDir, file);
        const ext = path.extname(file);
        const basename = path.basename(file, ext);
        const outputPath = path.join(certsDir, `${basename}.webp`);

        try {
          await sharp(inputPath)
            .resize(600, null, { withoutEnlargement: true, fit: 'inside' })
            .webp({ quality: 75, effort: 5 })
            .toFile(outputPath);
          console.log(`✓ Compressed certificate: ${basename}.webp`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err);
        }
      }
    }
  }

  console.log('--- Optimizing Project WebP images & Thumbnails ---');
  const casesightSrc = path.join(__dirname, 'casesight image.png');
  if (fs.existsSync(casesightSrc)) {
    await sharp(casesightSrc)
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(publicDir, 'casesight-new.webp'));
    console.log('✓ Synced casesight image.png to public/casesight-new.webp');
  }
  const files = fs.readdirSync(publicDir);
  const projectImages = [
    'casesight-new.webp',
    'ai-architecture-generator.webp',
    'medigu.webp',
    'detect-fruit-vegetable.webp',
    'restaurant-hero.webp',
    'portfolio-website.webp',
    'heavydutyparts-shop.webp',
    'padamacinematic.webp',
    'cyberguard-platform.webp'
  ];

  for (const pImg of projectImages) {
    const inputPath = path.join(publicDir, pImg);
    if (fs.existsSync(inputPath)) {
      const ext = path.extname(pImg);
      const basename = path.basename(pImg, ext);
      const thumbPath = path.join(publicDir, `${basename}-thumb.webp`);
      try {
        await sharp(inputPath)
          .resize(600, null, { withoutEnlargement: true, fit: 'inside' })
          .webp({ quality: 80, effort: 5 })
          .toFile(thumbPath);
        console.log(`✓ Created thumbnail: ${basename}-thumb.webp`);
      } catch (err) {
        console.error(`Error thumbnailing ${pImg}:`, err);
      }
    }
  }

  for (const file of files) {
    if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg')) {
      const inputPath = path.join(publicDir, file);
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(publicDir, `${basename}.webp`);
      
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Converted ${file} to ${basename}.webp`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }

  console.log('--- Optimization Complete ---');
}

optimizeImages();
