'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#160E08] -mt-20 pt-20 pb-16">
      {/* 4K Motion Video Background: Signature Chocolate Cookies */}
      <video
        src="/bakery/bakery-video-1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-50 scale-100 transition-opacity duration-700 ease-out"
      />

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#160E08]/75 via-black/35 to-[#160E08]/95 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_#160E08_95%)] pointer-events-none z-10" />

      {/* Main Center Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto py-8">
        <div>
          {/* Top Collection Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1008]/85 border border-[#C9A96E]/40 backdrop-blur-md mb-6 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E8D5B0] font-medium">
              SIGNATURE COLLECTION • BAKED FRESH DAILY
            </span>
          </div>

          {/* Editorial Brand Headlines */}
          <h1 className="font-display text-[#FAF8F5] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light leading-none tracking-tight mb-2">
            One Last Cookie
          </h1>
          <h2 className="font-display text-[#C9A96E] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic leading-tight mb-6">
            There&apos;s Always Room For One More
          </h2>

          {/* Poetic Description */}
          <p className="text-[#E8DFC8]/90 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-8 font-sans">
            Crisp golden edges with molten Belgian dark chocolate centers, hand-mixed with pure European butter and baked fresh to order.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center mb-4">
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2.5 bg-[#C9A96E] text-[#160E08] hover:bg-[#FAF8F5] px-9 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-sm shadow-xl hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group cursor-pointer"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
