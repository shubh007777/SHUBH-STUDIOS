import React from 'react';
import { VideoItem, AdminStats } from '../../types';
import { Video, Eye, EyeOff, Star, Plus, ArrowRight, Eye as ViewIcon, Sparkles } from 'lucide-react';

interface AdminDashboardOverviewProps {
  stats: AdminStats;
  videos: VideoItem[];
  onNavigateAddVideo: () => void;
  onNavigateVideos: () => void;
  onToggleVisibility: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  stats,
  videos,
  onNavigateAddVideo,
  onNavigateVideos,
  onToggleVisibility,
  onToggleFeatured,
}) => {
  const recentVideos = videos.slice(0, 5);

  return (
    <div className="space-y-8" id="admin-dashboard-overview">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Dashboard Overview</h1>
          <p className="text-neutral-400 text-xs font-mono mt-1">
            Real-time portfolio video management & metrics
          </p>
        </div>

        <button
          onClick={onNavigateAddVideo}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
          id="overview-add-video-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Video</span>
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" id="admin-stats-grid">
        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Total Videos</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-white">{stats.totalVideos}</span>
          <span className="block text-[10px] font-mono text-neutral-500 mt-2">All portfolio items</span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">Published</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-white">{stats.publishedVideos}</span>
          <span className="block text-[10px] font-mono text-emerald-400/80 mt-2">Visible on public site</span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">Hidden</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <EyeOff className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-white">{stats.hiddenVideos}</span>
          <span className="block text-[10px] font-mono text-amber-400/80 mt-2">Private inside admin</span>
        </div>

        <div className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-amber-300">Featured</span>
            <div className="p-2 rounded-xl bg-amber-400/10 text-amber-300">
              <Star className="w-5 h-5 fill-current" />
            </div>
          </div>
          <span className="text-3xl md:text-4xl font-extrabold text-white">{stats.featuredVideos}</span>
          <span className="block text-[10px] font-mono text-amber-300/80 mt-2">Highlighted showcase</span>
        </div>
      </div>

      {/* Recent Videos Section */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#0D0E15] border border-white/10" id="admin-recent-videos">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Video Edits</h2>
            <p className="text-neutral-400 text-xs font-mono mt-0.5">
              Quick status controls for recent uploads
            </p>
          </div>

          <button
            onClick={onNavigateVideos}
            className="text-xs font-mono text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({videos.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                <th className="py-3 px-4">Thumbnail & Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
              {recentVideos.map((vid) => (
                <tr key={vid.id} className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="block font-semibold text-white truncate max-w-xs">{vid.title}</span>
                        <span className="block text-[10px] font-mono text-neutral-500">{vid.client || 'Client Edit'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-amber-300">
                      {vid.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleVisibility(vid.id)}
                      className={`px-2.5 py-1 rounded-full font-mono text-[10px] tracking-wider uppercase border cursor-pointer ${
                        vid.isPublished
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                      }`}
                    >
                      {vid.isPublished ? 'Published' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => onToggleFeatured(vid.id)}
                      className={`p-1.5 rounded-lg border cursor-pointer ${
                        vid.isFeatured
                          ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                          : 'bg-white/5 text-neutral-600 border-white/10 hover:text-neutral-300'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${vid.isFeatured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={onNavigateVideos}
                      className="text-xs font-mono text-neutral-400 hover:text-white underline cursor-pointer"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
