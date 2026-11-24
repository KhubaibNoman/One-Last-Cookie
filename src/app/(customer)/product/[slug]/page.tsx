import { db, isDatabaseConfigured } from '@/lib/db';
import { products, categories } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_PRODUCTS, BakeryProduct } from '@/lib/initial-products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import ProductDetailActions from './ProductDetailActions';
import ProductCard from '@/components/ProductCard';
import { Sparkles, ShieldCheck, Clock, ArrowLeft } from 'lucide-react';

async function getProductBySlug(slug: string): Promise<BakeryProduct | null> {
  if (!isDatabaseConfigured) {
    return INITIAL_PRODUCTS.find((p) => p.slug === slug) || null;
  }
  try {
    const res = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        price: products.price,
        imageUrl: products.imageUrl,
        description: products.description,
        inStock: products.inStock,
        featured: products.featured,
        category: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1);

    if (res && res[0]) {
      const p = res[0];
      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        description: p.description || '',
        imageUrl: p.imageUrl || '/bakery/bakery-1.jpg',
        inStock: p.inStock,
        featured: p.featured,
        category: p.category || 'Bakery',
        categorySlug: p.categorySlug || 'bakery',
        ingredients: ['Fresh Butter', 'Organic Flour', 'Pure Sugar', 'Natural Extracts'],
        tasteNotes: 'Rich, melt-in-your-mouth perfection.',
      };
    }
  } catch {
    // Database fallback
  }

  const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  return found || null;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasSale = Boolean(
    (product as any).salePrice &&
    parseFloat((product as any).salePrice) > 0 &&
    parseFloat((product as any).salePrice) < parseFloat((product as any).basePrice || product.price)
  );
  const activePrice = hasSale ? (product as any).salePrice! : product.price;
  const originalPrice = (product as any).basePrice || product.price;

  const related = INITIAL_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F9F5EE] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-[#8B7355]">
          <Link href="/menu" className="hover:text-[#1C1008] flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Menu
          </Link>
          <span>/</span>
          <span className="text-[#C9A96E]">{product.category}</span>
          <span>/</span>
          <span className="text-[#1C1008] truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: High-Res Image with Luxury Gold Frame (aspect 2/3 matches poster without cropping) */}
          <div className="relative aspect-[2/3] w-full max-w-md mx-auto overflow-hidden bg-[#FAF8F5] border border-[#E8DFC8] rounded-md shadow-[0_16px_40px_rgba(28,16,8,0.08)] flex items-center justify-center p-2">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              priority
              className="object-contain p-2 transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute top-4 left-4 bg-[#1C1008]/85 text-[#C9A96E] text-[10px] tracking-[0.3em] uppercase px-3 py-1.5 border border-[#C9A96E]/40 backdrop-blur-sm z-10">
              Artisan Batch
            </div>
          </div>

          {/* Right: Editorial Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-2 font-medium">
              {product.category}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light mb-4 leading-tight">
              {product.name}
            </h1>
            {hasSale ? (
              <div className="flex items-baseline gap-3 mb-6 flex-wrap">
                <span className="line-through text-2xl text-[#8B7355]/70 font-light font-display">
                  {formatPrice(originalPrice)}
                </span>
                <span className="font-display text-4xl text-[#9E6B1F] font-bold">
                  {formatPrice(activePrice)}
                </span>
                <span className="bg-[#C9A96E] text-[#1C1008] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Sale ({Math.round((1 - parseFloat(activePrice) / parseFloat(originalPrice)) * 100)}% OFF)
                </span>
              </div>
            ) : (
              <p className="font-display text-4xl text-[#9E6B1F] mb-6 font-bold">
                {formatPrice(product.price)}
              </p>
            )}

            <div className="w-16 h-px bg-[#C9A96E]/40 mb-6" />

            <p className="text-[#8B7355] text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Interactive Add to Cart & Quantity */}
            <ProductDetailActions product={product} />

            {/* Tasting Notes */}
            {product.tasteNotes && (
              <div className="mt-10 p-5 bg-[#1C1008]/5 border-l-2 border-[#C9A96E]">
                <p className="text-xs tracking-widest uppercase font-semibold text-[#1C1008] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" /> Tasting Profile
                </p>
                <p className="text-sm text-[#8B7355] italic">
                  &ldquo;{product.tasteNotes}&rdquo;
                </p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mt-8">
                <p className="text-xs tracking-widest uppercase font-semibold text-[#1C1008] mb-3">
                  Key Ingredients
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs px-3 py-1.5 bg-white border border-[#C9A96E]/20 text-[#8B7355] rounded-full"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Quality Badges */}
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#C9A96E]/20 pt-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#C9A96E]" />
                <span className="text-xs text-[#8B7355]">Baked morning of dispatch</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A96E]" />
                <span className="text-xs text-[#8B7355]">100% natural European butter</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Delights */}
        <div className="mt-28 border-t border-[#C9A96E]/20 pt-16">
          <div className="text-center mb-12">
            <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-2">Pairs Wonderfully With</p>
            <h2 className="font-display text-4xl text-[#1C1008] font-light">More From The Oven</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((item) => (
              <ProductCard key={item.id} product={item as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
