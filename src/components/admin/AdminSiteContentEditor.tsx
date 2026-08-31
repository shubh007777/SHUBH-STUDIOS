import React, { useState, useEffect } from 'react';
import { SiteContent, CompanyContentItem, ServiceContentItem, ReviewContentItem } from '../../types';
import { fetchAdminSiteContent, updateAdminSiteContent, uploadFile } from '../../lib/api';
import {
  FileText,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Globe,
  Instagram,
  Building2,
  Sparkles,
  HelpCircle,
  Video,
  LayoutDashboard,
  Star,
  MessageSquareQuote,
  Play,
  Upload,
  X,
  ExternalLink,
  Film,
} from 'lucide-react';

interface AdminSiteContentEditorProps {
  onNotify?: (type: 'success' | 'error', message: string) => void;
}

export const AdminSiteContentEditor: React.FC<AdminSiteContentEditorProps> = ({ onNotify }) => {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'hero' | 'work' | 'about' | 'companies' | 'instagram' | 'services' | 'reviews' | 'contact'>('all');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [previewingVideoUrl, setPreviewingVideoUrl] = useState<{ url: string; title: string } | null>(null);

  const loadSiteContent = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSiteContent();
      setContent(data);
    } catch (err: any) {
      if (onNotify) onNotify('error', err.message || 'Failed to load site content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiteContent();
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const updated = await updateAdminSiteContent(content);
      setContent(updated);
      if (onNotify) onNotify('success', 'All website text & section changes saved successfully!');
    } catch (err: any) {
      if (onNotify) onNotify('error', err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (file: File, callback: (url: string) => void, fieldId: string) => {
    setUploadingImage(fieldId);
    try {
      const url = await uploadFile(file, 'thumbnail');
      callback(url);
      if (onNotify) onNotify('success', 'Image uploaded successfully!');
    } catch (err: any) {
      if (onNotify) onNotify('error', err.message || 'Image upload failed');
    } finally {
      setUploadingImage(null);
    }
  };

  const handleVideoUpload = async (file: File, callback: (url: string) => void, fieldId: string) => {
    setUploadingImage(fieldId);
    try {
      const url = await uploadFile(file, 'video');
      callback(url);
      if (onNotify) onNotify('success', 'Video file uploaded successfully!');
    } catch (err: any) {
      if (onNotify) onNotify('error', err.message || 'Video upload failed');
    } finally {
      setUploadingImage(null);
    }
  };

  if (loading || !content) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <RefreshCw className="w-8 h-8 text-amber-400 animate-spin" />
        <span className="text-sm font-mono text-neutral-400">Loading website content editor...</span>
      </div>
    );
  }

  // Helper update triggers
  const updateHero = (key: keyof SiteContent['hero'], value: string) => {
    if (!content) return;
    setContent({
      ...content,
      hero: { ...content.hero, [key]: value },
    });
  };

  const updateSelectedWork = (key: 'eyebrow' | 'heading' | 'subtitle', value: string) => {
    if (!content) return;
    setContent({
      ...content,
      selectedWork: {
        eyebrow: content.selectedWork?.eyebrow || 'PORTFOLIO SHOWCASE',
        heading: content.selectedWork?.heading || 'SELECTED WORK',
        subtitle: content.selectedWork?.subtitle || 'A curated collection of cinematic travel reels, brand advertisements, and promotional video edits.',
        [key]: value,
      },
    });
  };

  const updateAbout = (key: keyof SiteContent['about'], value: string) => {
    setContent({
      ...content,
      about: { ...content.about, [key]: value },
    });
  };

  const updateInstagramMeta = (key: 'eyebrow' | 'heading' | 'subtitle' | 'qualityNotice', value: string) => {
    setContent({
      ...content,
      instagram: { ...content.instagram, [key]: value },
    });
  };

  const updateInstagramAccount = (accKey: 'account1' | 'account2', field: 'name' | 'handle' | 'bio' | 'link' | 'badge', value: string) => {
    setContent({
      ...content,
      instagram: {
        ...content.instagram,
        [accKey]: {
          ...content.instagram[accKey],
          [field]: value,
        },
      },
    });
  };

  const updateContact = (key: keyof SiteContent['contact'], value: string) => {
    setContent({
      ...content,
      contact: { ...content.contact, [key]: value },
    });
  };

  const updateCompaniesMeta = (key: 'eyebrow' | 'heading' | 'subtitle', value: string) => {
    setContent({
      ...content,
      travelCompanies: { ...content.travelCompanies, [key]: value },
    });
  };

  const updateCompanyItem = (index: number, field: keyof CompanyContentItem, value: string) => {
    const newItems = [...content.travelCompanies.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      travelCompanies: { ...content.travelCompanies, items: newItems },
    });
  };

  const addCompanyItem = () => {
    const newItem: CompanyContentItem = {
      id: `company-${Date.now()}`,
      name: 'New Travel Company',
      badge: 'CLIENT CAMPAIGN',
      location: 'Global',
      description: 'Edited custom commercial video ads and reels for brand growth.',
      imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      companyUrl: 'https://instagram.com',
    };
    setContent({
      ...content,
      travelCompanies: {
        ...content.travelCompanies,
        items: [...content.travelCompanies.items, newItem],
      },
    });
  };

  const deleteCompanyItem = (index: number) => {
    const newItems = content.travelCompanies.items.filter((_, i) => i !== index);
    setContent({
      ...content,
      travelCompanies: { ...content.travelCompanies, items: newItems },
    });
  };

  const updateServicesMeta = (key: 'eyebrow' | 'heading' | 'subtitle', value: string) => {
    setContent({
      ...content,
      services: { ...content.services, [key]: value },
    });
  };

  const updateServiceItem = (index: number, field: keyof ServiceContentItem, value: any) => {
    const newItems = [...content.services.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      services: { ...content.services, items: newItems },
    });
  };

  const updateReviewsMeta = (key: 'eyebrow' | 'heading' | 'subtitle', value: string) => {
    if (!content) return;
    const currentReviews = content.reviews || {
      eyebrow: '★ CLIENT TESTIMONIALS & FEEDBACK',
      heading: 'WHAT MY TRAVEL CLIENTS SAY',
      subtitle: 'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.',
      items: [],
    };
    setContent({
      ...content,
      reviews: { ...currentReviews, [key]: value },
    });
  };

  const updateReviewItem = (index: number, field: keyof ReviewContentItem, value: any) => {
    if (!content) return;
    const currentReviews = content.reviews || {
      eyebrow: '★ CLIENT TESTIMONIALS & FEEDBACK',
      heading: 'WHAT MY TRAVEL CLIENTS SAY',
      subtitle: 'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.',
      items: [],
    };
    const newItems = [...currentReviews.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent({
      ...content,
      reviews: { ...currentReviews, items: newItems },
    });
  };

  const addReviewItem = () => {
    if (!content) return;
    const currentReviews = content.reviews || {
      eyebrow: '★ CLIENT TESTIMONIALS & FEEDBACK',
      heading: 'WHAT MY TRAVEL CLIENTS SAY',
      subtitle: 'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.',
      items: [],
    };
    const newItem: ReviewContentItem = {
      id: `review-${Date.now()}`,
      clientName: 'New Client Name',
      clientTitle: 'Travel Company / Creator',
      clientPicUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      rating: 5,
      reviewText: 'Great video editing! The reels got huge engagement and high retention rate.',
      projectBadge: 'REELS EDITING',
      videoUrl: 'https://instagram.com',
    };
    setContent({
      ...content,
      reviews: {
        ...currentReviews,
        items: [...currentReviews.items, newItem],
      },
    });
  };

  const deleteReviewItem = (index: number) => {
    if (!content || !content.reviews) return;
    const newItems = content.reviews.items.filter((_, i) => i !== index);
    setContent({
      ...content,
      reviews: { ...content.reviews, items: newItems },
    });
  };

  return (
    <div className="space-y-8 pb-16 max-w-full overflow-hidden">
      {/* Top Header & Save Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#0D0E15] border border-white/10 shadow-xl max-w-full">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
            <FileText className="w-4 h-4" />
            <span>FULL CMS SITE CONTENT MANAGEMENT</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Website Sections & Copy Editor
          </h1>
          <p className="text-xs text-neutral-400 font-light mt-0.5">
            Modify any text, heading, bio, button or section on your landing page live.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button
            onClick={loadSiteContent}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5"
            title="Reload Content"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg shadow-amber-400/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            id="admin-cms-save-btn"
          >
            <Save className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
            <span>{saving ? 'Saving...' : 'Save All Website Changes'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Pills for Sections */}
      <div className="space-y-3 max-w-full">
        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-xs font-mono flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Select a section tab below, or use <strong>"★ ALL SECTIONS TOGETHER"</strong> to edit all sections on one page.</span>
          </div>
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-all ${
              activeSection === 'all'
                ? 'bg-amber-400 text-neutral-950 shadow-sm shadow-amber-400/20'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            {activeSection === 'all' ? '✓ Showing All Sections' : 'Show All Sections'}
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10 max-w-full">
          {[
            { id: 'all', label: '★ ALL SECTIONS TOGETHER', icon: LayoutDashboard },
            { id: 'hero', label: '1. Hero Header', icon: Sparkles },
            { id: 'work', label: '2. Portfolio Showcase', icon: Video },
            { id: 'about', label: '3. About / Bio', icon: FileText },
            { id: 'companies', label: '4. Travel Companies', icon: Building2 },
            { id: 'instagram', label: '5. Instagram Handles', icon: Instagram },
            { id: 'services', label: '6. Services Offered', icon: Video },
            { id: 'reviews', label: '7. Client Reviews & Feedback', icon: Star },
            { id: 'contact', label: '8. Contact Section', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 shadow-md shadow-amber-400/20'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 1: HERO */}
      {(activeSection === 'all' || activeSection === 'hero') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Hero Header Section Settings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Top Status Badge Text
              </label>
              <input
                type="text"
                value={content.hero.statusBadge}
                onChange={(e) => updateHero('statusBadge', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Subtitle Eyebrow Text
              </label>
              <input
                type="text"
                value={content.hero.subtitle}
                onChange={(e) => updateHero('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Main Big Title / Name Heading
              </label>
              <input
                type="text"
                value={content.hero.heading}
                onChange={(e) => updateHero('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-lg font-extrabold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Hero Description / Pitch
              </label>
              <textarea
                rows={3}
                value={content.hero.description}
                onChange={(e) => updateHero('description', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Button 1 Text (View Work)
              </label>
              <input
                type="text"
                value={content.hero.buttonWorkText}
                onChange={(e) => updateHero('buttonWorkText', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Button 2 Text (Contact)
              </label>
              <input
                type="text"
                value={content.hero.buttonContactText}
                onChange={(e) => updateHero('buttonContactText', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono mb-4">
              Hero Stats Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="block text-xs font-mono text-neutral-400">Stat 1</span>
                <input
                  type="text"
                  placeholder="Value (e.g. 50M+)"
                  value={content.hero.stat1Value}
                  onChange={(e) => updateHero('stat1Value', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={content.hero.stat1Label}
                  onChange={(e) => updateHero('stat1Label', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="block text-xs font-mono text-neutral-400">Stat 2</span>
                <input
                  type="text"
                  placeholder="Value (e.g. 250+)"
                  value={content.hero.stat2Value}
                  onChange={(e) => updateHero('stat2Value', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={content.hero.stat2Label}
                  onChange={(e) => updateHero('stat2Label', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="block text-xs font-mono text-neutral-400">Stat 3</span>
                <input
                  type="text"
                  placeholder="Value (e.g. 100%)"
                  value={content.hero.stat3Value}
                  onChange={(e) => updateHero('stat3Value', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={content.hero.stat3Label}
                  onChange={(e) => updateHero('stat3Label', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: PORTFOLIO SHOWCASE */}
      {(activeSection === 'all' || activeSection === 'work') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-400" />
              <span>Portfolio Showcase Section Headers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow Text
              </label>
              <input
                type="text"
                value={content.selectedWork?.eyebrow || 'PORTFOLIO SHOWCASE'}
                onChange={(e) => updateSelectedWork('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Main Heading Title
              </label>
              <input
                type="text"
                value={content.selectedWork?.heading || 'SELECTED WORK'}
                onChange={(e) => updateSelectedWork('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={content.selectedWork?.subtitle || 'A curated collection of cinematic travel reels, brand advertisements, and promotional video edits.'}
                onChange={(e) => updateSelectedWork('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: ABOUT */}
      {(activeSection === 'all' || activeSection === 'about') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <span>About / Storytelling Section Settings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow Text
              </label>
              <input
                type="text"
                value={content.about.eyebrow}
                onChange={(e) => updateAbout('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Main Heading Title
              </label>
              <input
                type="text"
                value={content.about.heading}
                onChange={(e) => updateAbout('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Bio Paragraph 1 (Lead Intro)
              </label>
              <textarea
                rows={3}
                value={content.about.bioParagraph1}
                onChange={(e) => updateAbout('bioParagraph1', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Bio Paragraph 2 (Details)
              </label>
              <textarea
                rows={4}
                value={content.about.bioParagraph2}
                onChange={(e) => updateAbout('bioParagraph2', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Key Strengths (4 Feature Boxes)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="block text-xs font-mono text-amber-400">Feature 1</span>
                <input
                  type="text"
                  value={content.about.feature1Title}
                  onChange={(e) => updateAbout('feature1Title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <textarea
                  rows={2}
                  value={content.about.feature1Desc}
                  onChange={(e) => updateAbout('feature1Desc', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="block text-xs font-mono text-amber-400">Feature 2</span>
                <input
                  type="text"
                  value={content.about.feature2Title}
                  onChange={(e) => updateAbout('feature2Title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <textarea
                  rows={2}
                  value={content.about.feature2Desc}
                  onChange={(e) => updateAbout('feature2Desc', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="block text-xs font-mono text-amber-400">Feature 3</span>
                <input
                  type="text"
                  value={content.about.feature3Title}
                  onChange={(e) => updateAbout('feature3Title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <textarea
                  rows={2}
                  value={content.about.feature3Desc}
                  onChange={(e) => updateAbout('feature3Desc', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="block text-xs font-mono text-amber-400">Feature 4</span>
                <input
                  type="text"
                  value={content.about.feature4Title}
                  onChange={(e) => updateAbout('feature4Title', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
                <textarea
                  rows={2}
                  value={content.about.feature4Desc}
                  onChange={(e) => updateAbout('feature4Desc', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: TRAVEL COMPANIES */}
      {(activeSection === 'all' || activeSection === 'companies') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-8">
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Travel Companies Collaborations Settings</span>
            </h2>

            <button
              onClick={addCompanyItem}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Company</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={content.travelCompanies.eyebrow}
                onChange={(e) => updateCompaniesMeta('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Main Heading
              </label>
              <input
                type="text"
                value={content.travelCompanies.heading}
                onChange={(e) => updateCompaniesMeta('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle
              </label>
              <textarea
                rows={2}
                value={content.travelCompanies.subtitle}
                onChange={(e) => updateCompaniesMeta('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* List of Travel Companies */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Collaborated Travel Companies ({content.travelCompanies.items.length})
            </h3>

            <div className="space-y-6">
              {content.travelCompanies.items.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 relative group"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-xs text-amber-400 font-bold">
                      #Company {idx + 1}
                    </span>
                    <button
                      onClick={() => deleteCompanyItem(idx)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      title="Delete Company"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateCompanyItem(idx, 'name', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Badge Tag (e.g. LUXURY RESORT ADS)
                      </label>
                      <input
                        type="text"
                        value={item.badge}
                        onChange={(e) => updateCompanyItem(idx, 'badge', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Location / Region
                      </label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => updateCompanyItem(idx, 'location', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Instagram / Web Link
                      </label>
                      <input
                        type="text"
                        value={item.companyUrl}
                        onChange={(e) => updateCompanyItem(idx, 'companyUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Description / Work Done
                      </label>
                      <textarea
                        rows={2}
                        value={item.description}
                        onChange={(e) => updateCompanyItem(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Company Image / Poster
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={item.imageUrl}
                          onChange={(e) => updateCompanyItem(idx, 'imageUrl', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                        />
                        <label className="px-3 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>
                            {uploadingImage === `comp-img-${idx}` ? 'Uploading...' : 'Upload Image'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(
                                  file,
                                  (url) => updateCompanyItem(idx, 'imageUrl', url),
                                  `comp-img-${idx}`
                                );
                              }
                            }}
                          />
                        </label>
                      </div>
                      {item.imageUrl && (
                        <div className="mt-2 w-32 h-20 rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add Travel Company Action */}
            <div className="pt-2">
              <button
                onClick={addCompanyItem}
                className="w-full py-4 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border-2 border-dashed border-amber-400/40 hover:border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Travel Company Collaboration</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: INSTAGRAM ACCOUNTS */}
      {(activeSection === 'all' || activeSection === 'instagram') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-8">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Instagram className="w-5 h-5 text-amber-400" />
              <span>Instagram Accounts Section Settings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={content.instagram.eyebrow}
                onChange={(e) => updateInstagramMeta('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Heading
              </label>
              <input
                type="text"
                value={content.instagram.heading}
                onChange={(e) => updateInstagramMeta('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={content.instagram.subtitle}
                onChange={(e) => updateInstagramMeta('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Quality Notice Banner Text
              </label>
              <textarea
                rows={2}
                value={content.instagram.qualityNotice}
                onChange={(e) => updateInstagramMeta('qualityNotice', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-200 text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Account 1 Details */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Instagram Account 1 (Primary Portfolio)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Account Name Title
                </label>
                <input
                  type="text"
                  value={content.instagram.account1.name}
                  onChange={(e) => updateInstagramAccount('account1', 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Instagram Handle (e.g. @shubh.travels)
                </label>
                <input
                  type="text"
                  value={content.instagram.account1.handle}
                  onChange={(e) => updateInstagramAccount('account1', 'handle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Reach Badge Text
                </label>
                <input
                  type="text"
                  value={content.instagram.account1.badge}
                  onChange={(e) => updateInstagramAccount('account1', 'badge', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Instagram Link URL
                </label>
                <input
                  type="text"
                  value={content.instagram.account1.link}
                  onChange={(e) => updateInstagramAccount('account1', 'link', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Bio / Account Description
                </label>
                <textarea
                  rows={2}
                  value={content.instagram.account1.bio}
                  onChange={(e) => updateInstagramAccount('account1', 'bio', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>
            </div>
          </div>

          {/* Account 2 Details */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Instagram Account 2 (Commercial Ads & Client Work)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Account Name Title
                </label>
                <input
                  type="text"
                  value={content.instagram.account2.name}
                  onChange={(e) => updateInstagramAccount('account2', 'name', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Instagram Handle (e.g. @shubh.ads)
                </label>
                <input
                  type="text"
                  value={content.instagram.account2.handle}
                  onChange={(e) => updateInstagramAccount('account2', 'handle', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Reach Badge Text
                </label>
                <input
                  type="text"
                  value={content.instagram.account2.badge}
                  onChange={(e) => updateInstagramAccount('account2', 'badge', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Instagram Link URL
                </label>
                <input
                  type="text"
                  value={content.instagram.account2.link}
                  onChange={(e) => updateInstagramAccount('account2', 'link', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                  Bio / Account Description
                </label>
                <textarea
                  rows={2}
                  value={content.instagram.account2.bio}
                  onChange={(e) => updateInstagramAccount('account2', 'bio', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: SERVICES */}
      {(activeSection === 'all' || activeSection === 'services') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Video className="w-5 h-5 text-amber-400" />
              <span>Services Offered Section Settings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={content.services.eyebrow}
                onChange={(e) => updateServicesMeta('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Main Heading
              </label>
              <input
                type="text"
                value={content.services.heading}
                onChange={(e) => updateServicesMeta('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle
              </label>
              <textarea
                rows={2}
                value={content.services.subtitle}
                onChange={(e) => updateServicesMeta('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono">
              Service Items ({content.services.items.length})
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.services.items.map((svc, idx) => (
                <div key={svc.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <span className="block text-xs font-mono text-amber-400 font-bold">
                    Service #{idx + 1} ({svc.id})
                  </span>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={svc.title}
                      onChange={(e) => updateServiceItem(idx, 'title', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white font-bold text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Subtitle Tagline
                    </label>
                    <input
                      type="text"
                      value={svc.subtitle}
                      onChange={(e) => updateServiceItem(idx, 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={svc.description}
                      onChange={(e) => updateServiceItem(idx, 'description', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-neutral-400 uppercase mb-1">
                      Feature Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      value={svc.tags.join(', ')}
                      onChange={(e) =>
                        updateServiceItem(
                          idx,
                          'tags',
                          e.target.value.split(',').map((t) => t.trim())
                        )
                      }
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: CLIENT REVIEWS & FEEDBACK */}
      {(activeSection === 'all' || activeSection === 'reviews') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-8">
          <div className="pb-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>Client Reviews, Feedback & Screenshots Settings</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-light">
                Add client testimonials, screenshot photos of messages/videos, star ratings and feedback quotes.
              </p>
            </div>

            <button
              onClick={addReviewItem}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-400/10"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow Tag
              </label>
              <input
                type="text"
                value={content.reviews?.eyebrow || '★ CLIENT TESTIMONIALS & FEEDBACK'}
                onChange={(e) => updateReviewsMeta('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Main Heading
              </label>
              <input
                type="text"
                value={content.reviews?.heading || 'WHAT MY TRAVEL CLIENTS SAY'}
                onChange={(e) => updateReviewsMeta('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-3">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle
              </label>
              <textarea
                rows={2}
                value={
                  content.reviews?.subtitle ||
                  'Real reviews, video project screenshots & ratings from travel brands, luxury resorts, and creators I edit for.'
                }
                onChange={(e) => updateReviewsMeta('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* List of Client Reviews */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-amber-300 uppercase font-mono flex items-center justify-between">
              <span>Client Reviews & Screenshots ({content.reviews?.items?.length || 0})</span>
            </h3>

            <div className="space-y-6">
              {(content.reviews?.items || []).map((review, idx) => (
                <div
                  key={review.id || idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-5 relative group"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="font-mono text-xs text-amber-400 font-bold flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      #Review {idx + 1} — {review.clientName || 'Client'}
                    </span>
                    <button
                      onClick={() => deleteReviewItem(idx)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer"
                      title="Delete Review"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Client / Brand Name
                      </label>
                      <input
                        type="text"
                        value={review.clientName}
                        onChange={(e) => updateReviewItem(idx, 'clientName', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm font-bold"
                        placeholder="e.g. Markus Vance"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Client Title / Role / Company
                      </label>
                      <input
                        type="text"
                        value={review.clientTitle}
                        onChange={(e) => updateReviewItem(idx, 'clientTitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                        placeholder="e.g. Founder, Alpine Treks"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Star Rating (1 to 5)
                      </label>
                      <select
                        value={review.rating || 5}
                        onChange={(e) => updateReviewItem(idx, 'rating', Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 font-mono text-xs font-bold"
                      >
                        <option value={5}>★★★★★ (5.0 Stars - Excellent)</option>
                        <option value={4.5}>★★★★½ (4.5 Stars - Very Good)</option>
                        <option value={4}>★★★★☆ (4.0 Stars - Good)</option>
                        <option value={3.5}>★★★½☆ (3.5 Stars)</option>
                        <option value={3}>★★★☆☆ (3.0 Stars)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Project Badge Tag
                      </label>
                      <input
                        type="text"
                        value={review.projectBadge || ''}
                        onChange={(e) => updateReviewItem(idx, 'projectBadge', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-amber-300 text-xs font-mono"
                        placeholder="e.g. REELS EDITING, 1M+ VIEWS"
                      />
                    </div>

                    <div className="md:col-span-3 space-y-2 p-4 rounded-xl bg-black/30 border border-white/10">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-mono text-amber-300 font-bold uppercase flex items-center gap-1.5">
                          <Film className="w-3.5 h-3.5 text-amber-400" />
                          <span>Video / Project URL / File (Watchable Proof)</span>
                        </label>
                        {review.videoUrl && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setPreviewingVideoUrl({ url: review.videoUrl!, title: review.clientName || 'Client Review Video' })}
                              className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>▶ Test & Play Video</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateReviewItem(idx, 'videoUrl', '')}
                              className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[10px] font-mono"
                              title="Clear Video"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                        <input
                          type="text"
                          value={review.videoUrl || ''}
                          onChange={(e) => updateReviewItem(idx, 'videoUrl', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-black/60 border border-white/10 text-white text-xs font-mono placeholder:text-neutral-500 focus:border-amber-400 focus:outline-none"
                          placeholder="Paste Instagram Reel / YouTube / Vimeo / Direct MP4 URL"
                        />

                        <label className="px-3.5 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold cursor-pointer transition-all flex items-center justify-center gap-1.5 shrink-0">
                          <Upload className="w-3.5 h-3.5" />
                          <span>
                            {uploadingImage === `review-vid-${idx}` ? 'Uploading...' : 'Upload Video File (.mp4)'}
                          </span>
                          <input
                            type="file"
                            accept="video/mp4,video/quicktime,video/webm,video/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleVideoUpload(
                                  file,
                                  (url) => updateReviewItem(idx, 'videoUrl', url),
                                  `review-vid-${idx}`
                                );
                              }
                            }}
                          />
                        </label>
                      </div>

                      <p className="text-[10px] text-neutral-400 font-mono">
                        💡 Tip: You can paste an Instagram Reel URL (e.g. https://instagram.com/reel/...), YouTube link, or upload an MP4 directly from your device. When users click this review on your website, the video will open immediately!
                      </p>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Review / Testimonial Text (What the client said)
                      </label>
                      <textarea
                        rows={3}
                        value={review.reviewText}
                        onChange={(e) => updateReviewItem(idx, 'reviewText', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-200 text-xs resize-none"
                        placeholder="Type what your client said or sent in message/video review..."
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label className="block text-[11px] font-mono text-neutral-400 uppercase mb-1">
                        Client Photo / Video Screenshot Proof Image
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={review.clientPicUrl}
                          onChange={(e) => updateReviewItem(idx, 'clientPicUrl', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-neutral-300 text-xs"
                          placeholder="Image URL or upload screenshot below"
                        />
                        <label className="px-3.5 py-2 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold cursor-pointer transition-all flex items-center gap-1.5 shrink-0">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>
                            {uploadingImage === `review-img-${idx}` ? 'Uploading...' : 'Upload Screenshot / Photo'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(
                                  file,
                                  (url) => updateReviewItem(idx, 'clientPicUrl', url),
                                  `review-img-${idx}`
                                );
                              }
                            }}
                          />
                        </label>
                      </div>
                      {review.clientPicUrl && (
                        <div className="mt-3 flex items-center gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-white/10 bg-neutral-900 shrink-0">
                            <img
                              src={review.clientPicUrl}
                              alt={review.clientName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-xs text-neutral-400 font-mono">
                            ✓ Screenshot/Photo loaded cleanly
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={addReviewItem}
                className="w-full py-4 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border-2 border-dashed border-amber-400/40 hover:border-amber-400 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Another Client Review / Screenshot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: CONTACT */}
      {(activeSection === 'all' || activeSection === 'contact') && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0D0E15] border border-white/10 space-y-6">
          <div className="pb-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400" />
              <span>Contact Section Settings</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Eyebrow
              </label>
              <input
                type="text"
                value={content.contact.eyebrow}
                onChange={(e) => updateContact('eyebrow', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Main Callout Heading
              </label>
              <input
                type="text"
                value={content.contact.heading}
                onChange={(e) => updateContact('heading', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Section Subtitle
              </label>
              <input
                type="text"
                value={content.contact.subtitle}
                onChange={(e) => updateContact('subtitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Direct Phone / Call Number
              </label>
              <input
                type="text"
                value={content.contact.phone || '+91 8178306611'}
                onChange={(e) => updateContact('phone', e.target.value)}
                placeholder="+91 8178306611"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-300 font-mono text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-emerald-400 mb-2 font-bold">
                WhatsApp Phone Number (Digits only, e.g. 8178306611)
              </label>
              <input
                type="text"
                value={content.contact.whatsapp || '8178306611'}
                onChange={(e) => updateContact('whatsapp', e.target.value)}
                placeholder="8178306611"
                className="w-full px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-sm focus:border-emerald-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-emerald-400 mb-2">
                WhatsApp Pre-filled Message (Default text when client clicks WhatsApp)
              </label>
              <input
                type="text"
                value={content.contact.whatsappMessage || 'Hi Shubh, I saw your portfolio and want to discuss a travel video editing project!'}
                onChange={(e) => updateContact('whatsappMessage', e.target.value)}
                placeholder="Hi Shubh, I saw your portfolio..."
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-mono uppercase text-amber-400 mb-2 font-bold flex items-center justify-between">
                <span>Formspree Endpoint URL (Direct Email Forwarding on Booking)</span>
                <span className="text-[10px] text-emerald-400 lowercase font-normal">Active: https://formspree.io/f/xnparlyz</span>
              </label>
              <input
                type="url"
                value={content.contact.formspreeUrl || 'https://formspree.io/f/xnparlyz'}
                onChange={(e) => updateContact('formspreeUrl', e.target.value)}
                placeholder="https://formspree.io/f/xnparlyz"
                className="w-full px-4 py-3 rounded-xl bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-sm focus:border-amber-400 focus:outline-none"
              />
              <p className="text-[11px] text-neutral-400 mt-1.5 font-light">
                Jab bhi koi client website pe form bharega, Formspree automatically unka naam, email, phone aur video requirements aapke email par bhej dega.
              </p>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Direct Contact Email Address
              </label>
              <input
                type="email"
                value={content.contact.email}
                onChange={(e) => updateContact('email', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-amber-300 font-mono text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Response Time Badge
              </label>
              <input
                type="text"
                value={content.contact.responseTimeText}
                onChange={(e) => updateContact('responseTimeText', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Instagram Profile 1 Handle (e.g. @wonderwithshuuu)
              </label>
              <input
                type="text"
                value={content.contact.instagram1Handle}
                onChange={(e) => updateContact('instagram1Handle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Instagram Profile 1 URL
              </label>
              <input
                type="text"
                value={content.contact.instagram1Url}
                onChange={(e) => updateContact('instagram1Url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Instagram Profile 2 Handle (e.g. @roamwithakshay)
              </label>
              <input
                type="text"
                value={content.contact.instagram2Handle}
                onChange={(e) => updateContact('instagram2Handle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-neutral-400 mb-2">
                Instagram Profile 2 URL
              </label>
              <input
                type="text"
                value={content.contact.instagram2Url}
                onChange={(e) => updateContact('instagram2Url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-neutral-300 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Video Preview / Test Modal */}
      {previewingVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#0E0F17] border border-amber-400/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <h3 className="text-sm font-bold text-white truncate max-w-[280px]">
                  {previewingVideoUrl.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewingVideoUrl(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-[9/16] max-h-[65vh] mx-auto rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center relative">
              {(() => {
                const url = previewingVideoUrl.url;
                const instaMatch = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/i);
                if (instaMatch) {
                  return (
                    <iframe
                      src={`https://www.instagram.com/${instaMatch[1]}/${instaMatch[2]}/embed/`}
                      title="Instagram Reel Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  );
                }
                const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]+)/i);
                if (ytMatch) {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`}
                      title="YouTube Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  );
                }
                const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
                if (vimeoMatch) {
                  return (
                    <iframe
                      src={`https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`}
                      title="Vimeo Preview"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  );
                }
                return (
                  <video
                    src={url}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain"
                  />
                );
              })()}
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={previewingVideoUrl.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-amber-300 hover:underline flex items-center gap-1 font-mono"
              >
                <span>Open Direct Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setPreviewingVideoUrl(null)}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
