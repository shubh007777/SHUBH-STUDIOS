import React, { useState, useRef } from 'react';
import { VideoItem, VideoCategory, SiteContent } from '../types';
import { Play, Eye, Sparkles, Filter, Clock, Building2, Pin } from 'lucide-react';

interface SelectedWorkProps {
  videos: VideoItem[];
  isLoading: boolean;
  selectedCategory: VideoCategory | 'ALL';
  onSelectCategory: (category: VideoCategory | 'ALL') => void;
  onSelectVideo: (video: VideoItem) => void;
  content?: SiteContent['selectedWork'];
}

const CATEGORIES: (VideoCategory | 'ALL')[] = [
  'ALL',
  'TRAVEL REELS',
  'TRAVEL ADS',
  'PROMOTIONAL VIDEOS',
];

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  videos,
  isLoading,
  selectedCategory,
  onSelectCategory,
  onSelectVideo,
  content,
}) => {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

  const eyebrow = content?.eyebrow || 'PORTFOLIO SHOWCASE';
  const heading = content?.heading || 'SELECTED WORK';
  const subtitle = content?.subtitle || 'A curated collection of cinematic travel reels, brand advertisements, and promotional video edits.';

  return (
    <section id="work" className="py-24 bg-[#090A0F] relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-[0.2em] mb-2" id="work-eyebrow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{eyebrow}</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight" id="work-heading">
              {heading}
            </h2>
            <p className="text-neutral-400 text-sm md:text-base mt-2 font-light max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" id="work-category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-neutral-950 font-bold border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                    : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
                id={`filter-btn-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="work-loading-skeleton">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-white/5 border border-white/10 animate-pulse flex flex-col justify-between p-6"
              >
                <div className="w-20 h-6 rounded-full bg-white/10" />
                <div className="space-y-3">
                  <div className="w-3/4 h-6 rounded bg-white/10" />
                  <div className="w-1/2 h-4 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white/[0.02] border border-white/10 max-w-xl mx-auto" id="work-empty-state">
            <Filter className="w-10 h-10 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Videos Found</h3>
            <p className="text-neutral-400 text-sm">
              There are currently no videos published under the "{selectedCategory}" category.
            </p>
            <button
              onClick={() => onSelectCategory('ALL')}
              className="mt-6 px-5 py-2.5 rounded-xl bg-amber-400 text-neutral-950 font-bold text-xs tracking-widest uppercase hover:bg-amber-300 transition-colors"
            >
              View All Videos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="work-grid">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isHovered={hoveredVideoId === video.id}
                onMouseEnter={() => setHoveredVideoId(video.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
                onClick={() => onSelectVideo(video)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

interface VideoCardProps {
  video: VideoItem;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Play muted preview on hover
  React.useEffect(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="group relative rounded-2xl bg-[#0D0E15] border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)] hover:-translate-y-1 flex flex-col"
      id={`video-card-${video.id}`}
    >
      {/* Media Container */}
      <div className="relative aspect-[9/16] sm:aspect-video md:aspect-[16/10] w-full overflow-hidden bg-black/60">
        {/* Thumbnail Image */}
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
          }`}
          loading="lazy"
        />

        {/* Video Hover Preview Snippet */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E15] via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono tracking-widest text-amber-300 uppercase font-semibold">
              {video.category}
            </span>

            {video.isPermanent && (
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-[10px] font-mono tracking-wider uppercase flex items-center gap-1 shadow-md shadow-amber-400/20">
                <Pin className="w-2.5 h-2.5 fill-current" />
                <span>Permanent</span>
              </span>
            )}
          </div>

          {video.duration && (
            <span className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[10px] font-mono text-neutral-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-amber-400" />
              {video.duration}
            </span>
          )}
        </div>

        {/* Centered Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-14 h-14 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-400/30 group-hover:scale-110 group-hover:bg-amber-300 transition-all duration-300">
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Client tag if present */}
        {video.client && (
          <div className="absolute bottom-3 left-4 z-10 flex items-center gap-1.5 text-xs font-mono text-neutral-300 bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-md">
            <Building2 className="w-3 h-3 text-amber-400" />
            <span>{video.client}</span>
          </div>
        )}
      </div>

      {/* Content Meta */}
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-2">
            {video.title}
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 mb-4">
            {video.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-neutral-400 font-mono">
          <span className="flex items-center gap-1 text-neutral-400">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            {video.views ? `${(video.views).toLocaleString()} Views` : 'Watch Edit'}
          </span>
          <span className="text-amber-400/80 group-hover:text-amber-300 group-hover:underline flex items-center gap-1">
            Play Video →
          </span>
        </div>
      </div>
    </div>
  );
};
