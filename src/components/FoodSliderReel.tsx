import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Utensils, Play, Pause, ArrowRight, ArrowLeft } from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';

interface FoodSliderReelProps {
  onOpenOrder: () => void;
  onOpenReservation: () => void;
}

export function FoodSliderReel({ onOpenOrder, onOpenReservation }: FoodSliderReelProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');

  // Filter items that have dedicated high-res images
  const sliderItems = MENU_ITEMS.filter((item) => item.imageUrl);

  // Duplicate items 4 times to guarantee a seamless, infinite loop on any screen width
  const duplicatedItems = [...sliderItems, ...sliderItems, ...sliderItems, ...sliderItems];

  const animationX = direction === 'left-to-right' ? ['-50%', '0%'] : ['0%', '-50%'];

  return (
    <section className="relative bg-[#0D0E0C] text-[#F6F2E9] py-20 sm:py-28 overflow-hidden border-t border-white/10 select-none">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Signature Plates in Motion · বিশেষ খাবারের সমাহার</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              SLIDING INTO <span className="text-[#FF5500]">FLAVOUR.</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Fresh off the tandoor coals, stone oven, and mixology station. Hover any dish to pause and explore.
            </p>
          </div>

          {/* Controls: Pause / Play & Direction */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label={isPaused ? 'Resume Sliding' : 'Pause Sliding'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#FF5500]" /> : <Pause className="w-3.5 h-3.5 text-[#FF5500]" />}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>

            <button
              type="button"
              onClick={() => setDirection(direction === 'left-to-right' ? 'right-to-left' : 'left-to-right')}
              className="px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Reverse Slide Direction"
            >
              {direction === 'left-to-right' ? (
                <>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Left → Right</span>
                </>
              ) : (
                <>
                  <ArrowLeft className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Right → Left</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Sliding Reel from Left to Right */}
      <div 
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle Edge Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0D0E0C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0D0E0C] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={isPaused ? false : { x: animationX }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 38,
          }}
          className="flex gap-6 will-change-transform"
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative flex-none w-[280px] sm:w-[320px] rounded-sm overflow-hidden bg-[#161714] border border-white/10 hover:border-[#FF5500]/70 hover:shadow-[0_8px_30px_rgba(255,85,0,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Dish Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161714] via-transparent to-transparent opacity-80" />

                {/* Dietary Indicator */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-xs border border-white/10 flex items-center gap-1.5 text-[11px] font-mono">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.diet === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <span className="uppercase text-white/90 text-[10px]">
                    {item.diet === 'veg' ? 'Veg' : 'Non-Veg'}
                  </span>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 right-3 text-[10px] font-mono uppercase tracking-widest text-[#FF5500] font-semibold bg-black/75 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/10">
                  {item.category}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-2.5 right-3 bg-[#FF5500] text-white px-2.5 py-0.5 rounded-xs font-mono font-bold text-xs shadow-md">
                  ₹{item.price}
                </div>
              </div>

              {/* Dish Info */}
              <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-white group-hover:text-[#FF5500] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  {item.bengaliName && (
                    <div className="font-bengali text-xs text-[#D9A35D] mt-0.5">
                      {item.bengaliName}
                    </div>
                  )}
                  <p className="text-xs text-white/60 line-clamp-2 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenOrder();
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#FF5500] hover:text-white transition-colors cursor-pointer"
                  >
                    Order Doorstep →
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReservation();
                    }}
                    className="text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-[#D9A35D] transition-colors cursor-pointer"
                  >
                    Dine In
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
