'use client';

import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/lib/store';
import { INITIAL_PRODUCTS, BakeryProduct } from '@/lib/initial-products';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { toast } from './ui/toast';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, addItem } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const state = useCart.getState();
        if (state.isSearchOpen) state.closeSearch();
        else state.openSearch();
      }
      if (e.key === 'Escape' && useCart.getState().isSearchOpen) {
        useCart.getState().closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results: BakeryProduct[] = query.trim()
    ? INITIAL_PRODUCTS.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.ingredients?.some((ing) => ing.toLowerCase().includes(q)) ||
          p.tasteNotes?.toLowerCase().includes(q)
        );
      })
    : INITIAL_PRODUCTS.slice(0, 4); // show trending 4 when empty

  const handleQuickAdd = (p: BakeryProduct, e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: p.id,
      name: p.name,
      price: parseFloat(p.price),
      imageUrl: p.imageUrl,
    });
    toast(`${p.name} added to cart`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="w-full max-w-2xl bg-[#FAF7F2] border border-[#C9A96E]/40 rounded-lg shadow-2xl overflow-hidden pointer-events-auto flex flex-col max-h-[80vh]"
            >
              {/* Search Bar Input */}
              <div className="p-5 border-b border-[#C9A96E]/20 bg-[#1C1008] text-[#F9F5EE] flex items-center gap-3">
                <Search className="w-5 h-5 text-[#C9A96E] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search cookies, coconut cake, chocolate, citrus..."
                  className="w-full bg-transparent text-[#F9F5EE] placeholder-[#8B7355] text-base focus:outline-none font-display font-light"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-[#8B7355] hover:text-[#F9F5EE]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="text-xs uppercase tracking-widest text-[#8B7355] hover:text-[#C9A96E] border border-[#C9A96E]/30 px-2 py-1 rounded transition-colors"
                >
                  Esc
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="p-6 overflow-y-auto flex-1 space-y-3">
                <div className="flex items-center justify-between text-xs tracking-widest uppercase text-[#8B7355] mb-2 font-medium">
                  <span>{query ? `Matching Creations (${results.length})` : 'Popular Recommendations'}</span>
                  {!query && <span className="text-[#C9A96E]">Featured</span>}
                </div>

                {results.length === 0 ? (
                  <div className="py-12 text-center text-[#8B7355]">
                    <p className="font-display text-2xl text-[#1C1008] mb-1">No delicacies found</p>
                    <p className="text-xs">Try searching for &quot;chocolate&quot;, &quot;lemon&quot;, or &quot;cookies&quot;.</p>
                  </div>
                ) : (
                  results.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 p-3 bg-white border border-[#C9A96E]/15 rounded-md hover:border-[#C9A96E] transition-all duration-200 group shadow-sm"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={closeSearch}
                        className="relative w-14 h-18 bg-[#1C1008]/5 rounded-sm overflow-hidden shrink-0 border border-[#C9A96E]/20"
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C9A96E] block mb-0.5">
                          {product.category}
                        </span>
                        <Link
                          href={`/product/${product.slug}`}
                          onClick={closeSearch}
                          className="block font-display text-lg text-[#1C1008] group-hover:text-[#C9A96E] transition-colors truncate"
                        >
                          {product.name}
                        </Link>
                        {product.tasteNotes && (
                          <p className="text-xs text-[#8B7355] truncate italic">
                            {product.tasteNotes}
                          </p>
                        )}
                      </div>

                      {/* Price & Action */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-display text-lg text-[#9E6B1F] font-bold">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] p-2 rounded-sm transition-colors"
                          title="Add to Basket"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-[#F4EDE2] border-t border-[#C9A96E]/20 text-xs text-[#8B7355] flex items-center justify-between">
                <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-white border rounded text-[10px] font-mono">Ctrl + K</kbd> anytime to open</span>
                <Link
                  href="/menu"
                  onClick={closeSearch}
                  className="text-[#1C1008] font-semibold hover:text-[#C9A96E] flex items-center gap-1 transition-colors"
                >
                  <span>View All Bakes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
