'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, Feather, ShoppingBag, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

export default function SignaturePackaging() {
  return (
    <section className="py-28 px-6 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8DFC8]">
      {/* Warm ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#C9A96E]/6 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ─── Section Header ─── */}
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.p custom={0} variants={fadeUp} className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2 font-medium">
            <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
            Signature Unboxing Ritual
            <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
          </motion.p>
          <motion.h2 custom={1} variants={fadeUp} className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light mb-5">
            The Signature{' '}
            <em className="text-[#C9A96E] italic font-serif">Packaging Suite</em>
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-[#7D6B58] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Every creation is presented with the meticulous care of haute joaillerie — engineered to preserve freshly baked warmth and make every unboxing unforgettable.
          </motion.p>
        </motion.div>

        {/* ─── Main Feature ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-[0_12px_60px_rgba(28,16,8,0.10)] border border-[#E8DFC8] mb-20">

          {/* Left: Box photo — logo already printed on box */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[480px] sm:min-h-[580px] bg-[#F7F4EF] overflow-hidden group"
          >
            <Image
              src="/bakery/olc-box.jpg"
              alt="One Last Cookie Signature Gift Box"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ objectPosition: 'center 20%' }}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Soft vignette — bottom only */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F7F4EF]/50 to-transparent pointer-events-none" />

            {/* Floating pill badge */}
            <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-sm text-[#1C1008] text-[10px] tracking-[0.25em] uppercase font-semibold px-4 py-2 rounded-full border border-[#E8DFC8] shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              The Signature Keepsake Box
            </div>

            {/* Material badge */}
            <div className="absolute bottom-5 right-5 z-10 bg-white/85 backdrop-blur-sm text-[#7D6B58] text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-sm border border-[#E8DFC8] shadow-sm hidden sm:block">
              Rigid White Box · Brown Satin Ribbon
            </div>
          </motion.div>

          {/* Right: Specs panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="bg-[#FAF8F5] p-10 sm:p-14 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#E8DFC8]"
          >
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C9A96E] font-semibold block mb-2">
                Bespoke Engineering
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-[#1C1008] font-light mb-5 leading-snug">
                The Cookie<br />Gift Ballotin
              </h3>
              <p className="text-sm text-[#7D6B58] leading-relaxed mb-8 font-light">
                A crisp white rigid box wrapped in a hand-tied brown satin bow, printed with our signature crest. Designed to arrive pristine, to delight on opening, and to stay on the shelf long after the last cookie is enjoyed.
              </p>

              {/* Specifications */}
              <div className="space-y-5 mb-10">
                {[
                  {
                    title: 'Hand-Tied Brown Satin Ribbon',
                    desc: '25 mm double-faced satin, knotted into a generous salon bow by our packing atelier.',
                  },
                  {
                    title: 'Rigid Archival White Shell',
                    desc: 'Heavyweight board with a soft-touch matte finish — smooth, clean, and gift-ready.',
                  },
                  {
                    title: 'Signature Brand Crest Print',
                    desc: 'Our One Last Cookie logo printed directly on the box lid for a premium branded finish.',
                  },
                  {
                    title: 'Thermal Freshness Barrier',
                    desc: 'Food-safe gold-foil parchment lining that locks in oven warmth and vanilla fragrance.',
                  },
                ].map((spec, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1C1008] font-medium block text-sm">{spec.title}</strong>
                      <span className="text-[#9C8673] text-xs leading-relaxed">{spec.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="pt-7 border-t border-[#E8DFC8] flex items-center justify-end">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[#1C1008] hover:bg-[#C9A96E] text-[#FAF8F5] hover:text-[#1C1008] px-8 py-3.5 text-xs tracking-widest uppercase font-semibold transition-all duration-300 rounded-sm shadow-md shrink-0"
              >
                <span>Order Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─── Companion Packaging Suite ─── */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-10 pb-5 border-b border-[#E8DFC8]">
            <div>
              <span className="text-[#A68A56] text-[10px] tracking-[0.3em] uppercase font-semibold block mb-1">
                The Complete Experience
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-[#1C1008] font-light">
                Companion Atelier Packaging
              </h3>
            </div>
            <p className="text-xs text-[#7D6B58] mt-2 sm:mt-0">
              Thoughtfully curated accessories accompanying every order
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <ShoppingBag className="w-4 h-4" />,
                label: 'Storefront Pickup',
                title: 'Linen Atelier Tote',
                body: 'Heavy unbleached 100% natural cotton canvas tote screen-printed with the One Last Cookie crest. Reusable, washable, and built to carry warm bakery boxes securely.',
                detail: '100% Organic Canvas',
                badge: 'Complimentary',
              },
              {
                icon: <Feather className="w-4 h-4" />,
                label: 'Personal Greeting',
                title: 'Calligraphy Gift Card',
                body: 'Hand-lettered with metallic gold calligraphy ink on 300 GSM French cotton rag paper with natural deckled edges. You write the note at checkout; we hand-pen it.',
                detail: 'Deckled French Cotton',
                badge: 'Personalized',
              },
              {
                icon: <ShieldCheck className="w-4 h-4" />,
                label: 'Freshness Protection',
                title: 'Thermal Aroma Seal',
                body: 'Food-grade gold-foil parchment with a breathable micro-thermal barrier. Keeps cookie edges crisp while centers remain velvety — sealed inside the gift box.',
                detail: 'Oven Heat Retention',
                badge: 'All Orders',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white rounded-xl p-7 border border-[#E8DFC8] shadow-[0_4px_24px_rgba(28,16,8,0.04)] flex flex-col justify-between hover:shadow-[0_8px_40px_rgba(201,169,110,0.12)] transition-shadow duration-300"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E] mb-5">
                    {item.icon}
                  </div>
                  <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-[#A68A56] block mb-1">
                    {item.label}
                  </span>
                  <h4 className="font-display text-2xl text-[#1C1008] font-light mb-2">{item.title}</h4>
                  <p className="text-xs text-[#7D6B58] leading-relaxed mb-4">{item.body}</p>
                </div>
                <div className="pt-4 border-t border-[#E8DFC8]/70 flex items-center justify-between text-[11px] text-[#A68A56]">
                  <span>{item.detail}</span>
                  <span className="font-semibold text-[#1C1008]">{item.badge}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
