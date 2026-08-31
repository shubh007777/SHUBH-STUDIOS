import React, { useState, useEffect } from 'react';
import { PhotoItem, SiteContent } from '../types';
import { fetchPublicPhotos } from '../lib/api';
import {
  Clapperboard,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sliders,
  Music,
  Camera,
} from 'lucide-react';

interface AboutSectionProps {
  content?: SiteContent['about'];
}

const FALLBACK_PHOTOS: PhotoItem[] = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
  {
    id: 'p5',
    url: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
  {
    id: 'p6',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    createdAt: '',
  },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ content }) => {
  const eyebrow = content?.eyebrow || '★ CINEMATIC STORYTELLER & ADS STRATEGIST';
  const heading = content?.heading || 'THE VISION BEHIND THE CUTS';
  const bio1 = content?.bioParagraph1 || 'I am Shubh, a travel video editor and commercial ads creator specializing in turning raw footage into high-converting, visually breathtaking travel reels & campaigns.';
  const bio2 = content?.bioParagraph2 || 'Whether editing fast-paced viral Instagram Reels, luxury resort promo videos, or high-ROAS social media video ads for travel brands & tourism boards, my edits are meticulously engineered with frame-accurate beat matching, multi-layered sound design, bespoke 4K color profiles, and psychological hook structures.';

  const f1Title = content?.feature1Title || 'Retention Hook Engineering';
  const f1Desc = content?.feature1Desc || 'Capturing viewer focus in the first 1.5s with punchy cuts, audio risers, and sound SFX.';
  const f2Title = content?.feature2Title || '4K HDR Color Grading';
  const f2Desc = content?.feature2Desc || 'Custom cinematic color palettes (Moody Alpine, Tropical Glow, Teal & Orange) tailored to brands.';
  const f3Title = content?.feature3Title || 'Immersive Soundscapes';
  const f3Desc = content?.feature3Desc || 'Atmospheric ambient audio, swooshes, risers, and beat-synced rhythm cuts for maximum impact.';
  const f4Title = content?.feature4Title || 'Commercial Video Ads';
  const f4Desc = content?.feature4Desc || 'Converting ad edits for luxury resorts, travel agencies, and tour operators to boost bookings.';

  const [photos, setPhotos] = useState<PhotoItem[]>(FALLBACK_PHOTOS);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchPublicPhotos()
      .then((data) => {
        if (data && data.length > 0) {
          setPhotos(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching public photos:', err);
      });
  }, []);

  // Auto rotate slides every 3.5 seconds when not paused
  useEffect(() => {
    if (isPaused || photos.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, photos.length]);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % photos.length);
  };

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#090A0F] relative overflow-hidden border-t border-white/5">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Clean Pure Photo Carousel (NO Text Overlays!) */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative rounded-3xl overflow-hidden border border-white/20 bg-neutral-900/90 shadow-2xl group"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {/* Photo Display Frame - Clean and Pure */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden bg-neutral-950">
                {photos.map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      idx === activeSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt="Portfolio Gallery"
                      className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}

                {/* Subtle Slide Counter at Top Corner (Minimal) */}
                <div className="absolute top-4 right-4 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono text-neutral-300">
                    {activeSlide + 1} / {photos.length}
                  </span>
                </div>

                {/* Navigation Chevron Buttons (Visible on hover or touch) */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Previous Photo"
                      id="photo-carousel-prev"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md hover:bg-amber-400 hover:text-neutral-950 hover:border-amber-400 transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Next Photo"
                      id="photo-carousel-next"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Bottom Minimal Dot Indicators Only (No text overlay) */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex items-center justify-center gap-1.5 px-4">
                  <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center gap-1.5">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeSlide
                            ? 'w-6 bg-amber-400'
                            : 'w-1.5 bg-white/40 hover:bg-white/80'
                        }`}
                        title={`Photo ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Feature Pill */}
            <div className="mt-4 p-4 rounded-2xl bg-[#0D0E15] border border-white/15 backdrop-blur-xl flex items-center gap-3 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold shrink-0">
                <Clapperboard className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">
                  Cinematic Frame Pacing
                </span>
                <span className="block text-[11px] text-neutral-400">
                  Built for high retention, viral hooks & ad conversion
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio & Service Strengths */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-[0.2em] mb-2" id="about-eyebrow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{eyebrow}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight" id="about-heading">
                {heading}
              </h2>
            </div>

            <p className="text-base sm:text-xl text-neutral-200 font-light leading-relaxed text-balance">
              {bio1}
            </p>

            <p className="text-neutral-400 font-light leading-relaxed text-sm sm:text-base">
              {bio2}
            </p>

            {/* 4 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-colors flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 mt-0.5 shrink-0">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{f1Title}</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    {f1Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-colors flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 mt-0.5 shrink-0">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{f2Title}</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    {f2Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-colors flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 mt-0.5 shrink-0">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{f3Title}</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    {f3Desc}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/30 transition-colors flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400 mt-0.5 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{f4Title}</h4>
                  <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                    {f4Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
