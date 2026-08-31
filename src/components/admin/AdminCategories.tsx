import React from 'react';
import { VideoItem } from '../../types';
import { FolderTree, Video, Sparkles } from 'lucide-react';

interface AdminCategoriesProps {
  videos: VideoItem[];
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({ videos }) => {
  const categories = [
    {
      name: 'TRAVEL REELS',
      desc: 'Short-form, high-pacing reels engineered for Instagram, TikTok, and YouTube Shorts.',
      count: videos.filter((v) => v.category === 'TRAVEL REELS').length,
    },
    {
      name: 'TRAVEL ADS',
      desc: 'High-converting video advertisements for travel agencies, hotels, and luxury resorts.',
      count: videos.filter((v) => v.category === 'TRAVEL ADS').length,
    },
    {
      name: 'PROMOTIONAL VIDEOS',
      desc: 'Destination commercials, tour promo edits, and brand campaign storytelling.',
      count: videos.filter((v) => v.category === 'PROMOTIONAL VIDEOS').length,
    },
  ];

  return (
    <div className="space-y-8" id="admin-categories-container">
      <div>
        <h1 className="text-2xl font-extrabold text-white">Portfolio Categories</h1>
        <p className="text-neutral-400 text-xs font-mono mt-1">
          Active distribution of travel edits across core service offerings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="p-6 rounded-2xl bg-[#0D0E15] border border-white/10 space-y-4 hover:border-amber-400/30 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-300 flex items-center justify-center">
                <FolderTree className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white">{cat.count}</span>
            </div>

            <h3 className="text-base font-bold text-white">{cat.name}</h3>
            <p className="text-neutral-400 text-xs font-light leading-relaxed">{cat.desc}</p>

            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Status: Active</span>
              <span className="text-amber-400">{cat.count} Videos</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
