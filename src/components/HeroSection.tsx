'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react';

const heroSlides = [
  {
    video: '/bakery/bakery-video-1.mp4',
    tag: 'ÉDITION N° 01 • SIGNATURE COLLECTION',
    title: 'One Last Cookie',
    subtitle: "There's Always Room For One More",
    description: 'Crisp golden edges with molten Belgian 70% dark chocolate centers, baked fresh at dawn with European churned butter.',
    categoryLink: '/menu?category=cookies',
    price: 550,
    name: 'Artisan Chocolate Chip Cookies',
    img: '/bakery/chocolate-chip-cookie.jpg',
  },
  {
    video: '/bakery/bakery-video-2.mp4',
    tag: 'ÉDITION N° 02 • DOUCEUR AGRUMES',
    title: 'Gâteau Citron',
    subtitle: 'Infusion Noix de Coco',
    description: 'An airy, delicate sponge infused with fresh Sicilian lemon zest and finished with roasted coconut shavings.',
    categoryLink: '/menu?category=cakes',
    price: 950,
    name: 'Lemon Zest Coconut Cake',
    img: '/bakery/bakery-2.jpg',
  },
  {
    video: '/bakery/bakery-video-3.mp4',
    tag: 'ÉDITION N° 03 • VELOURS ÉCARLATE',
    title: 'Velours Rouge',
    subtitle: 'Chocolat Blanc Suisse',
    description: 'Deep crimson cocoa indulgence dotted with Swiss white chocolate chips and powdered confectioners sugar.',
    categoryLink: '/menu?category=cookies',
    price: 650,
    name: 'Red Velvet White Chocolate Cookies',
    img: '/bakery/bakery-6.jpg',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Auto-advance slides every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % heroSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Manage video play/pause on slide change
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#160E08] pt-20 pb-16">
      {/* 4K 60fps Video Backgrounds */}
      {heroSlides.map((slide, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={slide.video}
          muted
          loop
          playsInline
          preload={i === 0 ? 'auto' : 'none'}
          onCanPlay={() => {
            if (i === 0) {
              setLoaded(true);
              videoRefs.current[0]?.play().catch(() => {});
            }
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            i === current ? 'opacity-55 scale-100' : 'opacity-0 scale-105'
          } transition-all duration-1000 ease-out`}
        />
      ))}

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#160E08]/75 via-black/35 to-[#160E08]/95 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_25%,_#160E08_95%)] pointer-events-none z-10" />

      {/* Main Center Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top Collection Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1C1008]/85 border border-[#C9A96E]/40 backdrop-blur-md mb-6 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#E8D5B0] font-medium">
                {heroSlides[current].tag}
              </span>
            </div>

            {/* Editorial Brand Headlines */}
            <h1 className="font-display text-[#FAF8F5] text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light leading-none tracking-tight mb-2">
              {heroSlides[current].title}
            </h1>
            <h2 className="font-display text-[#C9A96E] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic leading-tight mb-6">
              {heroSlides[current].subtitle}
            </h2>

            {/* Poetic Description */}
            <p className="text-[#E8DFC8]/90 text-sm sm:text-base font-light leading-relaxed max-w-xl mx-auto mb-8 font-sans">
              {heroSlides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center items-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            href="/menu"
            className="inline-flex items-center justify-center gap-2.5 bg-[#C9A96E] text-[#160E08] hover:bg-[#FAF8F5] px-9 py-4 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-sm shadow-xl hover:shadow-[0_8px_30px_rgba(201,169,110,0.35)] group cursor-pointer"
          >
            <span>Explore The Collection</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Slide Index Indicators (Roman Numerals) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="group flex flex-col items-center gap-1 p-1 cursor-pointer"
            aria-label={`Slide ${i + 1}`}
          >
            <span
              className={`text-[10px] tracking-widest font-mono transition-colors ${
                i === current ? 'text-[#C9A96E] font-bold' : 'text-[#8B7355]/60 group-hover:text-[#FAF8F5]'
              }`}
            >
              0{i + 1}
            </span>
            <span
              className={`h-0.5 transition-all duration-500 rounded-full ${
                i === current ? 'w-8 bg-[#C9A96E]' : 'w-2 bg-[#C9A96E]/30 group-hover:bg-[#C9A96E]/60'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
