"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  customerAddress: string;
  createdAt: string;
  user: { name: string; email: string } | null;
  items: {
    id: string;
    quantity: number;
    price: number;
    product: { name: string };
  }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = () => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  const statusLabel: Record<string, { text: string; color: string }> = {
    PENDING: { text: "En attente", color: "bg-yellow-100 text-yellow-700" },
    CONFIRMED: { text: "Confirmée", color: "bg-blue-100 text-blue-700" },
    DELIVERED: { text: "Livrée", color: "bg-green-100 text-green-700" },
    CANCELLED: { text: "Annulée", color: "bg-red-100 text-red-700" },
  };

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📦 Commandes</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { key: "all", label: "Toutes" },
          { key: "PENDING", label: "En attente" },
          { key: "CONFIRMED", label: "Confirmées" },
          { key: "DELIVERED", label: "Livrées" },
          { key: "CANCELLED", label: "Annulées" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === key
                ? "bg-gold text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {label} ({key === "all" ? orders.length : orders.filter((o) => o.status === key).length})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-2xl mb-2">📦</p>
          <p className="text-gray-500">Aucune commande</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const s = statusLabel[order.status] || statusLabel.PENDING;
            const isGuest = !order.user;
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {order.customerName}
                      </h3>
                      {isGuest && (
                        <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                          Invité
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      #{order.id.slice(-6)} •{" "}
                      {new Date(order.createdAt).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      📱 {order.customerPhone}
                      {order.customerEmail && ` • 📧 ${order.customerEmail}`}
                    </p>
                    <p className="text-sm text-gray-500">📍 {order.customerAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${s.color}`}>
                      {s.text}
                    </span>
                    <p className="text-xl font-bold text-gold-700 mt-2">
                      {order.total.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>

                {/* Items */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm py-1">
                      <span className="text-gray-600">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {(item.price * item.quantity).toLocaleString()} FCFA
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2">
                  {order.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => updateStatus(order.id, "CONFIRMED")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                      >
                        ✓ Confirmer
                      </button>
                      <button
                        onClick={() => updateStatus(order.id, "CANCELLED")}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        ✕ Annuler
                      </button>
                    </>
                  )}
                  {order.status === "CONFIRMED" && (
                    <button
                      onClick={() => updateStatus(order.id, "DELIVERED")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                    >
                      🚚 Marquer livrée
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
