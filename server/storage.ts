import path from 'path';
import fs from 'fs';
import { put } from '@vercel/blob';
import { v2 as cloudinary } from 'cloudinary';
import { getPgPool } from './db';

// Configure Cloudinary if credentials exist
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
  });
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export interface UploadResult {
  url: string;
  provider: 'blob' | 'cloudinary' | 'database' | 'local';
}

/**
 * Uploads a file buffer to the best available persistent storage.
 * Priority:
 * 1. Vercel Blob (BLOB_READ_WRITE_TOKEN)
 * 2. Cloudinary (CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME)
 * 3. PostgreSQL Database (DATABASE_URL -> media_store table)
 * 4. Local Disk (/uploads)
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  originalName: string,
  mimetype: string
): Promise<UploadResult> {
  const ext = path.extname(originalName) || (mimetype.startsWith('video') ? '.mp4' : '.jpg');
  const cleanBaseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const uniqueFileName = `${cleanBaseName}-${Date.now()}${ext}`;

  // 1. Check Vercel Blob
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const blob = await put(`uploads/${uniqueFileName}`, fileBuffer, {
        access: 'public',
        contentType: mimetype,
      });
      return { url: blob.url, provider: 'blob' };
    } catch (err) {
      console.error('Vercel Blob upload failed, attempting next provider:', err);
    }
  }

  // 2. Check Cloudinary
  const hasCloudinary =
    Boolean(process.env.CLOUDINARY_URL) ||
    (Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET));

  if (hasCloudinary) {
    try {
      const isVideo = mimetype.startsWith('video');
      const uploadPromise = new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'portfolio_uploads',
            resource_type: isVideo ? 'video' : 'image',
            public_id: path.basename(uniqueFileName, ext),
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error('Cloudinary upload returned empty result'));
            }
            resolve(result.secure_url);
          }
        );
        stream.end(fileBuffer);
      });

      const url = await uploadPromise;
      return { url, provider: 'cloudinary' };
    } catch (err) {
      console.error('Cloudinary upload failed, attempting next provider:', err);
    }
  }

  // 3. Check PostgreSQL Database Media Store
  const pool = getPgPool();
  if (pool) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS media_store (
          id VARCHAR(128) PRIMARY KEY,
          filename VARCHAR(255) NOT NULL,
          mimetype VARCHAR(128) NOT NULL,
          data BYTEA NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      const fileId = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      await pool.query(
        'INSERT INTO media_store (id, filename, mimetype, data) VALUES ($1, $2, $3, $4)',
        [fileId, uniqueFileName, mimetype, fileBuffer]
      );

      return { url: `/api/media/${fileId}`, provider: 'database' };
    } catch (err) {
      console.error('Database media upload failed, falling back to local disk:', err);
    }
  }

  // 4. Local Disk Fallback
  const localUploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(localUploadsDir)) {
    fs.mkdirSync(localUploadsDir, { recursive: true });
  }
  const localFilePath = path.join(localUploadsDir, uniqueFileName);
  fs.writeFileSync(localFilePath, fileBuffer);

  return { url: `/uploads/${uniqueFileName}`, provider: 'local' };
}
