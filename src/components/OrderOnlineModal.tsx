import { X, ArrowUpRight, Phone, Bike, Utensils, Clock } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OrderOnlineModal({ isOpen, onClose }: OrderOnlineModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg bg-[#161714] border border-white/20 rounded-sm shadow-2xl p-6 sm:p-8 my-8 text-[#F6F2E9]">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-white/50 hover:text-white transition-colors"
          aria-label="Close Order Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1 border-b border-white/10 pb-4">
            <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-widest text-[#D4FF45]">
              <Bike className="w-3.5 h-3.5" />
              <span>Doorstep Delivery & Takeaway · অনলাইন অর্ডার</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              ORDER FROM WHATS<span className="text-[#D4FF45]">UP</span>
            </h3>
            <p className="text-xs text-white/60">
              Freshly grilled kebabs, wood-fired pizzas and pasta delivered hot to your doorstep.
            </p>
          </div>

          {/* Delivery Platforms */}
          <div className="space-y-3">
            {/* Zomato */}
            <a
              href={CAFE_INFO.socials.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-[#10110F] border border-white/10 hover:border-red-500/50 hover:bg-[#1B1D19] rounded-sm flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center font-bold text-sm">
                  Z
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    Order via Zomato
                  </h4>
                  <p className="text-[11px] text-white/50">
                    Fast delivery across South Kolkata & Golpark
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Swiggy */}
            <a
              href={CAFE_INFO.socials.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 bg-[#10110F] border border-white/10 hover:border-orange-500/50 hover:bg-[#1B1D19] rounded-sm flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-orange-600/20 text-orange-500 border border-orange-500/30 flex items-center justify-center font-bold text-sm">
                  S
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                    Order via Swiggy
                  </h4>
                  <p className="text-[11px] text-white/50">
                    Live tracking & quick pickup
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* Direct Takeaway / Call Phone */}
            <div className="p-4 bg-[#10110F] border border-white/10 rounded-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#D4FF45]" />
                  <h4 className="text-sm font-bold text-white">Direct Drive-Through & Takeaway</h4>
                </div>
                <span className="text-[10px] uppercase font-mono text-[#D4FF45] bg-[#D4FF45]/10 px-2 py-0.5 rounded-xs">
                  Zero Commission
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Call the restaurant directly to place your order for car drive-through pickup at Gate 2 or takeaway packaging.
              </p>
              <div className="pt-2">
                <a
                  href={`tel:${CAFE_INFO.phoneRaw}`}
                  className="w-full py-2.5 px-4 bg-[#D4FF45] hover:bg-[#bce438] text-[#10110F] font-bold text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call to Order: {CAFE_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/10 font-mono">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#D9A35D]" />
              Delivery Open Till 12:00 AM
            </span>
            <span>Southern Avenue, Kolkata</span>
          </div>
        </div>

      </div>
    </div>
  );
}
