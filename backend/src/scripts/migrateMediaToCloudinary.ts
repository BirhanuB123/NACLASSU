/**
 * Bulk migration script for Cloudinary:
 * Uploads all images from frontend/public/images and documents from frontend/public/documents
 * directly to Cloudinary, then creates/syncs matching Photo and Document records in MongoDB.
 *
 * Usage (from backend directory):
 *   npm run migrate:cloudinary
 *
 * Features:
 * - Safe to re-run: .cloudinary-manifest.json tracks already migrated files and skips them.
 * - Handles rate-limiting and logs progress.
 * - Does not delete local files automatically — verify first, then delete.
 */
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(__dirname, '../../.env') });
// Also fallback check root .env / .env.local if needed
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../../../.env.local') });
}

import { uploadBufferToCloudinary } from '../config/cloudinary';
import Photo from '../models/Photo';
import DocumentModel from '../models/Document.model';

const MONGODB_URI = process.env.MONGODB_URI;
const IMAGES_DIR = path.join(__dirname, '../../../frontend/public/images');
const DOCUMENTS_DIR = path.join(__dirname, '../../../frontend/public/documents');
const MANIFEST_PATH = path.join(__dirname, '.cloudinary-manifest.json');

type Manifest = Record<string, { mongoId: string; url: string; publicId: string }>;

const loadManifest = (): Manifest => {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  } catch {
    return {};
  }
};

const saveManifest = (manifest: Manifest) => {
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
};

const humanize = (filename: string): string => {
  const withoutExt = filename.replace(/\.[^/.]+$/, '');
  return withoutExt.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
};

async function migrateImages(manifest: Manifest) {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.log('ℹ️ No frontend/public/images directory found, skipping images.');
    return { uploaded: 0, skipped: 0, failed: 0 };
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f));
  
  console.log(`🔍 Found ${files.length} images to process...`);
  let uploaded = 0,
    skipped = 0,
    failed = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const key = `images/${filename}`;

    if (manifest[key]) {
      skipped++;
      continue;
    }

    try {
      const buffer = fs.readFileSync(path.join(IMAGES_DIR, filename));
      const { url, publicId } = await uploadBufferToCloudinary(
        buffer,
        filename,
        'nassu/gallery',
        'image'
      );

      const photo = await Photo.create({
        title: humanize(filename),
        category: 'gallery',
        url,
        storagePath: publicId,
      });

      manifest[key] = { mongoId: photo.id, url, publicId };
      saveManifest(manifest);
      uploaded++;
      console.log(`[${i + 1}/${files.length}] ✅ Image uploaded: ${filename} -> ${url}`);
    } catch (error) {
      console.error(
        `[${i + 1}/${files.length}] ❌ Failed to migrate image ${filename}:`,
        error instanceof Error ? error.message : error
      );
      failed++;
    }
  }

  return { uploaded, skipped, failed };
}

async function migrateDocuments(manifest: Manifest) {
  if (!fs.existsSync(DOCUMENTS_DIR)) {
    console.log('ℹ️ No frontend/public/documents directory found, skipping documents.');
    return { uploaded: 0, skipped: 0, failed: 0 };
  }

  const files = fs
    .readdirSync(DOCUMENTS_DIR)
    .filter((f) => /\.(pdf|docx?|txt)$/i.test(f));

  console.log(`🔍 Found ${files.length} documents to process...`);
  let uploaded = 0,
    skipped = 0,
    failed = 0;

  for (let i = 0; i < files.length; i++) {
    const filename = files[i];
    const key = `documents/${filename}`;

    if (manifest[key]) {
      skipped++;
      continue;
    }

    try {
      const buffer = fs.readFileSync(path.join(DOCUMENTS_DIR, filename));
      const { url, publicId } = await uploadBufferToCloudinary(
        buffer,
        filename,
        'nassu/documents',
        'raw'
      );

      const doc = await DocumentModel.create({
        title: humanize(filename),
        category: 'general',
        fileType: 'pdf',
        url,
        storagePath: publicId,
      });

      manifest[key] = { mongoId: doc.id, url, publicId };
      saveManifest(manifest);
      uploaded++;
      console.log(`[${i + 1}/${files.length}] ✅ Document uploaded: ${filename} -> ${url}`);
    } catch (error) {
      console.error(
        `[${i + 1}/${files.length}] ❌ Failed to migrate document ${filename}:`,
        error instanceof Error ? error.message : error
      );
      failed++;
    }
  }

  return { uploaded, skipped, failed };
}

async function run() {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not set in backend/.env or .env.local');
    process.exit(1);
  }

  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error(
      '❌ Cloudinary credentials are missing! Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.'
    );
    process.exit(1);
  }

  console.log('🔌 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected to MongoDB successfully\n');

  const manifest = loadManifest();

  console.log('📸 Migrating images to Cloudinary...');
  const imageResult = await migrateImages(manifest);

  console.log('\n📄 Migrating documents to Cloudinary...');
  const docResult = await migrateDocuments(manifest);

  console.log('\n================ Migration Summary ================');
  console.log(
    `📸 Images:    ${imageResult.uploaded} uploaded, ${imageResult.skipped} skipped (already migrated), ${imageResult.failed} failed`
  );
  console.log(
    `📄 Documents: ${docResult.uploaded} uploaded, ${docResult.skipped} skipped (already migrated), ${docResult.failed} failed`
  );
  console.log('====================================================\n');

  await mongoose.connection.close();
  console.log('🎉 Migration completed.');
  process.exit(0);
}

run().catch((error) => {
  console.error('💥 Migration encountered an unhandled error:', error);
  process.exit(1);
});
