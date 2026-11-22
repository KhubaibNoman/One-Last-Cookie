'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Registration failed');
      }

      await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      router.push('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1C1008] flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(-45deg, #C9A96E 0, #C9A96E 1px, transparent 0, transparent 50%)`,
          backgroundSize: '20px 20px'
        }} />
        <motion.div
          className="relative text-center px-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-6xl text-[#F9F5EE] font-light mb-4">Join Us</h2>
          <div className="w-16 h-px bg-[#C9A96E] mx-auto mb-4" />
          <p className="text-[#8B7355] text-sm leading-relaxed">
            Become part of the One Last Cookie family and enjoy exclusive access to our finest creations.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-display text-4xl mb-2">Create Account</h1>
          <p className="text-[#8B7355] text-sm mb-10">Join the One Last Cookie family</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-2 border-red-400 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
              { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs tracking-widest uppercase text-[#8B7355] mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  required
                  className="w-full border border-[#C9A96E]/30 bg-transparent px-4 py-3 text-sm focus:outline-none focus:border-[#C9A96E] transition-colors"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1C1008] text-[#F9F5EE] py-4 text-xs tracking-widest uppercase hover:bg-[#C9A96E] hover:text-[#1C1008] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-[#8B7355]">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#C9A96E] hover:text-[#1C1008] transition-colors">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
