'use client';

import { motion } from 'framer-motion';

export default function VideoShowcase() {
  return (
    <section className="relative h-[70vh] overflow-hidden flex items-center">
      {/* Video Background (Optimized for smooth 60fps mobile scrolling) */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="/bakery/bakery-video-2.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1C1008]/65" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-5">The Process</p>
          <h2 className="font-display text-5xl md:text-7xl text-[#F9F5EE] font-light mb-6">
            Baked at <em className="text-[#C9A96E]">Dawn</em>
          </h2>
          <p className="text-[#E8D5B0]/70 text-lg leading-relaxed max-w-xl mx-auto">
            We start before sunrise. Every cookie, every cake, every bite — made fresh by hand, with nothing but the best ingredients on earth.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto">
            {[
              { n: '4am', l: 'We Start' },
              { n: '100%', l: 'Homemade' },
              { n: 'Daily', l: 'Fresh Baked' },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-display text-3xl text-[#C9A96E]">{s.n}</p>
                <p className="text-xs text-[#8B7355] tracking-widest uppercase mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
