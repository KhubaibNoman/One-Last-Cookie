'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, Menu, X, LogOut, Settings, Search, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCart((s) => s.itemCount());
  const openDrawer = useCart((s) => s.openDrawer);
  const openSearch = useCart((s) => s.openSearch);

  const isAdmin = (session?.user as any)?.role === 'admin';

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
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 md:px-8 pt-3 sm:pt-4 transition-all duration-500">
        <nav
          className={`max-w-6xl mx-auto rounded-full px-5 sm:px-7 py-3 flex items-center justify-between transition-all duration-500 ${scrolled
            ? 'bg-[#FAF8F5]/90 backdrop-blur-xl border border-[#C9A96E]/30 shadow-[0_12px_40px_rgba(28,16,8,0.08)]'
            : 'bg-[#FAF8F5]/75 backdrop-blur-md border border-[#C9A96E]/20 shadow-[0_4px_24px_rgba(28,16,8,0.03)]'
            }`}
        >
          {/* Brand Logo - Haute Pâtisserie Editorial */}
          <Link href="/" className="group flex items-center gap-2 whitespace-nowrap shrink-0">
            <span className="font-display text-xl sm:text-2xl tracking-[0.22em] text-[#1C1008] uppercase font-light whitespace-nowrap">
              One Last Cookie
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E] shrink-0" />
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-[11px] tracking-[0.22em] uppercase text-[#7D6B58] hover:text-[#1C1008] font-medium transition-colors py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 text-[#7D6B58] hover:text-[#1C1008] hover:bg-[#C9A96E]/10 rounded-full transition-all duration-300"
              title="Search menu (Ctrl + K)"
              aria-label="Search delicacies"
            >
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>

            {/* Staff / Admin Access (Only visible when authenticated as admin) */}
            {session && isAdmin && (
              <div className="hidden sm:flex items-center gap-1.5 pl-1 border-l border-[#C9A96E]/30">
                <Link
                  href="/admin"
                  className="text-[10px] tracking-widest uppercase text-[#C9A96E] hover:text-[#1C1008] px-2.5 py-1 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 font-semibold transition-colors flex items-center gap-1"
                >
                  <Settings className="w-3 h-3" />
                  Staff
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-xs text-[#8B7355] hover:text-red-500 p-1 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Cart Capsule Pill */}
            <button
              onClick={openDrawer}
              className="group flex items-center gap-2 bg-[#1C1008] text-[#FAF8F5] hover:bg-[#C9A96E] hover:text-[#1C1008] pl-3.5 pr-4 py-2 rounded-full transition-all duration-300 shadow-sm"
              aria-label="Open basket"
            >
              <ShoppingBag className="w-3.5 h-3.5 stroke-[1.8]" />
              <span className="text-[11px] tracking-widest uppercase font-semibold">
                Basket
              </span>
              <span
                suppressHydrationWarning
                className="ml-0.5 w-4 h-4 rounded-full bg-[#C9A96E] group-hover:bg-[#1C1008] text-[#1C1008] group-hover:text-[#FAF8F5] text-[10px] flex items-center justify-center font-bold transition-colors"
              >
                {mounted ? itemCount : 0}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1C1008] hover:bg-[#C9A96E]/10 rounded-full transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#FAF8F5]/98 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between pb-6 border-b border-[#C9A96E]/20">
              <span className="font-display text-2xl tracking-[0.22em] text-[#1C1008] uppercase font-light">
                One Last Cookie
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-[#1C1008] hover:bg-[#C9A96E]/10 rounded-full"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Links */}
            <div className="space-y-4 py-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block font-display text-3xl sm:text-4xl text-[#1C1008] hover:text-[#C9A96E] transition-colors py-2 font-light tracking-wide"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom info inside drawer */}
            <div className="pt-6 border-t border-[#C9A96E]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#8B7355]">
              <p>Fresh Small-Batch Home Bakery • Daily 8am – 8pm</p>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/one.last.cookie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#C9A96E] hover:text-[#1C1008] uppercase tracking-widest font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" /> @one.last.cookie ↗
                </a>
                {session && isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-[#C9A96E] uppercase tracking-widest font-semibold flex items-center gap-1.5 hover:text-[#1C1008] transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5" /> Staff
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
