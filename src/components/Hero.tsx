import React from 'react';
import { Play, ArrowDown, Sparkles, Video, Award, Eye } from 'lucide-react';
import { SiteContent } from '../types';

interface HeroProps {
  onViewWorkClick: () => void;
  onContactClick: () => void;
  content?: SiteContent['hero'];
}

export const Hero: React.FC<HeroProps> = ({ onViewWorkClick, onContactClick, content }) => {
  const statusBadge = content?.statusBadge || 'Available for Travel Brands & Reels Editing';
  const subtitle = content?.subtitle || 'TRAVEL VIDEO EDITOR & ADS CREATOR';
  const heading = content?.heading || 'SHUBH';
  const description = content?.description || 'I turn travel footage into cinematic stories, engaging reels and high-converting promotional videos.';
  const buttonWorkText = content?.buttonWorkText || 'VIEW MY WORK';
  const buttonContactText = content?.buttonContactText || "LET'S WORK TOGETHER";
  const stat1Value = content?.stat1Value || '50M+';
  const stat1Label = content?.stat1Label || 'Reels & Ads Views';
  const stat2Value = content?.stat2Value || '250+';
  const stat2Label = content?.stat2Label || 'Cinematic Edits';
  const stat3Value = content?.stat3Value || '100%';
  const stat3Label = content?.stat3Label || 'Client Satisfaction';

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#090A0F]">
      {/* Background Ambient Video / Motion Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle Video Loop Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-20 scale-105 filter blur-[1px] grayscale-[30%]"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            type="video/mp4"
          />
        </video>

        {/* Ambient Dark Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F] via-[#090A0F]/70 to-[#090A0F]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.07)_0%,transparent_70%)]" />

        {/* Cinematic Grid Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in" id="hero-status-badge">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
          <span className="text-[11px] font-mono tracking-widest text-neutral-300 uppercase pl-2">
            {statusBadge}
          </span>
        </div>

        {/* Subtitle Eyebrow */}
        <h2 className="text-amber-400/90 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-4" id="hero-subtitle">
          {subtitle}
        </h2>

        {/* Main Name Heading */}
        <h1
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-500 mb-6 drop-shadow-2xl leading-[0.95]"
          id="hero-heading"
        >
          {heading}
        </h1>

        {/* Supporting Paragraph */}
        <p className="max-w-2xl text-lg md:text-xl text-neutral-300 font-light leading-relaxed mb-10 text-balance" id="hero-supporting-text">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-16" id="hero-buttons">
          <button
            onClick={onViewWorkClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2.5"
            id="hero-btn-work"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{buttonWorkText}</span>
          </button>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:border-amber-400/40 hover:text-amber-300 active:scale-95 cursor-pointer"
            id="hero-btn-contact"
          >
            {buttonContactText}
          </button>
        </div>

        {/* Proof / Highlight Chips */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 pt-8 border-t border-white/10 w-full max-w-4xl" id="hero-stats">
          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1.5 text-amber-300 mb-1">
              <Eye className="w-4 h-4" />
              <span className="font-bold text-2xl text-white">{stat1Value}</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">{stat1Label}</span>
          </div>

          <div className="flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1.5 text-amber-300 mb-1">
              <Video className="w-4 h-4" />
              <span className="font-bold text-2xl text-white">{stat2Value}</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">{stat2Label}</span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <div className="flex items-center gap-1.5 text-amber-300 mb-1">
              <Award className="w-4 h-4" />
              <span className="font-bold text-2xl text-white">{stat3Value}</span>
            </div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-400">{stat3Label}</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={onViewWorkClick}
          className="mt-16 text-neutral-500 hover:text-amber-300 transition-colors animate-bounce cursor-pointer flex flex-col items-center gap-1"
          id="hero-scroll-down"
        >
          <span className="text-[10px] tracking-widest font-mono uppercase">Scroll Down</span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

