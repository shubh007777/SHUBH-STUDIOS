import { VideoItem, AdminStats, VideoCategory, PhotoItem, SiteContent } from '../types';

const TOKEN_KEY = 'shubh_admin_auth_token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

async function parseJsonResponse(res: Response, fallbackErrorMessage: string): Promise<any> {
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch (_e) {
    if (!res.ok) {
      throw new Error(`Server error (${res.status}): ${res.statusText || 'Execution failed'}`);
    }
    throw new Error(fallbackErrorMessage);
  }

  if (!res.ok) {
    throw new Error(json.error || json.message || fallbackErrorMessage);
  }

  return json;
}

// Public API
export async function fetchPublicVideos(category?: VideoCategory | 'ALL', featuredOnly?: boolean): Promise<VideoItem[]> {
  const params = new URLSearchParams();
  if (category && category !== 'ALL') params.append('category', category);
  if (featuredOnly) params.append('featured', 'true');

  const res = await fetch(`/api/videos?${params.toString()}`);
  const json = await parseJsonResponse(res, 'Failed to fetch videos');
  if (!json.success) throw new Error(json.error || 'Failed to fetch videos');
  return json.data;
}

export async function fetchVideoById(id: string): Promise<VideoItem> {
  const res = await fetch(`/api/videos/${id}`);
  const json = await parseJsonResponse(res, 'Failed to fetch video');
  if (!json.success) throw new Error(json.error || 'Failed to fetch video');
  return json.data;
}

// Admin API
export async function loginAdmin(email: string, password: string): Promise<{ email: string; token: string }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseJsonResponse(res, 'Login failed');
  if (!json.success) throw new Error(json.error || 'Login failed');
  setStoredToken(json.data.token);
  return json.data;
}

export async function checkAdminAuth(): Promise<boolean> {
  const token = getStoredToken();
  if (!token) return false;

  try {
    const res = await fetchWithAuth('/api/auth/me');
    const json = await parseJsonResponse(res, 'Auth check failed');
    return json.success === true;
  } catch (err) {
    removeStoredToken();
    return false;
  }
}

export async function fetchAdminVideos(): Promise<VideoItem[]> {
  const res = await fetchWithAuth('/api/admin/videos');
  const json = await parseJsonResponse(res, 'Failed to fetch admin videos');
  if (!json.success) throw new Error(json.error || 'Failed to fetch admin videos');
  return json.data;
}

export async function fetchAdminStats(): Promise<AdminStats> {
  const res = await fetchWithAuth('/api/admin/stats');
  const json = await parseJsonResponse(res, 'Failed to fetch admin stats');
  if (!json.success) throw new Error(json.error || 'Failed to fetch admin stats');
  return json.data;
}

export async function createAdminVideo(videoData: Omit<VideoItem, 'id' | 'createdAt'>): Promise<VideoItem> {
  const res = await fetchWithAuth('/api/admin/videos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(videoData),
  });
  const json = await parseJsonResponse(res, 'Failed to create video');
  if (!json.success) throw new Error(json.error || 'Failed to create video');
  return json.data;
}

export async function updateAdminVideo(id: string, updates: Partial<Omit<VideoItem, 'id' | 'createdAt'>>): Promise<VideoItem> {
  const res = await fetchWithAuth(`/api/admin/videos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  const json = await parseJsonResponse(res, 'Failed to update video');
  if (!json.success) throw new Error(json.error || 'Failed to update video');
  return json.data;
}

export async function deleteAdminVideo(id: string): Promise<void> {
  const res = await fetchWithAuth(`/api/admin/videos/${id}`, {
    method: 'DELETE',
  });
  const json = await parseJsonResponse(res, 'Failed to delete video');
  if (!json.success) throw new Error(json.error || 'Failed to delete video');
}

export async function toggleVideoVisibility(id: string): Promise<VideoItem> {
  const res = await fetchWithAuth(`/api/admin/videos/${id}/toggle-visibility`, {
    method: 'PATCH',
  });
  const json = await parseJsonResponse(res, 'Failed to toggle visibility');
  if (!json.success) throw new Error(json.error || 'Failed to toggle visibility');
  return json.data;
}

export async function toggleVideoFeatured(id: string): Promise<VideoItem> {
  const res = await fetchWithAuth(`/api/admin/videos/${id}/toggle-featured`, {
    method: 'PATCH',
  });
  const json = await parseJsonResponse(res, 'Failed to toggle featured status');
  if (!json.success) throw new Error(json.error || 'Failed to toggle featured status');
  return json.data;
}

export async function toggleVideoPermanent(id: string): Promise<VideoItem> {
  const res = await fetchWithAuth(`/api/admin/videos/${id}/toggle-permanent`, {
    method: 'PATCH',
  });
  const json = await parseJsonResponse(res, 'Failed to toggle permanent status');
  if (!json.success) throw new Error(json.error || 'Failed to toggle permanent status');
  return json.data;
}

export async function uploadFile(file: File, type: 'video' | 'thumbnail'): Promise<string> {
  const formData = new FormData();
  formData.append(type, file);

  const res = await fetchWithAuth('/api/upload', {
    method: 'POST',
    body: formData,
  });

  const json = await parseJsonResponse(res, 'Failed to upload file');
  if (!json.success) throw new Error(json.error || 'Failed to upload file');
  return json.url;
}

export async function fetchPublicPhotos(): Promise<PhotoItem[]> {
  const res = await fetch('/api/photos');
  const json = await parseJsonResponse(res, 'Failed to fetch photos');
  if (!json.success) throw new Error(json.error || 'Failed to fetch photos');
  return json.data;
}

export async function fetchAdminPhotos(): Promise<PhotoItem[]> {
  const res = await fetchWithAuth('/api/admin/photos');
  const json = await parseJsonResponse(res, 'Failed to fetch admin photos');
  if (!json.success) throw new Error(json.error || 'Failed to fetch admin photos');
  return json.data;
}

export async function addAdminPhoto(url: string, title?: string): Promise<PhotoItem> {
  const res = await fetchWithAuth('/api/admin/photos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url, title }),
  });
  const json = await parseJsonResponse(res, 'Failed to add photo');
  if (!json.success) throw new Error(json.error || 'Failed to add photo');
  return json.data;
}

export async function deleteAdminPhoto(id: string): Promise<void> {
  const res = await fetchWithAuth(`/api/admin/photos/${id}`, {
    method: 'DELETE',
  });
  const json = await parseJsonResponse(res, 'Failed to delete photo');
  if (!json.success) throw new Error(json.error || 'Failed to delete photo');
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<void> {
  const res = await fetchWithAuth('/api/auth/change-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const json = await parseJsonResponse(res, 'Failed to change password');
  if (!json.success) throw new Error(json.error || 'Failed to change password');
}

export async function fetchPublicSiteContent(): Promise<SiteContent> {
  const res = await fetch('/api/site-content');
  const json = await parseJsonResponse(res, 'Failed to fetch site content');
  if (!json.success) throw new Error(json.error || 'Failed to fetch site content');
  return json.data;
}

export async function fetchAdminSiteContent(): Promise<SiteContent> {
  const res = await fetchWithAuth('/api/admin/site-content');
  const json = await parseJsonResponse(res, 'Failed to fetch site content');
  if (!json.success) throw new Error(json.error || 'Failed to fetch site content');
  return json.data;
}

export async function updateAdminSiteContent(content: SiteContent): Promise<SiteContent> {
  const res = await fetchWithAuth('/api/admin/site-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(content),
  });
  const json = await parseJsonResponse(res, 'Failed to update site content');
  if (!json.success) throw new Error(json.error || 'Failed to update site content');
  return json.data;
}
