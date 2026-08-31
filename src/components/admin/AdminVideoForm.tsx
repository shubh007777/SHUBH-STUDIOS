import React, { useState, useEffect } from 'react';
import { VideoItem, VideoCategory } from '../../types';
import {
  Upload,
  Video,
  Image,
  Check,
  X,
  Sparkles,
  Link,
  Building2,
  Clock,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';
import { uploadFile } from '../../lib/api';

interface AdminVideoFormProps {
  initialVideo?: VideoItem | null;
  onSubmit: (videoData: Omit<VideoItem, 'id' | 'createdAt'>) => Promise<void>;
  onCancel: () => void;
}

export const AdminVideoForm: React.FC<AdminVideoFormProps> = ({
  initialVideo,
  onSubmit,
  onCancel,
}) => {
  const isEditing = Boolean(initialVideo);

  const [title, setTitle] = useState(initialVideo?.title || '');
  const [category, setCategory] = useState<VideoCategory>(
    initialVideo?.category || 'TRAVEL REELS'
  );
  const [description, setDescription] = useState(initialVideo?.description || '');
  const [videoUrl, setVideoUrl] = useState(initialVideo?.videoUrl || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(initialVideo?.thumbnailUrl || '');
  const [client, setClient] = useState(initialVideo?.client || '');
  const [duration, setDuration] = useState(initialVideo?.duration || '0:30');
  const [isFeatured, setIsFeatured] = useState(initialVideo?.isFeatured ?? false);
  const [isPublished, setIsPublished] = useState(initialVideo?.isPublished ?? true);
  const [isPermanent, setIsPermanent] = useState(initialVideo?.isPermanent ?? false);

  const [videoUploadMode, setVideoUploadMode] = useState<'url' | 'file'>('url');
  const [thumbUploadMode, setThumbUploadMode] = useState<'url' | 'file'>('url');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVideoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingVideo(true);
    setError(null);
    try {
      const url = await uploadFile(file, 'video');
      setVideoUrl(url);
    } catch (err: any) {
      setError('Video upload failed: ' + (err.message || 'Error uploading file'));
    } finally {
      setIsUploadingVideo(false);
    }
  };

  const handleThumbnailFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingThumb(true);
    setError(null);
    try {
      const url = await uploadFile(file, 'thumbnail');
      setThumbnailUrl(url);
    } catch (err: any) {
      setError('Thumbnail upload failed: ' + (err.message || 'Error uploading file'));
    } finally {
      setIsUploadingThumb(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl || !thumbnailUrl) {
      setError('Title, Video URL/File, and Thumbnail URL/File are required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit({
        title,
        category,
        description,
        videoUrl,
        thumbnailUrl,
        client,
        duration,
        isFeatured,
        isPublished,
        isPermanent,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save video');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8" id="admin-video-form-container">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            {isEditing ? 'Edit Portfolio Video' : 'Add New Portfolio Video'}
          </h1>
          <p className="text-neutral-400 text-xs font-mono mt-1">
            Fill in video metadata, upload assets, and manage public visibility.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8" id="video-form">
        {/* Basic Info */}
        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-6">
          <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold">
            1. General Metadata
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Video Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Swiss Alps Cinematic Odyssey"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VideoCategory)}
                className="w-full px-4 py-3 rounded-xl bg-[#12131C] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value="TRAVEL REELS">TRAVEL REELS</option>
                <option value="TRAVEL ADS">TRAVEL ADS</option>
                <option value="PROMOTIONAL VIDEOS">PROMOTIONAL VIDEOS</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Client / Brand Name
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Swiss Tourism Co."
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe the editing technique, speed ramps, audio mixing, or campaign goals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Video Duration
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. 0:45"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Source */}
        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold">
              2. Video Asset Source *
            </h2>

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setVideoUploadMode('url')}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase ${
                  videoUploadMode === 'url' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                URL Link
              </button>
              <button
                type="button"
                onClick={() => setVideoUploadMode('file')}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase ${
                  videoUploadMode === 'file' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          {videoUploadMode === 'url' ? (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                Video Link (Instagram Reel / Post, YouTube, Vimeo, or Direct MP4)
              </label>
              <div className="relative">
                <Link className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://www.instagram.com/reel/C123... OR https://youtube.com/watch?v=... OR direct .mp4"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
              <p className="text-[11px] text-amber-300/80 font-mono mt-2">
                💡 Paste an Instagram Reel link (`instagram.com/reel/...`), YouTube URL, or direct MP4 link.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                Upload Video File from Gallery / Device
              </label>
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center bg-white/[0.01] hover:border-amber-400/50 transition-colors">
                <Upload className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Choose Video File from Device / Gallery</p>
                <p className="text-xs text-neutral-500 mt-1">MP4, MOV, WebM video clips</p>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileUpload}
                  className="hidden"
                  id="video-file-input"
                />
                <label
                  htmlFor="video-file-input"
                  className="inline-block mt-4 px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-amber-300"
                >
                  {isUploadingVideo ? 'Uploading...' : 'Browse Computer'}
                </label>
              </div>
            </div>
          )}

          {videoUrl && (
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-emerald-400 truncate">
                <Video className="w-4 h-4 shrink-0" />
                <span className="truncate">{videoUrl}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Video Ready
              </span>
            </div>
          )}
        </div>

        {/* Thumbnail Source */}
        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold">
              3. Thumbnail Asset *
            </h2>

            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setThumbUploadMode('url')}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase ${
                  thumbUploadMode === 'url' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Image URL
              </button>
              <button
                type="button"
                onClick={() => setThumbUploadMode('file')}
                className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase ${
                  thumbUploadMode === 'file' ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'
                }`}
              >
                Upload File
              </button>
            </div>
          </div>

          {thumbUploadMode === 'url' ? (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Image Poster URL
              </label>
              <div className="relative">
                <Image className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Upload Thumbnail Image
              </label>
              <div className="border-2 border-dashed border-white/15 rounded-2xl p-6 text-center bg-white/[0.01] hover:border-amber-400/50 transition-colors">
                <Image className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Upload thumbnail poster</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileUpload}
                  className="hidden"
                  id="thumb-file-input"
                />
                <label
                  htmlFor="thumb-file-input"
                  className="inline-block mt-3 px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-amber-300"
                >
                  {isUploadingThumb ? 'Uploading Image...' : 'Browse Image'}
                </label>
              </div>
            </div>
          )}

          {thumbnailUrl && (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <img src={thumbnailUrl} alt="Preview" className="w-20 h-14 object-cover rounded-lg border border-white/10" />
              <div>
                <span className="block text-xs font-bold text-white">Thumbnail Preview</span>
                <span className="block text-[10px] font-mono text-emerald-400 mt-0.5">Image Ready</span>
              </div>
            </div>
          )}
        </div>

        {/* Toggles */}
        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-6">
          <h2 className="text-sm font-mono tracking-wider uppercase text-amber-400 font-bold">
            4. Visibility & Featuring
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-amber-400/30">
              <div>
                <span className="block text-sm font-bold text-white">Publicly Published</span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">
                  Appears on the public website.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-amber-400/30">
              <div>
                <span className="block text-sm font-bold text-white flex items-center gap-1.5">
                  📌 Permanent Top Video
                </span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">
                  Stays permanently at the very top of portfolio list.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isPermanent}
                onChange={(e) => setIsPermanent(e.target.checked)}
                className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-amber-400/30">
              <div>
                <span className="block text-sm font-bold text-white">Mark as Featured</span>
                <span className="block text-[11px] text-neutral-400 mt-0.5">
                  Highlighted with star badge.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-5 h-5 accent-amber-400 rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
            id="video-form-submit"
          >
            {isSubmitting ? 'Saving Video...' : isEditing ? 'Save Changes' : 'Publish Video'}
          </button>
        </div>
      </form>
    </div>
  );
};
