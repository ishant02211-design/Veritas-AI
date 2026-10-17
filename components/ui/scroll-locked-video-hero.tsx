import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown, Volume2, VolumeX, Play, Pause, ArrowRight, Compass } from "lucide-react";

export interface MetroHeroProps {
  videoSrc?: string;
  posterSrc?: string;
  headline?: string;
  tagline?: string;
  onExploreClick?: () => void;
  className?: string;
}

export default function MetroHero({
  videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  posterSrc = "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2000&q=80",
  headline = "THE CITY OPENS",
  tagline = "Every door in the city is already open.",
  onExploreClick,
  className = "",
}: MetroHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Sticky Scroll Scrubbing Logic
  useEffect(() => {
    let animationFrameId: number;
    let isTicking = false;

    const handleScroll = () => {
      if (!isTicking) {
        animationFrameId = requestAnimationFrame(() => {
          if (!containerRef.current) {
            isTicking = false;
            return;
          }

          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalDistance = rect.height - windowHeight;

          if (totalDistance <= 0) {
            isTicking = false;
            return;
          }

          // Calculate how far we've scrolled inside this container
          // rect.top starts at 0 and goes down to -totalDistance
          const scrolled = -rect.top;
          const rawProgress = scrolled / totalDistance;
          const clamped = Math.max(0, Math.min(1, rawProgress));

          setProgress(clamped);

          // Update video playback time directly without React re-render lag
          const video = videoRef.current;
          if (video && video.duration && !prefersReducedMotion && !videoError) {
            const targetTime = clamped * video.duration;
            // Prevent excessive seeks if difference is infinitesimal
            if (Math.abs(video.currentTime - targetTime) > 0.04) {
              video.currentTime = targetTime;
            }
          }

          isTicking = false;
        });
        isTicking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, videoError]);

  // Handle video metadata loaded
  const handleLoadedData = () => {
    setIsVideoLoaded(true);
    setVideoError(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const handleVideoError = () => {
    console.warn("Hero video failed to load, falling back to cinematic poster visual.");
    setVideoError(true);
  };

  // Skip scroll to end of hero
  const handleSkipToContent = () => {
    if (onExploreClick) {
      onExploreClick();
      return;
    }

    if (containerRef.current) {
      const targetPos = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({
        top: targetPos,
        behavior: "smooth",
      });
    }
  };

  // Visual interpolations based on progress
  const headlineOpacity = Math.max(0, 1 - progress * 2.2);
  const headlineTranslateY = progress * -40;

  const taglineOpacity = Math.max(0, Math.min(1, (progress - 0.38) * 2.5));
  const taglineTranslateY = (1 - Math.max(0, Math.min(1, (progress - 0.38) * 2.5))) * 30;

  const zoomScale = 1 + progress * 0.08;
  const blurFilter = Math.max(0, (progress - 0.75) * 6);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[320vh] bg-[#05070D] ${className}`}
      data-testid="metro-hero-track"
    >
      {/* Sticky Fullscreen Viewport Layer */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none">
        {/* Background Video / Fallback Poster with subtle zoom & blur */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${zoomScale})`,
            filter: `blur(${blurFilter}px)`,
          }}
        >
          {/* Fallback poster image always beneath */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${posterSrc})` }}
          />

          {/* Cinematic Video Element */}
          {!videoError && (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              muted={isMuted}
              playsInline
              preload="auto"
              onLoadedData={handleLoadedData}
              onError={handleVideoError}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Cinematic Dark Gradient Overlays for optimal text contrast & depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070D] via-[#05070D]/40 to-[#05070D]/80 pointer-events-none" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#05070D]/50 to-[#05070D]/90 pointer-events-none" />
        </div>

        {/* Top Minimal Navigation Bar inside Hero */}
        <header className="relative z-20 w-full px-6 sm:px-12 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/90 font-medium">
              METROPOLIS &middot; CINEMATIQUE
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden sm:inline-block font-mono text-[11px] text-white/50 uppercase tracking-widest">
              SCENE 01 / PROLOGUE
            </span>
            <button
              onClick={handleSkipToContent}
              className="text-xs uppercase tracking-widest text-white/70 hover:text-white px-3 py-1.5 rounded-full border border-white/20 hover:border-white/50 backdrop-blur-sm transition-all cursor-pointer"
            >
              Skip Intro
            </button>
          </div>
        </header>

        {/* Center Stage: Dynamic Kinetic Headlines */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto pointer-events-none">
          {/* Main Headline */}
          <div
            className="transition-all duration-150 ease-out"
            style={{
              opacity: headlineOpacity,
              transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
            }}
          >
            <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.4em] text-white/60 mb-4 block">
              AN URBAN SYMPHONY
            </span>
            <h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.03em] uppercase leading-[0.9] drop-shadow-2xl">
              {headline}
            </h1>
          </div>

          {/* Secondary Supporting Tagline (revealed as video scrubs to latter half) */}
          <div
            className="absolute max-w-2xl px-6 transition-all duration-200 ease-out pointer-events-auto"
            style={{
              opacity: taglineOpacity,
              transform: `translate3d(0, ${taglineTranslateY}px, 0)`,
              pointerEvents: taglineOpacity > 0.4 ? "auto" : "none",
            }}
          >
            <p className="text-white/95 text-xl sm:text-2xl md:text-3xl font-light italic tracking-wide leading-relaxed drop-shadow-lg">
              "{tagline}"
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={handleSkipToContent}
                className="px-6 py-3 rounded-full bg-white text-[#05070D] font-medium text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                <span>Enter The Archive</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Progress Indicator & Minimal Scroll Hint */}
        <div className="relative z-20 w-full px-6 sm:px-12 py-8 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-mono text-white/60 uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="text-white font-bold">{Math.round(progress * 100)}%</span>
              <span className="text-white/30">|</span>
              <span className="hidden sm:inline">VIDEO SCRUB RATIO</span>
            </div>

            <button
              onClick={handleSkipToContent}
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer group"
            >
              <span>{progress > 0.85 ? "Scroll To Explore" : "Scroll Down To Scrub"}</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce" />
            </button>
          </div>

          {/* Thin Progress Bar Tracking Scrub Position */}
          <div className="w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-white transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { MetroHero };
