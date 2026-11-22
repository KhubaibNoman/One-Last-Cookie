'use client';

import { useState } from 'react';
import { useCart } from '@/lib/store';
import { toast } from '@/components/ui/toast';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { BakeryProduct } from '@/lib/initial-products';

export default function ProductDetailActions({ product }: { product: BakeryProduct }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const handleAdd = () => {
    const effectivePrice = product.salePrice && parseFloat(product.salePrice) > 0 && parseFloat(product.salePrice) < parseFloat(product.basePrice || product.price)
      ? parseFloat(product.salePrice)
      : parseFloat(product.price);

    for (let i = 0; i < qty; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: effectivePrice,
        imageUrl: product.imageUrl,
      });
    }
    toast(`${qty} × ${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Quantity selector */}
        <div className="flex items-center border border-[#C9A96E]/40 bg-white">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-3 text-[#8B7355] hover:text-[#1C1008] transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-12 text-center font-medium text-sm text-[#1C1008]">
            {qty}
          </span>
          <button
            onClick={() => setQty(qty + 1)}
            className="p-3 text-[#8B7355] hover:text-[#1C1008] transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          className="flex-1 bg-[#1C1008] text-[#F9F5EE] py-3.5 px-8 text-xs tracking-widest uppercase font-semibold hover:bg-[#C9A96E] hover:text-[#1C1008] transition-all flex items-center justify-center gap-3 shadow-md"
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              Added to Basket
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              Add to Basket
            </>
          )}
        </button>
      </div>
    </div>
  );
}
