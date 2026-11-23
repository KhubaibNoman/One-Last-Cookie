'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError('Invalid email or password.');
    } else {
      router.push(email.toLowerCase().includes('admin') ? '/admin' : '/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1C1008] flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
        <motion.div
          className="relative text-center px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl text-[#F9F5EE] font-light mb-4">
            One Last Cookie
          </h2>
          <div className="w-16 h-px bg-[#C9A96E] mx-auto mb-4" />
          <p className="text-[#8B7355] text-sm leading-relaxed">
            Sign in to access your orders and exclusive offerings.
          </p>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl mb-2">Welcome back</h1>
          <p className="text-[#8B7355] text-sm mb-10">Sign in to your account</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-2 border-red-400 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
                className="w-full border border-[#C9A96E]/30 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="w-full border border-[#C9A96E]/30 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7355]"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1008] text-[#F9F5EE] py-4 text-xs tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#1C1008] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#8B7355]">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="text-[#C9A96E] hover:text-[#1C1008] transition-colors">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
