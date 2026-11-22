import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, categories } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_PRODUCTS } from '@/lib/initial-products';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured');

    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        basePrice: products.basePrice,
        salePrice: products.salePrice,
        imageUrl: products.imageUrl,
        inStock: products.inStock,
        featured: products.featured,
        category: categories.name,
        categorySlug: categories.slug,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

    if (result && result.length > 0) {
      let filtered = result;
      if (categorySlug) {
        filtered = filtered.filter((p) => p.categorySlug === categorySlug);
      }
      if (featured === 'true') {
        filtered = filtered.filter((p) => p.featured);
      }
      return NextResponse.json(filtered);
    }

    // Fallback to initial products
    let fallback = INITIAL_PRODUCTS;
    if (categorySlug) {
      fallback = fallback.filter((p) => p.categorySlug === categorySlug);
    }
    if (featured === 'true') {
      fallback = fallback.filter((p) => p.featured);
    }
    return NextResponse.json(fallback);
  } catch (error) {
    // If DB isn't configured yet, return fallback
    const { searchParams } = new URL(request.url);
    const categorySlug = searchParams.get('category');
    const featured = searchParams.get('featured');

    let fallback = INITIAL_PRODUCTS;
    if (categorySlug) {
      fallback = fallback.filter((p) => p.categorySlug === categorySlug);
    }
    if (featured === 'true') {
      fallback = fallback.filter((p) => p.featured);
    }
    return NextResponse.json(fallback);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, description, price, basePrice, salePrice, categoryId, imageUrl, imagePublicId, inStock, featured } = body;

    const [product] = await db
      .insert(products)
      .values({ name, slug, description, price, basePrice, salePrice, categoryId, imageUrl, imagePublicId, inStock, featured })
      .returning();

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
