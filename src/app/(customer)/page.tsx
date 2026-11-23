import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import VideoShowcase from '@/components/VideoShowcase';
import PhotoGallery from '@/components/PhotoGallery';
import CraftStorySection from '@/components/CraftStorySection';
import HomeKitchenPromise from '@/components/HomeKitchenPromise';
import NewsletterSection from '@/components/NewsletterSection';
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { INITIAL_PRODUCTS } from '@/lib/initial-products';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getFeaturedProducts() {
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
      })
      .from(products)
      .where(eq(products.featured, true))
      .limit(4);

    if (res && res.length > 0) {
      return res;
    }
    return INITIAL_PRODUCTS.filter((p) => p.featured);
  } catch {
    return INITIAL_PRODUCTS.filter((p) => p.featured);
  }
}

export default async function HomePage() {
  const featured = await getFeaturedProducts();

  return (
    <div className="bg-[#FAF8F5] text-[#1C1008]">
      {/* 4K 60fps Video Motion Hero with Live Oven Ticker (User Global Rule) */}
      <HeroSection />

      {/* Featured Products Collection */}
      <section className="py-24 px-6 bg-[#F6F2EA] border-t border-[#E8DFC8] relative">
        <div className="max-w-7xl mx-auto">
          {/* Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-[#E8DFC8] pb-8">
            <div className="max-w-2xl">
              <span className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase font-semibold block mb-2">
                Today&apos;s Signature Bakes
              </span>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light leading-tight">
                Signature <em className="text-[#C9A96E] italic font-serif">Creations</em>
              </h2>
              <p className="text-sm text-[#7D6B58] mt-3 leading-relaxed">
                Handmade each morning with French Normandy butter, Belgian single-origin chocolate, and freshly grated zest.
              </p>
            </div>

            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[#1C1008] hover:bg-[#C9A96E] text-[#FAF8F5] hover:text-[#1C1008] text-[11px] tracking-[0.2em] uppercase font-semibold px-6 py-3.5 rounded-sm transition-all duration-300 shadow-md group shrink-0"
            >
              <span>Explore All Creations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <FeaturedProducts products={featured as any} />
        </div>
      </section>

      {/* The Master's Methodology: 4 Pillars of Craft Story */}
      <CraftStorySection />

      {/* The Home Kitchen Promise: Small-Batch Homemade Philosophy */}
      <HomeKitchenPromise />

      {/* Parallax Video Showcase */}
      <VideoShowcase />

      {/* Photo Gallery with real pictures & Lightbox Modal */}
      <PhotoGallery />

      {/* Newsletter / Confection Club */}
      <NewsletterSection />
    </div>
  );
}
