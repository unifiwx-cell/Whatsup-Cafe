import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';

interface ReservationSectionProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export function ReservationSection({ onOpenReservation, onOpenOrder }: ReservationSectionProps) {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-[#10110F]">
      {/* Background Rooftop Photography with Dark Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero_rooftop.jpg"
          alt="WhatsUp Cafe Rooftop Dining Table Kolkata"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.1]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = '/images/rooftop_sunset.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#10110F] via-black/40 to-[#10110F]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-[#FF5500]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Southern Avenue Rooftop Experience</span>
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[0.98]">
          YOUR TABLE.
          <br />
          <span className="font-serif-luxury italic font-normal text-[#FF5500]">
            YOUR PEOPLE.
          </span>
          <br />
          <span>YOUR NIGHT.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
          Make your next Kolkata outing a WhatsUp moment. Sunset drinks, hot tandoori grills, and city lights await on the terrace.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={onOpenReservation}
            className="px-8 py-4 text-xs sm:text-sm font-bold tracking-wider uppercase text-white bg-[#FF5500] hover:bg-[#e64a00] transition-all rounded-sm flex items-center gap-2 shadow-[0_0_35px_rgba(255,85,0,0.4)] hover:shadow-[0_0_50px_rgba(255,85,0,0.6)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve A Table</span>
          </button>

          <button
            type="button"
            onClick={onOpenOrder}
            className="px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white border border-white/30 hover:border-[#FF5500] hover:text-[#FF5500] bg-black/50 backdrop-blur-sm transition-all rounded-sm flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Order Online</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/60 font-mono">
          <span>Walk-ins welcome based on table availability</span>
          <span className="text-white/30">·</span>
          <span>Open every day 12:00 PM – 12:30 AM</span>
        </div>

      </div>
    </section>
  );
}
