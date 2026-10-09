import { Heart, Music, Users, Sparkles } from 'lucide-react';

interface AtmosphereProps {
  onOpenReservation: () => void;
}

export function Atmosphere({ onOpenReservation }: AtmosphereProps) {
  return (
    <section className="relative bg-[#10110F] text-[#F6F2E9] py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-[0.25em] text-[#D4FF45]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Social Atmosphere · আড্ডা ও স্মৃতি</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
            MEET HERE.
            <br />
            <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
              STAY
            </span>{' '}
            <span>LATE.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto">
            Whether it's an intimate rooftop date under fairy lights, an overdue college reunion, or live weekend acoustic sessions, WhatsUp Cafe is Kolkata’s favourite high-altitude hangout.
          </p>
        </div>

        {/* 3 Story Cards with Rich Images */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Rooftop Dates */}
          <div className="group bg-[#161714] border border-white/10 hover:border-white/30 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
              <img
                src="/src/assets/images/whatsup_rooftop_sunset_1791547875878.jpg"
                alt="Romantic rooftop evening at WhatsUp Cafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs text-white/90 px-2.5 py-1 text-[11px] font-mono rounded-xs border border-white/15 flex items-center gap-1.5">
                <Heart className="w-3 h-3 text-rose-400" />
                Intimate Evenings
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF45] transition-colors">
                Dates & Sunset Cocktails
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Golden hour over Southern Avenue canopy with delicate pasta, chilled sangria, and cozy balcony booth seating.
              </p>
              <div className="pt-2 text-[11px] text-[#D9A35D] font-mono">
                Terrace Balcony · Candlelight
              </div>
            </div>
          </div>

          {/* Card 2: Friends & Large Groups */}
          <div className="group bg-[#161714] border border-white/10 hover:border-white/30 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
              <img
                src="/src/assets/images/whatsup_intro_lifestyle_1791547826311.jpg"
                alt="Friends sharing kebabs and laughter at WhatsUp Cafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs text-white/90 px-2.5 py-1 text-[11px] font-mono rounded-xs border border-white/15 flex items-center gap-1.5">
                <Users className="w-3 h-3 text-[#D4FF45]" />
                Group Celebrations
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF45] transition-colors">
                Kolkata Adda & Reunions
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Large sharing kebab platters, stone-baked pizzas, beer pitchers, and long unhurried conversations well past midnight.
              </p>
              <div className="pt-2 text-[11px] text-[#D9A35D] font-mono">
                Long Tables · Sizzling Platters
              </div>
            </div>
          </div>

          {/* Card 3: Live Music & Atmosphere */}
          <div className="group bg-[#161714] border border-white/10 hover:border-white/30 rounded-sm overflow-hidden transition-all duration-300 flex flex-col justify-between">
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
              <img
                src="/src/assets/images/whatsup_hero_rooftop_1791547809865.jpg"
                alt="Live music and rooftop vibes at WhatsUp Cafe"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-xs text-white/90 px-2.5 py-1 text-[11px] font-mono rounded-xs border border-white/15 flex items-center gap-1.5">
                <Music className="w-3 h-3 text-[#D9A35D]" />
                Live Acoustic Nights
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4FF45] transition-colors">
                Acoustic Sets & City Sounds
              </h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Independent city artists, gentle unplugged melodies, and the rhythmic buzz of Kolkata’s night energy all around you.
              </p>
              <div className="pt-2 text-[11px] text-[#D9A35D] font-mono">
                Weekend Evenings · Chill Tempo
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-8 bg-[#1B1D19] border border-white/15 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-white">Planning a Birthday, Farewell, or Date?</h4>
            <p className="text-xs text-white/60">
              Reserve your preferred corner of the terrace in advance with customized seating.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenReservation}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] rounded-sm transition-colors whitespace-nowrap"
          >
            Book Table in Advance
          </button>
        </div>

      </div>
    </section>
  );
}
