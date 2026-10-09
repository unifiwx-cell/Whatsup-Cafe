import { useState } from 'react';
import { ArrowUpRight, Compass, Moon, Sun, Wind } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface RooftopExperienceProps {
  onOpenReservation: () => void;
}

export function RooftopExperience({ onOpenReservation }: RooftopExperienceProps) {
  const [timeMode, setTimeMode] = useState<'golden' | 'night'>('night');

  return (
    <section id="rooftop" className="relative bg-[#10110F] text-[#F6F2E9] py-24 sm:py-32 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#D4FF45]">
              <Compass className="w-3.5 h-3.5" />
              <span>Open-Air Sky Terrace · ছাদের মায়াবী দৃশ্য</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              UP HERE,
              <br />
              <span className="font-serif-luxury italic font-normal text-[#D4FF45]">
                TIME SLOWS
              </span>{' '}
              <span>DOWN.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70">
              City views, good company and evenings that turn into memories. Perched atop Southern Avenue opposite Nazrul Manch, the terrace catches the evening breeze off the lakes.
            </p>
          </div>

          {/* Golden Hour vs After Dark Toggle */}
          <div className="flex items-center gap-2 p-1 bg-[#1B1D19] border border-white/15 rounded-sm">
            <button
              type="button"
              onClick={() => setTimeMode('golden')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                timeMode === 'golden'
                  ? 'bg-[#D9A35D] text-[#10110F] shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Golden Hour (5:30 PM)</span>
            </button>
            <button
              type="button"
              onClick={() => setTimeMode('night')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all flex items-center gap-2 cursor-pointer ${
                timeMode === 'night'
                  ? 'bg-[#D4FF45] text-[#10110F] shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>After Dark (9:00 PM)</span>
            </button>
          </div>
        </div>

        {/* Cinematic Rooftop Stage */}
        <div className="relative rounded-sm overflow-hidden border border-white/15 shadow-2xl bg-[#161714]">
          <div className="relative h-[420px] sm:h-[540px] lg:h-[620px] overflow-hidden">
            {/* Conditional Cross-fade image */}
            <img
              src={
                timeMode === 'golden'
                  ? '/src/assets/images/whatsup_rooftop_sunset_1791547875878.jpg'
                  : '/src/assets/images/whatsup_hero_rooftop_1791547809865.jpg'
              }
              alt="WhatsUp Cafe Rooftop View Kolkata"
              className="w-full h-full object-cover transition-all duration-700 filter brightness-90"
              referrerPolicy="no-referrer"
            />

            {/* Dark Scrim overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-black/30 to-black/30" />

            {/* Floating Editorial Annotations */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2 text-[11px] font-mono uppercase tracking-widest text-white/90">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 rounded-xs">
                ROOFTOP · 5TH FLOOR
              </span>
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20 rounded-xs text-[#D4FF45]">
                {timeMode === 'golden' ? 'GOLDEN HOUR AMBIENCE' : 'CITY LIGHTS & LIVE SOUNDS'}
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1 max-w-xl bg-black/60 backdrop-blur-md p-4 rounded-sm border border-white/10">
                <div className="flex items-center gap-2 text-[#D4FF45] text-xs font-bold tracking-widest uppercase">
                  <Wind className="w-3.5 h-3.5" />
                  <span>Southern Avenue Breeze</span>
                </div>
                <p className="text-white text-sm sm:text-base font-medium">
                  {timeMode === 'golden'
                    ? 'Watch the sky turn apricot and rose gold over South Kolkata while sipping fresh citrus mocktails.'
                    : 'The iconic strings of warm fairy lights glow under the night sky while acoustic guitars play into the midnight.'}
                </p>
                <div className="text-[11px] text-white/50 pt-1 font-mono">
                  Opposite Nazrul Manch · Lake Canopy Panorama
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3.5 text-xs font-bold tracking-wider uppercase text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] transition-all rounded-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,255,69,0.3)] whitespace-nowrap"
              >
                <span>Experience The Rooftop</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Experience Anchors below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-[#1B1D19] border border-white/10 rounded-sm space-y-2">
            <div className="text-xs font-bold tracking-widest text-[#D4FF45] uppercase">
              01 · Panoramic Seating
            </div>
            <h3 className="text-lg font-bold text-white">Rooftop Deck & Balcony</h3>
            <p className="text-xs text-white/65 leading-relaxed">
              Open-air wooden decking with comfortable sofa booths and high cocktail tables overlooking Southern Avenue.
            </p>
          </div>

          <div className="p-6 bg-[#1B1D19] border border-white/10 rounded-sm space-y-2">
            <div className="text-xs font-bold tracking-widest text-[#D9A35D] uppercase">
              02 · Weather Protected
            </div>
            <h3 className="text-lg font-bold text-white">All-Weather Canopy</h3>
            <p className="text-xs text-white/65 leading-relaxed">
              Retractable pergolas and an adjoining air-conditioned glass lounge so you enjoy the vibe rain or shine.
            </p>
          </div>

          <div className="p-6 bg-[#1B1D19] border border-white/10 rounded-sm space-y-2">
            <div className="text-xs font-bold tracking-widest text-[#777B53] uppercase">
              03 · Late Hours
            </div>
            <h3 className="text-lg font-bold text-white">Open Till 12:30 AM</h3>
            <p className="text-xs text-white/65 leading-relaxed">
              Serving our full food and cocktail menu late into the night for dinners, after-parties, and midnight dessert runs.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
