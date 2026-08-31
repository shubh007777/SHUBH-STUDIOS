import fs from 'fs';
import path from 'path';
import pg from 'pg';
import { VideoItem, PhotoItem, SiteContent } from '../src/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const PHOTOS_FILE = path.join(DATA_DIR, 'photos.json');
const SITE_CONTENT_FILE = path.join(DATA_DIR, 'siteContent.json');
const ADMIN_FILE = path.join(DATA_DIR, 'admin.json');

export const INITIAL_SITE_CONTENT: SiteContent = {
  hero: {
    statusBadge: 'Available for Travel Brands & Reels Editing',
    subtitle: 'TRAVEL VIDEO EDITOR & ADS CREATOR',
    heading: 'SHUBH',
    description: 'I turn travel footage into cinematic stories, engaging reels and high-converting promotional videos.',
    buttonWorkText: 'VIEW MY WORK',
    buttonContactText: "LET'S WORK TOGETHER",
    stat1Value: '50M+',
    stat1Label: 'Reels & Ads Views',
    stat2Value: '250+',
    stat2Label: 'Cinematic Edits',
    stat3Value: '100%',
    stat3Label: 'Client Satisfaction',
  },
  selectedWork: {
    eyebrow: 'PORTFOLIO SHOWCASE',
    heading: 'SELECTED WORK',
    subtitle: 'A curated collection of cinematic travel reels, brand advertisements, and promotional video edits.',
  },
  about: {
    eyebrow: '★ CINEMATIC STORYTELLER & ADS STRATEGIST',
    heading: 'THE VISION BEHIND THE CUTS',
    bioParagraph1: 'I am Shubh, a travel video editor and commercial ads creator specializing in turning raw footage into high-converting, visually breathtaking travel reels & campaigns.',
    bioParagraph2: 'Whether editing fast-paced viral Instagram Reels, luxury resort promo videos, or high-ROAS social media video ads for travel brands & tourism boards, my edits are meticulously engineered with frame-accurate beat matching, multi-layered sound design, bespoke 4K color profiles, and psychological hook structures.',
    feature1Title: 'Retention Hook Engineering',
    feature1Desc: 'Capturing viewer focus in the first 1.5s with punchy cuts, audio risers, and sound SFX.',
    feature2Title: '4K HDR Color Grading',
    feature2Desc: 'Custom cinematic color palettes (Moody Alpine, Tropical Glow, Teal & Orange) tailored to brands.',
    feature3Title: 'Immersive Soundscapes',
    feature3Desc: 'Atmospheric ambient audio, swooshes, risers, and beat-synced rhythm cuts for maximum impact.',
    feature4Title: 'Commercial Video Ads',
    feature4Desc: 'Converting ad edits for luxury resorts, travel agencies, and tour operators to boost bookings.',
  },
  travelCompanies: {
    eyebrow: '★ CLIENT COLLABORATIONS',
    heading: 'TRAVEL COMPANIES I HAVE COLLABORATED WITH',
    subtitle: 'Proudly editing high-converting commercial promo videos, destination reels & tour campaigns for global travel agencies, luxury resorts, and adventure tour operators.',
    items: [
      {
        id: 'company-1',
        name: 'Alpine Treks & Expeditions',
        badge: 'EXPEDITION & REELS',
        location: 'Swiss Alps & Himalayas',
        description: 'Edited 12 viral promo reels and cinematic trailers highlighting high-altitude summit tours with frame-accurate beat cuts.',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
        companyUrl: 'https://instagram.com',
      },
      {
        id: 'company-2',
        name: 'Tropical Horizon Resorts',
        badge: 'LUXURY RESORT ADS',
        location: 'Bali & Maldives',
        description: 'Custom 4K color-graded commercial promotional videos for beachfront luxury villas, spa retreats, and sunset cruises.',
        imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
        companyUrl: 'https://instagram.com',
      },
      {
        id: 'company-3',
        name: 'Wanderlust Travel Co.',
        badge: 'COMMERCIAL AD CAMPAIGN',
        location: 'Global Tour Operators',
        description: 'Crafted high-retention Facebook & Instagram video ads driving over 350+ direct group tour bookings with strong CTA hooks.',
        imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
        companyUrl: 'https://instagram.com',
      },
      {
        id: 'company-4',
        name: 'Coastal FPV Drone Safaris',
        badge: 'AERIAL DYNAMIC EDITS',
        location: 'Amalfi Coast, Italy',
        description: 'Seamless FPV drone transition cuts, atmospheric sound design, and speed ramps for ocean excursion campaigns.',
        imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        companyUrl: 'https://instagram.com',
      },
    ],
  },
  instagram: {
    eyebrow: '★ OFFICIAL INSTAGRAM HANDLES',
    heading: 'MY INSTAGRAM ACCOUNTS — SEE MY WORK LIVE',
    subtitle: 'Follow my latest daily cuts, reel breakdowns, and client ad campaigns directly on Instagram.',
    qualityNotice: 'Note: Followers are currently growing, but video quality, retention rates & viral reach are exceptionally high!',
    account1: {
      name: 'Shubh | Travel Video Editor',
      handle: '@shubh.travels',
      bio: 'Main Instagram channel dedicated to cinematic travel edits, high-energy beat sync reels, atmospheric sound design breakdowns, and 4K color grading samples.',
      link: 'https://instagram.com',
      badge: '★ 1.2M+ Reach',
    },
    account2: {
      name: 'Shubh Ads | Resort Promos',
      handle: '@shubh.ads',
      bio: 'Dedicated commercial Instagram page featuring high-converting social media video ads for luxury resorts, travel agencies, tour operators & lifestyle brands.',
      link: 'https://instagram.com',
      badge: '★ High ROAS Ads',
    },
  },
  services: {
    eyebrow: 'EXPERT CAPABILITIES',
    heading: 'CRAFTED FOR IMPACT',
    subtitle: 'Tailored video editing services designed to transform raw travel footage into magnetic visual experiences.',
    items: [
      {
        id: 'travel-reels',
        title: 'TRAVEL REELS',
        subtitle: 'Viral Short-Form Content',
        description: 'Cinematic and engaging Instagram reels and TikToks tailored specifically for travel pages, digital nomads, and creators.',
        tags: ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'Dynamic Transitions'],
      },
      {
        id: 'travel-ads',
        title: 'TRAVEL ADS',
        subtitle: 'High-Converting Campaigns',
        description: 'Promotional advertisements designed for travel agencies, luxury hotels, eco-resorts, and tourism boards to maximize booking conversions.',
        tags: ['Facebook & IG Ads', 'Resort Promos', 'Tour Operator Ads', 'CTA Strategy'],
      },
      {
        id: 'cinematic-editing',
        title: 'CINEMATIC EDITING',
        subtitle: 'Bespoke Film & Storytelling',
        description: 'Professional storytelling, frame pacing, seamless match-cuts, immersive sound design, ambient audio mixing and custom color grading.',
        tags: ['4K/8K Editing', 'Color Grading', 'SFX & Soundscapes', 'Speed Ramping'],
      },
      {
        id: 'social-media-content',
        title: 'SOCIAL MEDIA CONTENT',
        subtitle: 'Platform Optimization',
        description: 'Short-form video content engineered and re-formatted specifically across platforms for maximum reach, watch time and retention.',
        tags: ['Multi-Format Export', 'Engaging Captions', 'Hook Testing', 'Content Batching'],
      },
    ],
  },
  reviews: {
    eyebrow: '★ CLIENT TESTIMONIALS & FEEDBACK',
    heading: 'WHAT MY TRAVEL CLIENTS SAY',
    subtitle: 'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.',
    items: [
      {
        id: 'review-1',
        clientName: 'Markus Vance',
        clientTitle: 'Expedition Director, Alpine Treks',
        clientPicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        reviewText: 'Shubh turned our raw GoPro and drone footage into viral Instagram Reels that generated over 40+ direct tour inquiries in just 2 weeks. His beat matching and color grading are top tier!',
        projectBadge: 'EXPEDITION REELS',
        videoUrl: 'https://instagram.com',
      },
      {
        id: 'review-2',
        clientName: 'Sophia Lin',
        clientTitle: 'Marketing Director, Tropical Horizon Bali',
        clientPicUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        reviewText: 'The promotional ad campaign video Shubh edited for our luxury resort villas delivered our highest ROAS ever on Meta Ads. The sound design made the video feel like a high-end luxury movie trailer.',
        projectBadge: 'COMMERCIAL AD',
        videoUrl: 'https://instagram.com',
      },
      {
        id: 'review-3',
        clientName: 'Rohan & Priya',
        clientTitle: 'Travel Creators (500K+ Reach)',
        clientPicUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
        rating: 5,
        reviewText: 'Finding an editor who understands frame pacing, hook retention, and aesthetic color grading is so rare. Shubh consistently delivers 4K reels that hit 100K+ views within hours!',
        projectBadge: 'VIRAL REELS',
        videoUrl: 'https://instagram.com',
      },
    ],
  },
  contact: {
    eyebrow: 'START A PROJECT',
    heading: "LET'S CREATE SOMETHING PEOPLE WANT TO WATCH.",
    subtitle: 'Have travel footage that deserves a better story?',
    email: 'kumarshubh8750@gmail.com',
    phone: '+91 8178306611',
    whatsapp: '8178306611',
    whatsappMessage: 'Hi Shubh, I saw your portfolio and want to discuss a travel video editing project!',
    formspreeUrl: 'https://formspree.io/f/xnparlyz',
    instagram1Handle: '@wonderwithshuuu',
    instagram1Url: 'https://instagram.com/wonderwithshuuu',
    instagram2Handle: '@roamwithakshay',
    instagram2Url: 'https://instagram.com/roamwithakshay',
    responseTimeText: 'Typical response time: Within 15–30 mins on WhatsApp',
  },
};

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    title: 'Alpine Cinematic Shoot',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    title: 'Studio Suite & Color Grading',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    title: 'Resort & Nature Videography',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    title: 'FPV Drone Aerial Shots',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    title: 'Audio Sound Design Bay',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    title: 'Expedition Videography',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'photo-7',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    title: 'Night Commercial Ads Shoot',
    createdAt: new Date().toISOString(),
  },
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Swiss Alps Cinematic Odyssey',
    category: 'TRAVEL REELS',
    description: 'A fast-paced, rhythmic reel capturing aerial vistas, alpine lakes, and foggy mountain peaks with custom sound design and dynamic speed ramps.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    isPermanent: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    views: 14200,
    duration: '0:30',
    client: 'Swiss Tourism Co.'
  },
  {
    id: 'vid-2',
    title: 'Bali Island Luxury Resort Promo',
    category: 'TRAVEL ADS',
    description: 'High-converting promotional video advertisement designed for luxury villa rentals and eco-resorts in Ubud, Bali.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    isPermanent: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    views: 28500,
    duration: '0:45',
    client: 'Maya Resort Bali'
  },
  {
    id: 'vid-3',
    title: 'Tokyo Nights & Neon Alleyways',
    category: 'TRAVEL REELS',
    description: 'Atmospheric short-form reel highlighting Shibuya crossings, street food markets, and Tokyo night vibes with punchy sound edits.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 18).toISOString(),
    views: 45000,
    duration: '0:25',
    client: 'Japan Travel Creator'
  },
  {
    id: 'vid-4',
    title: 'Icelandic Waterfalls & Glacier Expedition',
    category: 'PROMOTIONAL VIDEOS',
    description: 'Cinematic commercial edit showcasing expedition gear and rugged beauty across sub-zero Icelandic landscapes.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=1200&q=80',
    isFeatured: true,
    isPublished: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
    views: 19800,
    duration: '1:00',
    client: 'Nordic Outdoor Co.'
  },
  {
    id: 'vid-5',
    title: 'Amalfi Coast Yacht Summer Experience',
    category: 'TRAVEL ADS',
    description: 'Commercial travel ad highlighting luxury boutique yacht charters along picturesque southern Italian cliffs.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    isPublished: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    views: 8900,
    duration: '0:35',
    client: 'Amalfi Coast Voyages'
  },
  {
    id: 'vid-6',
    title: 'Dubai Sands & Futuristic Horizons',
    category: 'TRAVEL REELS',
    description: 'Seamless transitions and cinematic color grading through golden desert dunes and world-class architectural wonders.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    isFeatured: false,
    isPublished: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 40).toISOString(),
    views: 31200,
    duration: '0:28',
    client: 'Visit Dubai'
  }
];

// In-memory runtime cache for serverless speed & robustness
let memoryStore: {
  videos: VideoItem[] | null;
  photos: PhotoItem[] | null;
  siteContent: SiteContent | null;
  adminPasswordHash: string | null;
} = {
  videos: null,
  photos: null,
  siteContent: null,
  adminPasswordHash: null,
};

// PostgreSQL Connection Pool (for Vercel Postgres, Neon, Supabase, Railway, etc.)
let pgPool: pg.Pool | null = null;
let pgInitialized = false;

export function getPgPool(): pg.Pool | null {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRES_PRISMA_URL;

  if (!connectionString) {
    return null;
  }

  if (!pgPool) {
    pgPool = new pg.Pool({
      connectionString,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pgPool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });
  }

  return pgPool;
}

async function initPostgresTables(pool: pg.Pool): Promise<void> {
  if (pgInitialized) return;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_store (
        key VARCHAR(64) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
    pgInitialized = true;
  } catch (err) {
    console.error('Failed to initialize PostgreSQL portfolio_store table:', err);
  }
}

// Local filesystem fallback helpers
export function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_VIDEOS, null, 2), 'utf-8');
    }
    if (!fs.existsSync(PHOTOS_FILE)) {
      fs.writeFileSync(PHOTOS_FILE, JSON.stringify(INITIAL_PHOTOS, null, 2), 'utf-8');
    }
    if (!fs.existsSync(SITE_CONTENT_FILE)) {
      fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(INITIAL_SITE_CONTENT, null, 2), 'utf-8');
    }
  } catch (_) {
    // Read-only filesystem on serverless
  }
}

// ================= Site Content =================
export async function getSiteContent(): Promise<SiteContent> {
  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      const res = await pool.query('SELECT value FROM portfolio_store WHERE key = $1', ['site_content']);
      if (res.rows.length > 0 && res.rows[0].value) {
        memoryStore.siteContent = {
          ...INITIAL_SITE_CONTENT,
          ...res.rows[0].value,
        };
        return memoryStore.siteContent!;
      }
      // Seed initial content to Postgres
      await pool.query(
        'INSERT INTO portfolio_store (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
        ['site_content', JSON.stringify(INITIAL_SITE_CONTENT)]
      );
      memoryStore.siteContent = INITIAL_SITE_CONTENT;
      return INITIAL_SITE_CONTENT;
    } catch (err) {
      console.error('Postgres error in getSiteContent:', err);
    }
  }

  // Memory cache check
  if (memoryStore.siteContent) {
    return memoryStore.siteContent;
  }

  // File system fallback
  ensureDataDir();
  try {
    if (fs.existsSync(SITE_CONTENT_FILE)) {
      const raw = fs.readFileSync(SITE_CONTENT_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryStore.siteContent = {
        ...INITIAL_SITE_CONTENT,
        ...parsed,
      };
      return memoryStore.siteContent;
    }
  } catch (err) {
    console.warn('Filesystem read error for siteContent, using initial:', err);
  }

  memoryStore.siteContent = INITIAL_SITE_CONTENT;
  return INITIAL_SITE_CONTENT;
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  memoryStore.siteContent = content;

  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      await pool.query(
        'INSERT INTO portfolio_store (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
        ['site_content', JSON.stringify(content)]
      );
      return;
    } catch (err) {
      console.error('Postgres error in saveSiteContent:', err);
    }
  }

  try {
    ensureDataDir();
    fs.writeFileSync(SITE_CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Filesystem write error (ignorable on serverless):', err);
  }
}

// ================= Photos =================
export async function getPhotos(): Promise<PhotoItem[]> {
  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      const res = await pool.query('SELECT value FROM portfolio_store WHERE key = $1', ['photos']);
      if (res.rows.length > 0 && Array.isArray(res.rows[0].value)) {
        memoryStore.photos = res.rows[0].value;
        return memoryStore.photos!;
      }
      // Seed initial photos
      await pool.query(
        'INSERT INTO portfolio_store (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
        ['photos', JSON.stringify(INITIAL_PHOTOS)]
      );
      memoryStore.photos = INITIAL_PHOTOS;
      return INITIAL_PHOTOS;
    } catch (err) {
      console.error('Postgres error in getPhotos:', err);
    }
  }

  if (memoryStore.photos) {
    return memoryStore.photos;
  }

  ensureDataDir();
  try {
    if (fs.existsSync(PHOTOS_FILE)) {
      const raw = fs.readFileSync(PHOTOS_FILE, 'utf-8');
      memoryStore.photos = JSON.parse(raw) as PhotoItem[];
      return memoryStore.photos;
    }
  } catch (err) {
    console.warn('Filesystem read error for photos:', err);
  }

  memoryStore.photos = INITIAL_PHOTOS;
  return INITIAL_PHOTOS;
}

export async function savePhotos(photos: PhotoItem[]): Promise<void> {
  memoryStore.photos = photos;

  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      await pool.query(
        'INSERT INTO portfolio_store (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
        ['photos', JSON.stringify(photos)]
      );
      return;
    } catch (err) {
      console.error('Postgres error in savePhotos:', err);
    }
  }

  try {
    ensureDataDir();
    fs.writeFileSync(PHOTOS_FILE, JSON.stringify(photos, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Filesystem write error (ignorable on serverless):', err);
  }
}

export async function addPhoto(url: string, title?: string): Promise<PhotoItem> {
  const photos = await getPhotos();
  const newPhoto: PhotoItem = {
    id: `photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    url,
    title: title || '',
    createdAt: new Date().toISOString(),
  };
  const updated = [newPhoto, ...photos];
  await savePhotos(updated);
  return newPhoto;
}

export async function deletePhoto(id: string): Promise<boolean> {
  const photos = await getPhotos();
  const filtered = photos.filter((p) => p.id !== id);
  if (filtered.length === photos.length) return false;
  await savePhotos(filtered);
  return true;
}

// ================= Videos =================
export function sortVideos(videos: VideoItem[]): VideoItem[] {
  return [...videos].sort((a, b) => {
    const aPerm = a.isPermanent ? 1 : 0;
    const bPerm = b.isPermanent ? 1 : 0;
    if (aPerm !== bPerm) return bPerm - aPerm;

    const aTime = new Date(a.createdAt || 0).getTime();
    const bTime = new Date(b.createdAt || 0).getTime();
    return bTime - aTime;
  });
}

export async function getVideos(): Promise<VideoItem[]> {
  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      const res = await pool.query('SELECT value FROM portfolio_store WHERE key = $1', ['videos']);
      if (res.rows.length > 0 && Array.isArray(res.rows[0].value)) {
        memoryStore.videos = sortVideos(res.rows[0].value);
        return memoryStore.videos;
      }
      // Seed initial videos
      await pool.query(
        'INSERT INTO portfolio_store (key, value) VALUES ($1, $2) ON CONFLICT (key) DO NOTHING',
        ['videos', JSON.stringify(INITIAL_VIDEOS)]
      );
      memoryStore.videos = sortVideos(INITIAL_VIDEOS);
      return memoryStore.videos;
    } catch (err) {
      console.error('Postgres error in getVideos:', err);
    }
  }

  if (memoryStore.videos) {
    return memoryStore.videos;
  }

  ensureDataDir();
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as VideoItem[];
      memoryStore.videos = sortVideos(parsed);
      return memoryStore.videos;
    }
  } catch (err) {
    console.warn('Filesystem read error for videos:', err);
  }

  memoryStore.videos = sortVideos(INITIAL_VIDEOS);
  return memoryStore.videos;
}

export async function saveVideos(videos: VideoItem[]): Promise<void> {
  const sorted = sortVideos(videos);
  memoryStore.videos = sorted;

  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      await pool.query(
        'INSERT INTO portfolio_store (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
        ['videos', JSON.stringify(sorted)]
      );
      return;
    } catch (err) {
      console.error('Postgres error in saveVideos:', err);
    }
  }

  try {
    ensureDataDir();
    fs.writeFileSync(DB_FILE, JSON.stringify(sorted, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Filesystem write error (ignorable on serverless):', err);
  }
}

export async function addVideo(video: Omit<VideoItem, 'id' | 'createdAt'>): Promise<VideoItem> {
  const videos = await getVideos();
  const newVideo: VideoItem = {
    ...video,
    id: `vid-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    views: 0,
  };
  const updated = [newVideo, ...videos];
  await saveVideos(updated);
  return newVideo;
}

export async function updateVideo(id: string, updates: Partial<Omit<VideoItem, 'id' | 'createdAt'>>): Promise<VideoItem | null> {
  const videos = await getVideos();
  const index = videos.findIndex((v) => v.id === id);
  if (index === -1) return null;

  videos[index] = {
    ...videos[index],
    ...updates,
  };
  await saveVideos(videos);
  return videos[index];
}

export async function deleteVideo(id: string): Promise<boolean> {
  const videos = await getVideos();
  const filtered = videos.filter((v) => v.id !== id);
  if (filtered.length === videos.length) return false;
  await saveVideos(filtered);
  return true;
}

export async function toggleVideoVisibility(id: string): Promise<VideoItem | null> {
  const videos = await getVideos();
  const video = videos.find((v) => v.id === id);
  if (!video) return null;
  return updateVideo(id, { isPublished: !video.isPublished });
}

export async function toggleVideoFeatured(id: string): Promise<VideoItem | null> {
  const videos = await getVideos();
  const video = videos.find((v) => v.id === id);
  if (!video) return null;
  return updateVideo(id, { isFeatured: !video.isFeatured });
}

export async function toggleVideoPermanent(id: string): Promise<VideoItem | null> {
  const videos = await getVideos();
  const video = videos.find((v) => v.id === id);
  if (!video) return null;
  return updateVideo(id, { isPermanent: !video.isPermanent });
}

// ================= Admin Auth Password Persistence =================
export async function getAdminPasswordHash(fallbackHash: string): Promise<string> {
  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      const res = await pool.query('SELECT value FROM portfolio_store WHERE key = $1', ['admin_password_hash']);
      if (res.rows.length > 0 && res.rows[0].value && res.rows[0].value.hash) {
        memoryStore.adminPasswordHash = res.rows[0].value.hash;
        return memoryStore.adminPasswordHash!;
      }
    } catch (err) {
      console.error('Postgres error reading admin_password_hash:', err);
    }
  }

  if (memoryStore.adminPasswordHash) {
    return memoryStore.adminPasswordHash;
  }

  try {
    if (fs.existsSync(ADMIN_FILE)) {
      const raw = fs.readFileSync(ADMIN_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed.hash) {
        memoryStore.adminPasswordHash = parsed.hash;
        return parsed.hash;
      }
    }
  } catch (_) {}

  memoryStore.adminPasswordHash = fallbackHash;
  return fallbackHash;
}

export async function saveAdminPasswordHash(hash: string): Promise<void> {
  memoryStore.adminPasswordHash = hash;

  const pool = getPgPool();
  if (pool) {
    try {
      await initPostgresTables(pool);
      await pool.query(
        'INSERT INTO portfolio_store (key, value, updated_at) VALUES ($1, $2, NOW()) ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = NOW()',
        ['admin_password_hash', JSON.stringify({ hash })]
      );
      return;
    } catch (err) {
      console.error('Postgres error saving admin_password_hash:', err);
    }
  }

  try {
    ensureDataDir();
    fs.writeFileSync(ADMIN_FILE, JSON.stringify({ hash }, null, 2), 'utf-8');
  } catch (_) {}
}
