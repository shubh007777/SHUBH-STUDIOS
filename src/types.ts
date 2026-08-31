export type VideoCategory = 'TRAVEL REELS' | 'TRAVEL ADS' | 'PROMOTIONAL VIDEOS';

export interface VideoItem {
  id: string;
  title: string;
  category: VideoCategory;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  isPermanent?: boolean;
  createdAt: string;
  views?: number;
  duration?: string;
  client?: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  title?: string;
  createdAt: string;
}

export interface CompanyContentItem {
  id: string;
  name: string;
  badge: string;
  location: string;
  description: string;
  imageUrl: string;
  companyUrl: string;
}

export interface ReviewContentItem {
  id: string;
  clientName: string;
  clientTitle: string;
  clientPicUrl: string;
  rating: number; // 1 to 5
  reviewText: string;
  projectBadge?: string;
  videoUrl?: string;
}

export interface ServiceContentItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface SiteContent {
  hero: {
    statusBadge: string;
    subtitle: string;
    heading: string;
    description: string;
    buttonWorkText: string;
    buttonContactText: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    stat3Value: string;
    stat3Label: string;
  };
  selectedWork?: {
    eyebrow: string;
    heading: string;
    subtitle: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    bioParagraph1: string;
    bioParagraph2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    feature4Title: string;
    feature4Desc: string;
  };
  travelCompanies: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: CompanyContentItem[];
  };
  instagram: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    qualityNotice: string;
    account1: {
      name: string;
      handle: string;
      bio: string;
      link: string;
      badge: string;
    };
    account2: {
      name: string;
      handle: string;
      bio: string;
      link: string;
      badge: string;
    };
  };
  services: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: ServiceContentItem[];
  };
  reviews?: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: ReviewContentItem[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    whatsappMessage?: string;
    formspreeUrl?: string;
    instagram1Handle: string;
    instagram1Url: string;
    instagram2Handle: string;
    instagram2Url: string;
    responseTimeText: string;
  };
}


export interface AdminStats {
  totalVideos: number;
  publishedVideos: number;
  hiddenVideos: number;
  featuredVideos: number;
  permanentVideos?: number;
  totalPhotos?: number;
}

export interface UserAuth {
  email: string;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
