import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20 px-6 bg-[#F9F5EE]">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-[#C9A96E] hover:underline mb-8 inline-block font-semibold"
        >
          ← Back to Bakery
        </Link>
        <h1 className="font-display text-4xl sm:text-5xl text-[#1C1008] font-light mb-4">
          Terms of Service
        </h1>
        <p className="text-xs text-[#8B7355] mb-10 uppercase tracking-widest">
          Last updated: November 2026
        </p>

        <div className="space-y-8 text-sm text-[#8B7355] leading-relaxed bg-white p-8 sm:p-10 rounded-md border border-[#C9A96E]/20 shadow-sm">
          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">1. Artisanal Freshness Guarantee</h2>
            <p>
              Every cookie, pastry, and confection crafted at One Last Cookie is baked daily from dawn using unbleached French flours, Normandy butter, and premium cocoa. Orders are scheduled according to strict oven windows to guarantee warmth and peak texture.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">2. Pickup & Courier Fulfillment</h2>
            <p>
              For Storefront Pickup, please arrive during your chosen time slot at 12 Rue de la Paix, Paris. For Boutique Courier Delivery, our dedicated couriers transport your orders in temperature-controlled luxury packaging.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">3. Modifications & Cancellations</h2>
            <p>
              Because our doughs undergo extended overnight fermentation and small-batch preparation, modifications or cancellations must be requested at least 4 hours prior to your scheduled dispatch window.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">4. Customer Happiness</h2>
            <p>
              Should any bake fail to meet our exacting standards of luxury and flavor, contact our concierge immediately and we will promptly replace your order or offer a full reimbursement.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
