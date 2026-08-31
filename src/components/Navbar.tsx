import React, { useState, useEffect } from 'react';
import { Film, Lock, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, isAdminLoggedIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090A0F]/85 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl shadow-black/50'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          className="group flex items-center gap-3 cursor-pointer"
          id="brand-logo"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400/20 via-white/10 to-transparent border border-white/15 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 group-hover:scale-105 transition-all duration-300 shadow-inner">
            <Film className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <span className="block font-sans font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-amber-300 transition-colors">
              SHUBH
            </span>
            <span className="block text-[10px] tracking-[0.2em] uppercase font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">
              Travel Video Editor
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md" id="desktop-nav">
          <button
            onClick={() => scrollToSection('work')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-work"
          >
            Selected Work
          </button>
          <button
            onClick={() => scrollToSection('companies')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-companies"
          >
            Brands
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-about"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('instagram-accounts')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-instagram"
          >
            Instagram
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-services"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-reviews"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-xs uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-amber-300 transition-colors cursor-pointer"
            id="nav-link-contact"
          >
            Contact
          </button>
        </nav>

        {/* Right CTA & Admin Access */}
        <div className="hidden md:flex items-center gap-3">
          {/* WhatsApp Direct Nav CTA */}
          <a
            href="https://wa.me/918178306611?text=Hi%20Shubh,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20travel%20video%20editing%20project!"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-neutral-950 border border-[#25D366]/40 hover:border-[#25D366] text-xs font-mono font-bold transition-all duration-300 cursor-pointer shadow-sm hover:shadow-emerald-500/20"
            id="nav-whatsapp-cta"
            title="Chat directly with Shubh on WhatsApp"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>WhatsApp</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-semibold px-5 py-2 text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            id="nav-cta-talk"
          >
            <span>Let's Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenAdmin}
            title={isAdminLoggedIn ? "Admin Dashboard Active" : "Admin Dashboard Portal"}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isAdminLoggedIn
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
            }`}
            id="nav-admin-trigger"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://wa.me/918178306611?text=Hi%20Shubh,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20travel%20video%20editing%20project!"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366]"
            id="mobile-nav-whatsapp"
            title="WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
          <button
            onClick={onOpenAdmin}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-amber-300"
            id="mobile-admin-trigger"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white/10 border border-white/15 text-white cursor-pointer focus:outline-none"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090A0F]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-8 flex flex-col gap-5 animate-in slide-in-from-top duration-300" id="mobile-drawer">
          <button
            onClick={() => scrollToSection('work')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-work"
          >
            Selected Work
          </button>
          <button
            onClick={() => scrollToSection('companies')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-companies"
          >
            Travel Brands
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-about"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('instagram-accounts')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-instagram"
          >
            Instagram Accounts
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-services"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('reviews')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-reviews"
          >
            Client Reviews
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-left text-sm uppercase tracking-widest text-neutral-200 hover:text-amber-300 py-2 border-b border-white/5"
            id="mobile-nav-contact"
          >
            Contact
          </button>

          <a
            href="https://wa.me/918178306611?text=Hi%20Shubh,%20I%20saw%20your%20portfolio%20and%20want%20to%20discuss%20a%20travel%20video%20editing%20project!"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-neutral-950 font-bold py-3 rounded-xl text-center text-xs tracking-widest uppercase shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            id="mobile-drawer-whatsapp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Message on WhatsApp</span>
          </a>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold py-3.5 rounded-xl text-center text-xs tracking-widest uppercase shadow-lg shadow-amber-500/20"
            id="mobile-nav-cta"
          >
            Let's Work Together
          </button>
        </div>
      )}
    </header>
  );
};
