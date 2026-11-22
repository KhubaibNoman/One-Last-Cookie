'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowUpRight, Star } from 'lucide-react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import { toast } from './ui/toast';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  basePrice?: string | null;
  salePrice?: string | null;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
  category?: string;
  categorySlug?: string;
  tasteNotes?: string;
  ingredients?: string[];
}

const BADGES: Record<string, string> = {
  'chocolate-chip-cookies': 'Signature Maison',
  'lemon-zest-coconut-cake': 'Daily Special',
  'red-velvet-cookies': 'Best Seller',
  'orange-zest-bites': 'Artisan Pick',
  'signature-selection-box': 'Gift Atelier',
  'golden-batch-cookies': 'Family Platter',
};

// Clean flavor accents to replace long clashing paragraphs
const FLAVOR_PILLS: Record<string, string[]> = {
  'chocolate-chip-cookies': ['Rich cocoa powder', 'Dark chocolate', 'Powdered sugar'],
  'lemon-zest-coconut-cake': ['Organic Lemon Zest', 'Toasted Coconut', 'Citrus Glaze'],
  'red-velvet-cookies': ['Crimson Cocoa', 'Swiss White Chocolate', 'Powdered Snow'],
  'orange-zest-bites': ['Mediterranean Orange', 'Shortbread Crumb', 'Dark Drizzle'],
  'signature-selection-box': ['Curated Tasting', 'Gift Packaging Included'],
  'golden-batch-cookies': ['Golden Baked Tray', 'Warm Vanilla Bean'],
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const badgeText = BADGES[product.slug] || 'Fresh Baked';
  const pills = FLAVOR_PILLS[product.slug] || (product.ingredients ? product.ingredients.slice(0, 2) : ['Artisan Craft']);

  const hasSale = Boolean(
    product.salePrice &&
    parseFloat(product.salePrice) > 0 &&
    parseFloat(product.salePrice) < parseFloat(product.basePrice || product.price)
  );
  const activePrice = hasSale ? product.salePrice! : product.price;
  const originalPrice = product.basePrice || product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: parseFloat(activePrice),
      imageUrl: product.imageUrl,
    });
    toast(`${product.name} added to your basket`);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="group flex flex-col bg-[#FAF8F5] border border-[#E8DFC8]/70 hover:border-[#C9A96E] rounded-md overflow-hidden shadow-[0_4px_24px_rgba(28,16,8,0.04)] hover:shadow-[0_20px_48px_rgba(201,169,110,0.22)] transition-all duration-500"
    >
      {/* Clickable Image Artwork Container */}
      <Link
        href={`/product/${product.slug}`}
        className="block relative aspect-[2/3] w-full overflow-hidden bg-[#F3EFE6]"
      >
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F5]">
            <span className="font-display text-5xl text-[#C9A96E]/40">🥐</span>
          </div>
        )}

        {/* Delicate Inner Vignette & Border */}
        <div className="absolute inset-0 border border-black/5 pointer-events-none" />

        {/* Top Editorial Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          <div className="flex items-center gap-1.5">
            <span className="bg-[#1C1008]/85 text-[#FAF8F5] text-[9px] tracking-[0.25em] uppercase font-medium px-3 py-1 rounded-full border border-[#C9A96E]/30 backdrop-blur-md shadow-sm">
              {badgeText}
            </span>
            {hasSale && (
              <span className="bg-[#C9A96E] text-[#1C1008] text-[9px] tracking-wider uppercase font-bold px-2 py-0.5 rounded-full shadow-sm">
                Sale
              </span>
            )}
          </div>
          {!product.inStock && (
            <span className="bg-red-950/90 text-white text-[9px] tracking-widest uppercase px-2.5 py-0.5 rounded-full font-semibold">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Corner Glyph */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
          <div className="w-8 h-8 rounded-full bg-[#1C1008]/85 text-[#FAF8F5] flex items-center justify-center border border-[#C9A96E]/40 shadow-lg">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C9A96E]" />
          </div>
        </div>
      </Link>

      {/* Haute Pâtisserie Editorial Strip (Understated, No Redundancy) */}
      <div className="p-5 flex flex-col flex-grow justify-between bg-[#FAF8F5]">
        <div>
          {/* Header Row: Category / Rating */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#8B7355] mb-2 font-medium">
            <span>{product.category || 'Atelier Bake'}</span>
            <span className="flex items-center gap-1 text-[#C9A96E]">
              <Star className="w-3 h-3 fill-[#C9A96E]" />
              <span className="font-sans text-[11px] font-semibold text-[#1C1008]">5.0</span>
            </span>
          </div>

          {/* Product Title & Price */}
          <div className="flex items-baseline justify-between gap-3 mb-2.5">
            <Link href={`/product/${product.slug}`} className="block flex-1">
              <h3 className="font-display text-lg text-[#1C1008] font-light leading-snug group-hover:text-[#C9A96E] transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            {hasSale ? (
              <div className="flex items-baseline gap-1.5 shrink-0">
                <span className="line-through text-xs text-[#8B7355]/80 font-normal font-sans">
                  {formatPrice(originalPrice)}
                </span>
                <span className="font-display text-xl text-[#9E6B1F] font-bold">
                  {formatPrice(activePrice)}
                </span>
              </div>
            ) : (
              <span className="font-display text-xl text-[#9E6B1F] font-bold shrink-0">
                {formatPrice(activePrice)}
              </span>
            )}
          </div>

          {/* Subtle Flavor Note Pills (High-End & Clean) */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {pills.map((pill, idx) => (
              <span
                key={idx}
                className="text-[10px] tracking-wide text-[#7D6B58] bg-[#F1ECE1] px-2.5 py-0.5 rounded-full border border-[#E8DFC8]/60"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button: Luxury Full-Width Add Pill */}
        <div className="pt-3 border-t border-[#E8DFC8]/70">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full bg-[#1C1008] text-[#FAF8F5] hover:bg-[#C9A96E] hover:text-[#1C1008] disabled:opacity-40 disabled:cursor-not-allowed py-2.5 px-4 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm shadow-sm flex items-center justify-center gap-2 group/btn cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
            <span>Add to Basket — {formatPrice(product.price)}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
