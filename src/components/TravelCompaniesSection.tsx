import React from 'react';
import { Building2, ExternalLink, Sparkles, MapPin, Globe, Compass, ArrowUpRight } from 'lucide-react';
import { SiteContent } from '../types';

interface TravelCompaniesSectionProps {
  content?: SiteContent['travelCompanies'];
}

export const TravelCompaniesSection: React.FC<TravelCompaniesSectionProps> = ({ content }) => {
  const eyebrow = content?.eyebrow || '★ CLIENT COLLABORATIONS';
  const heading = content?.heading || 'TRAVEL COMPANIES I HAVE COLLABORATED WITH';
  const subtitle = content?.subtitle || 'Proudly editing high-converting commercial promo videos, destination reels & tour campaigns for global travel agencies, luxury resorts, and adventure tour operators.';
  const companies = content?.items || [];

  return (
    <section id="companies" className="py-20 sm:py-28 bg-[#0B0C12] relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-xs uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {heading}
          </h2>

          <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {companies.map((company) => (
            <div
              key={company.id}
              className="group relative rounded-3xl overflow-hidden bg-[#0F1018] border border-white/10 hover:border-amber-400/50 transition-all duration-500 flex flex-col shadow-2xl hover:shadow-amber-500/10"
            >
              {/* Large Banner Image - Full Width & Height */}
              <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-neutral-900 shrink-0">
                <img
                  src={company.imageUrl}
                  alt={company.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-100 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1018] via-black/30 to-transparent" />
                
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono font-bold text-amber-300 tracking-wider uppercase shadow-lg">
                    {company.badge}
                  </span>
                </div>

                {/* Location Overlay */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white/90 text-xs font-mono bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{company.location}</span>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {company.name}
                  </h3>

                  <p className="text-neutral-300 text-sm font-light leading-relaxed">
                    {company.description}
                  </p>
                </div>

                {/* Direct Link Button */}
                <a
                  href={company.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between px-5 py-3.5 rounded-xl bg-white/5 hover:bg-amber-400 hover:text-neutral-950 text-neutral-200 border border-white/10 hover:border-amber-400 text-xs font-mono font-bold transition-all duration-300 group/btn mt-2"
                  title={`Visit ${company.name}`}
                >
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4 shrink-0 text-amber-400 group-hover/btn:text-neutral-950" />
                    <span>Visit Official Company Page</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

