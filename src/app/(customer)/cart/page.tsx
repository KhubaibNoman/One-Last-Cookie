'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ArrowRight, Store, Truck, Clock, Gift, ShieldCheck, Sparkles, Check, User, Mail, MapPin, MessageSquare, Banknote, Phone, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/toast';
import { getWhatsAppCheckoutUrl } from '@/lib/whatsapp';

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    total,
    clearCart,
    fulfillmentType,
    setFulfillmentType,
    giftNote,
    setGiftNote,
    recipientName,
    setRecipientName,
  } = useCart();
  const router = useRouter();

  // Guest customer contact state
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'whatsapp' | 'cod'>('whatsapp');

  const [loading, setLoading] = useState(false);
  const [includeGiftNote, setIncludeGiftNote] = useState(Boolean(giftNote));

  const itemsTotal = total();
  const deliveryFee = fulfillmentType === 'delivery' ? (itemsTotal >= 3000 ? 0 : 250) : 0;
  const orderGrandTotal = itemsTotal + deliveryFee;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      toast('Please enter your name for the bakery order', 'error');
      return;
    }

    // Pakistani mobile number validation: (^(\+92|0)3[0-9]{9}$)
    const cleanPhone = customerContact.replace(/[\s-]/g, '');
    const pakistaniPhoneRegex = /^(\+92|0)3[0-9]{9}$/;

    if (!customerContact.trim()) {
      setPhoneError('Please enter your Pakistani mobile number');
      return;
    }

    if (!pakistaniPhoneRegex.test(cleanPhone)) {
      setPhoneError('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 300 1234567)');
      return;
    }

    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      toast('Please enter your delivery address', 'error');
      return;
    }

    setLoading(true);

    try {
      const paymentLabel =
        paymentMethod === 'whatsapp'
          ? 'WhatsApp Direct (Bank Transfer / Easypaisa / JazzCash / COD)'
          : 'Cash on Delivery / In-Store Pickup';

      const orderNotes = [
        `Customer: ${customerName}`,
        `Contact: ${customerContact}`,
        `Payment Method: ${paymentLabel}`,
        fulfillmentType === 'delivery' ? `Address: ${deliveryAddress}` : 'Fulfillment: Storefront Pickup',
        includeGiftNote && recipientName ? `Gift Recipient: ${recipientName}` : '',
        includeGiftNote && giftNote ? `Gift Message: "${giftNote}"` : '',
      ]
        .filter(Boolean)
        .join(' | ');

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.id,
            quantity: i.quantity,
            price: i.price,
          })),
          notes: orderNotes,
        }),
      });

      if (res.ok) {
        const order = await res.json();

        // Generate pre-filled WhatsApp message URL
        const whatsappUrl = getWhatsAppCheckoutUrl({
          orderId: order.id,
          customerName,
          customerContact,
          fulfillmentType,
          deliveryAddress,
          includeGiftNote,
          recipientName,
          giftNote,
          paymentMethod: paymentLabel,
          items: items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
          subtotal: itemsTotal,
          deliveryFee,
          grandTotal: orderGrandTotal,
        });

        clearCart();

        if (paymentMethod === 'whatsapp') {
          toast('Order recorded! Launching WhatsApp...', 'success');
          // Open WhatsApp chat in a new tab
          window.open(whatsappUrl, '_blank');
        } else {
          toast('Order placed successfully!', 'success');
        }

        router.push(
          `/orders?success=true&orderId=${order.id || 'new'}&name=${encodeURIComponent(customerName)}&whatsapp=${paymentMethod === 'whatsapp'}&waUrl=${encodeURIComponent(whatsappUrl)}`
        );
      } else {
        const data = await res.json();
        toast(data.error || 'Failed to place order', 'error');
      }
    } catch (err) {
      console.error(err);
      toast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-24 px-6 bg-[#F9F5EE]">
        <span className="font-display text-7xl text-[#C9A96E]/30 mb-4">🥐</span>
        <h1 className="font-display text-4xl sm:text-5xl text-[#1C1008] mb-2 font-light">Your basket is empty</h1>
        <p className="text-[#8B7355] mb-8 text-sm max-w-sm text-center">
          Our ovens are warm with fresh batches. Explore our menu to discover your new favorite bake.
        </p>
        <Link
          href="/menu"
          className="bg-[#1C1008] text-[#F9F5EE] hover:bg-[#C9A96E] hover:text-[#1C1008] px-8 py-4 text-xs tracking-widest uppercase font-semibold transition-colors rounded-sm shadow-md"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-6 bg-[#F9F5EE]">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-[#C9A96E]/20 pb-6 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.4em] text-[#C9A96E] font-semibold block mb-1">
              Instant Guest Checkout
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[#1C1008] font-light">
              Your Artisanal Basket
            </h1>
          </div>
          <Link
            href="/menu"
            className="text-xs tracking-widest uppercase text-[#8B7355] hover:text-[#1C1008] transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Items + Guest Details (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Basket Items List */}
            <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
              <h2 className="font-display text-2xl text-[#1C1008] mb-6 flex items-center justify-between">
                <span>Selected Bakes</span>
                <span className="text-sm font-inter text-[#8B7355] font-normal">{items.length} items</span>
              </h2>

              <div className="space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 pb-4 border-b border-[#C9A96E]/15 last:border-0 items-center"
                    >
                      <div className="relative w-20 h-24 bg-[#1C1008]/5 rounded-sm overflow-hidden flex-shrink-0 border border-[#C9A96E]/20">
                        {item.imageUrl ? (
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">🥐</div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-display text-lg text-[#1C1008] leading-tight mb-1">{item.name}</h3>
                        <p className="text-sm text-[#9E6B1F] font-display font-bold mb-3">{formatPrice(item.price)}</p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-[#C9A96E]/30 rounded-sm bg-[#FAF7F2]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:text-[#C9A96E] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-medium text-[#1C1008]">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:text-[#C9A96E] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[#8B7355] hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-xl text-[#1C1008]">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Guest Customer Contact Details */}
            <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm space-y-4">
              <h2 className="font-display text-2xl text-[#1C1008]">Customer Contact</h2>
              <p className="text-xs text-[#8B7355]">No account needed. We only use this to confirm your order.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B7355] font-semibold mb-1 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#C9A96E]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Sara Khan"
                    className="w-full border border-[#C9A96E]/30 bg-[#FAF7F2] px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B7355] font-semibold mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#C9A96E]" /> Mobile / WhatsApp Number *
                    </span>
                    <span className="text-[10px] text-[#A68A56] font-mono tracking-wider">PK (03xx)</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerContact}
                    onChange={(e) => {
                      setCustomerContact(e.target.value);
                      if (phoneError) setPhoneError(null);
                    }}
                    placeholder="e.g. 0300 1234567 or +92 300 1234567"
                    className={`w-full border px-3.5 py-2.5 text-sm focus:outline-none rounded-sm transition-colors ${
                      phoneError
                        ? 'border-rose-500 bg-rose-50/40 focus:border-rose-600 text-rose-950'
                        : 'border-[#C9A96E]/30 bg-[#FAF7F2] focus:border-[#C9A96E]'
                    }`}
                  />
                  {phoneError && (
                    <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Bakery Fulfillment Option */}
            <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
              <h2 className="font-display text-2xl text-[#1C1008] mb-4">Fulfillment Method</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-4 border rounded-md text-left transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'border-[#C9A96E] bg-[#FAF7F2] shadow-sm'
                      : 'border-[#C9A96E]/20 hover:border-[#C9A96E]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Store className={`w-5 h-5 ${fulfillmentType === 'pickup' ? 'text-[#C9A96E]' : 'text-[#8B7355]'}`} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      Free
                    </span>
                  </div>
                  <h4 className="font-display text-lg text-[#1C1008] mb-1">Storefront Pickup</h4>
                  <p className="text-xs text-[#8B7355]">Bakery Counter Pickup</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-4 border rounded-md text-left transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'border-[#C9A96E] bg-[#FAF7F2] shadow-sm'
                      : 'border-[#C9A96E]/20 hover:border-[#C9A96E]/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Truck className={`w-5 h-5 ${fulfillmentType === 'delivery' ? 'text-[#C9A96E]' : 'text-[#8B7355]'}`} />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C9A96E]">
                      {itemsTotal >= 3000 ? 'Complimentary' : 'Rs. 250'}
                    </span>
                  </div>
                  <h4 className="font-display text-lg text-[#1C1008] mb-1">Courier Delivery</h4>
                  <p className="text-xs text-[#8B7355]">Direct to your doorstep</p>
                </button>
              </div>

              {/* Delivery Address Field if courier delivery */}
              {fulfillmentType === 'delivery' && (
                <div className="p-4 bg-[#FAF7F2] border border-[#C9A96E]/30 rounded-sm">
                  <label className="block text-xs uppercase tracking-wider text-[#8B7355] font-semibold mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C9A96E]" /> Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House / Apartment, Street, Area, City"
                    className="w-full border border-[#C9A96E]/30 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#C9A96E] rounded-sm"
                  />
                </div>
              )}
            </div>

            {/* Personalized Gift Message */}
            <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#C9A96E]" />
                  <h3 className="font-display text-xl text-[#1C1008]">Personalized Gift Note</h3>
                </div>
                <label className="flex items-center gap-2 text-xs text-[#8B7355] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGiftNote}
                    onChange={(e) => setIncludeGiftNote(e.target.checked)}
                    className="accent-[#C9A96E]"
                  />
                  <span>Include gift card</span>
                </label>
              </div>

              {includeGiftNote && (
                <div className="space-y-3 pt-3 border-t border-[#C9A96E]/15">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8B7355] mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full border border-[#C9A96E]/30 bg-[#FAF7F2] px-3.5 py-2 text-sm focus:outline-none focus:border-[#C9A96E] rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8B7355] mb-1">
                      Calligraphy Card Message
                    </label>
                    <textarea
                      rows={3}
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      placeholder="Write your custom heartfelt note to be handwritten in gold calligraphy..."
                      className="w-full border border-[#C9A96E]/30 bg-[#FAF7F2] p-3 text-sm focus:outline-none focus:border-[#C9A96E] resize-none rounded-sm font-serif italic"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment & Checkout Method */}
            <div className="bg-white border border-[#C9A96E]/20 p-6 rounded-md shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Banknote className="w-5 h-5 text-[#C9A96E]" />
                  <h3 className="font-display text-2xl text-[#1C1008]">Payment Method</h3>
                </div>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Instant Baker Chat
                </span>
              </div>

              <div className="space-y-3">
                {/* Option 1: WhatsApp Checkout */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`w-full p-4 border rounded-md text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                    paymentMethod === 'whatsapp'
                      ? 'border-emerald-600 bg-emerald-50/40 shadow-sm ring-1 ring-emerald-600/30'
                      : 'border-[#C9A96E]/20 hover:border-[#C9A96E]/50 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    paymentMethod === 'whatsapp' ? 'bg-[#25D366] text-white shadow-sm' : 'bg-[#FAF7F2] text-[#8B7355]'
                  }`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display text-lg text-[#1C1008] font-medium flex items-center gap-2">
                        <span>WhatsApp Order & Instant Chat</span>
                        <span className="text-[9px] font-mono uppercase bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold">
                          Recommended
                        </span>
                      </h4>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'whatsapp' ? 'border-emerald-600 bg-emerald-600' : 'border-[#C9A96E]/40'
                      }`}>
                        {paymentMethod === 'whatsapp' && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#7D6B58] leading-relaxed">
                      Generates a pre-filled WhatsApp message with your exact items, quantities, and totals, opening straight into our bakery chat for instant confirmation. Pay via Bank Transfer, Easypaisa, JazzCash, or COD.
                    </p>
                  </div>
                </button>

                {/* Option 2: Standard Cash on Delivery */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 border rounded-md text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-[#C9A96E] bg-[#FAF7F2] shadow-sm ring-1 ring-[#C9A96E]/30'
                      : 'border-[#C9A96E]/20 hover:border-[#C9A96E]/50 bg-white'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    paymentMethod === 'cod' ? 'bg-[#1C1008] text-[#C9A96E]' : 'bg-[#FAF7F2] text-[#8B7355]'
                  }`}>
                    <Banknote className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-display text-lg text-[#1C1008] font-medium">
                        Cash on Delivery / In-Store Pickup
                      </h4>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'cod' ? 'border-[#C9A96E] bg-[#C9A96E]' : 'border-[#C9A96E]/40'
                      }`}>
                        {paymentMethod === 'cod' && <Check className="w-3 h-3 text-[#1C1008]" />}
                      </div>
                    </div>
                    <p className="text-xs text-[#7D6B58] leading-relaxed">
                      Pay with cash directly when your bakery box is handed to you by our courier or at our counter.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Instant Checkout (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#1C1008] text-[#F9F5EE] p-8 rounded-md sticky top-28 shadow-xl border border-[#C9A96E]/30">
              <span className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] font-semibold block mb-1">
                Instant Order Total
              </span>
              <h2 className="font-display text-3xl mb-6 text-[#F9F5EE] font-light">Summary</h2>

              <div className="space-y-3 pb-6 border-b border-[#C9A96E]/20 text-sm">
                <div className="flex justify-between text-[#E8D5B0]/80">
                  <span>Subtotal</span>
                  <span className="font-display text-base text-[#F9F5EE]">{formatPrice(itemsTotal)}</span>
                </div>
                <div className="flex justify-between text-[#E8D5B0]/80">
                  <span>Fulfillment ({fulfillmentType === 'pickup' ? 'Pickup' : 'Courier'})</span>
                  <span className="font-display text-base text-[#F9F5EE]">
                    {deliveryFee === 0 ? 'Complimentary' : formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-[#E8D5B0]/80">
                  <span>Signature Packaging</span>
                  <span className="text-[#C9A96E] font-medium">Complimentary</span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="py-6 border-b border-[#C9A96E]/20 flex justify-between items-baseline">
                <span className="font-display text-xl text-[#F9F5EE]">Total</span>
                <span className="font-display text-3xl text-[#C9A96E] font-semibold">
                  {formatPrice(orderGrandTotal)}
                </span>
              </div>

              {/* Selected Fulfillment Preview */}
              <div className="py-4 text-xs text-[#8B7355] space-y-1">
                <p>📍 {fulfillmentType === 'pickup' ? 'Fulfillment: Storefront Bakery Pickup' : 'Fulfillment: Courier Delivery to your door'}</p>
                {includeGiftNote && <p>🎁 Custom Greeting Card included</p>}
              </div>

              {/* Instant Submit Button */}
              {paymentMethod === 'whatsapp' ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer group"
                >
                  <MessageSquare className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                  <span>{loading ? 'Preparing WhatsApp...' : 'Checkout via WhatsApp'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C9A96E] text-[#1C1008] hover:bg-[#E8D5B0] py-4 text-xs tracking-widest uppercase font-semibold transition-all rounded-sm shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer"
                >
                  <span>{loading ? 'Confirming Order...' : 'Confirm & Place Order'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {paymentMethod === 'whatsapp' && (
                <p className="text-[11px] text-[#A68A56] text-center mt-2 font-medium">
                  ✨ Pre-fills items & totals into your WhatsApp chat automatically
                </p>
              )}

              <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-[#8B7355] border-t border-[#C9A96E]/15 pt-4">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C9A96E]" /> No Account Required
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" /> Fresh Guaranteed
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
