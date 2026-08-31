import React from 'react';
import { Film, Lock, ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
  phone?: string;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05060A] border-t border-white/10 py-12 text-neutral-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amber-300">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <span className="block font-sans font-bold text-sm text-white">SHUBH</span>
            <span className="block text-[10px] text-neutral-500 uppercase tracking-widest">
              Travel Video Editor & Ads Creator
            </span>
          </div>
        </div>

        {/* WhatsApp Direct Chat in Footer */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <a
            href="https://wa.me/918178306611?text=Hi%20Shubh,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20travel%20video%20editing%20project!"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/20 transition-all hover:scale-105"
            id="footer-whatsapp-link"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Chat with Shubh on WhatsApp</span>
          </a>
        </div>

        {/* Copyright & Right Admin Link & Top */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block text-neutral-500">
            © {new Date().getFullYear()} Shubh.
          </div>

          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-amber-300 transition-colors cursor-pointer"
            id="footer-admin-link"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>{isAdminLoggedIn ? 'Admin Panel' : 'Admin Portal'}</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-colors cursor-pointer"
            title="Back to Top"
            id="footer-back-to-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
