import { formatPrice } from './utils';

export const DEFAULT_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923225697907';

export interface WhatsAppOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface WhatsAppOrderDetails {
  orderId?: string;
  customerName: string;
  customerContact: string;
  fulfillmentType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  includeGiftNote?: boolean;
  recipientName?: string;
  giftNote?: string;
  paymentMethod?: string;
  items: WhatsAppOrderItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
}

export function formatWhatsAppMessage(data: WhatsAppOrderDetails): string {
  const ref = data.orderId ? `#${data.orderId.slice(0, 8).toUpperCase()}` : '#NEW-ORDER';

  const lines = [
    '*NEW ORDER - ONE LAST COOKIE*',
    '----------------------------------------',
    `*Order Reference:* ${ref}`,
    '',
    '*CUSTOMER DETAILS*',
    `- *Name:* ${data.customerName}`,
    `- *Contact:* ${data.customerContact}`,
    '- *Fulfillment:* Courier Delivery',
  ];

  if (data.deliveryAddress) {
    lines.push(`- *Delivery Address:* ${data.deliveryAddress}`);
  }

  lines.push('');
  lines.push('*ORDER ITEMS*');
  data.items.forEach((item) => {
    const itemTotal = formatPrice(item.price * item.quantity);
    lines.push(`- ${item.quantity}x ${item.name} (${formatPrice(item.price)} each) = *${itemTotal}*`);
  });

  lines.push('');
  lines.push('----------------------------------------');
  lines.push(`*Items Subtotal:* ${formatPrice(data.subtotal)}`);
  lines.push(`*Delivery:* ${data.deliveryFee === 0 ? 'Free' : formatPrice(data.deliveryFee)}`);
  lines.push(`*GRAND TOTAL:* *${formatPrice(data.grandTotal)}*`);
  lines.push('----------------------------------------');

  if (data.paymentMethod) {
    lines.push(`*Payment:* ${data.paymentMethod}`);
  }

  lines.push('');
  lines.push('Hello! I have placed this order on your website. Please confirm availability and share payment details (Bank Transfer / Easypaisa / JazzCash / Cash on Delivery). Thank you!');

  return lines.join('\n');
}

export function getWhatsAppCheckoutUrl(
  data: WhatsAppOrderDetails,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const message = formatWhatsAppMessage(data);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
