"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: {
    id: string;
    customerName: string;
    total: number;
    status: string;
    createdAt: string;
    items: { product: { name: string }; quantity: number }[];
  }[];
  ordersByStatus: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return <p className="text-gray-500">Erreur de chargement</p>;
  }

  const statusLabel: Record<string, { text: string; color: string }> = {
    PENDING: { text: "En attente", color: "bg-yellow-100 text-yellow-700" },
    CONFIRMED: { text: "Confirmée", color: "bg-blue-100 text-blue-700" },
    DELIVERED: { text: "Livrée", color: "bg-green-100 text-green-700" },
    CANCELLED: { text: "Annulée", color: "bg-red-100 text-red-700" },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📊 Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gold-50 rounded-xl flex items-center justify-center text-xl">
              📦
            </div>
            <div>
              <p className="text-sm text-gray-500">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-xl">
              💰
            </div>
            <div>
              <p className="text-sm text-gray-500">Revenus</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalRevenue.toLocaleString()} <span className="text-sm">FCFA</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
              🍰
            </div>
            <div>
              <p className="text-sm text-gray-500">Produits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">
              👥
            </div>
            <div>
              <p className="text-sm text-gray-500">Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders by Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">États des commandes</h2>
          <div className="space-y-3">
            {Object.entries(statusLabel).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${val.color}`}>
                  {val.text}
                </span>
                <span className="font-bold text-gray-900">
                  {stats.ordersByStatus[key] || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Commandes récentes</h2>
          {stats.recentOrders.length === 0 ? (
            <p className="text-gray-400 text-sm">Aucune commande</p>
          ) : (
            <div className="space-y-3">
              {stats.recentOrders.map((order) => {
                const s = statusLabel[order.status] || statusLabel.PENDING;
                return (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {order.customerName}
                      </p>
                      <p className="text-xs text-gray-500">
                        #{order.id.slice(-6)} •{" "}
                        {new Date(order.createdAt).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.color}`}>
                        {s.text}
                      </span>
                      <span className="font-bold text-sm text-gold-700">
                        {order.total.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
