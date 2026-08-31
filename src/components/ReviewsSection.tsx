import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2, ArrowUpRight, Sparkles, Play, Video, ExternalLink } from 'lucide-react';
import { ReviewContentItem, VideoItem } from '../types';

interface ReviewsSectionProps {
  content?: {
    eyebrow: string;
    heading: string;
    subtitle: string;
    items: ReviewContentItem[];
  };
  onSelectVideo?: (video: VideoItem) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ content, onSelectVideo }) => {
  const eyebrow = content?.eyebrow || '★ CLIENT TESTIMONIALS & FEEDBACK';
  const heading = content?.heading || 'WHAT MY TRAVEL CLIENTS SAY';
  const subtitle =
    content?.subtitle ||
    'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.';
  const items = content?.items || [];

  if (!items || items.length === 0) return null;

  const handleOpenVideo = (review: ReviewContentItem) => {
    if (!review.videoUrl) return;

    if (onSelectVideo) {
      const videoItem: VideoItem = {
        id: review.id,
        title: `${review.clientName} — Travel Video Edit`,
        description: `"${review.reviewText}" — ${review.clientTitle}`,
        videoUrl: review.videoUrl,
        thumbnailUrl: review.clientPicUrl || '',
        category: 'TRAVEL REELS',
        client: review.clientTitle || review.clientName,
        isPublished: true,
        isFeatured: true,
        createdAt: new Date().toISOString(),
      };
      onSelectVideo(videoItem);
    } else {
      window.open(review.videoUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="reviews" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#07080E] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-xs uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((review) => {
            const starsCount = Math.min(5, Math.max(1, Math.round(review.rating || 5)));
            const hasVideo = Boolean(review.videoUrl && review.videoUrl.trim().length > 0);

            return (
              <div
                key={review.id}
                className="group relative rounded-3xl bg-[#0E0F17] border border-white/10 hover:border-amber-400/40 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500"
              >
                {/* Top Badge & Star Rating */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < starsCount
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-neutral-700 fill-neutral-800'
                        }`}
                      />
                    ))}
                    <span className="ml-1.5 text-xs font-mono font-bold text-amber-300">
                      {review.rating ? review.rating.toFixed(1) : '5.0'}
                    </span>
                  </div>

                  {review.projectBadge && (
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                      {review.projectBadge}
                    </span>
                  )}
                </div>

                {/* Quote / Testimonial Text */}
                <div className="relative space-y-3 flex-1">
                  <MessageSquareQuote className="w-8 h-8 text-amber-400/20 absolute -top-2 -left-2 pointer-events-none" />
                  <p className="text-neutral-200 text-sm font-light leading-relaxed pl-3 italic relative z-10">
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Interactive Video Play Button if available */}
                {hasVideo && (
                  <div className="pt-2">
                    <button
                      onClick={() => handleOpenVideo(review)}
                      className="w-full group/play flex items-center justify-between px-4 py-3 rounded-2xl bg-amber-400/10 hover:bg-amber-400 border border-amber-400/30 hover:border-amber-400 text-amber-300 hover:text-neutral-950 transition-all duration-300 cursor-pointer shadow-lg shadow-amber-400/5 hover:shadow-amber-400/20"
                      title="Watch the edited project video"
                    >
                      <span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wide">
                        <span className="w-6 h-6 rounded-full bg-amber-400 group-hover/play:bg-neutral-950 text-neutral-950 group-hover/play:text-amber-400 flex items-center justify-center transition-colors">
                          <Play className="w-3 h-3 fill-current ml-0.5" />
                        </span>
                        <span>Watch Edited Video</span>
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover/play:translate-x-0.5 group-hover/play:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Client Profile / Screenshot Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Avatar or Video Screenshot with optional Play Icon */}
                    <div
                      onClick={() => hasVideo && handleOpenVideo(review)}
                      className={`relative w-12 h-12 rounded-2xl overflow-hidden bg-neutral-800 border border-white/15 shrink-0 ${
                        hasVideo ? 'cursor-pointer group/thumb hover:border-amber-400' : ''
                      }`}
                      title={hasVideo ? 'Click to play project video' : undefined}
                    >
                      {review.clientPicUrl ? (
                        <img
                          src={review.clientPicUrl}
                          alt={review.clientName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-amber-400 font-bold font-mono text-base">
                          {review.clientName?.charAt(0) || 'C'}
                        </div>
                      )}
                      
                      {hasVideo ? (
                        <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/20 flex items-center justify-center transition-colors">
                          <Play className="w-4 h-4 text-amber-300 fill-amber-300 drop-shadow-md" />
                        </div>
                      ) : (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                          {review.clientName}
                        </h3>
                      </div>
                      <p className="text-neutral-400 text-xs truncate font-light">
                        {review.clientTitle}
                      </p>
                    </div>
                  </div>

                  {/* External Project URL Link if given */}
                  {hasVideo && (
                    <a
                      href={review.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 transition-all shrink-0 cursor-pointer"
                      title="Open external link directly"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
