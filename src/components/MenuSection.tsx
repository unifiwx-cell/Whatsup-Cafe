import { useState } from 'react';
import { ArrowUpRight, Search, Sparkles, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS, CAFE_INFO } from '../data/cafeData';
import { MenuCategory, MenuItem } from '../types';

interface MenuSectionProps {
  onOpenOrder: () => void;
  onOpenReservation: () => void;
}

const CATEGORIES: MenuCategory[] = [
  'All',
  'Starters & Snacks',
  'Kebabs',
  'Mains',
  'Pizza & Pasta',
  'Drinks',
  'Desserts',
];

export function MenuSection({ onOpenOrder, onOpenReservation }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(MENU_ITEMS[0]);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.bengaliName && item.bengaliName.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="relative bg-[#10110F] text-[#F6F2E9] py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>Culinary Selection · হোয়াটসআপ মেনু</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              COME HUNGRY.
              <br />
              <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
                LEAVE
              </span>{' '}
              <span>HAPPY.</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-xl">
              From our famous tandoor charred kebabs to artisanal pastas and signature cocktails, every dish is crafted for sharing under the night sky.
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CAFE_INFO.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-white/90 border border-white/20 hover:border-[#FF5500] hover:text-[#FF5500] transition-colors rounded-sm flex items-center gap-1.5"
            >
              <span>View Full Menu</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5500]" />
            </a>
            <button
              type="button"
              onClick={onOpenOrder}
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white bg-[#FF5500] hover:bg-[#e64a00] transition-colors rounded-sm shadow-[0_0_15px_rgba(255,85,0,0.3)] cursor-pointer"
            >
              Order Online
            </button>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-semibold tracking-wide uppercase whitespace-nowrap rounded-sm transition-all cursor-pointer ${
                  activeCategory === category
                    ? 'bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.35)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Live Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, pasta, kebabs..."
              className="w-full bg-[#1B1D19] border border-white/15 focus:border-[#FF5500] focus:outline-none text-white text-xs py-2 pl-9 pr-3 rounded-sm placeholder:text-white/35 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid Layout with Active Spotlight Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Dish List Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.length === 0 ? (
              <div className="col-span-full py-16 text-center text-white/50 border border-dashed border-white/10 rounded-sm">
                <p className="text-sm">No dishes match "{searchQuery}" in this category.</p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-[#FF5500] underline uppercase tracking-wider font-semibold cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative p-4 rounded-sm border transition-all cursor-pointer flex flex-col justify-between ${
                    selectedItem?.id === item.id
                      ? 'bg-[#1B1D19] border-[#FF5500]/70 shadow-[0_0_20px_rgba(255,85,0,0.15)]'
                      : 'bg-[#161714] border-white/10 hover:border-white/25 hover:bg-[#1B1D19]'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Category & Diet indicator */}
                    <div className="flex items-center justify-between text-[11px] text-white/50">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.diet === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          aria-label={item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
                        />
                        <span className="uppercase tracking-wider">{item.category}</span>
                      </div>
                      {item.isPopular && (
                        <span className="text-[#D9A35D] font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Dish Title */}
                    <div>
                      <h3 className="font-bold text-base text-white group-hover:text-[#FF5500] transition-colors">
                        {item.name}
                      </h3>
                      {item.bengaliName && (
                        <div className="font-bengali text-xs text-[#D9A35D]/90 mt-0.5">
                          {item.bengaliName}
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-xs text-white/65 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row: Price & Action */}
                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-sm font-bold font-mono text-white tabular-nums">
                      ₹{item.price}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenOrder();
                      }}
                      className="text-[11px] uppercase tracking-wider font-semibold text-[#FF5500] hover:text-white transition-colors cursor-pointer"
                    >
                      Order →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sticky Dish Spotlight Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-4 sticky top-24">
            {selectedItem && (
              <div className="bg-[#1B1D19] border border-white/15 rounded-sm p-5 space-y-4 shadow-2xl">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#FF5500] font-bold flex items-center justify-between">
                  <span>Chef's Spotlight</span>
                  <span className="font-mono text-white/50">#{selectedItem.id}</span>
                </div>

                {selectedItem.imageUrl && (
                  <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-black/60">
                    <img
                      src={selectedItem.imageUrl}
                      alt={selectedItem.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 text-[11px] rounded-sm font-mono">
                      ₹{selectedItem.price}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        selectedItem.diet === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-xs uppercase tracking-wider text-white/60">
                      {selectedItem.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'} · {selectedItem.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white leading-tight">
                    {selectedItem.name}
                  </h3>
                  {selectedItem.bengaliName && (
                    <p className="font-bengali text-sm text-[#D9A35D]">
                      {selectedItem.bengaliName}
                    </p>
                  )}
                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    {selectedItem.description}
                  </p>
                </div>

                {selectedItem.tags && (
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-white/50 pt-2 border-t border-white/10">
                    {selectedItem.tags.map((tag, idx) => (
                      <span key={tag}>
                        {tag}
                        {idx < selectedItem.tags!.length - 1 && <span className="ml-2 text-white/30">·</span>}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onOpenOrder}
                    className="py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#FF5500] hover:bg-[#e64a00] rounded-sm transition-colors text-center cursor-pointer shadow-md"
                  >
                    Order Now
                  </button>
                  <button
                    type="button"
                    onClick={onOpenReservation}
                    className="py-2.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/20 hover:border-[#FF5500] rounded-sm transition-colors text-center cursor-pointer"
                  >
                    Dine In
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
