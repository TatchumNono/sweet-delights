import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id;
    const role = (session.user as { role?: string }).role;

    // Admin sees all orders, users see their own
    const orders = await prisma.order.findMany({
      where: role === "ADMIN" ? {} : { userId },
      include: {
        items: {
          include: { product: { select: { name: true } } },
        },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    const { customerName, customerEmail, customerPhone, customerAddress, items } =
      body;

    if (!customerName || !customerPhone || !customerAddress || !items?.length) {
      return NextResponse.json(
        { error: "Informations manquantes" },
        { status: 400 }
      );
    }

    // Calculate total from DB prices to avoid price manipulation
    const productIds = items.map((i: { productId: string }) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    const productMap = new Map(products.map((p) => [p.id, p]));
    let total = 0;

    const orderItems = items.map(
      (item: { productId: string; quantity: number }) => {
        const product = productMap.get(item.productId);
        if (!product) throw new Error(`Product ${item.productId} not found`);
        const itemTotal = product.price * item.quantity;
        total += itemTotal;
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price,
        };
      }
    );

    const userId = session?.user
      ? (session.user as { id?: string }).id
      : null;

    const order = await prisma.order.create({
      data: {
        userId,
        customerName,
        customerEmail: customerEmail || null,
        customerPhone,
        customerAddress,
        total,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: { product: { select: { name: true } } },
        },
      },
    });

    // Send WhatsApp notification for guest orders (no account)
    if (!userId) {
      const whatsappItems = order.items.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.price,
      }));

      await sendWhatsAppNotification({
        customerName,
        customerPhone,
        customerAddress,
        items: whatsappItems,
        total,
        orderId: order.id,
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la commande" },
      { status: 500 }
    );
  }
}
