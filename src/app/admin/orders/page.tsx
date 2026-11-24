'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { Loader2, RefreshCw, Clock, Gift, Store, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/toast';

interface Order {
  id: string;
  status: string;
  total: string;
  notes: string | null;
  createdAt: string;
  userId: string | null;
}

const STATUS_FILTERS = [
  { label: 'All Orders', value: 'all' },
  { label: '🔥 Needs Baking', value: 'pending' },
  { label: '👩‍🍳 In Oven', value: 'preparing' },
  { label: '✨ Boxed & Ready', value: 'ready' },
  { label: '📦 Dispatched', value: 'delivered' },
];

const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];

const statusBadgeStyles: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-900 border-amber-300',
  confirmed: 'bg-blue-100 text-blue-900 border-blue-300',
  preparing: 'bg-purple-100 text-purple-900 border-purple-300',
  ready: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  delivered: 'bg-stone-100 text-stone-700 border-stone-300',
  cancelled: 'bg-rose-100 text-rose-900 border-rose-300',
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast(`Order #${id.slice(0, 6)} updated to ${status}`, 'success');
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o))
        );
      } else {
        toast('Failed to update status', 'error');
      }
    } catch {
      toast('Network error', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const advanceNextStatus = (order: Order) => {
    const sequence = ['pending', 'preparing', 'ready', 'delivered'];
    const idx = sequence.indexOf(order.status);
    if (idx !== -1 && idx < sequence.length - 1) {
      updateStatus(order.id, sequence[idx + 1]);
    }
  };

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter);

  return (
    <div className="max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#C9A96E]/20 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#C9A96E] font-semibold block mb-1">
            Kitchen Management
          </span>
          <h1 className="font-display text-4xl text-[#1C1008] font-light">
            Live Order Queue
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#C9A96E]/30 bg-white hover:border-[#C9A96E] text-[#1C1008] text-xs font-medium uppercase tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#C9A96E]' : ''}`} />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* Queue Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.value;
          const count = f.value === 'all'
            ? orders.length
            : orders.filter((o) => o.status === f.value).length;

          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`text-xs tracking-wider uppercase px-4 py-2 rounded-full whitespace-nowrap transition-all font-medium flex items-center gap-2 border ${active
                ? 'bg-[#1C1008] text-[#F9F5EE] border-[#1C1008] shadow-sm'
                : 'bg-white text-[#8B7355] border-[#C9A96E]/25 hover:border-[#C9A96E]'
                }`}
            >
              <span>{f.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-[#C9A96E] text-[#1C1008]' : 'bg-[#FAF7F2] text-[#8B7355]'
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Orders Table */}
      {loading && orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white border border-[#C9A96E]/20 rounded-md">
          <Loader2 className="w-8 h-8 animate-spin text-[#C9A96E] mb-2" />
          <p className="text-sm text-[#8B7355]">Loading kitchen queue...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="py-20 text-center bg-white border border-[#C9A96E]/20 rounded-md p-8">
          <AlertCircle className="w-8 h-8 text-[#C9A96E]/60 mx-auto mb-2" />
          <h3 className="font-display text-xl text-[#1C1008] mb-1">No orders in this station</h3>
          <p className="text-xs text-[#8B7355]">All bakery items in this category have been processed.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#C9A96E]/25 rounded-md shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#C9A96E]/20 bg-[#FAF7F2] text-[11px] tracking-wider uppercase text-[#8B7355]">
                <th className="px-5 py-4 font-semibold">Order</th>
                <th className="px-5 py-4 font-semibold">Fulfillment & Notes</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Current Station</th>
                <th className="px-5 py-4 font-semibold text-right">Kitchen Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A96E]/15">
              {filteredOrders.map((order) => {
                const isCourier = order.notes?.includes('Courier') || order.notes?.includes('Delivery');
                const hasGift = order.notes?.includes('Gift') || order.notes?.includes('Recipient');

                return (
                  <tr key={order.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                    {/* ID & Date */}
                    <td className="px-5 py-4 align-top">
                      <span className="font-mono text-xs font-semibold text-[#1C1008] block mb-1">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className="text-[11px] text-[#8B7355] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C9A96E]" />
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>

                    {/* Notes & Dispatch Window */}
                    <td className="px-5 py-4 align-top max-w-sm">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border bg-emerald-50 text-emerald-900 border-emerald-200">
                          <Store className="w-3 h-3" />
                          Direct Order
                        </span>

                        {hasGift && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                            <Gift className="w-3 h-3 text-amber-600" />
                            Calligraphy Card
                          </span>
                        )}
                      </div>

                      {order.notes ? (
                        <p className="text-xs text-[#8B7355] line-clamp-2 leading-relaxed bg-[#FAF7F2] p-2 rounded border border-[#C9A96E]/15 font-serif italic">
                          {order.notes}
                        </p>
                      ) : (
                        <span className="text-xs text-[#8B7355]/60 italic">Standard morning packaging</span>
                      )}
                    </td>

                    {/* Total */}
                    <td className="px-5 py-4 align-top">
                      <span className="font-display text-lg text-[#C9A96E] font-medium block">
                        {formatPrice(order.total)}
                      </span>
                    </td>

                    {/* Status Select */}
                    <td className="px-5 py-4 align-top">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex items-center justify-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded border shadow-xs ${statusBadgeStyles[order.status] || 'bg-gray-100'
                          }`}>
                          {order.status}
                        </span>

                        <select
                          value={order.status}
                          disabled={updating === order.id}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className="text-[11px] border border-[#C9A96E]/30 bg-white px-2 py-1 rounded focus:outline-none focus:border-[#C9A96E] cursor-pointer"
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              Change: {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>

                    {/* Quick Step Button */}
                    <td className="px-5 py-4 align-top text-right">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(order.id, 'preparing')}
                          disabled={updating === order.id}
                          className="inline-flex items-center gap-1 bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
                        >
                          <span>Move to Oven</span>
                        </button>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => updateStatus(order.id, 'ready')}
                          disabled={updating === order.id}
                          className="inline-flex items-center gap-1 bg-purple-700 text-white hover:bg-purple-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Boxed</span>
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          onClick={() => updateStatus(order.id, 'delivered')}
                          disabled={updating === order.id}
                          className="inline-flex items-center gap-1 bg-emerald-700 text-white hover:bg-emerald-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-sm"
                        >
                          <span>Dispatched</span>
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <span className="text-xs text-stone-400 font-medium">Completed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
