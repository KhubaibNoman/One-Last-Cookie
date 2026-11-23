import Link from 'next/link';
import { Share2, Globe, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Share2, href: '#', label: 'Instagram' },
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Mail, href: '#', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1008] text-[#F9F5EE] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-3xl mb-4 text-[#C9A96E]">One Last Cookie</h3>
            <p className="text-[#8B7355] text-sm leading-relaxed max-w-xs">
              Artisan luxury baked goods crafted daily with the finest European ingredients and boundless passion.
            </p>
          </div>

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

          <div>
            <h4 className="text-xs tracking-widest uppercase text-[#C9A96E] mb-4">Bakery Hours</h4>
            <p className="text-sm text-[#8B7355] leading-relaxed">
              Fresh Daily Small-Batch Baking<br />
              Orders Baked Fresh Every Morning<br />
              <br />
              Mon–Sat: 8am – 8pm<br />
              Sun: 9am – 6pm
            </p>
            <div className="flex gap-4 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} className="text-[#8B7355] hover:text-[#C9A96E] transition-colors" aria-label={label}>
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

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
