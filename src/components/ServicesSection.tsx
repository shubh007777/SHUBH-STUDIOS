import React from 'react';
import { Video, Megaphone, Film, Share2, Sparkles, ArrowUpRight } from 'lucide-react';
import { SiteContent } from '../types';

const ICON_MAP: Record<string, React.ReactNode> = {
  'travel-reels': <Video className="w-6 h-6 text-amber-300" />,
  'travel-ads': <Megaphone className="w-6 h-6 text-amber-300" />,
  'cinematic-editing': <Film className="w-6 h-6 text-amber-300" />,
  'social-media-content': <Share2 className="w-6 h-6 text-amber-300" />,
};

interface ServicesSectionProps {
  onContactClick: () => void;
  content?: SiteContent['services'];
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onContactClick, content }) => {
  const eyebrow = content?.eyebrow || 'EXPERT CAPABILITIES';
  const heading = content?.heading || 'CRAFTED FOR IMPACT';
  const subtitle = content?.subtitle || 'Tailored video editing services designed to transform raw travel footage into magnetic visual experiences.';
  const items = content?.items || [];

  return (
    <section id="services" className="py-24 bg-[#090A0F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-[0.2em] mb-3" id="services-eyebrow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4" id="services-heading">
            {heading}
          </h2>
          <p className="text-neutral-400 text-base md:text-lg font-light">
            {subtitle}
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
          {items.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 md:p-10 rounded-3xl bg-[#0D0E15] border border-white/10 hover:border-amber-400/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              id={`service-card-${service.id}`}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-all duration-300">
                    {ICON_MAP[service.id] || <Video className="w-6 h-6 text-amber-300" />}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {service.title}
                </h3>

                <p className="text-neutral-300 text-sm md:text-base font-light leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={onContactClick}
                  className="w-full py-3 rounded-xl bg-white/5 group-hover:bg-amber-400 group-hover:text-neutral-950 text-neutral-300 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

