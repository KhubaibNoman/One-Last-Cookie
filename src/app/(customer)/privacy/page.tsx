import Link from 'next/link';

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs text-[#8B7355] mb-10 uppercase tracking-widest">
          Last updated: November 2026
        </p>

        <div className="space-y-8 text-sm text-[#8B7355] leading-relaxed bg-white p-8 sm:p-10 rounded-md border border-[#C9A96E]/20 shadow-sm">
          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">1. Guest-First Philosophy</h2>
            <p>
              At One Last Cookie, we prioritize privacy and seamless culinary enjoyment. We do not require customer account creation, mandatory passwords, or intrusive data collection to place an order.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">2. Order Information</h2>
            <p>
              When you place an order, we collect only the necessary details required to bake, package, and fulfill your selections: your name, contact phone or email, and any custom order notes or preferences.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">3. Data Protection</h2>
            <p>
              Your contact details are encrypted and utilized strictly for operational fulfillment and real-time status updates regarding your artisanal bakes. We never sell, lease, or monetize customer data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-[#1C1008] mb-3">4. Contact Our Atelier</h2>
            <p>
              For any questions regarding our privacy practices or your order history, please reach out directly to our Paris boutique at <span className="text-[#1C1008] font-medium">hello@onelastcookie.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
