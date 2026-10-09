import { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GALLERY_HIGHLIGHTS } from '../data/cafeData';

export function FoodGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScrollTo = (index: number) => {
    setActiveSlide(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 380;
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + 24),
        behavior: 'smooth',
      });
    }
  };

  const handleNext = () => {
    const next = Math.min(activeSlide + 1, GALLERY_HIGHLIGHTS.length - 1);
    handleScrollTo(next);
  };

  const handlePrev = () => {
    const prev = Math.max(activeSlide - 1, 0);
    handleScrollTo(prev);
  };

  return (
    <section className="relative bg-[#1B1D19] text-[#F6F2E9] py-24 sm:py-32 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
              Signature Highlights · স্বাদের অভিযান
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              A LITTLE BIT OF EVERYTHING.
              <br />
              <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
                A LOT OF
              </span>{' '}
              <span>FLAVOUR.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              A curated visual walkthrough of WhatsUp Cafe's most loved charcoal grills, pasta pans, drinks, and rooftop vignettes.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={activeSlide === 0}
              aria-label="Previous Slide"
              className="p-3 rounded-full border border-white/20 text-white hover:border-[#FF5500] hover:text-[#FF5500] disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={activeSlide === GALLERY_HIGHLIGHTS.length - 1}
              aria-label="Next Slide"
              className="p-3 rounded-full border border-white/20 text-white hover:border-[#FF5500] hover:text-[#FF5500] disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Viewport */}
      <div className="w-full pl-4 sm:pl-6 lg:pl-[max(1rem,calc((100vw-80rem)/2+2rem))] pr-4 overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8"
        >
          {GALLERY_HIGHLIGHTS.map((item, index) => (
            <div
              key={item.number}
              className="group relative flex-none w-[300px] sm:w-[380px] md:w-[420px] rounded-sm overflow-hidden bg-[#10110F] border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src = 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';
                    }
                  }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-transparent to-transparent opacity-90" />
                
                {/* Numerical Indicator */}
                <div className="absolute top-4 left-4 font-mono text-2xl font-black text-white/90 drop-shadow-md">
                  {item.number}
                </div>

                <div className="absolute top-4 right-4 text-[11px] uppercase tracking-widest text-[#FF5500] font-semibold bg-black/60 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                  {item.category}
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-bold text-white group-hover:text-[#FF5500] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 text-[11px] uppercase tracking-wider text-[#D9A35D] font-semibold">
                  WhatsUp Cafe · Southern Avenue
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Dots / Bars */}
        <div className="flex items-center gap-2 mt-4 max-w-7xl mx-auto px-4 sm:px-6">
          {GALLERY_HIGHLIGHTS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleScrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeSlide === i ? 'w-10 bg-[#FF5500]' : 'w-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
