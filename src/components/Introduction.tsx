import { motion } from 'motion/react';
import { ArrowRight, Flame, Music, Utensils, Wine } from 'lucide-react';

interface IntroductionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export function Introduction({ onOpenReservation, onExploreMenu }: IntroductionProps) {
  return (
    <section className="relative bg-[#F6F2E9] text-[#10110F] py-24 sm:py-32 overflow-hidden">
      {/* Decorative subtle ambient typography */}
      <div 
        className="absolute -top-12 -right-8 text-[120px] sm:text-[180px] lg:text-[240px] font-black text-[#10110F]/[0.03] select-none pointer-events-none tracking-tighter leading-none"
        aria-hidden="true"
      >
        VIBE
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs uppercase font-bold tracking-[0.2em] text-[#777B53]">
                <span>Southern Avenue Experience</span>
                <span className="w-8 h-px bg-[#777B53]/40" />
                <span className="font-bengali tracking-normal text-sm text-[#10110F]/70">হোয়াটসআপ ক্যাফে</span>
              </div>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-[#10110F]">
                NOT JUST A PLACE.
                <br />
                <span className="font-serif-luxury italic font-normal text-[#777B53]">
                  A WHOLE
                </span>{' '}
                <span>MOOD.</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#10110F]/80 font-normal leading-relaxed max-w-xl">
              From relaxed afternoons overlooking the calm greenery of Rabindra Sarobar to lively rooftop evenings under open Kolkata skies, WhatsUp Cafe brings food, craft drinks, acoustic music, and people together in the cultural heart of South Kolkata.
            </p>

            {/* Experience Pillars - Clean Unboxed Layout */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#10110F]/10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#10110F] font-bold text-sm">
                  <Wine className="w-4 h-4 text-[#777B53]" />
                  <span>Curated Bar & Spirits</span>
                </div>
                <p className="text-xs text-[#10110F]/65 leading-relaxed">
                  Artisanal Mojitos, Mai Tais, craft mocktails, and nightcaps poured by expert mixologists.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#10110F] font-bold text-sm">
                  <Flame className="w-4 h-4 text-[#D9A35D]" />
                  <span>Sizzling Tandoor & Wok</span>
                </div>
                <p className="text-xs text-[#10110F]/65 leading-relaxed">
                  From juicy tandoori kebab platters to Aglio e Olio and hand-stretched pizzas.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#10110F] font-bold text-sm">
                  <Music className="w-4 h-4 text-[#777B53]" />
                  <span>Live Sounds & Chill</span>
                </div>
                <p className="text-xs text-[#10110F]/65 leading-relaxed">
                  Acoustic sets, weekend lounge playlists, and an easygoing social rhythm.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#10110F] font-bold text-sm">
                  <Utensils className="w-4 h-4 text-[#D9A35D]" />
                  <span>Open-Air Dining</span>
                </div>
                <p className="text-xs text-[#10110F]/65 leading-relaxed">
                  Breezy rooftop cabanas opposite Nazrul Manch with panoramic city views.
                </p>
              </div>
            </div>

            {/* Editorial CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-white bg-[#10110F] hover:bg-[#1B1D19] transition-all rounded-sm flex items-center gap-2 shadow-lg"
              >
                <span>Book Your Evening</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4FF45]" />
              </button>
              
              <button
                type="button"
                onClick={onExploreMenu}
                className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#10110F] hover:text-[#777B53] transition-colors"
              >
                Explore Dining Highlights →
              </button>
            </div>
          </motion.div>

          {/* Right Column: Asymmetric Layered Imagery with Scroll Reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Primary Large Lifestyle Image */}
              <div className="relative rounded-sm overflow-hidden shadow-2xl border-4 border-white bg-neutral-200">
                <img
                  src="/src/assets/images/whatsup_intro_lifestyle_1791547826311.jpg"
                  alt="Friends enjoying rooftop lounge evening at WhatsUp Cafe Kolkata"
                  className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-sm text-white px-4 py-2.5 rounded-sm flex items-center justify-between text-xs">
                  <span className="font-semibold tracking-wide">Rooftop Evenings · Southern Avenue</span>
                  <span className="text-[#D4FF45] font-mono text-[11px]">Since 2015</span>
                </div>
              </div>

              {/* Secondary Overlapping Cocktail Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-10 -left-6 sm:-left-10 w-48 sm:w-60 rounded-sm overflow-hidden shadow-2xl border-4 border-white bg-neutral-900 z-20"
              >
                <img
                  src="/src/assets/images/whatsup_cocktails_drinks_1791547864350.jpg"
                  alt="Artisanal cocktails served at WhatsUp Cafe"
                  className="w-full h-44 sm:h-52 object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-[#10110F] text-white px-3 py-2 text-[11px] font-medium flex items-center justify-between">
                  <span className="text-white/80">Signature Mixology</span>
                  <span className="text-[#D9A35D]">Craft Bar</span>
                </div>
              </motion.div>

              {/* Decorative accent frame */}
              <div className="absolute -top-4 -right-4 w-32 h-32 border-2 border-[#777B53]/30 -z-10 rounded-sm" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
