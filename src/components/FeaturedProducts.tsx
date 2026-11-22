'use client';

import ProductCard from './ProductCard';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  imageUrl: string | null;
  description: string | null;
  inStock: boolean;
}

export default function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
