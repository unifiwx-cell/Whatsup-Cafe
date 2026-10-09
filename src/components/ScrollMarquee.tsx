import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function ScrollMarquee() {
  const marqueeItems = [
    'WHATSUP CAFE',
    'হোয়াটসআপ ক্যাফে',
    'ROOFTOP LOUNGE',
    'SOUTHERN AVENUE',
    'CRAFT COCKTAILS',
    'SIZZLING KEBABS',
    'SPAGHETTI AGLIO E OLIO',
    'LIVE ACOUSTIC VIBES',
    '4.4 ★ (11,343 REVIEWS)',
    'OPEN TILL 12:30 AM',
  ];

  return (
    <div className="relative py-4 bg-[#FF5500] text-white overflow-hidden select-none border-y border-[#FF5500]/30 shadow-[0_0_30px_rgba(255,85,0,0.25)]">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {/* Doubled list for seamless infinite loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 text-xs sm:text-sm font-black tracking-widest uppercase text-white">
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
