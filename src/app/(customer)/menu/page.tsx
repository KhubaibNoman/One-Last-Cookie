import { db } from '@/lib/db';
import { products, categories } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_PRODUCTS, BakeryProduct } from '@/lib/initial-products';
import MenuCatalog from '@/components/MenuCatalog';

async function getAllProducts(): Promise<BakeryProduct[]> {
  try {
    const result = await db
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
      .leftJoin(categories, eq(products.categoryId, categories.id));

    if (result && result.length > 0) {
      return result.map((p) => ({
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
        ingredients: ['Butter', 'Flour', 'Sugar'],
        tasteNotes: 'Artisanal bake.',
      }));
    }
  } catch {
    // Fallback to initial curated products
  }

  return INITIAL_PRODUCTS;
}

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentCategory = resolvedParams?.category;
  const allProducts = await getAllProducts();

  return (
    <div className="min-h-screen bg-[#F9F5EE]">
      {/* Editorial Header */}
      <div className="bg-[#1C1008] py-24 sm:py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C9A96E_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[#C9A96E] text-xs tracking-[0.45em] uppercase mb-4">
            Curated Bakery Catalog
          </p>
          <h1 className="font-display text-5xl sm:text-7xl text-[#F9F5EE] font-light mb-4">
            Our Complete <em className="text-[#C9A96E] italic font-serif">Menu</em>
          </h1>
          <p className="text-[#8B7355] text-sm sm:text-base max-w-lg mx-auto">
            Small-batch cookies, moist coconut cakes, and citrus pastries prepared fresh every sunrise.
          </p>
        </div>
      </div>

      {/* Interactive Catalog with live search & dietary filters */}
      <MenuCatalog
        initialProducts={allProducts}
        defaultCategory={currentCategory}
      />
    </div>
  );
}
