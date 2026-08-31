import React, { useState, useRef, useEffect } from 'react';
import { VideoItem } from '../types';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Building2,
  Clock,
  MessageSquare,
  ExternalLink,
} from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onContactClick: () => void;
}

function parseVideoEmbed(url: string) {
  if (!url) return { isEmbed: false, embedUrl: '', provider: 'none' };

  // Instagram Reel / Post
  const instaMatch = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/i);
  if (instaMatch) {
    const type = instaMatch[1];
    const code = instaMatch[2];
    return {
      isEmbed: true,
      embedUrl: `https://www.instagram.com/${type}/${code}/embed/`,
      provider: 'Instagram',
    };
  }

  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]+)/i);
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      isEmbed: true,
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
      provider: 'YouTube',
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?([0-9]+)/i);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      isEmbed: true,
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1`,
      provider: 'Vimeo',
    };
  }

  return { isEmbed: false, embedUrl: url, provider: 'HTML5' };
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose, onContactClick }) => {
  if (!video) return null;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [durationTime, setDurationTime] = useState('0:00');

  const embedInfo = parseVideoEmbed(video.videoUrl);

  useEffect(() => {
    // Handle Esc key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setProgress((cur / dur) * 100);

    const formatTime = (timeInSec: number) => {
      const min = Math.floor(timeInSec / 60);
      const sec = Math.floor(timeInSec % 60);
      return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    setCurrentTime(formatTime(cur));
    setDurationTime(formatTime(dur));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const dur = videoRef.current.duration || 1;
    videoRef.current.currentTime = (seekPercent / 100) * dur;
    setProgress(seekPercent);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto"
      id="video-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl bg-[#090A0F] border border-white/15 rounded-3xl overflow-hidden shadow-2xl shadow-black/90 flex flex-col my-auto max-h-[92vh]"
        id="video-modal-content"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0D0E15] shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono tracking-widest uppercase">
              {video.category}
            </span>
            <h3 className="text-white font-bold text-sm md:text-base line-clamp-1">{video.title}</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            id="video-modal-close-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full bg-black flex items-center justify-center group overflow-hidden min-h-[300px] max-h-[65vh]">
          {embedInfo.isEmbed ? (
            embedInfo.provider === 'Instagram' ? (
              <div className="w-full h-[540px] max-h-[60vh] flex items-center justify-center bg-neutral-950 p-2">
                <iframe
                  src={embedInfo.embedUrl}
                  title={video.title}
                  className="w-full max-w-[400px] h-full rounded-2xl border-0 shadow-2xl"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-black">
                <iframe
                  src={embedInfo.embedUrl}
                  title={video.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )
          ) : (
            <>
              <video
                ref={videoRef}
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                autoPlay
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full aspect-video object-contain cursor-pointer"
              />

              {/* Minimal Controls Bar for HTML5 video */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 opacity-100 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-neutral-400 min-w-[36px]">{currentTime}</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress || 0}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400 hover:h-2 transition-all"
                  />
                  <span className="text-[11px] font-mono text-neutral-400 min-w-[36px]">{durationTime}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 rounded-full bg-amber-400 text-neutral-950 hover:bg-amber-300 transition-transform active:scale-95 cursor-pointer"
                      id="video-control-play"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current translate-x-0.5" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      id="video-control-mute"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    id="video-control-fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Video Info & CTA */}
        <div className="p-5 sm:p-6 bg-[#090A0F] border-t border-white/10 overflow-y-auto shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400 mb-2">
                {video.client && (
                  <span className="flex items-center gap-1 text-amber-300">
                    <Building2 className="w-3.5 h-3.5" /> Client: {video.client}
                  </span>
                )}
                {video.duration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" /> Length: {video.duration}
                  </span>
                )}
                {embedInfo.isEmbed && (
                  <a
                    href={video.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-amber-400 hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" /> Open in {embedInfo.provider}
                  </a>
                )}
              </div>
              <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">{video.description}</p>
            </div>

            <button
              onClick={() => {
                onClose();
                onContactClick();
              }}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Request Similar Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
