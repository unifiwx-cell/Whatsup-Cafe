import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Utensils,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Hand,
  Zap,
} from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';

interface FoodSliderReelProps {
  onOpenOrder: () => void;
  onOpenReservation: () => void;
}

export function FoodSliderReel({ onOpenOrder, onOpenReservation }: FoodSliderReelProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<'left-to-right' | 'right-to-left'>('left-to-right');
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.6); // Default to fast & smoother
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const momentumFrameId = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Drag tracking refs
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const isDraggingRef = useRef(false);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const pointerVelocity = useRef(0);
  const hasDraggedFar = useRef(false);
  const lastTimestamp = useRef<number | null>(null);

  // Filter items with images
  const sliderItems = MENU_ITEMS.filter((item) => item.imageUrl);

  // 3 duplicate sets ensure an infinite loop in both left and right directions
  const duplicatedItems = [...sliderItems, ...sliderItems, ...sliderItems];

  // Helper to wrap scroll position cleanly
  const checkAndWrap = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const oneSetWidth = el.scrollWidth / 3;
    if (oneSetWidth <= 0) return;

    if (el.scrollLeft >= oneSetWidth * 2) {
      el.scrollLeft -= oneSetWidth;
      if (isDraggingRef.current) {
        dragStartScroll.current -= oneSetWidth;
      }
    } else if (el.scrollLeft <= 50) {
      el.scrollLeft += oneSetWidth;
      if (isDraggingRef.current) {
        dragStartScroll.current += oneSetWidth;
      }
    }
  }, []);

  // Initialize scroll position in the middle set on mount
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Small delay to ensure children layout is computed
    const timer = setTimeout(() => {
      const oneSetWidth = el.scrollWidth / 3;
      if (oneSetWidth > 0 && el.scrollLeft === 0) {
        el.scrollLeft = oneSetWidth;
      }
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Smooth continuous auto-scroll via requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tick = (timestamp: number) => {
      if (lastTimestamp.current === null) {
        lastTimestamp.current = timestamp;
      }
      const dt = Math.min((timestamp - lastTimestamp.current) / 1000, 0.1);
      lastTimestamp.current = timestamp;

      if (!isPaused && !isDraggingRef.current && !momentumFrameId.current) {
        // Base speed in pixels per second: ~70px/s * speedMultiplier
        const pxPerSec = 75 * speedMultiplier;
        const delta = pxPerSec * dt;

        if (direction === 'left-to-right') {
          // Decreasing scrollLeft moves content rightwards (left-to-right slide)
          el.scrollLeft -= delta;
        } else {
          // Increasing scrollLeft moves content leftwards (right-to-left slide)
          el.scrollLeft += delta;
        }

        checkAndWrap();
      }

      animFrameId.current = requestAnimationFrame(tick);
    };

    animFrameId.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [isPaused, direction, speedMultiplier, checkAndWrap]);

  // Pointer / Touch Hand Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;

    // Stop existing momentum
    if (momentumFrameId.current) {
      cancelAnimationFrame(momentumFrameId.current);
      momentumFrameId.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedFar.current = false;

    dragStartX.current = e.clientX;
    dragStartScroll.current = el.scrollLeft;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    pointerVelocity.current = 0;

    // Capture pointer so moving outside the element still tracks smoothly
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore if not supported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const currentX = e.clientX;
    const now = performance.now();
    const dt = now - lastPointerTime.current;

    const totalDeltaX = currentX - dragStartX.current;
    if (Math.abs(totalDeltaX) > 6) {
      hasDraggedFar.current = true;
    }

    // Direct 1:1 instant movement with the hand
    el.scrollLeft = dragStartScroll.current - totalDeltaX;
    checkAndWrap();

    if (dt > 8) {
      // Velocity in pixels per ms (inverted since dragging right decreases scrollLeft)
      const instantVelocity = (lastPointerX.current - currentX) / dt;
      // Exponential smoothing for buttery momentum
      pointerVelocity.current = pointerVelocity.current * 0.4 + instantVelocity * 0.6;
      lastPointerX.current = currentX;
      lastPointerTime.current = now;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    const el = containerRef.current;
    if (!el) return;

    // Smooth inertia / momentum glide on release
    let velocity = pointerVelocity.current;
    const friction = 0.94; // Silky deceleration

    if (Math.abs(velocity) > 0.15) {
      const runMomentum = () => {
        velocity *= friction;
        el.scrollLeft += velocity * 16;
        checkAndWrap();

        if (Math.abs(velocity) > 0.05) {
          momentumFrameId.current = requestAnimationFrame(runMomentum);
        } else {
          momentumFrameId.current = null;
          // Smoothly resume auto-glide after momentum stops
          resumeTimeoutRef.current = setTimeout(() => {
            lastTimestamp.current = performance.now();
          }, 800);
        }
      };
      momentumFrameId.current = requestAnimationFrame(runMomentum);
    } else {
      // Resume auto-slide shortly after hand release
      resumeTimeoutRef.current = setTimeout(() => {
        lastTimestamp.current = performance.now();
      }, 1000);
    }
  };

  // Quick jump by 1 card width (~340px)
  const handleNudge = (directionShift: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;

    // Stop momentum
    if (momentumFrameId.current) {
      cancelAnimationFrame(momentumFrameId.current);
      momentumFrameId.current = null;
    }

    const shiftAmount = directionShift === 'left' ? -340 : 340;
    el.scrollBy({ left: shiftAmount, behavior: 'smooth' });

    setTimeout(() => {
      checkAndWrap();
    }, 350);
  };

  return (
    <section className="relative bg-[#0D0E0C] text-[#F6F2E9] py-20 sm:py-28 overflow-hidden border-t border-white/10 select-none">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
              <Utensils className="w-3.5 h-3.5" />
              <span>Signature Plates in Motion · বিশেষ খাবারের সমাহার</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              SLIDING INTO <span className="text-[#FF5500]">FLAVOUR.</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Fresh off the tandoor coals, stone oven, and mixology station.{' '}
              <span className="text-[#FF5500] font-semibold">
                Grab or swipe with your hand left or right
              </span>{' '}
              to explore at your own pace.
            </p>
          </div>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Hand Drag Indicator Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-sm bg-[#161714] border border-[#FF5500]/30 text-[#FF5500]">
              <Hand className="w-3.5 h-3.5 animate-pulse" />
              <span>Drag with Hand</span>
            </div>

            {/* Speed Control */}
            <button
              type="button"
              onClick={() => setSpeedMultiplier((prev) => (prev >= 2 ? 1 : prev === 1 ? 1.6 : 2.4))}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm border transition-colors flex items-center gap-1.5 cursor-pointer ${
                speedMultiplier > 1
                  ? 'bg-[#FF5500]/15 border-[#FF5500] text-[#FF5500]'
                  : 'bg-[#1B1D19] border-white/15 text-white/80 hover:text-white'
              }`}
              title="Toggle Slide Speed"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>
                {speedMultiplier >= 2.2
                  ? 'Turbo'
                  : speedMultiplier >= 1.5
                  ? 'Fast'
                  : 'Normal'}
              </span>
            </button>

            {/* Pause / Play */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] transition-colors flex items-center gap-1.5 cursor-pointer"
              aria-label={isPaused ? 'Resume Sliding' : 'Pause Sliding'}
            >
              {isPaused ? (
                <Play className="w-3.5 h-3.5 text-[#FF5500]" />
              ) : (
                <Pause className="w-3.5 h-3.5 text-[#FF5500]" />
              )}
              <span>{isPaused ? 'Play' : 'Pause'}</span>
            </button>

            {/* Direction Toggle */}
            <button
              type="button"
              onClick={() =>
                setDirection(direction === 'left-to-right' ? 'right-to-left' : 'left-to-right')
              }
              className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Switch Slide Direction"
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

            {/* Quick Step Buttons */}
            <div className="flex items-center gap-1 pl-1">
              <button
                type="button"
                onClick={() => handleNudge('left')}
                className="w-8 h-8 rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Step Left"
                title="Slide Dishes Right"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleNudge('right')}
                className="w-8 h-8 rounded-sm bg-[#1B1D19] border border-white/15 text-white/80 hover:text-white hover:border-[#FF5500] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Step Right"
                title="Slide Dishes Left"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Hand/Touch Drag Carousel Container */}
      <div className="relative w-full group/reel">
        {/* Subtle Edge Vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#0D0E0C] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#0D0E0C] to-transparent z-20 pointer-events-none" />

        {/* Floating Quick Navigation Chevrons on sides */}
        <button
          type="button"
          onClick={() => handleNudge('left')}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-[#FF5500] hover:border-[#FF5500] hover:scale-110 shadow-xl flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-all duration-200 cursor-pointer"
          aria-label="Previous Dishes"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={() => handleNudge('right')}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:text-[#FF5500] hover:border-[#FF5500] hover:scale-110 shadow-xl flex items-center justify-center opacity-0 group-hover/reel:opacity-100 transition-all duration-200 cursor-pointer"
          aria-label="Next Dishes"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable & Draggable Reel Track */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`w-full overflow-x-hidden flex gap-6 px-4 py-2 select-none touch-pan-y ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="group relative flex-none w-[280px] sm:w-[320px] rounded-sm overflow-hidden bg-[#161714] border border-white/10 hover:border-[#FF5500]/70 hover:shadow-[0_8px_30px_rgba(255,85,0,0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Dish Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900 pointer-events-none">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('unsplash')) {
                      target.src =
                        'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80';
                    }
                  }}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  draggable={false}
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
                      if (!hasDraggedFar.current) {
                        onOpenOrder();
                      }
                    }}
                    className="text-xs font-bold uppercase tracking-wider text-[#FF5500] hover:text-white transition-colors cursor-pointer"
                  >
                    Order Doorstep →
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!hasDraggedFar.current) {
                        onOpenReservation();
                      }
                    }}
                    className="text-[11px] font-semibold uppercase tracking-wider text-white/60 hover:text-[#D9A35D] transition-colors cursor-pointer"
                  >
                    Dine In
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Mobile Hint */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40 max-w-md mx-auto text-center sm:hidden px-4">
        <Hand className="w-3.5 h-3.5 text-[#FF5500]" />
        <span>Swipe left or right with your hand to slide dishes</span>
      </div>
    </section>
  );
}
