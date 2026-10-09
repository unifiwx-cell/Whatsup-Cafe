import { Car, Clock, Compass, MapPin, Navigation, Phone, Train } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface LocationSectionProps {
  onOpenReservation: () => void;
}

export function LocationSection({ onOpenReservation }: LocationSectionProps) {
  return (
    <section id="contact" className="relative bg-[#10110F] text-[#F6F2E9] py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-2xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
            <Compass className="w-3.5 h-3.5" />
            <span>Visit Us · পৌঁছানোর ঠিকানা</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
            YOUR NEXT
            <br />
            <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
              KOLKATA
            </span>{' '}
            <span>PLAN.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70">
            Conveniently situated right along Southern Avenue’s boulevard, facing the iconic Nazrul Manch auditorium.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Details & Practical Logistics */}
          <div className="lg:col-span-6 bg-[#161714] border border-white/15 p-8 rounded-sm space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Address Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500]">
                  <MapPin className="w-4 h-4" />
                  <span>Exact Address</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  {CAFE_INFO.address}
                </p>
                <div className="text-xs text-[#D9A35D] font-medium">
                  Landmark: {CAFE_INFO.landmark}
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500]">
                  <Clock className="w-4 h-4" />
                  <span>Operating Hours</span>
                </div>
                <div className="text-sm text-white font-medium flex items-center justify-between">
                  <span>Monday – Sunday</span>
                  <span className="font-mono text-[#FF5500] font-bold">{CAFE_INFO.openingHours}</span>
                </div>
                <div className="text-xs text-white/50">
                  Kitchen orders open till midnight · Late-night dessert and drinks
                </div>
              </div>

              {/* Transit & Parking Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                    <Train className="w-3.5 h-3.5 text-[#D9A35D]" />
                    <span>Metro Transit</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Rabindra Sarobar / Kalighat Metro Stations (5–7 mins auto/cab ride).
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-white font-bold">
                    <Car className="w-3.5 h-3.5 text-[#D9A35D]" />
                    <span>Valet & Parking</span>
                  </div>
                  <p className="text-[11px] text-white/60">
                    Street & lane parking available along Southern Avenue boulevard.
                  </p>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#e64a00] rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </a>

                <a
                  href={`tel:${CAFE_INFO.phoneRaw}`}
                  className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#FF5500]" />
                  Call: {CAFE_INFO.phone}
                </a>
              </div>

              <button
                type="button"
                onClick={onOpenReservation}
                className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-white bg-white/5 hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
              >
                Reserve Table In Advance →
              </button>
            </div>
          </div>

          {/* Right Column: Visual Rooftop Photography & Location Map Mockup */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Real Venue Rooftop Photo */}
            <div className="relative h-64 sm:h-72 rounded-sm overflow-hidden border border-white/15 bg-neutral-900 shadow-xl">
              <img
                src="/images/hero_rooftop.jpg"
                alt="WhatsUp Cafe Entrance and Rooftop, Southern Avenue Kolkata"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold">Rooftop Entrance · Gate 2, 122/A</span>
                <span className="text-[#FF5500] font-mono">Opp. Nazrul Manch</span>
              </div>
            </div>

            {/* Interactive Map Visual Frame with Direct Map Launch */}
            <div className="relative flex-1 min-h-[220px] rounded-sm overflow-hidden border border-white/15 bg-[#1B1D19] p-6 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF5500]">
                    Google Maps Pin
                  </span>
                  <span className="text-xs font-mono text-white/40">22.5115° N, 88.3582° E</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  Southern Avenue, Keyatala, Golpark
                </h4>
                <p className="text-xs text-white/60 leading-relaxed">
                  Located opposite Gate 2 of Nazrul Manch. Easy access from Gariahat, Golpark, and Sarat Bose Road.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-white/50">
                  Tap to launch GPS navigation in Google Maps
                </span>
                <a
                  href={CAFE_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#10110F] bg-white hover:bg-[#FF5500] hover:text-white transition-colors rounded-sm cursor-pointer"
                >
                  Open Maps ↗
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
