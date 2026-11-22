'use client';

import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    quote: 'The molten dark chocolate center and flaky salt finish completely ruined all other cookies for me. Truly an elevated Parisian tasting experience.',
    author: 'Éléonore Vance',
    location: 'Paris 7th Arrondissement',
    date: 'Yesterday • Storefront Pickup',
    product: 'Artisan Chocolate Chip',
    rating: 5,
  },
  {
    quote: 'I ordered the Connoisseur 6-pack as an anniversary gift. The calligraphy note, wax seal, and still-warm cookies made my partner tear up with joy.',
    author: 'Marc-Antoine Laurent',
    location: 'Saint-Germain-des-Prés',
    date: '3 Days Ago • Boutique Courier',
    product: 'Atelier Connoisseur Box',
    rating: 5,
  },
  {
    quote: 'The lemon zest coconut cake slice was transcendent. The crumb is impossibly moist, and the citrus perfume fills the entire room.',
    author: 'Sophia Chen',
    location: 'Le Marais, Paris',
    date: 'This Morning • Fresh Oven Batch #14',
    product: 'Lemon Zest Coconut Cake',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-28 px-6 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            Gourmet Praise & Connoisseurs
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light mb-4">
            Words from Our <em className="text-[#C9A96E] italic font-serif">Patrons</em>
          </h2>
          <p className="text-[#7D6B58] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Over 1,200 morning bakes delivered across Paris. Here is what happens when craft meets obsessive standards.
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-md p-8 border border-[#E8DFC8] shadow-[0_4px_24px_rgba(28,16,8,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex text-[#C9A96E] gap-0.5">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-[#C9A96E]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C9A96E]/20" />
                </div>

                <p className="text-sm text-[#1C1008] leading-relaxed mb-6 font-serif italic text-base">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-[#E8DFC8]/70">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-lg text-[#1C1008] font-light">
                      {review.author}
                    </h4>
                    <p className="text-[11px] text-[#A68A56] font-medium">
                      {review.location}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Order
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-[#8B7355]">
                  <span>{review.product}</span>
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
