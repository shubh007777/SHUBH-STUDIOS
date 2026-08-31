import React from 'react';
import { Instagram, Sparkles, Eye, Award, ExternalLink, ArrowUpRight, Flame, Video } from 'lucide-react';
import { VideoItem, SiteContent } from '../types';

interface InstagramAccountsSectionProps {
  onSelectVideo?: (video: VideoItem) => void;
  content?: SiteContent['instagram'];
}

export const InstagramAccountsSection: React.FC<InstagramAccountsSectionProps> = ({ onSelectVideo, content }) => {
  const eyebrow = content?.eyebrow || '★ OFFICIAL INSTAGRAM HANDLES';
  const heading = content?.heading || 'MY INSTAGRAM ACCOUNTS — SEE MY WORK LIVE';
  const subtitle = content?.subtitle || 'Follow my latest daily cuts, reel breakdowns, and client ad campaigns directly on Instagram.';
  const qualityNotice = content?.qualityNotice || 'Followers are currently growing, but video quality, retention rates & viral reach are exceptionally high!';

  const acc1Tag = 'Primary Portfolio';
  const acc1Title = content?.account1?.name || 'Shubh | Travel Video Editor';
  const acc1Handle = content?.account1?.handle || '@shubh.travels';
  const acc1Reach = content?.account1?.badge || '★ 1.2M+ Reach';
  const acc1Bio = content?.account1?.bio || 'Main Instagram channel dedicated to cinematic travel edits, high-energy beat sync reels, atmospheric sound design breakdowns, and 4K color grading samples.';
  const acc1Avatar = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80';
  const acc1Url = content?.account1?.link || 'https://instagram.com';

  const acc2Tag = 'Commercial Ads & Client Work';
  const acc2Title = content?.account2?.name || 'Shubh Ads | Resort Promos';
  const acc2Handle = content?.account2?.handle || '@shubh.ads';
  const acc2Reach = content?.account2?.badge || '★ High ROAS Ads';
  const acc2Bio = content?.account2?.bio || 'Dedicated commercial Instagram page featuring high-converting social media video ads for luxury resorts, travel agencies, tour operators & lifestyle brands.';
  const acc2Avatar = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80';
  const acc2Url = content?.account2?.link || 'https://instagram.com';

  const account1ViralVideos = [
    {
      id: 'viral-1',
      title: 'Himalayan Misty Alpine Reel',
      views: '1.2M Views',
      thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      category: 'DOCUMENTARY',
      duration: '0:35',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      id: 'viral-2',
      title: 'Icelandic Glacier Fast Cut',
      views: '890K Views',
      thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
      category: 'REELS & SHORTS',
      duration: '0:22',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    },
  ];

  const account2ViralVideos = [
    {
      id: 'viral-3',
      title: 'Luxury Maldives Resort Promo',
      views: '940K Views',
      thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      category: 'COMMERCIAL ADS',
      duration: '0:45',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    },
    {
      id: 'viral-4',
      title: 'Tropical Sunset Beach Ad',
      views: '610K Views',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      category: 'COMMERCIAL ADS',
      duration: '0:30',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyflights.mp4',
    },
  ];

  return (
    <section id="instagram-accounts" className="py-20 sm:py-28 bg-[#090A0F] relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs uppercase tracking-[0.2em]">
            <Instagram className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>

          {/* Quality Notice Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/15 via-white/5 to-amber-400/15 border border-amber-400/30 backdrop-blur-md max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs sm:text-sm font-medium text-amber-200">
            <Flame className="w-5 h-5 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong>Note:</strong> {qualityNotice}
            </span>
          </div>
        </div>

        {/* 2 Instagram Accounts Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Account 1 Card */}
          <div className="rounded-3xl bg-[#0D0E15] border border-white/10 hover:border-amber-400/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300 group">
            <div className="space-y-6">
              {/* Account Header */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400/80 p-0.5 bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 shadow-xl shrink-0">
                    <img
                      src={acc1Avatar}
                      alt={acc1Handle}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-amber-400">
                      {acc1Tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {acc1Title}
                    </h3>
                    <span className="inline-block text-xs font-mono text-neutral-400 mt-0.5">
                      {acc1Handle}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono text-amber-300">
                    {acc1Reach}
                  </span>
                </div>
              </div>

              {/* Bio & High Quality Badge */}
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                {acc1Bio}
              </p>

              {/* Highlights Badge Bar */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono text-[10px] sm:text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">4K 60FPS</span>
                  <span className="text-neutral-400 text-[10px]">Ultra Quality</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">VIRAL HOOKS</span>
                  <span className="text-neutral-400 text-[10px]">High Retention</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">TOP ENGAGEMENT</span>
                  <span className="text-neutral-400 text-[10px]">Active Community</span>
                </div>
              </div>

              {/* Featured Viral Video Previews */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Viral Reels</span>
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {account1ViralVideos.map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => onSelectVideo && onSelectVideo(vid as any)}
                      className="group/vid relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer shadow-lg hover:border-amber-400/60 transition-colors"
                    >
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-between">
                        <div className="self-end px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-amber-300 border border-amber-400/30 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{vid.views}</span>
                        </div>

                        <div>
                          <span className="block text-[11px] font-bold text-white line-clamp-1">
                            {vid.title}
                          </span>
                          <span className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Click to Play
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visit Instagram Button */}
            <a
              href={acc1Url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-extrabold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-amber-400/10 flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit {acc1Handle} on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Account 2 Card */}
          <div className="rounded-3xl bg-[#0D0E15] border border-white/10 hover:border-amber-400/40 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300 group">
            <div className="space-y-6">
              {/* Account Header */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-amber-400/80 p-0.5 bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 shadow-xl shrink-0">
                    <img
                      src={acc2Avatar}
                      alt={acc2Handle}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-mono uppercase tracking-wider text-amber-400">
                      {acc2Tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {acc2Title}
                    </h3>
                    <span className="inline-block text-xs font-mono text-neutral-400 mt-0.5">
                      {acc2Handle}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end">
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-[10px] font-mono text-amber-300">
                    {acc2Reach}
                  </span>
                </div>
              </div>

              {/* Bio & High Quality Badge */}
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                {acc2Bio}
              </p>

              {/* Highlights Badge Bar */}
              <div className="grid grid-cols-3 gap-2 py-1 text-center font-mono text-[10px] sm:text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">HIGH ROAS</span>
                  <span className="text-neutral-400 text-[10px]">Proven Conversion</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">PRO ADS</span>
                  <span className="text-neutral-400 text-[10px]">Brand Campaigns</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="block font-bold text-amber-400">SOUND SFX</span>
                  <span className="text-neutral-400 text-[10px]">Bespoke Audio</span>
                </div>
              </div>

              {/* Featured Viral Video Previews */}
              <div className="space-y-3 pt-2">
                <span className="block text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Featured Commercial Campaigns</span>
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {account2ViralVideos.map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => onSelectVideo && onSelectVideo(vid as any)}
                      className="group/vid relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 cursor-pointer shadow-lg hover:border-amber-400/60 transition-colors"
                    >
                      <img
                        src={vid.thumbnail}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover/vid:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-between">
                        <div className="self-end px-2 py-0.5 rounded-md bg-black/80 text-[10px] font-mono text-amber-300 border border-amber-400/30 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{vid.views}</span>
                        </div>

                        <div>
                          <span className="block text-[11px] font-bold text-white line-clamp-1">
                            {vid.title}
                          </span>
                          <span className="text-[10px] font-mono text-amber-400/90 flex items-center gap-1">
                            <Video className="w-3 h-3" /> Click to Play
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Visit Instagram Button */}
            <a
              href={acc2Url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-extrabold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-xl shadow-amber-400/10 flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit {acc2Handle} on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

