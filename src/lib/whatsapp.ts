interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface WhatsAppOrderData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  total: number;
  orderId: string;
}

export async function sendWhatsAppNotification(order: WhatsAppOrderData) {
  const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER;
  if (!adminPhone) {
    console.warn("ADMIN_WHATSAPP_NUMBER not configured");
    return;
  }

  const itemsList = order.items
    .map((item) => `• ${item.name} x${item.quantity} — ${item.price.toFixed(0)} FCFA`)
    .join("\n");

  const message = encodeURIComponent(
    `🛒 *Nouvelle Commande #${order.orderId.slice(-6)}*\n\n` +
    `👤 *Client:* ${order.customerName}\n` +
    `📱 *Téléphone:* ${order.customerPhone}\n` +
    `📍 *Adresse:* ${order.customerAddress}\n\n` +
    `📦 *Articles:*\n${itemsList}\n\n` +
    `💰 *Total:* ${order.total.toFixed(0)} FCFA`
  );

  // Using WhatsApp API via CallMeBot or direct wa.me link
  // For production, use Twilio WhatsApp API or WhatsApp Business API
  const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${adminPhone}&text=${message}&apikey=${process.env.CALLMEBOT_API_KEY}`;

  try {
    const response = await fetch(whatsappUrl);
    if (!response.ok) {
      console.error("WhatsApp notification failed:", response.statusText);
    }
  } catch (error) {
    console.error("WhatsApp notification error:", error);
  }
}

export function getWhatsAppDirectLink(order: WhatsAppOrderData): string {
  const adminPhone = process.env.ADMIN_WHATSAPP_NUMBER || "";
  const itemsList = order.items
    .map((item) => `• ${item.name} x${item.quantity} — ${item.price.toFixed(0)} FCFA`)
    .join("\n");

  const message = encodeURIComponent(
    `Nouvelle Commande #${order.orderId.slice(-6)}\n\n` +
    `Client: ${order.customerName}\n` +
    `Téléphone: ${order.customerPhone}\n` +
    `Adresse: ${order.customerAddress}\n\n` +
    `Articles:\n${itemsList}\n\n` +
    `Total: ${order.total.toFixed(0)} FCFA`
  );

  return `https://wa.me/${adminPhone}?text=${message}`;
}
