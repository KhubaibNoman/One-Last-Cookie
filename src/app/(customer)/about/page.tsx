import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Sparkles, Cookie, Flame } from 'lucide-react';
import HomeKitchenPromise from '@/components/HomeKitchenPromise';
import CraftStorySection from '@/components/CraftStorySection';

export const metadata: Metadata = {
  title: 'Our Story & Philosophy | One Last Cookie',
  description:
    'Discover the homemade story behind One Last Cookie. Small-batch artisan cookies and celebration cakes hand-mixed with pure European butter and baked strictly to order.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAF8F5] text-[#1C1008] min-h-screen">
      {/* 4K Motion Hero Section (User Global Rule) */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#160E08] pt-28 pb-20">
        {/* 4K 60fps Video Motion Background */}
        <video
          src="/bakery/bakery-video-2.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 scale-100 transition-all duration-1000 ease-out"
        />

        {/* Ambient Darkened Gradient & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#160E08]/85 via-black/40 to-[#FAF8F5] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_30%,_#160E08_95%)] pointer-events-none z-10" />

        {/* Motion Hero Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1008]/85 border border-[#C9A96E]/40 backdrop-blur-md mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#E8D5B0] font-medium">
              Our Journey • Homemade With Passion
            </span>
          </div>

          <h1 className="font-display text-[#FAF8F5] text-4xl sm:text-6xl md:text-7xl font-light leading-tight tracking-tight mb-4">
            The Story Behind Every <em className="text-[#C9A96E] italic font-serif">Single Batch</em>
          </h1>

          <p className="text-[#E8DFC8]/90 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8 font-sans">
            One Last Cookie began with a simple belief: nothing in this world matches the comfort of a cookie pulled fresh from a home oven. No mechanized factory shortcuts—just real butter, slow-chilled dough, and pure devotion.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="inline-flex items-center gap-2 bg-[#1C1008]/80 border border-[#C9A96E]/30 text-[#E8D5B0] px-4 py-2 rounded-full backdrop-blur-sm">
              <Heart className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Small-Batch Home Kitchen</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#1C1008]/80 border border-[#C9A96E]/30 text-[#E8D5B0] px-4 py-2 rounded-full backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Baked Fresh To Order</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#1C1008]/80 border border-[#C9A96E]/30 text-[#E8D5B0] px-4 py-2 rounded-full backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span>Zero Artificial Additives</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1. From Our Home Kitchen, Baked With Heart */}
      <HomeKitchenPromise />

      {/* 2. The Four Pillars of Pure Obsession */}
      <CraftStorySection />

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-[#1C1008] text-[#F9F5EE] border-t border-[#C9A96E]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C9A96E]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="text-[11px] uppercase tracking-[0.35em] text-[#C9A96E] font-semibold block mb-3">
            Taste The Difference
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#FAF8F5] mb-6 leading-tight">
            Ready to Experience Freshly Baked Warmth?
          </h2>
          <p className="text-sm text-[#E8DFC8]/80 leading-relaxed mb-10 max-w-xl mx-auto">
            Order your favorite cookies and cakes today. Each batch is mixed by hand and baked fresh just for you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-3 bg-[#C9A96E] text-[#160E08] hover:bg-[#FAF8F5] px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-sm shadow-xl hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group cursor-pointer"
            >
              <span>Explore Today&apos;s Bakes</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://www.instagram.com/one.last.cookie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#C9A96E]/50 hover:border-[#FAF8F5] text-[#FAF8F5] px-7 py-4 text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 rounded-sm hover:bg-[#FAF8F5]/5"
            >
              <span>Follow on Instagram</span>
              <span className="text-[#C9A96E]">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
