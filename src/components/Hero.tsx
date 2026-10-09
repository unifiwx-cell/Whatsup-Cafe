import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, ChevronDown, Sparkles, Star, Clock, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export function Hero({ onOpenReservation, onExploreMenu }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax and scale transforms driven by scrolling
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[98vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Background Image with Cinematic Scroll Parallax */}
      <motion.div
        style={{ y: yBg, scale: scaleBg }}
        className="absolute inset-0 z-0 origin-center pointer-events-none will-change-transform"
      >
        <img
          src="/images/hero_rooftop.jpg"
          alt="WhatsUp Cafe Southern Avenue Kolkata Rooftop Lounge at Night"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08]"
          referrerPolicy="no-referrer"
        />
        {/* Multilayer gradient scrim for WCAG AA text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-[#10110F]/60 to-black/55" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#10110F]/30 to-[#10110F]/80" />
      </motion.div>

      {/* Hero Content with Smooth Scroll Fade */}
      <motion.div
        style={{ opacity: opacityContent, y: yContent }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full"
      >
        <div className="max-w-4xl">
          
          {/* Location & Brand Kicker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/80 font-medium tracking-widest uppercase mb-4"
          >
            <span className="text-[#FF5500] flex items-center gap-1.5 font-bold">
              <MapPin className="w-3.5 h-3.5" />
              SOUTHERN AVENUE
            </span>
            <span className="text-white/40" aria-hidden="true">·</span>
            <span>KOLKATA</span>
            <span className="text-white/40" aria-hidden="true">·</span>
            <span className="font-bengali text-[#D9A35D] tracking-normal capitalize font-semibold">
              {CAFE_INFO.bengaliName}
            </span>
          </motion.div>

          {/* Official Attached Logo - Prominently Displayed as Name of the Cafe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6"
          >
            <div className="inline-block relative">
              <img
                src="/logo.png"
                alt="WhatsUp Cafe Logo"
                className="h-14 sm:h-20 md:h-24 lg:h-28 w-auto object-contain filter drop-shadow-[0_8px_36px_rgba(255,85,0,0.35)] brightness-110"
              />
              <div className="font-bengali text-sm sm:text-base text-[#D9A35D] font-semibold mt-1 tracking-normal">
                {CAFE_INFO.bengaliName} · রুফটপ লাউঞ্জ অ্যান্ড ক্যাফে
              </div>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[0.98] mb-6 select-none"
          >
            KOLKATA,
            <br />
            <span className="font-serif-luxury italic font-normal text-[#F6F2E9] tracking-normal">
              LET'S GO
            </span>{' '}
            <span className="text-[#FF5500]">OUT.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-xl md:text-2xl text-white/80 font-light max-w-2xl leading-relaxed mb-8"
          >
            Good food, signature drinks and rooftop evenings worth staying out for. Overlooking the city lights from the heart of Southern Avenue.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4 sm:gap-5 mb-10"
          >
            <button
              type="button"
              onClick={onExploreMenu}
              className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5500] hover:bg-[#e64a00] transition-all rounded-sm flex items-center gap-2 shadow-[0_0_30px_rgba(255,85,0,0.35)] hover:shadow-[0_0_40px_rgba(255,85,0,0.55)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore The Menu</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenReservation}
              className="px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F6F2E9] border border-white/30 hover:border-[#FF5500] hover:text-[#FF5500] bg-black/40 backdrop-blur-sm transition-all rounded-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              Book Your Table
            </button>
          </motion.div>

          {/* Unboxed Metadata Proof Strip (Zero Pill Rule) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-6 text-xs sm:text-sm text-white/70"
          >
            <div className="flex items-center gap-1.5 text-white font-medium">
              <Star className="w-4 h-4 text-[#D9A35D] fill-[#D9A35D]" />
              <span className="font-bold text-white">4.4</span>
              <span className="text-white/40">/</span>
              <span className="text-white/60">11,343 Google Reviews</span>
            </div>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Open Daily: 12:00 PM – 12:30 AM</span>
            </div>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5 text-white/70">
              <Sparkles className="w-3.5 h-3.5 text-[#D9A35D]" />
              <span>Rooftop Views & Live Music</span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll Into The Vibe Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none opacity-80"
      >
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/60">
          Scroll Into The Vibe
        </span>
        <ChevronDown className="w-4 h-4 text-[#FF5500]" />
      </motion.div>
    </section>
  );
}
