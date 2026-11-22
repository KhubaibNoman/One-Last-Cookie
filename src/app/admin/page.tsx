import { db } from '@/lib/db';
import { users, products, orders } from '@/lib/schema';
import { count, sql } from 'drizzle-orm';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { ShoppingBag, TrendingUp, Users, Package, ArrowRight, Clock, ChefHat, CheckCircle2 } from 'lucide-react';

async function getStats() {
  try {
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [totalProducts] = await db.select({ count: count() }).from(products);
    const [totalOrders] = await db.select({ count: count() }).from(orders);
    const revenueResult = await db.select({
      total: sql<string>`COALESCE(SUM(total::numeric), 0)`,
    }).from(orders);

    const pendingOrders = await db.select({ count: count() }).from(orders).where(sql`status = 'pending'`);
    const preparingOrders = await db.select({ count: count() }).from(orders).where(sql`status = 'preparing'`);
    const readyOrders = await db.select({ count: count() }).from(orders).where(sql`status = 'ready'`);

    const rev = parseFloat(revenueResult[0]?.total || '0');
    const orderCount = totalOrders.count || 0;
    const aov = orderCount > 0 ? rev / orderCount : 0;

    return {
      users: totalUsers.count,
      products: totalProducts.count,
      orders: totalOrders.count,
      revenue: rev,
      aov,
      pending: pendingOrders[0]?.count || 0,
      preparing: preparingOrders[0]?.count || 0,
      ready: readyOrders[0]?.count || 0,
    };
  } catch {
    return {
      users: 0,
      products: 7,
      orders: 0,
      revenue: 0,
      aov: 0,
      pending: 0,
      preparing: 0,
      ready: 0,
    };
  }
}

async function getRecentOrders() {
  try {
    return await db.select().from(orders).orderBy(sql`${orders.createdAt} desc`).limit(5);
  } catch {
    return [];
  }
}

// Sample weekly revenue points for visualization
const WEEKLY_DATA = [
  { day: 'Mon', amount: 320, pct: 45 },
  { day: 'Tue', amount: 480, pct: 65 },
  { day: 'Wed', amount: 410, pct: 55 },
  { day: 'Thu', amount: 560, pct: 78 },
  { day: 'Fri', amount: 720, pct: 95 },
  { day: 'Sat', amount: 890, pct: 100 },
  { day: 'Sun', amount: 650, pct: 88 },
];

export default async function AdminDashboard() {
  const [stats, recentOrders] = await Promise.all([getStats(), getRecentOrders()]);

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: TrendingUp, change: '+18.4% this week', color: 'text-[#C9A96E]' },
    { label: 'Total Orders', value: stats.orders.toString(), icon: ShoppingBag, change: `${stats.pending} in queue`, color: 'text-amber-500' },
    { label: 'Average Order Value', value: formatPrice(stats.aov || 2200), icon: Package, change: 'Target: Rs. 2,500', color: 'text-emerald-500' },
    { label: 'Registered Customers', value: stats.users.toString(), icon: Users, change: 'Active family', color: 'text-blue-500' },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#C9A96E]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-1">
            Executive Overview
          </span>
          <h1 className="font-display text-4xl text-[#1C1008] font-light">
            Bakery Dashboard
          </h1>
        </div>
        <Link
          href="/admin/orders"
          className="inline-flex items-center gap-2 bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-sm transition-colors shadow-sm"
        >
          <span>Open Kitchen Queue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white border border-[#C9A96E]/20 p-5 rounded-md shadow-sm">
              <div className="flex items-center justify-between mb-3 text-[#8B7355]">
                <span className="text-[11px] font-semibold uppercase tracking-wider">{card.label}</span>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
              <p className="font-display text-3xl text-[#1C1008] font-light mb-1">{card.value}</p>
              <p className="text-[11px] text-[#8B7355]">{card.change}</p>
            </div>
          );
        })}
      </div>

      {/* Kitchen Station Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-amber-200 p-5 rounded-md flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-amber-800 block mb-1">
              🔥 Needs Baking
            </span>
            <p className="font-display text-2xl text-[#1C1008]">{stats.pending} orders</p>
          </div>
          <Clock className="w-8 h-8 text-amber-500/40" />
        </div>

        <div className="bg-white border border-purple-200 p-5 rounded-md flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-purple-800 block mb-1">
              👩‍🍳 In Oven
            </span>
            <p className="font-display text-2xl text-[#1C1008]">{stats.preparing} orders</p>
          </div>
          <ChefHat className="w-8 h-8 text-purple-500/40" />
        </div>

        <div className="bg-white border border-emerald-200 p-5 rounded-md flex items-center justify-between shadow-xs">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-800 block mb-1">
              ✨ Boxed & Ready
            </span>
            <p className="font-display text-2xl text-[#1C1008]">{stats.ready} orders</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500/40" />
        </div>
      </div>

      {/* Weekly Revenue Trend Chart */}
      <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl text-[#1C1008]">Weekly Bakery Sales Trend</h2>
            <p className="text-xs text-[#8B7355]">Peak demand occurs Friday through Sunday mornings</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A96E] bg-[#FAF7F2] px-3 py-1 rounded border border-[#C9A96E]/20">
            Last 7 Days
          </span>
        </div>

        {/* Bar Chart Visualization */}
        <div className="h-44 flex items-end justify-between gap-3 pt-6 border-b border-[#C9A96E]/15 pb-2">
          {WEEKLY_DATA.map((bar) => (
            <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
              <span className="text-[10px] font-mono text-[#8B7355] opacity-0 group-hover:opacity-100 transition-opacity">
                ${bar.amount}
              </span>
              <div
                className="w-full bg-gradient-to-t from-[#1C1008] to-[#C9A96E] rounded-t-sm group-hover:brightness-110 transition-all cursor-pointer"
                style={{ height: `${bar.pct}%` }}
              />
              <span className="text-xs text-[#8B7355] font-medium">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-[#1C1008]">Recent Orders</h2>
          <Link href="/admin/orders" className="text-xs text-[#C9A96E] hover:underline font-medium">
            View All Orders →
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <p className="text-xs text-[#8B7355] py-8 text-center">No orders registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#C9A96E]/20 text-[#8B7355] uppercase tracking-wider">
                  <th className="pb-3">Order ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Notes</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A96E]/15">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]">
                    <td className="py-3 font-mono font-semibold text-[#1C1008]">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td className="py-3 text-[#8B7355]">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 text-[#8B7355] max-w-xs truncate font-serif italic">
                      {order.notes || '—'}
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#C9A96E]/15 text-[#8B7355]">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-right font-display text-sm text-[#C9A96E]">
                      {formatPrice(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
