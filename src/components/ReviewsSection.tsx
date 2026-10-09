import { useState } from 'react';
import { ArrowUpRight, MessageSquareQuote, Star } from 'lucide-react';
import { CAFE_INFO, REVIEWS } from '../data/cafeData';

export function ReviewsSection() {
  const [filterTheme, setFilterTheme] = useState<string>('all');

  const filteredReviews = filterTheme === 'all'
    ? REVIEWS
    : REVIEWS.filter((r) => r.theme === filterTheme);

  return (
    <section id="reviews" className="relative bg-[#1B1D19] text-[#F6F2E9] py-24 sm:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Rating Banner & Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14">
          
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-[0.2em] text-[#FF5500]">
              <Star className="w-3.5 h-3.5 fill-[#FF5500]" />
              <span>Verified Customer Feedback · অতিথি প্রশংসা</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
              THE VIBE SPEAKS
              <br />
              <span className="font-serif-luxury italic font-normal text-[#D9A35D]">
                FOR
              </span>{' '}
              <span>ITSELF.</span>
            </h2>

            <p className="text-sm sm:text-base text-white/70 max-w-xl">
              Over eleven thousand Kolkata diners have celebrated birthdays, sunsets, anniversaries, and casual late nights with us.
            </p>
          </div>

          {/* Big Quantitative Display Box */}
          <div className="lg:col-span-4 bg-[#10110F] border border-white/15 p-6 rounded-sm space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-5xl font-black text-white font-mono tracking-tight">
                4.4
              </span>
              <div className="flex items-center text-[#D9A35D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D9A35D]" />
                ))}
              </div>
            </div>

            <div className="text-xs uppercase tracking-widest text-[#FF5500] font-bold">
              11,343 Google Reviews
            </div>

            <p className="text-xs text-white/50 pt-1">
              Consistently rated among the top rooftop lounge bars in South Kolkata.
            </p>

            <a
              href={CAFE_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-[#FF5500] pt-2 font-medium transition-colors"
            >
              <span>Read all Google Reviews</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'ambience', label: 'Rooftop Ambience' },
            { id: 'food', label: 'Food & Kebabs' },
            { id: 'drinks', label: 'Cocktails & Bar' },
            { id: 'service', label: 'Hospitality' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilterTheme(tab.id)}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-pointer whitespace-nowrap ${
                filterTheme === tab.id
                  ? 'bg-[#FF5500] text-white font-bold shadow-md'
                  : 'text-white/60 hover:text-white bg-[#10110F]/60 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#10110F] border border-white/10 p-6 rounded-sm flex flex-col justify-between space-y-4 hover:border-white/25 transition-colors"
            >
              <div className="space-y-3">
                {/* Stars and Theme */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-[#D9A35D]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D9A35D]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-white/40">{review.timeAgo}</span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
                  "{review.text}"
                </p>
              </div>

              {/* Author & Mentioned Item */}
              <div className="pt-4 border-t border-white/10 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{review.author}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#FF5500] font-mono">
                    Local Diner
                  </span>
                </div>
                {review.dishMentioned && (
                  <div className="text-[11px] text-white/50 flex items-center gap-1">
                    <MessageSquareQuote className="w-3 h-3 text-[#D9A35D]" />
                    <span>Highlighted: {review.dishMentioned}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
