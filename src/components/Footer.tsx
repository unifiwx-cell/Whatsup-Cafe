import { ArrowUp, Instagram, Facebook, Phone, MapPin, Globe } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0A0B09] text-[#F6F2E9] pt-20 pb-12 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Row: Brand & Back to Top */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-14 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="WhatsUp Cafe"
                className="h-10 sm:h-12 w-auto object-contain brightness-105 filter drop-shadow-md"
              />
              <span className="font-bengali text-base sm:text-lg text-[#D9A35D] font-medium border-l border-white/20 pl-4">
                {CAFE_INFO.bengaliName}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 max-w-md leading-relaxed">
              Kolkata’s iconic open-air rooftop destination. Good food, signature craft drinks, and late-night city views over Southern Avenue.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 bg-white/5 hover:bg-[#FF5500] text-white hover:text-white border border-white/15 rounded-full transition-all cursor-pointer flex items-center gap-2 text-xs font-semibold uppercase tracking-wider shadow-sm hover:shadow-[0_0_20px_rgba(255,85,0,0.4)]"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Middle Grid: Nav, Contact, Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          
          {/* Col 1: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5500] font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-white/70">
              <li><a href="#home" className="hover:text-[#FF5500] transition-colors">Home Experience</a></li>
              <li><a href="#menu" className="hover:text-[#FF5500] transition-colors">Culinary Menu</a></li>
              <li><a href="#rooftop" className="hover:text-[#FF5500] transition-colors">Rooftop Terrace</a></li>
              <li><a href="#drinks" className="hover:text-[#FF5500] transition-colors">Craft Cocktails</a></li>
              <li><a href="#reviews" className="hover:text-[#FF5500] transition-colors">Guest Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#FF5500] transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Col 2: Business Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5500] font-bold">
              Southern Avenue
            </h4>
            <div className="space-y-2 text-white/70">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                <span>Gate 2, 122/A Southern Avenue, opp. Nazrul Manch, Kolkata 700029</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                <a href={`tel:${CAFE_INFO.phoneRaw}`} className="hover:text-white transition-colors">{CAFE_INFO.phone}</a>
              </p>
              <p className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                <a href={CAFE_INFO.officialWebsite} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">whatsupltd.com</a>
              </p>
            </div>
          </div>

          {/* Col 3: Hours & Timing */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5500] font-bold">
              Operating Hours
            </h4>
            <div className="space-y-1.5 text-white/70">
              <p className="font-semibold text-white">Open Every Day</p>
              <p className="font-mono text-[#FF5500]">12:00 PM – 12:30 AM</p>
              <p className="text-white/50 text-[11px] pt-1">
                Lunch, Afternoon Chill, Golden Hour Sunset, Dinner, & Late-Night Cocktails.
              </p>
            </div>
          </div>

          {/* Col 4: Connect & Delivery */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#FF5500] font-bold">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={CAFE_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 bg-white/5 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-white hover:text-white border border-white/15 hover:border-transparent rounded-sm transition-all duration-300 shadow-sm hover:shadow-[0_0_18px_rgba(220,39,67,0.45)] hover:scale-105"
                aria-label="Instagram (@whatsup_official)"
              >
                <Instagram className="w-4 h-4 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={CAFE_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 hover:bg-[#FF5500] text-white hover:text-white border border-white/15 rounded-sm transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={CAFE_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 hover:bg-[#FF5500] text-white hover:text-white border border-white/15 rounded-sm transition-all"
                aria-label="Official Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
            <div className="pt-2 text-[11px] text-white/50">
              Order via Swiggy · Zomato · Drive-Through
            </div>
          </div>

        </div>

        {/* Bottom Banner: Final Statement & Copyright */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="font-bold tracking-[0.2em] uppercase text-white/90 text-center md:text-left">
            GOOD FOOD. LATE NIGHTS. GREAT STORIES.
          </div>

          <div className="text-center md:text-right font-mono text-[11px]">
            © {new Date().getFullYear()} WhatsUp Cafe (হোয়াটসআপ ক্যাফে) · All rights reserved.
          </div>
        </div>

        {/* Subtle Animated Orange Line as final visual element */}
        <div className="mt-8 h-[2px] w-full bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-70" />

      </div>
    </footer>
  );
}
