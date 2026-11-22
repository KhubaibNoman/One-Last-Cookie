-- Lumière Bakery — Neon PostgreSQL Migration
-- Run this in your Neon console or use: npm run db:push

CREATE TYPE user_role AS ENUM ('customer', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled');

CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'customer' NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  image_url TEXT,
  image_public_id TEXT,
  in_stock BOOLEAN DEFAULT TRUE NOT NULL,
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status order_status DEFAULT 'pending' NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id UUID REFERENCES orders(id) NOT NULL,
  product_id UUID REFERENCES products(id) NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Seed categories
INSERT INTO categories (name, slug) VALUES
  ('Cookies', 'cookies'),
  ('Cakes', 'cakes'),
  ('Pastries', 'pastries')
ON CONFLICT (slug) DO NOTHING;

-- Seed signature products matching the provided bakery pictures and videos
INSERT INTO products (name, slug, description, price, category_id, image_url, in_stock, featured) VALUES
  ('Artisan Chocolate Chip Cookies', 'chocolate-chip-cookies', 'Soft, chewy golden cookies loaded with premium dark Belgian chocolate morsels. Freshly baked with pure European butter.', 4.75, 1, '/bakery/bakery-1.jpg', TRUE, TRUE),
  ('Lemon Zest Coconut Cake', 'lemon-zest-coconut-cake', 'A slice of sunshine — ultra-moist sponge infused with fresh organic lemon zest and topped with fragrant toasted coconut flakes.', 7.50, 2, '/bakery/bakery-2.jpg', TRUE, TRUE),
  ('Red Velvet White Chocolate Cookies', 'red-velvet-cookies', 'Vibrant crimson cookies rich in cocoa, dotted with creamy Swiss white chocolate chips and dusted with sweet powdered snow.', 5.25, 1, '/bakery/bakery-6.jpg', TRUE, TRUE),
  ('Orange Zest Bites', 'orange-zest-bites', 'A burst of Mediterranean sunshine in every bite. Soft, crumbly squares steeped in Valencia orange zest with subtle dark chocolate base.', 6.50, 3, '/bakery/bakery-5.jpg', TRUE, TRUE),
  ('Signature Chef Selection Box', 'signature-selection-box', 'A master pairing of our most beloved creations: Lemon Zest Coconut Cake slices accompanied by freshly warm Red Velvet cookies.', 24.00, 3, '/bakery/bakery-3.jpg', TRUE, FALSE),
  ('Golden Batch Platter Cookies', 'golden-batch-cookies', 'Served warm in our bakery ceramic platter: a full row of plump, golden chocolate chip cookies with gooey molten centers.', 18.00, 1, '/bakery/bakery-8.jpg', TRUE, FALSE)
ON CONFLICT (slug) DO NOTHING;
