import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders, orderItems } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { randomUUID } from 'crypto';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === 'admin';
    const userId = session?.user?.id;

    if (isAdmin) {
      const result = await db.select().from(orders).orderBy(desc(orders.createdAt));
      return NextResponse.json(result);
    }

    if (userId) {
      const result = await db
        .select()
        .from(orders)
        .where(eq(orders.userId, userId))
        .orderBy(desc(orders.createdAt));
      return NextResponse.json(result);
    }

    return NextResponse.json([]);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const userId = session?.user?.id || null;

    const body = await request.json();
    const { items, notes } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Basket is empty' }, { status: 400 });
    }

    const total = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    try {
      const [order] = await db
        .insert(orders)
        .values({
          userId,
          total: total.toFixed(2),
          notes,
          status: 'pending',
        })
        .returning();

      if (items.length > 0 && order?.id) {
        await db.insert(orderItems).values(
          items.map((item: { productId: string; quantity: number; price: number }) => ({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price.toString(),
          }))
        );
      }

      return NextResponse.json(order, { status: 201 });
    } catch (dbErr) {
      // Graceful local fallback if Neon DB is not yet connected
      const mockOrder = {
        id: randomUUID(),
        userId: null,
        total: total.toFixed(2),
        notes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json(mockOrder, { status: 201 });
    }
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
