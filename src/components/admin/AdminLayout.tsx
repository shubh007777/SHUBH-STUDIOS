import React, { useState, useEffect } from 'react';
import { VideoItem, AdminStats } from '../../types';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminDashboardOverview } from './AdminDashboardOverview';
import { AdminVideoTable } from './AdminVideoTable';
import { AdminVideoForm } from './AdminVideoForm';
import { AdminPhotosManager } from './AdminPhotosManager';
import { AdminCategories } from './AdminCategories';
import { AdminSettings } from './AdminSettings';
import { AdminSiteContentEditor } from './AdminSiteContentEditor';
import {
  fetchAdminVideos,
  fetchAdminStats,
  createAdminVideo,
  updateAdminVideo,
  deleteAdminVideo,
  toggleVideoVisibility,
  toggleVideoFeatured,
  toggleVideoPermanent,
  removeStoredToken,
} from '../../lib/api';
import { Menu, Sparkles, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminLayoutProps {
  onLogout: () => void;
  onViewPublic: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onLogout, onViewPublic }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalVideos: 0,
    publishedVideos: 0,
    hiddenVideos: 0,
    featuredVideos: 0,
  });
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [vData, sData] = await Promise.all([fetchAdminVideos(), fetchAdminStats()]);
      setVideos(vData);
      setStats(sData);
    } catch (err: any) {
      showToast('error', err.message || 'Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const handleCreateOrUpdateVideo = async (videoData: Omit<VideoItem, 'id' | 'createdAt'>) => {
    try {
      if (editingVideo) {
        await updateAdminVideo(editingVideo.id, videoData);
        showToast('success', `Video "${videoData.title}" updated successfully!`);
      } else {
        await createAdminVideo(videoData);
        showToast('success', `Video "${videoData.title}" published successfully!`);
      }
      setEditingVideo(null);
      setActiveTab('videos');
      await loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save video');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    try {
      await deleteAdminVideo(id);
      showToast('success', 'Video deleted permanently!');
      await loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete video');
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      const updated = await toggleVideoVisibility(id);
      showToast(
        'success',
        `Video is now ${updated.isPublished ? 'Published on Public Portfolio' : 'Hidden from Public Portfolio'}`
      );
      await loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to toggle visibility');
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const updated = await toggleVideoFeatured(id);
      showToast(
        'success',
        `Video featured status set to ${updated.isFeatured ? 'Featured' : 'Standard'}`
      );
      await loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to toggle featured status');
    }
  };

  const handleTogglePermanent = async (id: string) => {
    try {
      const updated = await toggleVideoPermanent(id);
      showToast(
        'success',
        `Video is now ${updated.isPermanent ? 'Permanent (Pinned at Top)' : 'Standard (Unpinned)'}`
      );
      await loadData();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to toggle permanent status');
    }
  };

  const handleStartEdit = (video: VideoItem) => {
    setEditingVideo(video);
    setActiveTab('add-video');
  };

  const handleLogout = () => {
    removeStoredToken();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-white flex max-w-full overflow-x-hidden">
      {/* Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'add-video' && activeTab !== 'add-video') {
            setEditingVideo(null);
          }
          setActiveTab(tab);
        }}
        onLogout={handleLogout}
        onViewPublic={onViewPublic}
        isMobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen max-w-full min-w-0 overflow-x-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 bg-[#0A0B10] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg bg-white/5 text-neutral-300 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest hidden sm:inline-block">
              Portolio Admin System v2.0
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={loadData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            <button
              onClick={onViewPublic}
              className="px-3.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 text-xs font-mono font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              id="admin-header-back-to-website"
            >
              <span>← Back to Website</span>
            </button>
          </div>
        </header>

        {/* Notification Toast */}
        {notification && (
          <div
            className={`fixed top-20 right-6 z-50 p-4 rounded-xl shadow-2xl border flex items-center gap-3 text-xs font-mono animate-in slide-in-from-right duration-300 ${
              notification.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Tab Body */}
        <main className="p-4 sm:p-6 md:p-8 flex-1 overflow-y-auto max-w-full min-w-0">
          {activeTab === 'dashboard' && (
            <AdminDashboardOverview
              stats={stats}
              videos={videos}
              onNavigateAddVideo={() => {
                setEditingVideo(null);
                setActiveTab('add-video');
              }}
              onNavigateVideos={() => setActiveTab('videos')}
              onToggleVisibility={handleToggleVisibility}
              onToggleFeatured={handleToggleFeatured}
            />
          )}

          {activeTab === 'videos' && (
            <AdminVideoTable
              videos={videos}
              onAddVideoClick={() => {
                setEditingVideo(null);
                setActiveTab('add-video');
              }}
              onEditVideoClick={handleStartEdit}
              onDeleteVideo={handleDeleteVideo}
              onToggleVisibility={handleToggleVisibility}
              onToggleFeatured={handleToggleFeatured}
              onTogglePermanent={handleTogglePermanent}
            />
          )}

          {activeTab === 'add-video' && (
            <AdminVideoForm
              initialVideo={editingVideo}
              onSubmit={handleCreateOrUpdateVideo}
              onCancel={() => {
                setEditingVideo(null);
                setActiveTab('videos');
              }}
            />
          )}

          {activeTab === 'photos' && <AdminPhotosManager />}

          {activeTab === 'site-content' && <AdminSiteContentEditor onNotify={showToast} />}

          {activeTab === 'categories' && <AdminCategories videos={videos} />}

          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};
