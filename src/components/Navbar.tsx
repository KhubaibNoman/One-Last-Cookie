'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useCart } from '@/lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const openDrawer = useCart((s) => s.openDrawer);
  const openSearch = useCart((s) => s.openSearch);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'Our Story' },
    { href: '/menu', label: 'All Bakes' },
    { href: '/menu?category=cookies', label: 'Cookies' },
    { href: '/menu?category=cakes', label: 'Cakes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-2 sm:px-6 md:px-8 pt-2 sm:pt-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`w-full max-w-6xl mx-auto rounded-full px-3 sm:px-6 md:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-1.5 sm:gap-4 pointer-events-auto transition-all duration-300 ${scrolled
          ? 'bg-[#FAF8F5]/98 sm:bg-[#FAF8F5]/92 sm:backdrop-blur-xl border border-[#C9A96E]/35 shadow-[0_12px_40px_rgba(28,16,8,0.08)]'
          : 'bg-[#FAF8F5]/95 sm:bg-[#FAF8F5]/85 sm:backdrop-blur-md border border-[#C9A96E]/20 shadow-[0_4px_24px_rgba(28,16,8,0.03)]'
          }`}
      >
        {/* Brand Logo - Haute Pâtisserie Editorial */}
        <Link href="/" className="group flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0">
          <span className="font-display text-[12px] min-[390px]:text-[13px] sm:text-xl lg:text-2xl tracking-[0.12em] sm:tracking-[0.22em] text-[#1C1008] uppercase font-light">
            One Last Cookie
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
        </Link>

        {/* Center Navigation Links - Housed inside the single capsule pill */}
        <div className="flex items-center gap-2 min-[380px]:gap-3 sm:gap-5 md:gap-7 lg:gap-8 overflow-x-auto no-scrollbar min-w-0 flex-1 justify-center px-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-[9px] min-[380px]:text-[10px] sm:text-[11px] tracking-[0.14em] sm:tracking-[0.22em] uppercase text-[#7D6B58] hover:text-[#1C1008] font-medium whitespace-nowrap transition-colors py-1 group shrink-0"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Action Controls: Search & Basket */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={openSearch}
            className="p-1.5 sm:p-2 text-[#7D6B58] hover:text-[#1C1008] hover:bg-[#C9A96E]/10 rounded-full transition-colors cursor-pointer"
            title="Search menu (Ctrl + K)"
            aria-label="Search delicacies"
          >
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.6]" />
          </button>

          {/* Cart Capsule Pill */}
          <button
            onClick={openDrawer}
            className="group flex items-center gap-1 sm:gap-1.5 bg-[#1C1008] text-[#FAF8F5] hover:bg-[#C9A96E] hover:text-[#1C1008] px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full transition-all duration-300 shadow-sm shrink-0 cursor-pointer"
            aria-label="Open basket"
          >
            <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[1.8]" />
            <span className="hidden md:inline text-[11px] tracking-widest uppercase font-semibold">
              Basket
            </span>
            <span
              suppressHydrationWarning
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#C9A96E] group-hover:bg-[#1C1008] text-[#1C1008] group-hover:text-[#FAF8F5] text-[9px] sm:text-[10px] flex items-center justify-center font-bold transition-colors"
            >
              {mounted ? itemCount : 0}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
