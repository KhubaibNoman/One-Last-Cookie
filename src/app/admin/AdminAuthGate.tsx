'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Lock, ShieldCheck, Loader2 } from 'lucide-react';

export default function AdminAuthGate() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email: email.trim(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Invalid staff credentials. Access restricted to authorized personnel.');
        setLoading(false);
      } else {
        router.refresh();
      }
    } catch {
      setError('Connection error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1008] text-[#F9F5EE] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A96E]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="relative w-20 h-20 mx-auto mb-4 drop-shadow-[0_4px_20px_rgba(201,169,110,0.3)]">
            <Image
              src="/logo.jpeg"
              alt="One Last Cookie Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#C9A96E] font-medium flex items-center justify-center gap-2 mb-2">
            <Lock className="w-3 h-3 text-[#C9A96E]" />
            Staff Only
            <Lock className="w-3 h-3 text-[#C9A96E]" />
          </p>
          <h1 className="font-display text-4xl text-[#F9F5EE] font-light">
            Bakery Admin Portal
          </h1>
          <p className="text-[#8B7355] text-xs mt-2">
            Restricted access for One Last Cookie operations, orders & menu control.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#2A1A10] border border-[#C9A96E]/30 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          {error && (
            <div className="mb-6 p-3 bg-red-950/60 border border-red-500/40 rounded text-red-200 text-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
              {error}
            </div>
          )}

          {/* Secure Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8B7355] mb-1.5">
                Staff Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1C1008] border border-[#C9A96E]/30 rounded px-3.5 py-2.5 text-xs text-[#F9F5EE] focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="staff@onelastcookie.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8B7355] mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#1C1008] border border-[#C9A96E]/30 rounded px-3.5 py-2.5 text-xs text-[#F9F5EE] focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#C9A96E] hover:bg-[#FAF8F5] text-[#1C1008] font-semibold py-3 text-xs uppercase tracking-wider transition-all duration-300 rounded shadow-md disabled:opacity-50 mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#1C1008]" />
                  <span>Verifying Credentials…</span>
                </>
              ) : (
                <span>Sign In to Staff Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#C9A96E]/15 flex items-center justify-between text-[11px] text-[#8B7355]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" />
              Restricted Area
            </span>
            <a href="/" className="hover:text-[#F9F5EE] transition-colors">
              ← Return to Storefront
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
