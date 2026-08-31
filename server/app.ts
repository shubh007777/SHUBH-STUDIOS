import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import dotenv from 'dotenv';
import {
  ensureDataDir,
  getVideos,
  addVideo,
  updateVideo,
  deleteVideo,
  getPhotos,
  addPhoto,
  deletePhoto,
  getSiteContent,
  saveSiteContent,
  toggleVideoVisibility,
  toggleVideoFeatured,
  toggleVideoPermanent,
  getAdminPasswordHash,
  saveAdminPasswordHash,
  getPgPool,
} from './db';
import { uploadMedia } from './storage';
import { VideoCategory } from '../src/types';

dotenv.config();

export const app = express();

// Initialize local data directories safely
ensureDataDir();

// Configuration from environment variables
const getJwtSecret = () => process.env.JWT_SECRET || 'shubh_travel_editor_portfolio_jwt_secret_key';
const getAdminEmail = () => process.env.ADMIN_EMAIL || 'kumarshubh8750@gmail.com';
const getDefaultAdminPassword = () => process.env.ADMIN_PASSWORD || 'Shubh@7053';

// CORS & Headers middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// JSON and URL-encoded body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Vercel Serverless Route Normalization middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  const original = req.headers['x-forwarded-uri'] || req.headers['x-matched-path'] || req.originalUrl || req.url;
  if (typeof original === 'string' && original.startsWith('/api')) {
    req.url = original.split('?')[0];
  } else if (req.url && !req.url.startsWith('/api') && req.url !== '/' && !req.url.startsWith('/uploads')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  next();
});

// Serve static uploaded files locally
const uploadsDir = path.join(process.cwd(), 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (_) {}
app.use('/uploads', express.static(uploadsDir));

// File upload setup using memory storage (supports Cloudinary, Vercel Blob, Database & Local Disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
});

// Authentication Middleware
export interface AuthenticatedRequest extends Request {
  user?: { email: string };
}

export function authenticateAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Unauthorized: Missing authentication token' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { email: string };
    const adminEmail = getAdminEmail();
    if (decoded.email.toLowerCase() !== adminEmail.toLowerCase()) {
      res.status(403).json({ success: false, error: 'Forbidden: Unauthorized account access' });
      return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
  }
}

// ================= API ROUTES =================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ success: true, status: 'healthy', timestamp: new Date().toISOString() });
});

// 1. Auth Routes
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required' });
      return;
    }

    const adminEmail = getAdminEmail();
    if (String(email).trim().toLowerCase() !== adminEmail.toLowerCase()) {
      res.status(401).json({ success: false, error: 'Invalid admin credentials' });
      return;
    }

    const defaultPass = getDefaultAdminPassword();
    const fallbackHash = bcrypt.hashSync(defaultPass, 10);
    const currentHash = await getAdminPasswordHash(fallbackHash);

    const isPasswordValid = bcrypt.compareSync(String(password), currentHash);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, error: 'Invalid admin credentials' });
      return;
    }

    const token = jwt.sign({ email: adminEmail }, getJwtSecret(), { expiresIn: '7d' });
    res.json({
      success: true,
      data: {
        email: adminEmail,
        token,
      },
    });
  } catch (error: any) {
    console.error('Error in /api/auth/login:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal login error' });
  }
});

app.get('/api/auth/me', authenticateAdmin, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      email: req.user?.email,
    },
  });
});

app.post('/api/auth/change-password', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, error: 'Current password and new password are required' });
      return;
    }

    const fallbackHash = bcrypt.hashSync(getDefaultAdminPassword(), 10);
    const currentHash = await getAdminPasswordHash(fallbackHash);

    if (!bcrypt.compareSync(currentPassword, currentHash)) {
      res.status(400).json({ success: false, error: 'Current password does not match' });
      return;
    }

    const newHash = bcrypt.hashSync(newPassword, 10);
    await saveAdminPasswordHash(newHash);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error: any) {
    console.error('Error in change-password:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to update password' });
  }
});

// 2. Public Video Routes
app.get('/api/videos', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const allVideos = await getVideos();
    let videos = allVideos.filter((v) => v.isPublished);

    if (category && category !== 'ALL') {
      videos = videos.filter((v) => v.category === (category as VideoCategory));
    }

    if (featured === 'true') {
      videos = videos.filter((v) => v.isFeatured);
    }

    res.json({ success: true, data: videos });
  } catch (error: any) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch videos' });
  }
});

app.get('/api/videos/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const videos = await getVideos();
    const video = videos.find((v) => v.id === id);

    if (!video || !video.isPublished) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    // Increment view count
    const updatedViews = (video.views || 0) + 1;
    await updateVideo(id, { views: updatedViews });

    res.json({ success: true, data: { ...video, views: updatedViews } });
  } catch (error: any) {
    console.error('Error fetching video by id:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch video' });
  }
});

// 3. Admin Video Routes
app.get('/api/admin/videos', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const videos = await getVideos();
    res.json({ success: true, data: videos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch admin videos' });
  }
});

app.post('/api/admin/videos', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { title, category, description, videoUrl, thumbnailUrl, isFeatured, isPublished, isPermanent, client, duration } = req.body;

    if (!title || !category || !videoUrl || !thumbnailUrl) {
      res.status(400).json({ success: false, error: 'Title, category, video URL, and thumbnail URL are required' });
      return;
    }

    const newVid = await addVideo({
      title,
      category,
      description: description || '',
      videoUrl,
      thumbnailUrl,
      isFeatured: Boolean(isFeatured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
      isPermanent: Boolean(isPermanent),
      client: client || '',
      duration: duration || '0:30',
    });

    res.status(201).json({ success: true, data: newVid });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to create video' });
  }
});

app.put('/api/admin/videos/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, category, description, videoUrl, thumbnailUrl, isFeatured, isPublished, isPermanent, client, duration } = req.body;

    const updated = await updateVideo(id, {
      ...(title !== undefined && { title }),
      ...(category !== undefined && { category }),
      ...(description !== undefined && { description }),
      ...(videoUrl !== undefined && { videoUrl }),
      ...(thumbnailUrl !== undefined && { thumbnailUrl }),
      ...(isFeatured !== undefined && { isFeatured: Boolean(isFeatured) }),
      ...(isPublished !== undefined && { isPublished: Boolean(isPublished) }),
      ...(isPermanent !== undefined && { isPermanent: Boolean(isPermanent) }),
      ...(client !== undefined && { client }),
      ...(duration !== undefined && { duration }),
    });

    if (!updated) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to update video' });
  }
});

app.delete('/api/admin/videos/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await deleteVideo(id);

    if (!success) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to delete video' });
  }
});

app.patch('/api/admin/videos/:id/toggle-visibility', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await toggleVideoVisibility(id);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to toggle visibility' });
  }
});

app.patch('/api/admin/videos/:id/toggle-featured', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await toggleVideoFeatured(id);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to toggle featured' });
  }
});

app.patch('/api/admin/videos/:id/toggle-permanent', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await toggleVideoPermanent(id);

    if (!updated) {
      res.status(404).json({ success: false, error: 'Video not found' });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to toggle permanent status' });
  }
});

// 4. Site Content Routes (Public & Admin)
app.get('/api/site-content', async (_req: Request, res: Response) => {
  try {
    const content = await getSiteContent();
    res.json({ success: true, data: content });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch site content' });
  }
});

app.get('/api/admin/site-content', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const content = await getSiteContent();
    res.json({ success: true, data: content });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch site content' });
  }
});

app.post('/api/admin/site-content', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const content = req.body;
    if (!content || typeof content !== 'object') {
      res.status(400).json({ success: false, error: 'Invalid content data provided' });
      return;
    }
    await saveSiteContent(content);
    res.json({ success: true, data: content, message: 'Site content updated successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to save site content' });
  }
});

// 5. Photos Routes (Public & Admin)
app.get('/api/photos', async (_req: Request, res: Response) => {
  try {
    const photos = await getPhotos();
    res.json({ success: true, data: photos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch photos' });
  }
});

app.get('/api/admin/photos', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const photos = await getPhotos();
    res.json({ success: true, data: photos });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch photos' });
  }
});

app.post('/api/admin/photos', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { url, title } = req.body;
    if (!url) {
      res.status(400).json({ success: false, error: 'Photo URL is required' });
      return;
    }
    const newPhoto = await addPhoto(url, title);
    res.status(201).json({ success: true, data: newPhoto });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to add photo' });
  }
});

app.delete('/api/admin/photos/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await deletePhoto(id);
    if (!deleted) {
      res.status(404).json({ success: false, error: 'Photo not found' });
      return;
    }
    res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to delete photo' });
  }
});

// 6. Admin Stats Route
app.get('/api/admin/stats', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const videos = await getVideos();
    const photos = await getPhotos();
    const stats = {
      totalVideos: videos.length,
      publishedVideos: videos.filter((v) => v.isPublished).length,
      hiddenVideos: videos.filter((v) => !v.isPublished).length,
      featuredVideos: videos.filter((v) => v.isFeatured).length,
      permanentVideos: videos.filter((v) => v.isPermanent).length,
      totalPhotos: photos.length,
    };
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message || 'Failed to fetch admin stats' });
  }
});

// 7. File Upload Endpoint (Vercel Blob, Cloudinary, Database & Local Storage)
app.post(
  '/api/upload',
  authenticateAdmin,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    try {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
      const targetFile = files?.file?.[0] || files?.thumbnail?.[0] || files?.video?.[0];

      if (!targetFile) {
        res.status(400).json({ success: false, error: 'No file uploaded' });
        return;
      }

      const originalName = targetFile.originalname || 'upload.bin';
      const result = await uploadMedia(targetFile.buffer, originalName, targetFile.mimetype);

      res.json({ success: true, url: result.url, provider: result.provider });
    } catch (error: any) {
      console.error('Upload endpoint error:', error);
      res.status(500).json({ success: false, error: error.message || 'File upload failed' });
    }
  }
);

// 8. Media Stream Endpoint for database-stored files
app.get('/api/media/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pool = getPgPool();
    if (!pool) {
      res.status(404).json({ success: false, error: 'Media not found' });
      return;
    }

    const queryRes = await pool.query('SELECT mimetype, data FROM media_store WHERE id = $1', [id]);
    if (queryRes.rows.length === 0) {
      res.status(404).json({ success: false, error: 'Media file not found' });
      return;
    }

    const { mimetype, data } = queryRes.rows[0];
    res.setHeader('Content-Type', mimetype);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    res.send(data);
  } catch (error: any) {
    console.error('Error serving database media:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve media file' });
  }
});

// Fallback for unmatched API routes
app.all('/api/*', (_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'API endpoint not found' });
});

export default app;
