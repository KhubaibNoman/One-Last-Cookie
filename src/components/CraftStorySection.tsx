'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Award, Flame, Wheat } from 'lucide-react';

const CRAFT_PILLARS = [
  {
    icon: Wheat,
    step: '01',
    title: '36-Hour Cold Fermentation',
    subtitle: 'Slow Developing Flavour',
    desc: 'Our unbleached French dough rests in chilled marble chambers for 36 hours. This slow enzymatic process yields deep caramelized sugars, hazelnut notes, and an irresistible chewy crumb.',
    stat: '36 Hrs',
    statLabel: 'Rest Duration',
  },
  {
    icon: Flame,
    step: '02',
    title: '84% Normandy Butterfat',
    subtitle: 'Churned European Cream',
    desc: 'We refuse generic culinary fats. Only cultured Normandy butter churned to 84% butterfat enters our mixers, melting during the bake to create paper-thin micro-layers of flaky richness.',
    stat: '84%',
    statLabel: 'Pure Butterfat',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Belgian Valrhona Grand Cru',
    subtitle: '70% Molten Cocoa Pools',
    desc: 'Hand-chopped single-origin chocolate chunks that melt into lava-like pockets rather than standard waxy chips. Pure cocoa solids balance sweetness with rich roasted complexity.',
    stat: '70%',
    statLabel: 'Dark Cocoa',
  },
  {
    icon: Award,
    step: '04',
    title: 'Maldon Flakes & Citrus Zest',
    subtitle: 'The Perfect Counterpoint',
    desc: 'Each batch is finished by hand with crunchy pyramid crystals of Maldon sea salt and fresh zest from hand-picked Sicilian lemons, slicing through the butter with vibrant fragrance.',
    stat: '100%',
    statLabel: 'Natural Zest',
  },
];

export default function CraftStorySection() {
  return (
    <section className="py-28 px-6 bg-[#F6F2EA] relative overflow-hidden border-t border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[#A68A56] text-[11px] tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
            The Master Baker&apos;s Methodology
            <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#1C1008] font-light mb-4">
            The Four Pillars of <em className="text-[#C9A96E] italic font-serif">Pure Obsession</em>
          </h2>
          <p className="text-[#7D6B58] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Why does a One Last Cookie bake taste completely incomparable? Every ingredient has a pedigree, and every technique is uncompromising.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CRAFT_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.step}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-md p-7 sm:p-8 border border-[#E8DFC8] shadow-[0_4px_24px_rgba(28,16,8,0.03)] hover:border-[#C9A96E] hover:shadow-[0_16px_36px_rgba(201,169,110,0.18)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8DFC8]/60">
                    <span className="font-mono text-xs font-bold text-[#C9A96E]">
                      STAGE {pillar.step}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#C9A96E]/30 flex items-center justify-center text-[#C9A96E]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-[#1C1008] font-light mb-1 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#A68A56] font-serif italic mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-[#7D6B58] leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DFC8]/60 flex items-baseline justify-between mt-auto">
                  <span className="font-display text-2xl text-[#C9A96E] font-medium">
                    {pillar.stat}
                  </span>
                  <span className="text-[10px] tracking-wider uppercase text-[#8B7355]">
                    {pillar.statLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
