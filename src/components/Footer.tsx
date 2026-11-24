import Link from 'next/link';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1C1008] text-[#F9F5EE] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Brand & Contact Links */}
          <div>
            <h3 className="font-display text-3xl mb-4 text-[#C9A96E]">One Last Cookie</h3>
            <p className="text-[#8B7355] text-sm leading-relaxed max-w-xs mb-6">
              Artisan luxury baked goods crafted in small batches with premium ingredients, pure devotion, and boundless passion.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/one.last.cookie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#E8D5B0] hover:text-[#FAF8F5] bg-[#FAF8F5]/5 hover:bg-[#C9A96E]/20 px-3.5 py-2 rounded-full border border-[#C9A96E]/30 transition-all duration-300 font-medium"
                aria-label="Follow One Last Cookie on Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-[#C9A96E]" />
                <span>@one.last.cookie</span>
              </a>
              <a
                href="https://wa.me/923052419096"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#E8D5B0] hover:text-[#FAF8F5] bg-[#FAF8F5]/5 hover:bg-[#C9A96E]/20 px-3.5 py-2 rounded-full border border-[#C9A96E]/30 transition-all duration-300 font-medium"
                aria-label="Direct WhatsApp Order"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#C9A96E]" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'Our Story (About)' },
                { href: '/menu', label: 'Our Menu' },
                { href: '/menu?category=cookies', label: 'Cookies' },
                { href: '/menu?category=cakes', label: 'Celebration Cakes' },
                { href: '/orders', label: 'My Orders' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B7355] hover:text-[#F9F5EE] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quality & Freshness */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Fresh Baking & Quality</h4>
            <p className="text-sm text-[#8B7355] leading-relaxed">
              Fresh Daily Small-Batch Baking<br />
              Orders Baked Fresh Upon Request<br />
              <br />
              Artisan Handcrafted Quality<br />
              Direct Contact:{' '}
              <a
                href="https://wa.me/923052419096"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A96E] hover:underline"
              >
                +92 305 2419096
              </a>
              <br />
              Freshness & Satisfaction Guaranteed
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#C9A96E]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8B7355]">
            © {new Date().getFullYear()} One Last Cookie. All rights reserved.
          </p>
          <div className="flex gap-6 items-center">
            <Link href="/privacy" className="text-xs text-[#8B7355] hover:text-[#F9F5EE] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[#8B7355] hover:text-[#F9F5EE] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
