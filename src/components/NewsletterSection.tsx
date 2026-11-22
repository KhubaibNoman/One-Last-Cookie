'use client';

import { useState } from 'react';
import { Mail, Sparkles, ArrowRight, Check } from 'lucide-react';
import { toast } from './ui/toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    toast('Welcome to the One Last Cookie Confection Club!');
    setEmail('');
  };

  return (
    <section className="py-24 px-6 bg-[#160E08] text-[#FAF8F5] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A96E]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF8F5]/10 border border-[#C9A96E]/40 mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8D5B0] font-semibold">
            The Confection Club
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light mb-4 text-[#FAF8F5]">
          A Complimentary Cookie on <em className="text-[#C9A96E] italic font-serif">Your First Order</em>
        </h2>

        <p className="text-sm sm:text-base text-[#E8DFC8]/80 max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Join our intimate circle of cookie connoisseurs. Receive exclusive secret seasonal flavor invitations and live dawn oven alerts.
        </p>

        {subscribed ? (
          <div className="bg-[#FAF8F5]/10 border border-[#C9A96E]/50 p-6 rounded-md max-w-md mx-auto text-center backdrop-blur-sm">
            <Check className="w-8 h-8 text-[#C9A96E] mx-auto mb-2" />
            <h4 className="font-display text-2xl text-[#FAF8F5]">You are on the Atelier Guestlist</h4>
            <p className="text-xs text-[#E8DFC8]/70 mt-1">Check your inbox for your complimentary cookie voucher code.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#8B7355] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-[#FAF8F5]/10 border border-[#C9A96E]/40 rounded-full pl-11 pr-5 py-3.5 text-xs text-[#FAF8F5] placeholder-[#8B7355] focus:outline-none focus:border-[#C9A96E] backdrop-blur-sm transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#C9A96E] text-[#160E08] hover:bg-[#FAF8F5] py-3.5 px-7 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <span>Join Club</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#8B7355] mt-5 uppercase tracking-widest">
          Strictly artisan bakes • No spam • Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
