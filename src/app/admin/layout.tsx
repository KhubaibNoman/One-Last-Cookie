import { auth } from '@/lib/auth';
import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingBag, LogOut } from 'lucide-react';
import { signOut } from '@/lib/auth';
import AdminAuthGate from './AdminAuthGate';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'admin') {
    return <AdminAuthGate />;
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#F9F5EE] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1C1008] flex flex-col fixed h-full">
        <div className="p-6 border-b border-[#C9A96E]/20">
          <Link href="/" className="font-display text-2xl text-[#F9F5EE]">One Last Cookie</Link>
          <p className="text-[#8B7355] text-xs mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 text-[#8B7355] hover:text-[#F9F5EE] hover:bg-[#C9A96E]/10 rounded-sm transition-colors text-sm tracking-wide group"
            >
              <Icon className="w-4 h-4 group-hover:text-[#C9A96E] transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#C9A96E]/20">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-[#8B7355]">{session.user.name}</p>
            <p className="text-xs text-[#8B7355]/60">{session.user.email}</p>
          </div>
          <form action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 text-[#8B7355] hover:text-red-400 transition-colors text-sm w-full"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}
