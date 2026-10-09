import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenOrder: () => void;
}

export function Navbar({ onOpenReservation, onOpenOrder }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'Rooftop', href: '#rooftop' },
    { label: 'Cocktails', href: '#drinks' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#10110F]/92 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand logo */}
            <a
              href="#home"
              className="group flex items-center gap-3 text-white hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
              aria-label="WhatsUp Cafe Home"
            >
              <img
                src="/logo.png"
                alt="WhatsUp Cafe Logo"
                className="h-8 sm:h-10 md:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] brightness-105 group-hover:scale-105 transition-transform"
              />
              <span className="hidden sm:inline font-bengali text-xs text-[#D9A35D] tracking-normal font-semibold">
                {CAFE_INFO.bengaliName}
              </span>
            </a>

            {/* Zone 2: Single-line nav links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-white/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative py-1 text-white/80 hover:text-[#D4FF45] transition-colors whitespace-nowrap shrink-0 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4FF45] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary action */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenOrder}
                className="px-3.5 py-2 text-xs font-semibold tracking-wider uppercase text-white/90 hover:text-[#D4FF45] transition-colors whitespace-nowrap shrink-0"
              >
                Order Online
              </button>
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] transition-all rounded-sm shadow-[0_0_20px_rgba(212,255,69,0.3)] hover:shadow-[0_0_28px_rgba(212,255,69,0.5)] whitespace-nowrap shrink-0"
              >
                Reserve a Table
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-3 py-1.5 text-xs font-bold uppercase text-[#10110F] bg-[#D4FF45] rounded-sm whitespace-nowrap"
              >
                Book
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-white/90 hover:text-[#D4FF45] transition-colors focus:outline-none"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Lime Accent Line when scrolled */}
        {isScrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4FF45]/40 to-transparent" />
        )}
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#10110F]/98 backdrop-blur-xl md:hidden flex flex-col justify-between pt-24 pb-8 px-6 transition-all"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <img
                  src="/logo.png"
                  alt="WhatsUp Cafe Logo"
                  className="h-10 w-auto object-contain brightness-105 filter drop-shadow-md"
                />
                <div className="font-bengali text-xs text-[#D9A35D] mt-1">{CAFE_INFO.bengaliName}</div>
              </div>
              <div className="text-[11px] text-white/60 flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#D4FF45]" />
                Southern Ave
              </div>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white/90 hover:text-[#D4FF45] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-white/30 font-mono">↗</span>
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 text-center text-sm font-bold uppercase tracking-wider text-[#10110F] bg-[#D4FF45] hover:bg-[#bce438] rounded-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white border border-white/20 rounded-sm hover:border-[#D4FF45]"
              >
                Order Online
              </button>
              <a
                href={`tel:${CAFE_INFO.phoneRaw}`}
                className="py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white bg-white/10 rounded-sm hover:bg-white/20 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4FF45]" />
                Call Cafe
              </a>
            </div>
            <div className="text-[11px] text-center text-white/40 pt-2 flex items-center justify-center gap-2">
              <Clock className="w-3 h-3 text-[#D9A35D]" />
              <span>Open Daily: {CAFE_INFO.openingHours}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
