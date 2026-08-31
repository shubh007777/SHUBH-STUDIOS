import React from 'react';
import {
  LayoutDashboard,
  Video,
  PlusCircle,
  FolderTree,
  Settings,
  LogOut,
  ExternalLink,
  Film,
  X,
  Image,
  FileText,
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'videos' | 'add-video' | 'photos' | 'categories' | 'site-content' | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onViewPublic: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onLogout,
  onViewPublic,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'videos' as AdminTab, label: 'Videos', icon: Video },
    { id: 'add-video' as AdminTab, label: 'Add Video', icon: PlusCircle },
    { id: 'photos' as AdminTab, label: 'Photos Gallery', icon: Image },
    { id: 'site-content' as AdminTab, label: 'Website Content', icon: FileText },
    { id: 'categories' as AdminTab, label: 'Categories', icon: FolderTree },
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#0A0B10] border-r border-white/10 p-6">
      <div>
        {/* Top Prominent Back To Website Button */}
        <button
          onClick={onViewPublic}
          className="w-full mb-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400/20 to-amber-500/10 border border-amber-400/40 text-amber-300 hover:bg-amber-400/30 text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer group"
          id="admin-sidebar-back-to-website-top"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Back to Website</span>
        </button>

        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-bold text-white text-sm">Shubh</span>
              <span className="block text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </div>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="md:hidden p-2 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5" id="admin-sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-bold shadow-md shadow-amber-400/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
                id={`sidebar-tab-${item.id}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-950' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer / Account */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px]">
          <span className="block text-neutral-400 text-[10px] font-mono uppercase">Logged in as</span>
          <span className="block font-semibold text-white truncate text-xs">
            kumarshubh8750@gmail.com
          </span>
        </div>

        <button
          onClick={onViewPublic}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
          id="sidebar-view-public"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>← Back to Website</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono transition-colors cursor-pointer"
          id="sidebar-logout"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen fixed left-0 top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md">
          <div className="w-72 h-full bg-[#0A0B10]">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
