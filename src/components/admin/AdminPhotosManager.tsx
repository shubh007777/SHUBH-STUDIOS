import React, { useState, useEffect } from 'react';
import { PhotoItem } from '../../types';
import { fetchAdminPhotos, addAdminPhoto, deleteAdminPhoto, uploadFile } from '../../lib/api';
import {
  Image,
  Plus,
  Trash2,
  Upload,
  Link as LinkIcon,
  Sparkles,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

export const AdminPhotosManager: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminPhotos();
      setPhotos(data);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      let finalUrl = photoUrl.trim();

      if (uploadMode === 'file') {
        if (!selectedFile) {
          showToast('error', 'Please choose a photo file from gallery');
          setSubmitting(false);
          return;
        }
        // Upload photo file
        finalUrl = await uploadFile(selectedFile, 'thumbnail');
      }

      if (!finalUrl) {
        showToast('error', 'Please provide a valid image URL or upload a file');
        setSubmitting(false);
        return;
      }

      await addAdminPhoto(finalUrl, title.trim());
      showToast('success', 'Photo added successfully to About slideshow!');
      
      // Reset form
      setPhotoUrl('');
      setSelectedFile(null);
      setFilePreview(null);
      setTitle('');

      await loadPhotos();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to add photo');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this photo from the website?')) return;
    try {
      await deleteAdminPhoto(id);
      showToast('success', 'Photo removed successfully');
      await loadPhotos();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete photo');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-in slide-in-from-top-4 ${
            toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Section Slideshow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Photos Gallery Manager</h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Add or remove photos displayed in the "About - Vision Behind The Cuts" slideshow carousel.
          </p>
        </div>

        <button
          onClick={loadPhotos}
          className="self-start sm:self-auto p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Add Photo Card Form */}
      <div className="p-6 rounded-3xl bg-[#0D0E15] border border-white/10 shadow-xl space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Photo</span>
        </h2>

        {/* Upload Mode Selector */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={() => setUploadMode('file')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
              uploadMode === 'file'
                ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-400/20'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload from Gallery / Device</span>
          </button>

          <button
            type="button"
            onClick={() => setUploadMode('url')}
            className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
              uploadMode === 'url'
                ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-md shadow-amber-400/20'
                : 'bg-white/5 text-neutral-400 border-white/10 hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Paste Image Web URL</span>
          </button>
        </div>

        <form onSubmit={handleAddPhoto} className="space-y-4">
          {uploadMode === 'file' ? (
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300 uppercase">
                Choose Image File from Computer / Gallery
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-xs text-neutral-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-400 file:text-neutral-950 hover:file:bg-amber-300 cursor-pointer"
                />
                {filePreview && (
                  <img
                    src={filePreview}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-xl border border-white/20 shrink-0"
                  />
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-xs font-mono text-neutral-300 uppercase">
                Image Web URL (Unsplash, Direct JPG/PNG link)
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400/60"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-mono text-neutral-300 uppercase">
              Photo Note / Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Alpine Mountains Shoot"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400/60"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md shadow-amber-400/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Uploading Photo...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Photo to Slideshow</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Active Photos Gallery Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Image className="w-4 h-4 text-amber-400" />
            <span>Active Slideshow Photos ({photos.length})</span>
          </h2>
        </div>

        {loading ? (
          <div className="py-12 text-center text-neutral-500 font-mono text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Loading photos...</span>
          </div>
        ) : photos.length === 0 ? (
          <div className="py-12 text-center text-neutral-500 font-mono text-xs rounded-2xl bg-white/[0.02] border border-white/5">
            No photos added yet. Upload your first photo above!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="relative group rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 aspect-[4/5]"
              >
                <img
                  src={photo.url}
                  alt={photo.title || `Photo ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px]">
                  #{idx + 1}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end gap-2">
                  {photo.title && (
                    <span className="text-xs text-white font-medium line-clamp-1">
                      {photo.title}
                    </span>
                  )}

                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="w-full py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold font-mono flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Photo</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
