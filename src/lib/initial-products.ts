export interface BakeryProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  basePrice?: string;
  salePrice?: string;
  category: string;
  categorySlug: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  ingredients?: string[];
  tasteNotes?: string;
}

export const INITIAL_PRODUCTS: BakeryProduct[] = [
  {
    id: 'prod-1',
    name: 'Classic Chocolate Chip Cookies',
    slug: 'chocolate-chip-cookies',
    description: 'Freshly baked, soft, chewy, and irresistible. Made with homemade goodness, pure creamery butter, and rich Belgian chocolate chunks.',
    price: '550',
    basePrice: '650',
    salePrice: '550',
    category: 'Cookies',
    categorySlug: 'cookies',
    imageUrl: '/bakery/classic-chocolate-chip.jpg',
    inStock: true,
    featured: true,
    ingredients: ['Premium Belgian Chocolate', 'Creamery Butter', 'Golden Brown Sugar', 'Farm Eggs', 'Maldon Salt'],
    tasteNotes: 'Soft, chewy, and loaded with molten chocolate. Small bites, big happiness.',
  },
  {
    id: 'prod-2',
    name: 'Lemon Zest Coconut Cake',
    slug: 'lemon-zest-coconut-cake',
    description: 'A slice of sunshine — ultra-moist sponge infused with fresh organic lemon zest and topped with fragrant toasted coconut flakes.',
    price: '950',
    basePrice: '950',
    category: 'Cakes',
    categorySlug: 'cakes',
    imageUrl: '/bakery/bakery-2.jpg',
    inStock: true,
    featured: true,
    ingredients: ['Fresh Lemon Zest', 'Pure Coconut Shavings', 'Almond Flour', 'Organic Cane Sugar', 'Sweet Cream Butter'],
    tasteNotes: 'Bright citrus aroma, delicate coconut texture, melt-in-mouth crumb.',
  },
  {
    id: 'prod-3',
    name: 'Red Velvet White Chocolate Cookies',
    slug: 'red-velvet-cookies',
    description: 'Vibrant crimson cookies rich in cocoa, dotted with creamy Swiss white chocolate chips and dusted with sweet powdered snow.',
    price: '650',
    basePrice: '750',
    salePrice: '650',
    category: 'Cookies',
    categorySlug: 'cookies',
    imageUrl: '/bakery/bakery-6.jpg',
    inStock: true,
    featured: true,
    ingredients: ['Valrhona Cocoa', 'Swiss White Chocolate', 'Buttermilk', 'Tahitian Vanilla', 'Confectioners Sugar'],
    tasteNotes: 'Deep cocoa warmth with velvety sweet white chocolate balance.',
  },
  {
    id: 'prod-4',
    name: 'Orange Zest Bites',
    slug: 'orange-zest-bites',
    description: 'A burst of Mediterranean sunshine in every bite. Soft, crumbly squares steeped in Valencia orange zest with subtle dark chocolate base.',
    price: '850',
    basePrice: '850',
    category: 'Pastries',
    categorySlug: 'pastries',
    imageUrl: '/bakery/bakery-5.jpg',
    inStock: true,
    featured: false,
    ingredients: ['Valencia Orange Zest', 'Organic Semolina', 'Dark Chocolate Base', 'Wildflower Honey', 'Pure Butter'],
    tasteNotes: 'Tangy citrus sweetness, toasted base notes, delicate crumb.',
  },
  {
    id: 'prod-8',
    name: 'Double Chocolate Cookies',
    slug: 'double-chocolate-cookies',
    description: 'Soft, fudgy, and irresistible. Deep dark cocoa indulgence loaded with molten Belgian chocolate pockets and dusted with confectioners sugar.',
    price: '650',
    basePrice: '750',
    salePrice: '650',
    category: 'Cookies',
    categorySlug: 'cookies',
    imageUrl: '/bakery/double-chocolate-cookies.jpg',
    inStock: true,
    featured: false,
    ingredients: ['Deep Dutch Cocoa', 'Belgian Dark Chocolate', 'European Butter', 'Brown Sugar', 'Vanilla Bean'],
    tasteNotes: 'Soft, fudgy interior with intense chocolate depth. A little bite of pure happiness.',
  },
];
