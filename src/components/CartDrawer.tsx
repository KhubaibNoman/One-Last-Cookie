'use client';

import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ArrowRight, Gift, ShoppingBag, Sparkles, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FREE_GIFT_BOX_THRESHOLD = 30;

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
    total,
    itemCount,
  } = useCart();
  const router = useRouter();

  const currentTotal = total();
  const count = itemCount();
  const amountToGift = Math.max(0, FREE_GIFT_BOX_THRESHOLD - currentTotal);
  const giftProgress = Math.min(100, (currentTotal / FREE_GIFT_BOX_THRESHOLD) * 100);

  const handleCheckout = () => {
    closeDrawer();
    router.push('/cart');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Pane */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#FAF7F2] border-l border-[#C9A96E]/30 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#C9A96E]/20 bg-[#1C1008] text-[#F9F5EE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#C9A96E]" />
                <h2 className="font-display text-2xl font-light tracking-wide">
                  Your Basket <span className="text-[#C9A96E] text-base font-inter font-normal">({count})</span>
                </h2>
              </div>
              <button
                onClick={closeDrawer}
                className="text-[#8B7355] hover:text-[#F9F5EE] p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complimentary Luxury Packaging Progress Bar */}
            <div className="px-6 py-3 bg-[#F4EDE2] border-b border-[#C9A96E]/20 text-xs">
              {amountToGift > 0 ? (
                <p className="text-[#8B7355] flex items-center justify-between mb-1.5 font-medium">
                  <span>Add <strong className="text-[#1C1008]">{formatPrice(amountToGift)}</strong> for free gold-foil box</span>
                  <Gift className="w-3.5 h-3.5 text-[#C9A96E]" />
                </p>
              ) : (
                <p className="text-[#C9A96E] flex items-center gap-1.5 mb-1.5 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complimentary signature luxury gift box unlocked!</span>
                </p>
              )}
              <div className="w-full h-1.5 bg-[#C9A96E]/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A96E] to-[#E8D5B0] transition-all duration-500 rounded-full"
                  style={{ width: `${giftProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <span className="font-display text-6xl text-[#C9A96E]/30 mb-3 block">🥐</span>
                  <p className="font-display text-2xl text-[#1C1008] mb-1">Your basket is empty</p>
                  <p className="text-xs text-[#8B7355] max-w-xs mb-6">
                    Indulge in our freshly baked artisanal cookies, cakes, and pastries.
                  </p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      router.push('/menu');
                    }}
                    className="bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] px-6 py-3 text-xs tracking-widest uppercase font-semibold transition-colors rounded-sm shadow-md"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-[#C9A96E]/15 last:border-0 bg-white p-3.5 rounded-sm border border-[#C9A96E]/20 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-20 bg-[#1C1008]/5 rounded-sm overflow-hidden flex-shrink-0 border border-[#C9A96E]/20">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">🥐</div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-display text-base text-[#1C1008] font-normal leading-snug line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8B7355] hover:text-red-500 transition-colors p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Stepper */}
                        <div className="flex items-center border border-[#C9A96E]/30 rounded-sm bg-[#FAF7F2]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:text-[#C9A96E] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-7 text-center text-xs font-medium text-[#1C1008]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:text-[#C9A96E] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <span className="font-display text-base text-[#9E6B1F] font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#C9A96E]/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-[#8B7355]">
                  <span>Subtotal</span>
                  <span className="font-display text-lg text-[#1C1008] font-medium">
                    {formatPrice(currentTotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#8B7355]">
                  <span>Fulfillment</span>
                  <span className="text-[#C9A96E] font-medium">Calculated at checkout</span>
                </div>

                <div className="pt-2 border-t border-[#C9A96E]/15 flex items-center justify-between">
                  <span className="font-display text-lg text-[#1C1008]">Estimated Total</span>
                  <span className="font-display text-2xl text-[#9E6B1F] font-bold">
                    {formatPrice(currentTotal)}
                  </span>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] py-3.5 px-6 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm shadow-md flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    href="/cart"
                    onClick={closeDrawer}
                    className="w-full border border-[#C9A96E]/40 hover:border-[#C9A96E] text-[#1C1008] py-2.5 text-center text-xs tracking-widest uppercase font-medium transition-colors rounded-sm"
                  >
                    View Full Basket Details
                  </Link>

                  <p className="text-[10px] text-emerald-800 text-center flex items-center justify-center gap-1 font-medium pt-1">
                    <MessageSquare className="w-3 h-3 text-emerald-600" />
                    <span>WhatsApp Order & Instant Chat available at checkout</span>
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
