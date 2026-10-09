import { useState } from 'react';
import { GlassWater, Sparkles, Wine, Flame } from 'lucide-react';

interface CocktailsDrinksProps {
  onOpenOrder: () => void;
  onOpenReservation: () => void;
}

const DRINK_SHOWCASE = [
  {
    id: 'mojito',
    name: 'Classic Fresh Mint Mojito',
    bengali: 'ফ্রেশ পুদিনা মোহিতো',
    category: 'Signature Cocktail',
    price: 295,
    glass: 'Highball Cut Glass',
    ingredients: 'White Rum, Hand-Torn Garden Mint, Fresh Persian Lime Juice, Demerara Syrup, Club Soda',
    profile: 'Crisp, Citrusy, Effervescent',
    highlight: 'Kolkata Summer Favorite',
  },
  {
    id: 'mai-tai',
    name: 'WhatsUp Island Mai Tai',
    bengali: 'আইল্যান্ড মাই তাই',
    category: 'Tiki Mixology',
    price: 475,
    glass: 'Tiki Tumbler on Rock Ice',
    ingredients: 'Dark Aged Rum Blend, Dry Orange Curaçao, French Orgeat (Almond), Lime Squeeze, Angostura',
    profile: 'Nutty, Tropical, Full-Bodied',
    highlight: 'House Signature Cocktail',
  },
  {
    id: 'spiced-cooler',
    name: 'Southern Avenue Spiced Gin Cooler',
    bengali: 'সাউদার্ন অ্যাভিনিউ স্পাইসড কুলার',
    category: 'Craft Gin Tonic',
    price: 440,
    glass: 'Copa Balloon Glass',
    ingredients: 'Botanical Gin, Gondhoraj Lime Zest, Pink Peppercorns, Cucumber Ribbons, Artisanal Tonic',
    profile: 'Fragrant, Floral, Gondhoraj Citrus',
    highlight: 'Bengal Botanical Note',
  },
  {
    id: 'smoked-whiskey',
    name: 'Smoked Amber Old Fashioned',
    bengali: 'স্মোকড ওল্ড ফ্যাশনড',
    category: 'Nocturnal Classic',
    price: 520,
    glass: 'Crystal Rocks with Ice Sphere',
    ingredients: 'Bourbon / Blended Scotch, Raw Sugar Cube, Aromatic Bitters, Orange Peel Flame, Applewood Smoke',
    profile: 'Warm Oak, Caramel, Smoky Velvet',
    highlight: 'After-Dark Staple',
  },
];

export function CocktailsDrinks({ onOpenOrder, onOpenReservation }: CocktailsDrinksProps) {
  const [selectedDrink, setSelectedDrink] = useState(DRINK_SHOWCASE[0]);

  return (
    <section id="drinks" className="relative bg-[#0D0E0C] text-[#F6F2E9] py-24 sm:py-32 overflow-hidden border-t border-white/10">
      {/* Background glow and subtle motif */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#D9A35D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#D9A35D]">
            <Wine className="w-3.5 h-3.5" />
            <span>Mixology & Nightcaps · ককটেল ও রিফ্রেশমেন্ট</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
            POUR SOMETHING
            <br />
            <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
              MEMORABLE.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 max-w-xl">
            From the crisp mint snap of our legendary Mojito to tropical aged rum blends and smoke-infused nightcaps, our bartenders craft each glass with precision.
          </p>
        </div>

        {/* 2-Column Split: Drink List & Feature Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Interactive Drinks Menu */}
          <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {DRINK_SHOWCASE.map((drink) => (
                <div
                  key={drink.id}
                  onClick={() => setSelectedDrink(drink)}
                  className={`p-5 rounded-sm border transition-all cursor-pointer ${
                    selectedDrink.id === drink.id
                      ? 'bg-[#181A16] border-[#D9A35D]/70 shadow-[0_0_25px_rgba(217,163,93,0.15)]'
                      : 'bg-[#121310] border-white/10 hover:border-white/20 hover:bg-[#161713]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/50 uppercase tracking-wider">
                        <span>{drink.category}</span>
                        <span className="text-white/20">/</span>
                        <span className="text-[#D9A35D]">{drink.highlight}</span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-white flex items-baseline gap-2">
                        <span>{drink.name}</span>
                        <span className="font-bengali text-xs text-[#D9A35D]/80 font-normal">
                          {drink.bengali}
                        </span>
                      </h3>
                      
                      <p className="text-xs text-white/60 leading-relaxed max-w-md">
                        {drink.ingredients}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base font-bold font-mono text-[#FF5500] tabular-nums">
                        ₹{drink.price}
                      </span>
                    </div>
                  </div>

                  {/* Flavor profile tag strip */}
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-[11px] text-white/40">
                    <div className="flex items-center gap-1.5 text-white/60">
                      <Sparkles className="w-3 h-3 text-[#D9A35D]" />
                      <span>Profile: {drink.profile}</span>
                    </div>
                    <span className="font-mono text-white/40">{drink.glass}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenReservation}
                className="px-6 py-3 text-xs font-bold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#e64a00] rounded-sm transition-colors cursor-pointer shadow-md"
              >
                Reserve Bar Seating
              </button>
              <button
                type="button"
                onClick={onOpenOrder}
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] rounded-sm transition-colors cursor-pointer"
              >
                Order Cocktails Online
              </button>
            </div>
          </div>

          {/* Right Column: High-end Drink Photography Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative h-full min-h-[400px] rounded-sm overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
              <img
                src="/images/cocktails_drinks.jpg"
                alt="WhatsUp Cafe Handcrafted Cocktails & Mixology"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('unsplash')) {
                    target.src = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80';
                  }
                }}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E0C] via-transparent to-black/30" />

              {/* Active Drink Callout Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-md p-5 rounded-sm border border-white/15 space-y-2">
                <div className="flex items-center justify-between text-xs text-[#D9A35D] font-mono uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <GlassWater className="w-3.5 h-3.5" />
                    Featured Pour
                  </span>
                  <span className="text-[#FF5500] font-bold">₹{selectedDrink.price}</span>
                </div>
                
                <h4 className="text-base font-bold text-white">
                  {selectedDrink.name}
                </h4>
                
                <p className="text-xs text-white/70 leading-relaxed">
                  Served ice-cold with hand-selected garnishes in our open-air terrace lounge.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
