'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, ShoppingBag, X, Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { toast } from './ui/toast';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  slug: string;
  tagline: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    src: '/bakery/classic-chocolate-chip.jpg',
    title: 'Classic Chocolate Chip Cookies',
    category: 'Cookies',
    categorySlug: 'cookies',
    price: 550,
    slug: 'chocolate-chip-cookies',
    tagline: 'Soft, chewy & irresistible with Belgian chocolate chunks',
  },
  {
    id: 'g-2',
    src: '/bakery/bakery-2.jpg',
    title: 'Lemon Zest Coconut Cake',
    category: 'Cakes',
    categorySlug: 'cakes',
    price: 950,
    slug: 'lemon-zest-coconut-cake',
    tagline: 'A slice of sunshine with real lemon zest & toasted coconut',
  },
  {
    id: 'g-3',
    src: '/bakery/bakery-6.jpg',
    title: 'Red Velvet Cookies',
    category: 'Cookies',
    categorySlug: 'cookies',
    price: 650,
    slug: 'red-velvet-cookies',
    tagline: 'Loaded with creamy Swiss white chocolate chips',
  },
  {
    id: 'g-4',
    src: '/bakery/bakery-5.jpg',
    title: 'Orange Zest Bites',
    category: 'Pastries',
    categorySlug: 'pastries',
    price: 480,
    slug: 'orange-zest-bites',
    tagline: 'A burst of Mediterranean orange in every bite',
  },
  {
    id: 'g-8',
    src: '/bakery/double-chocolate-cookies.jpg',
    title: 'Double Chocolate Cookies',
    category: 'Cookies',
    categorySlug: 'cookies',
    price: 650,
    slug: 'double-chocolate-cookies',
    tagline: 'Soft, fudgy & irresistible with deep dark chocolate',
  },
];

const CATEGORIES = [
  { label: 'All Creations', slug: 'all' },
  { label: 'Cookies', slug: 'cookies' },
  { label: 'Cakes', slug: 'cakes' },
  { label: 'Pastries & Bites', slug: 'pastries' },
];

export default function PhotoGallery() {
  const [activeTab, setActiveTab] = useState('all');
  const [activeModal, setActiveModal] = useState<GalleryItem | null>(null);
  const addItem = useCart((s) => s.addItem);

  const filteredItems = activeTab === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.categorySlug === activeTab);

  const handleQuickAdd = (item: GalleryItem, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    addItem({
      id: item.id,
      name: item.title,
      price: item.price,
      imageUrl: item.src,
    });
    toast(`${item.title} added to your basket`);
  };

  return (
    <section className="py-28 px-6 bg-[#F6F2EA] text-[#1C1008] relative overflow-hidden border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            Atelier Visual Showcase
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          </p>
          <h2 className="font-display text-4xl sm:text-6xl text-[#1C1008] font-light mb-4">
            The Gallery of <em className="text-[#C9A96E] italic font-serif">Creations</em>
          </h2>
          <p className="text-[#7D6B58] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Each artisanal batch photographed in our Parisian atelier. Click any creation to inspect or add directly to your basket.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-14 flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setActiveTab(cat.slug)}
                className={`text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 rounded-full transition-all duration-300 font-medium cursor-pointer ${isActive
                  ? 'bg-[#1C1008] text-[#FAF8F5] shadow-md shadow-[#1C1008]/10'
                  : 'bg-white/80 text-[#7D6B58] hover:text-[#1C1008] border border-[#E8DFC8] hover:border-[#C9A96E]'
                  }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Poster Showcase Grid: Proper 2:3 aspect ratio ensures NO CUT OFF */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative aspect-[2/3] w-full rounded-md overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8] hover:border-[#C9A96E] shadow-[0_4px_20px_rgba(28,16,8,0.04)] hover:shadow-[0_16px_40px_rgba(201,169,110,0.22)] transition-all duration-500 cursor-pointer"
                onClick={() => setActiveModal(item)}
              >
                {/* Full Uncut Poster Image */}
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />

                {/* Editorial Vignette on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008] via-[#1C1008]/30 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Corner Pill */}
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 text-[#1C1008] text-[9px] tracking-[0.25em] uppercase font-semibold px-2.5 py-1 rounded-full border border-[#C9A96E]/30 backdrop-blur-sm shadow-sm group-hover:bg-[#1C1008]/90 group-hover:text-[#FAF8F5] transition-colors">
                  {item.category}
                </div>

                {/* Hover Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-display text-lg sm:text-xl text-[#FAF8F5] leading-tight mb-1 font-light">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#E8D5B0]/80 line-clamp-1 mb-3 leading-relaxed">
                    {item.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#C9A96E]/30">
                    <span className="font-display text-lg text-[#9E6B1F] font-bold">
                      {formatPrice(item.price)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModal(item);
                        }}
                        className="p-2 bg-white/10 hover:bg-[#C9A96E] text-[#FAF8F5] hover:text-[#1C1008] transition-colors rounded-sm"
                        title="Enlarge creation"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        className="inline-flex items-center gap-1 bg-[#C9A96E] text-[#1C1008] hover:bg-[#FAF8F5] font-semibold px-3 py-1.5 text-[10px] uppercase tracking-wider transition-colors rounded-sm shadow-md"
                        title="Add to basket"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Interactive Lightbox / Modal */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F5] border border-[#C9A96E]/40 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-2"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 z-20 text-[#1C1008] hover:text-[#C9A96E] p-2 bg-white/80 rounded-full border border-[#C9A96E]/30 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Poster Image */}
              <div className="relative aspect-[2/3] w-full bg-[#F3EFE6]">
                <Image
                  src={activeModal.src}
                  alt={activeModal.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Details Side */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#A68A56] font-semibold block mb-2">
                    {activeModal.category}
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#1C1008] mb-2 leading-tight font-light">
                    {activeModal.title}
                  </h3>
                  <p className="font-display text-3xl text-[#9E6B1F] mb-6 font-bold">
                    {formatPrice(activeModal.price)}
                  </p>

                  <div className="w-12 h-px bg-[#C9A96E]/40 mb-6" />

                  <p className="text-sm text-[#7D6B58] leading-relaxed mb-6">
                    {activeModal.tagline}
                  </p>

                  <div className="space-y-2 text-xs text-[#8B7355]">
                    <p className="flex items-center gap-2">
                      <span className="text-[#C9A96E]">✦</span> Baked with Normandy Grade-A Butter (84%)
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#C9A96E]">✦</span> Packaged in gold-stamped luxury gift box
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-[#C9A96E]">✦</span> Same-day dawn oven dispatch
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={() => {
                      handleQuickAdd(activeModal);
                      setActiveModal(null);
                    }}
                    className="flex-1 bg-[#1C1008] text-[#FAF8F5] hover:bg-[#C9A96E] hover:text-[#1C1008] font-semibold py-3 px-5 text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>

                  <Link
                    href={`/product/${activeModal.slug}`}
                    className="border border-[#C9A96E]/50 hover:border-[#1C1008] text-[#1C1008] py-3 px-4 text-xs uppercase tracking-widest text-center transition-colors flex items-center justify-center gap-1 rounded-sm font-medium"
                  >
                    <span>View Detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
