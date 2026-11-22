# Lumière Bakery 🥐

A minimalist luxury bakery website built with Next.js 15, Neon PostgreSQL, and Cloudinary.

## Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS v4 + Framer Motion |
| Database | Neon (Serverless PostgreSQL) + Drizzle ORM |
| Auth | NextAuth.js v5 (beta) |
| Media | Cloudinary |
| State | Zustand (cart) |
| Fonts | Cormorant Garamond + Inter |

## Setup

### 1. Environment Variables

Copy `.env.local` and fill in your credentials:

```bash
# Neon
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/lumiere?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### 2. Database Setup

Run the SQL file in your Neon Console:

```bash
# Or use Drizzle to push schema:
npm run db:push
```

### 3. Create Admin User

After running the app, register at `/auth/register`, then in your Neon SQL editor:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### 4. Run

```bash
npm run dev
```

## Routes

### Customer
- `/` — Luxury hero page + featured products
- `/menu` — Full catalog with category filtering
- `/cart` — Cart with quantity management
- `/orders` — Order history (requires login)
- `/auth/login` / `/auth/register` — Auth pages

### Admin (`/admin`)
- `/admin` — Dashboard with stats
- `/admin/products` — CRUD product management
- `/admin/orders` — Order status management
- `/admin/media` — Cloudinary image uploader

## Design

- **Colors**: Cream `#F9F5EE`, Dark Brown `#1C1008`, Gold `#C9A96E`
- **Fonts**: Cormorant Garamond (display), Inter (body)
- **Hero**: WebGL-inspired canvas particle animation at 60fps
- **Motion**: Framer Motion for all transitions

## Project Structure

```
src/
├── app/
│   ├── (customer)/     # Customer-facing routes
│   │   ├── page.tsx    # Home
│   │   ├── menu/       # Product catalog
│   │   ├── cart/       # Shopping cart
│   │   └── orders/     # Order history
│   ├── admin/          # Admin panel
│   │   ├── page.tsx    # Dashboard
│   │   ├── products/   # Product CRUD
│   │   ├── orders/     # Order management
│   │   └── media/      # Cloudinary uploader
│   ├── api/            # API routes
│   └── auth/           # Auth pages
├── components/         # Shared UI
├── lib/
│   ├── auth.ts         # NextAuth config
│   ├── db.ts           # Neon + Drizzle client
│   ├── schema.ts       # Database schema
│   ├── store.ts        # Zustand cart store
│   ├── cloudinary.ts   # Cloudinary helpers
│   └── utils.ts        # Utilities
└── middleware.ts        # Route protection
```
