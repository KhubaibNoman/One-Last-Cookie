'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, X, Sparkles } from 'lucide-react';
import { BakeryProduct } from '@/lib/initial-products';

interface MenuCatalogProps {
  initialProducts: BakeryProduct[];
  defaultCategory?: string;
}

const CATEGORIES = [
  { label: 'All Bakes', slug: 'all' },
  { label: 'Cookies', slug: 'cookies' },
  { label: 'Cakes', slug: 'cakes' },
  { label: 'Pastries & Bites', slug: 'pastries' },
];

const FLAVOR_TAGS = [
  { label: 'All Flavors', tag: 'all' },
  { label: 'Belgian Cocoa', tag: 'chocolate' },
  { label: 'Sicilian Citrus', tag: 'citrus' },
  { label: 'Coconut Flakes', tag: 'coconut' },
  { label: 'White Chocolate', tag: 'white chocolate' },
];

export default function MenuCatalog({ initialProducts, defaultCategory }: MenuCatalogProps) {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState(defaultCategory || 'all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedCat !== 'all' && product.categorySlug !== selectedCat) {
        return false;
      }

      if (selectedTag !== 'all') {
        const text = `${product.name} ${product.description} ${product.ingredients?.join(' ')} ${product.tasteNotes || ''}`.toLowerCase();
        if (!text.includes(selectedTag.toLowerCase())) {
          return false;
        }
      }

      if (search.trim()) {
        const q = search.toLowerCase();
        const text = `${product.name} ${product.description} ${product.category} ${product.ingredients?.join(' ')}`.toLowerCase();
        if (!text.includes(q)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return parseFloat(a.price) - parseFloat(b.price);
      if (sortBy === 'price-desc') return parseFloat(b.price) - parseFloat(a.price);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [initialProducts, search, selectedCat, selectedTag, sortBy]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCat('all');
    setSelectedTag('all');
    setSortBy('featured');
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Sticky Haute Pâtisserie Filter Bar */}
      <div className="sticky top-16 sm:top-20 z-30 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#E8DFC8]/70 py-4 px-6 shadow-[0_4px_20px_rgba(28,16,8,0.03)] transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => {
              const active = selectedCat === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCat(cat.slug)}
                  className={`text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium cursor-pointer ${active
                    ? 'bg-[#1C1008] text-[#FAF8F5] shadow-sm'
                    : 'text-[#7D6B58] hover:text-[#1C1008] hover:bg-[#E8DFC8]/40'
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search + Sort Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Live Search Input */}
            <div className="relative flex-1 md:w-72">
              <Search className="w-3.5 h-3.5 text-[#8B7355] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by flavor, bake, or note..."
                className="w-full bg-[#F3EFE6] border border-[#E8DFC8] rounded-full pl-9 pr-8 py-2 text-xs text-[#1C1008] placeholder-[#8B7355] focus:outline-none focus:border-[#C9A96E] transition-colors"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355] hover:text-[#1C1008]"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F3EFE6] border border-[#E8DFC8] rounded-full px-4 py-2 text-xs text-[#1C1008] focus:outline-none focus:border-[#C9A96E] cursor-pointer appearance-none pr-8 font-medium tracking-wider"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="w-3 h-3 text-[#8B7355] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Dietary & Flavor Profile Pills Row */}
        <div className="max-w-7xl mx-auto pt-3 flex items-center gap-2 overflow-x-auto text-xs text-[#8B7355]">
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A68A56] mr-1 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-[#C9A96E]" /> Flavor Profile:
          </span>
          {FLAVOR_TAGS.map((tag) => {
            const active = selectedTag === tag.tag;
            return (
              <button
                key={tag.tag}
                onClick={() => setSelectedTag(tag.tag)}
                className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors border cursor-pointer ${active
                  ? 'border-[#C9A96E] bg-[#C9A96E]/15 text-[#1C1008] font-semibold'
                  : 'border-[#E8DFC8] bg-white/70 hover:border-[#C9A96E]/50 text-[#7D6B58]'
                  }`}
              >
                {tag.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 flex items-center justify-between text-xs text-[#7D6B58]">
        <span className="tracking-wider uppercase text-[11px]">
          Showing <strong className="text-[#1C1008] font-semibold">{filteredProducts.length}</strong> creations
        </span>
        {(search || selectedCat !== 'all' || selectedTag !== 'all') && (
          <button
            onClick={resetFilters}
            className="text-[#C9A96E] hover:underline flex items-center gap-1 font-medium cursor-pointer"
          >
            <X className="w-3 h-3" /> Reset all filters
          </button>
        )}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-28">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E8DFC8] rounded-lg p-12 shadow-sm">
            <span className="font-display text-6xl text-[#C9A96E]/40 mb-3 block">🥐</span>
            <h3 className="font-display text-3xl text-[#1C1008] mb-2 font-light">No matching creations found</h3>
            <p className="text-sm text-[#8B7355] max-w-sm mx-auto mb-6">
              Try adjusting your flavor profile or search query to find our other baked specialties.
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#1C1008] text-[#FAF8F5] hover:bg-[#C9A96E] hover:text-[#1C1008] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors rounded-sm cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
