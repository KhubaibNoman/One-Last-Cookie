import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { orders } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { CheckCircle2, Clock, Sparkles, Store, ShoppingBag, ArrowRight, MessageSquare } from 'lucide-react';

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-900 border-amber-300',
  confirmed: 'bg-blue-100 text-blue-900 border-blue-300',
  preparing: 'bg-purple-100 text-purple-900 border-purple-300',
  ready: 'bg-emerald-100 text-emerald-900 border-emerald-300',
  delivered: 'bg-stone-100 text-stone-700 border-stone-300',
  cancelled: 'bg-rose-100 text-rose-900 border-rose-300',
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; orderId?: string; name?: string; whatsapp?: string; waUrl?: string }>;
}) {
  const session = await auth();
  const resolvedParams = await searchParams;
  const isGuestSuccess = resolvedParams?.success === 'true';

  let userOrders: any[] = [];
  if (session?.user?.id) {
    try {
      userOrders = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, session.user.id))
        .orderBy(desc(orders.createdAt));
    } catch {
      userOrders = [];
    }
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-[#F9F5EE]">
      <div className="max-w-4xl mx-auto">
        {/* Guest Order Confirmation Banner */}
        {isGuestSuccess && (
          <div className="mb-12 bg-white border border-[#C9A96E]/40 p-8 sm:p-10 rounded-lg shadow-xl text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C9A96E] via-[#E8D5B0] to-[#C9A96E]" />
            
            <div className="w-16 h-16 rounded-full bg-[#1C1008] text-[#C9A96E] flex items-center justify-center mx-auto mb-4 border border-[#C9A96E]/40 shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-[#C9A96E]" />
            </div>

            <span className="text-xs uppercase tracking-[0.4em] text-[#C9A96E] font-semibold block mb-2">
              Order Confirmed & Received
            </span>

            <h1 className="font-display text-4xl sm:text-5xl text-[#1C1008] font-light mb-3">
              Thank You{resolvedParams.name ? `, ${decodeURIComponent(resolvedParams.name)}` : ''}!
            </h1>

            <p className="text-sm text-[#8B7355] max-w-lg mx-auto mb-6 leading-relaxed">
              Your order has been queued directly into the One Last Cookie kitchen. We bake every order fresh with care.
            </p>

            {resolvedParams.orderId && (
              <div className="inline-block bg-[#FAF7F2] border border-[#C9A96E]/30 px-5 py-2.5 rounded-md mb-8">
                <span className="text-xs text-[#8B7355] uppercase tracking-wider block">Reference Number</span>
                <span className="font-mono text-base font-bold text-[#1C1008]">
                  #{resolvedParams.orderId.slice(0, 8).toUpperCase()}
                </span>
              </div>
            )}

            {resolvedParams.waUrl && (
              <div className="mb-8 p-5 bg-emerald-50 border border-emerald-200 rounded-md max-w-md mx-auto shadow-sm">
                <p className="text-xs text-emerald-950 font-medium mb-3">
                  💬 Your pre-filled order was sent to WhatsApp. If the chat didn&apos;t open automatically, click below:
                </p>
                <a
                  href={decodeURIComponent(resolvedParams.waUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-all rounded-sm shadow-md w-full"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Order Chat</span>
                </a>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-colors rounded-sm shadow-md"
              >
                <span>Browse More Bakes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#C9A96E]/20">
          <div>
            <h2 className="font-display text-4xl text-[#1C1008] font-light">Order Tracking</h2>
            <p className="text-xs text-[#8B7355] mt-1">Review your recent artisanal requests</p>
          </div>
          <Link
            href="/menu"
            className="text-xs uppercase tracking-widest text-[#C9A96E] hover:underline font-medium"
          >
            ← Bakery Catalog
          </Link>
        </div>

        {/* Order History (if user signed in and has orders) */}
        {userOrders.length > 0 ? (
          <div className="space-y-4">
            {userOrders.map((order) => (
              <div key={order.id} className="border border-[#C9A96E]/25 p-6 bg-white rounded-md shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <span className="font-mono text-xs font-semibold text-[#1C1008] block mb-1">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <span className="text-xs text-[#8B7355] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C9A96E]" />
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <span className={`inline-block text-xs px-3 py-1 rounded border font-semibold tracking-wider uppercase ${
                      statusColors[order.status] || 'bg-gray-100'
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-display text-2xl text-[#C9A96E] mt-1 font-medium">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {order.notes && (
                  <p className="text-xs text-[#8B7355] italic bg-[#FAF7F2] p-3 rounded border border-[#C9A96E]/15 font-serif">
                    {order.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : !isGuestSuccess ? (
          <div className="text-center py-20 bg-white border border-[#C9A96E]/20 rounded-md p-8">
            <ShoppingBag className="w-10 h-10 text-[#C9A96E]/40 mx-auto mb-3" />
            <h3 className="font-display text-2xl text-[#1C1008] mb-2 font-light">No orders registered</h3>
            <p className="text-xs text-[#8B7355] max-w-xs mx-auto mb-6">
              When you place an order, your fresh baking status and pickup window will appear here.
            </p>
            <Link
              href="/menu"
              className="bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors rounded-sm inline-block"
            >
              Order Fresh Bakes
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
