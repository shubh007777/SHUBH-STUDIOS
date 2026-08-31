import React, { useState, useEffect } from 'react';
import { VideoItem, VideoCategory, SiteContent } from './types';
import { fetchPublicVideos, checkAdminAuth, fetchPublicSiteContent } from './lib/api';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { VideoModal } from './components/VideoModal';
import { AboutSection } from './components/AboutSection';
import { TravelCompaniesSection } from './components/TravelCompaniesSection';
import { InstagramAccountsSection } from './components/InstagramAccountsSection';
import { ServicesSection } from './components/ServicesSection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';

export default function App() {
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Public portfolio state
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent | null>(null);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory | 'ALL'>('ALL');
  const [selectedVideoModal, setSelectedVideoModal] = useState<VideoItem | null>(null);

  // Fetch site CMS content on mount
  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const content = await fetchPublicSiteContent();
        setSiteContent(content);
      } catch (err) {
        console.error('Error fetching site content:', err);
      }
    };
    loadSiteContent();
  }, [currentView]);

  // Check URL path/hash for /admin route
  useEffect(() => {
    const handleRouteCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };

    handleRouteCheck();
    window.addEventListener('popstate', handleRouteCheck);
    window.addEventListener('hashchange', handleRouteCheck);
    return () => {
      window.removeEventListener('popstate', handleRouteCheck);
      window.removeEventListener('hashchange', handleRouteCheck);
    };
  }, []);

  // Check admin auth token status
  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAdminAuth();
      setIsAdminLoggedIn(isAuth);
    };
    verifyAuth();
  }, [currentView]);

  // Load public videos dynamically
  const loadPublicVideos = async (category: VideoCategory | 'ALL') => {
    setIsLoadingVideos(true);
    try {
      const data = await fetchPublicVideos(category);
      setVideos(data);
    } catch (err) {
      console.error('Error fetching public videos:', err);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  useEffect(() => {
    if (currentView === 'public') {
      loadPublicVideos(selectedCategory);
    }
  }, [selectedCategory, currentView]);

  const handleCategoryChange = (category: VideoCategory | 'ALL') => {
    setSelectedCategory(category);
  };

  const handleOpenAdminView = () => {
    window.history.pushState(null, '', '/admin');
    setCurrentView('admin');
  };

  const handleCloseAdminView = () => {
    window.history.pushState(null, '', '/');
    setCurrentView('public');
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render Admin View if currentView === 'admin'
  if (currentView === 'admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminLoggedIn(true)}
          onBackToPublic={handleCloseAdminView}
        />
      );
    }
    return (
      <AdminLayout
        onLogout={() => {
          setIsAdminLoggedIn(false);
          handleCloseAdminView();
        }}
        onViewPublic={handleCloseAdminView}
      />
    );
  }

  // Render Public Portfolio View
  return (
    <div className="min-h-screen bg-[#090A0F] text-white selection:bg-amber-400 selection:text-neutral-950">
      {/* Header Navigation */}
      <Navbar onOpenAdmin={handleOpenAdminView} isAdminLoggedIn={isAdminLoggedIn} />

      {/* Main Sections */}
      <main id="main-content">
        <Hero
          onViewWorkClick={scrollToWork}
          onContactClick={scrollToContact}
          content={siteContent?.hero}
        />

        <SelectedWork
          videos={videos}
          isLoading={isLoadingVideos}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          onSelectVideo={(video) => setSelectedVideoModal(video)}
          content={siteContent?.selectedWork}
        />

        <TravelCompaniesSection content={siteContent?.travelCompanies} />

        <AboutSection content={siteContent?.about} />

        <InstagramAccountsSection
          onSelectVideo={(video) => setSelectedVideoModal(video)}
          content={siteContent?.instagram}
        />

        <ServicesSection
          onContactClick={scrollToContact}
          content={siteContent?.services}
        />

        <ReviewsSection
          content={siteContent?.reviews}
          onSelectVideo={(video) => setSelectedVideoModal(video)}
        />

        <ContactSection content={siteContent?.contact} />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={handleOpenAdminView}
        isAdminLoggedIn={isAdminLoggedIn}
        phone={siteContent?.contact?.phone || '+91 8178306611'}
      />

      {/* Floating Instant WhatsApp Chat */}
      <FloatingWhatsApp
        phoneNumber={siteContent?.contact?.whatsapp || '8178306611'}
        defaultMessage={siteContent?.contact?.whatsappMessage || 'Hi Shubh, I saw your portfolio and want to discuss a travel video editing project!'}
      />

      {/* Video Modal Player */}
      {selectedVideoModal && (
        <VideoModal
          video={selectedVideoModal}
          onClose={() => setSelectedVideoModal(null)}
          onContactClick={scrollToContact}
        />
      )}
    </div>
  );
}
