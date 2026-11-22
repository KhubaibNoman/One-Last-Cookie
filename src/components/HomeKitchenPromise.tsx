'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock, Flame, ShieldCheck, ArrowRight, CheckCircle2, Leaf, ChefHat, Cookie } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HOME_PILLARS = [
  {
    icon: Flame,
    tag: 'Stage 01',
    title: 'Micro-Batch Hand Mixing',
    badge: '8–12 per bake',
    description:
      'We never use giant industrial mixers or conveyor belts. Every batch is measured by eye and hand-mixed in our kitchen bowls, ensuring the butter, eggs, and unrefined sugars cream into silky, golden dough.',
    perk: 'Small-scale precision & texture',
  },
  {
    icon: Leaf,
    tag: 'Stage 02',
    title: 'Pure Pantry Staples Only',
    badge: 'Zero Preservatives',
    description:
      'If you cannot find it in a loving family pantry, you will never find it in our dough. Real creamery butter, farm-fresh eggs, unbleached flour, and chopped chocolate pools. No artificial stabilizers or shelf-life chemicals.',
    perk: '100% wholesome & honest',
  },
  {
    icon: Clock,
    tag: 'Stage 03',
    title: '24-Hour Slow Dough Chill',
    badge: 'Overnight Cold Rest',
    description:
      'Great homemade baking cannot be rushed. Our hand-scooped dough rests overnight in our refrigerator so the flours absorb the butterfat, yielding deep butterscotch caramelization with crispy rims and molten centers.',
    perk: 'Rich natural caramelization',
  },
  {
    icon: ChefHat,
    tag: 'Stage 04',
    title: 'Baked Strictly To Order',
    badge: 'Dawn Oven Run',
    description:
      'We do not store trays of pre-baked cookies on grocery shelves. When your order arrives, our kitchen oven preheats. You receive cookies that were cooling on kitchen wire racks just hours before reaching your doorstep.',
    perk: 'Unrivaled fresh-baked warmth',
  },
];

export default function HomeKitchenPromise() {
  return (
    <section className="py-24 sm:py-32 px-6 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8DFC8]">
      {/* Warm ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-[#C9A96E]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ─── Header ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E8DFC8] shadow-xs text-[#A68A56] text-[10px] tracking-[0.3em] uppercase font-semibold mb-4"
          >
            <Heart className="w-3.5 h-3.5 text-[#C9A96E] fill-[#C9A96E]" />
            <span>The Homemade Difference</span>
            <Sparkles className="w-3 h-3 text-[#C9A96E]" />
          </motion.div>

          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light leading-tight mb-5"
          >
            From Our Home Kitchen,{' '}
            <em className="text-[#C9A96E] italic font-serif">Baked With Heart</em>
          </motion.h2>

          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-sm sm:text-base text-[#7D6B58] leading-relaxed max-w-2xl mx-auto"
          >
            We are not a cold, mechanized factory. We are an authentic home bakery where every single cookie is hand-scooped, watched through our oven door, and packed with the same warmth we share at our own family table.
          </motion.p>
        </motion.div>

        {/* ─── Main Showcase Grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Visual Story Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Primary Hero Image Box */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#E8DFC8] shadow-[0_12px_45px_rgba(28,16,8,0.08)] group bg-[#F7F4EF]">
              <Image
                src="/bakery/chocolate-chip-cookie.jpg"
                alt="Fresh homemade chocolate chip cookie straight from the oven"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1008]/85 via-[#1C1008]/20 to-transparent" />

              {/* Top floating pill */}
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md text-[#1C1008] text-[10px] tracking-[0.2em] uppercase font-semibold px-3.5 py-1.5 rounded-full border border-[#E8DFC8] shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
                <span>Small-Batch Kitchen</span>
              </div>

              {/* Bottom Card Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white z-10">
                <span className="text-[#E8D5B0] text-[10px] tracking-[0.3em] uppercase font-semibold block mb-2">
                  Our Baking Philosophy
                </span>
                <p className="font-serif italic text-lg sm:text-xl text-[#F9F5EE] leading-snug mb-4 font-light">
                  &ldquo;A warm cookie should feel like coming home. No shortcuts, no fake flavors — just the pure nostalgia of oven-fresh baking.&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20 text-xs">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-[#C9A96E]" />
                    <span className="tracking-wider uppercase text-[11px] text-[#E8D5B0] font-medium">One Last Cookie Atelier</span>
                  </div>
                  <span className="text-[10px] text-white/70 tracking-widest uppercase">Handcrafted</span>
                </div>
              </div>
            </div>

            {/* Quick Baker's Guarantee Badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: '100% Real', desc: 'Farm Butter' },
                { title: '0% Chemical', desc: 'Preservatives' },
                { title: 'Bake-to-Order', desc: 'Always Fresh' },
              ].map((badge, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-3.5 border border-[#E8DFC8] text-center shadow-xs"
                >
                  <p className="text-xs font-semibold text-[#1C1008] leading-tight">{badge.title}</p>
                  <p className="text-[10px] text-[#A68A56] tracking-wider uppercase mt-0.5">{badge.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: The 4 Homemade Pillars (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between gap-4"
          >
            <div className="space-y-4">
              {HOME_PILLARS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="bg-[#21130B] rounded-xl p-6 sm:p-7 border border-[#3E2819] shadow-[0_6px_24px_rgba(28,16,8,0.14)] hover:border-[#C9A96E] hover:shadow-[0_16px_36px_rgba(28,16,8,0.28)] transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#2E1B10] border border-[#C9A96E]/40 flex items-center justify-center text-[#C9A96E] group-hover:bg-[#C9A96E] group-hover:text-[#1C1008] transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#C9A96E] tracking-widest uppercase block">
                            {item.tag}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl text-[#FAF8F5] font-light">
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      <span className="self-start text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full bg-[#2E1B10] text-[#E8D5B0] border border-[#C9A96E]/30 shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D4C3AF] leading-relaxed mb-4 pl-0 sm:pl-12 font-light">
                      {item.description}
                    </p>

                    <div className="pl-0 sm:pl-12 flex items-center gap-2 text-[11px] text-[#C9A96E] font-medium pt-3 border-t border-[#3E2819]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E]" />
                      <span>{item.perk}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Ribbon */}
            <div className="pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#21130B] p-6 rounded-xl border border-[#3E2819] shadow-md">
              <div>
                <p className="font-display text-lg text-[#FAF8F5]">Craving warm, freshly baked comfort?</p>
                <p className="text-xs text-[#D4C3AF]">Every batch is freshly prepared and boxed for you today.</p>
              </div>

              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C9A96E] hover:bg-[#FAF8F5] text-[#1C1008] px-7 py-3.5 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm shadow-md shrink-0 group"
              >
                <span>Taste The Bakes</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─── Warmth & Reheat Instruction Bar ─── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={3}
          className="bg-white rounded-xl p-6 sm:p-8 border border-[#E8DFC8] shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E8DFC8]"
        >
          <div className="flex items-start gap-3.5 pt-4 md:pt-0">
            <Flame className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-lg text-[#1C1008] font-medium mb-1">Warm Kitchen Secret</h4>
              <p className="text-xs text-[#7D6B58] leading-relaxed">
                Warm your cookie in a preheated 160°C oven for 3 minutes. The molten center softens and fills your home with the fragrance of vanilla and melted chocolate.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
            <ShieldCheck className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-lg text-[#1C1008] font-medium mb-1">Zero Commercial Additives</h4>
              <p className="text-xs text-[#7D6B58] leading-relaxed">
                We never use palm oils, margarine, or artificial dough enhancers. What you taste is 100% natural butterfat, eggs, unbleached flour, and pure sugar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 pt-4 md:pt-0 md:pl-6">
            <Heart className="w-5 h-5 text-[#C9A96E] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-display text-lg text-[#1C1008] font-medium mb-1">Hand-Packed with Care</h4>
              <p className="text-xs text-[#7D6B58] leading-relaxed">
                Every box is hand-tied with parchment and includes our personal handwritten flavor notes. Perfect for self-care or gifting someone you adore.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
