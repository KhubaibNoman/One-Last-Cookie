'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, Sparkles, Check, Gift, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { toast } from './ui/toast';
import { formatPrice } from '@/lib/utils';

const BOX_TIERS = [
  {
    id: 'box-4',
    name: 'The Petit Taster Box',
    count: 4,
    price: 1800,
    tag: 'Perfect for Two',
    desc: 'Four freshly baked artisan cookies packed in our signature gold-embossed keepsake box with custom ribbon.',
    badge: 'Popular Gift',
    img: '/bakery/bakery-1.jpg',
    includes: ['4 Fresh Artisanal Cookies', 'Gold-Embossed Gift Box', 'Handwritten Calligraphy Card'],
  },
  {
    id: 'box-6',
    name: 'The Atelier Connoisseur Box',
    count: 6,
    price: 2600,
    tag: 'Most Loved Selection',
    desc: 'Six warm bakes spanning molten Belgian chocolate, vibrant red velvet, and Sicilian citrus shortbread bites.',
    badge: 'Chef Favorite',
    img: '/bakery/signature-box.jpg',
    includes: ['6 Mixed Specialty Bakes', 'Silk Champagne Ribbon', 'Complimentary Gift Card', 'Free Insulated Packaging'],
  },
  {
    id: 'box-12',
    name: 'The Grand Celebration Atelier',
    count: 12,
    price: 4800,
    tag: 'Family & Parties',
    desc: 'A lavish dozen assortment including our complete range of cookies, lemon coconut cake slices, and seasonal specials.',
    badge: 'Best Value',
    img: '/bakery/bakery-8.jpg',
    includes: ['12 Assorted Grand Bakes', 'Double Luxury Gift Packaging', 'Priority Morning Oven Dispatch', 'Complimentary Luxury Packaging'],
  },
];

export default function CurateBoxSection() {
  const [selectedBox, setSelectedBox] = useState(BOX_TIERS[1]); // default to 6-pack
  const addItem = useCart((s) => s.addItem);

  const handleAddBox = () => {
    addItem({
      id: selectedBox.id,
      name: `${selectedBox.name} (${selectedBox.count} Bakes)`,
      price: selectedBox.price,
      imageUrl: selectedBox.img,
    });
    toast(`${selectedBox.name} added to your basket!`);
  };

  return (
    <section className="py-28 px-6 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2 font-medium">
            <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
            Bespoke Gifting & Assortments
            <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light mb-4">
            Curate Your <em className="text-[#C9A96E] italic font-serif">Signature Box</em>
          </h2>
          <p className="text-[#7D6B58] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Select your preferred assortment size. Each box is hand-packed at dawn in our gold-stamped luxury boxes with personalized calligraphy notes.
          </p>
        </div>

        {/* Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {BOX_TIERS.map((tier) => {
            const isSelected = selectedBox.id === tier.id;
            return (
              <motion.div
                key={tier.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedBox(tier)}
                className={`relative rounded-md p-7 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-white border-2 border-[#C9A96E] shadow-[0_16px_40px_rgba(201,169,110,0.22)]'
                    : 'bg-[#F6F2EA] border border-[#E8DFC8] hover:border-[#C9A96E]/60 shadow-sm'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`text-[9px] tracking-[0.25em] uppercase font-semibold px-3 py-1 rounded-full ${
                      isSelected
                        ? 'bg-[#1C1008] text-[#FAF8F5]'
                        : 'bg-[#E8DFC8]/60 text-[#7D6B58]'
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <span className="font-display text-xs text-[#A68A56] uppercase tracking-wider font-medium">
                    {tier.count} Pieces
                  </span>
                </div>

                {/* Box Image Preview */}
                <div className="relative aspect-[4/3] w-full rounded overflow-hidden mb-6 bg-[#FAF8F5] border border-[#E8DFC8]">
                  <Image
                    src={tier.img}
                    alt={tier.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-display text-2xl text-[#1C1008] font-light mb-1 leading-snug">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#A68A56] mb-3 italic font-serif">
                    {tier.tag}
                  </p>
                  <p className="text-xs text-[#7D6B58] leading-relaxed mb-6">
                    {tier.desc}
                  </p>

                  {/* Included List */}
                  <ul className="space-y-2 mb-8 pt-4 border-t border-[#E8DFC8]/70">
                    {tier.includes.map((inc, i) => (
                      <li key={i} className="text-xs text-[#7D6B58] flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Selection Footer */}
                <div className="pt-4 border-t border-[#E8DFC8]/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#8B7355] block">Box Total</span>
                    <span className="font-display text-2xl text-[#9E6B1F] font-bold leading-none">
                      {formatPrice(tier.price)}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-widest font-semibold px-3.5 py-1.5 rounded-sm transition-colors ${
                      isSelected
                        ? 'bg-[#C9A96E] text-[#1C1008]'
                        : 'border border-[#C9A96E]/40 text-[#1C1008]'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Choose Box'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Box Action Bar */}
        <div className="bg-[#1C1008] text-[#FAF8F5] p-6 sm:p-8 rounded-lg shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-[#C9A96E]/30">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-semibold block mb-1">
              Ready to Bake & Pack
            </span>
            <h4 className="font-display text-2xl sm:text-3xl font-light text-[#FAF8F5]">
              {selectedBox.name} — <span className="text-[#9E6B1F] font-bold">{formatPrice(selectedBox.price)}</span>
            </h4>
            <p className="text-xs text-[#E8DFC8]/70 mt-1">
              Includes complimentary gold gift packaging, freshly baked to perfection upon order.
            </p>
          </div>

          <button
            onClick={handleAddBox}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#C9A96E] text-[#1C1008] hover:bg-[#FAF8F5] py-4 px-8 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm shadow-md shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Box to Basket</span>
          </button>
        </div>
      </div>
    </section>
  );
}
