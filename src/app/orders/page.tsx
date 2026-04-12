"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  createdAt: string;
  items: { id: string; quantity: number; price: number; product: { name: string } }[];
}

export default function MyOrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const statusLabel: Record<string, { text: string; color: string }> = {
    PENDING: { text: "En attente", color: "bg-yellow-100 text-yellow-700" },
    CONFIRMED: { text: "Confirmée", color: "bg-blue-100 text-blue-700" },
    DELIVERED: { text: "Livrée", color: "bg-green-100 text-green-700" },
    CANCELLED: { text: "Annulée", color: "bg-red-100 text-red-700" },
  };

  if (loading || status === "loading") {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mes Commandes</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl mb-2">📦</p>
          <p className="text-gray-500">Aucune commande pour le moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const s = statusLabel[order.status] || statusLabel.PENDING;
            return (
              <div
                key={order.id}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <span className="text-sm text-gray-500">
                      Commande #{order.id.slice(-6)}
                    </span>
                    <span className="mx-2 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${s.color}`}>
                    {s.text}
                  </span>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
                  <span className="font-medium text-gray-700">Total</span>
                  <span className="font-bold text-gold-700">
                    {order.total.toLocaleString()} FCFA
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
