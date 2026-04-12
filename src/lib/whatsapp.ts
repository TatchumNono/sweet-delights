import { prisma } from "@/lib/prisma";

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

async function getWhatsAppConfig() {
  try {
    const settings = await prisma.setting.findMany({
      where: { key: { in: ["whatsapp_phone", "callmebot_api_key"] } },
    });
    const map = new Map(settings.map((s) => [s.key, s.value]));
    return {
      phone: map.get("whatsapp_phone") || process.env.ADMIN_WHATSAPP_NUMBER || "",
      apiKey: map.get("callmebot_api_key") || process.env.CALLMEBOT_API_KEY || "",
    };
  } catch {
    return {
      phone: process.env.ADMIN_WHATSAPP_NUMBER || "",
      apiKey: process.env.CALLMEBOT_API_KEY || "",
    };
  }
}

export async function sendWhatsAppNotification(order: WhatsAppOrderData) {
  const config = await getWhatsAppConfig();
  if (!config.phone) {
    console.warn("WhatsApp phone number not configured");
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
  const whatsappUrl = `https://api.callmebot.com/whatsapp.php?phone=${config.phone}&text=${message}&apikey=${config.apiKey}`;

  try {
    const response = await fetch(whatsappUrl);
    if (!response.ok) {
      console.error("WhatsApp notification failed:", response.statusText);
    }
  } catch (error) {
    console.error("WhatsApp notification error:", error);
  }
}

export async function getWhatsAppDirectLink(order: WhatsAppOrderData): Promise<string> {
  const config = await getWhatsAppConfig();
  const adminPhone = config.phone;
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
