import React, { useState } from 'react';
import { VideoItem, VideoCategory } from '../../types';
import {
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Plus,
  Search,
  Filter,
  AlertTriangle,
  Pin,
} from 'lucide-react';

interface AdminVideoTableProps {
  videos: VideoItem[];
  onAddVideoClick: () => void;
  onEditVideoClick: (video: VideoItem) => void;
  onDeleteVideo: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleFeatured: (id: string) => void;
  onTogglePermanent: (id: string) => void;
}

export const AdminVideoTable: React.FC<AdminVideoTableProps> = ({
  videos,
  onAddVideoClick,
  onEditVideoClick,
  onDeleteVideo,
  onToggleVisibility,
  onToggleFeatured,
  onTogglePermanent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'ALL'>('ALL');
  const [deleteModalVideo, setDeleteModalVideo] = useState<VideoItem | null>(null);

  const filteredVideos = videos.filter((vid) => {
    const matchesSearch =
      vid.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vid.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vid.client && vid.client.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'ALL' || vid.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const confirmDelete = () => {
    if (deleteModalVideo) {
      onDeleteVideo(deleteModalVideo.id);
      setDeleteModalVideo(null);
    }
  };

  return (
    <div className="space-y-6" id="admin-video-table-container">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Video Portfolio Manager</h1>
          <p className="text-neutral-400 text-xs font-mono mt-0.5">
            Total {videos.length} videos uploaded across all categories
          </p>
        </div>

        <button
          onClick={onAddVideoClick}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
          id="table-add-video-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#0D0E15] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs font-mono text-neutral-500 uppercase flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {(['ALL', 'TRAVEL REELS', 'TRAVEL ADS', 'PROMOTIONAL VIDEOS'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wider uppercase transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-neutral-950 font-bold'
                  : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table List */}
      <div className="rounded-2xl bg-[#0D0E15] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-400 bg-white/[0.02]">
                <th className="py-4 px-6">Thumbnail & Title</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Permanent (Pin)</th>
                <th className="py-4 px-4">Visibility</th>
                <th className="py-4 px-4">Featured</th>
                <th className="py-4 px-4">Date Added</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
              {filteredVideos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-500 font-mono">
                    No videos match your criteria.
                  </td>
                </tr>
              ) : (
                filteredVideos.map((vid) => (
                  <tr key={vid.id} className={`hover:bg-white/[0.02] transition-colors ${vid.isPermanent ? 'bg-amber-400/[0.02]' : ''}`}>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                          <img
                            src={vid.thumbnailUrl}
                            alt={vid.title}
                            className="w-16 h-12 object-cover rounded-xl border border-white/10 bg-neutral-900"
                          />
                          {vid.isPermanent && (
                            <span className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-amber-400 text-neutral-950 shadow-md" title="Permanent Top Video">
                              <Pin className="w-2.5 h-2.5 fill-current" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="block font-bold text-white text-sm line-clamp-1">{vid.title}</span>
                            {vid.isPermanent && (
                              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-mono font-bold tracking-wider uppercase shrink-0">
                                Permanent
                              </span>
                            )}
                          </div>
                          <span className="block text-[11px] text-neutral-400 line-clamp-1 mt-0.5 font-light">
                            {vid.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 font-mono text-[10px]">
                        {vid.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => onTogglePermanent(vid.id)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-[10px] tracking-wider uppercase border cursor-pointer flex items-center gap-1.5 transition-all ${
                          vid.isPermanent
                            ? 'bg-amber-400 text-neutral-950 border-amber-400 font-extrabold shadow-md shadow-amber-400/20'
                            : 'bg-white/5 text-neutral-400 border-white/10 hover:text-amber-300 hover:border-amber-400/40'
                        }`}
                        title={vid.isPermanent ? 'Click to Unpin' : 'Click to Make Permanent (Stays at Very Top)'}
                        id={`toggle-perm-${vid.id}`}
                      >
                        <Pin className={`w-3 h-3 ${vid.isPermanent ? 'fill-current' : ''}`} />
                        <span>{vid.isPermanent ? 'Permanent' : 'Set Permanent'}</span>
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => onToggleVisibility(vid.id)}
                        className={`px-3 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border cursor-pointer flex items-center gap-1.5 transition-colors ${
                          vid.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-400 border-neutral-700 hover:text-white'
                        }`}
                        title={vid.isPublished ? 'Click to Hide' : 'Click to Publish'}
                      >
                        {vid.isPublished ? (
                          <>
                            <Eye className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Hidden
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => onToggleFeatured(vid.id)}
                        className={`p-2 rounded-xl border cursor-pointer transition-all ${
                          vid.isFeatured
                            ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                            : 'bg-white/5 text-neutral-500 border-white/10 hover:text-neutral-300'
                        }`}
                        title={vid.isFeatured ? 'Featured Video' : 'Mark as Featured'}
                      >
                        <Star className={`w-4 h-4 ${vid.isFeatured ? 'fill-current' : ''}`} />
                      </button>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-neutral-400">
                      {new Date(vid.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onEditVideoClick(vid)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Video"
                          id={`edit-vid-${vid.id}`}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteModalVideo(vid)}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                          title="Delete Video"
                          id={`delete-vid-${vid.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0D0E15] border border-rose-500/30 rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">Delete Video</h3>

            <p className="text-neutral-300 text-sm font-light">
              Are you sure you want to permanently delete this video?
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-400 font-mono text-left">
              <span className="block font-bold text-white text-sm mb-0.5">{deleteModalVideo.title}</span>
              <span>Category: {deleteModalVideo.category}</span>
            </div>

            <p className="text-rose-400 text-xs font-mono">
              This action cannot be undone and will remove it from the public portfolio.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteModalVideo(null)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/30"
                id="confirm-delete-btn"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
