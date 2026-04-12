"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerEmail: form.email,
          customerPhone: form.phone,
          customerAddress: form.address,
          items: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        clearCart();
      }
    } catch {
      alert("Erreur lors de la commande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
          <p className="text-5xl mb-4">✅</p>
          <h1 className="text-2xl font-bold text-gray-900">Commande confirmée !</h1>
          <p className="text-gray-600 mt-2">
            Merci pour votre commande. Nous vous contacterons très bientôt pour
            la livraison.
          </p>
          <button
            onClick={() => router.push("/")}
            className="mt-6 bg-gold text-white px-6 py-3 rounded-xl font-semibold hover:bg-gold-dark transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-900">Panier vide</h1>
        <p className="text-gray-500 mt-2">
          Ajoutez des produits avant de passer commande
        </p>
        <button
          onClick={() => router.push("/#products")}
          className="mt-6 bg-gold text-white px-6 py-3 rounded-xl font-semibold hover:bg-gold-dark transition-colors"
        >
          Voir les produits
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Passer la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Informations de livraison
            </h2>
            {!session && (
              <div className="bg-gold-50 text-gold-700 text-sm p-3 rounded-lg mb-4">
                💡 Vous commandez sans compte. Votre commande sera envoyée par
                WhatsApp à notre équipe.
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom complet *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                  placeholder="+237 6XX XXX XXX"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse de livraison *
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-gold outline-none resize-none"
                  placeholder="Quartier, rue, repères..."
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-white py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-colors text-lg disabled:opacity-50"
          >
            {loading ? "Traitement..." : "Confirmer la commande"}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gold-50 rounded-2xl border border-gold-100 p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Récapitulatif
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString()} FCFA
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold-200 mt-4 pt-4 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold text-gold-700">
                {totalPrice.toLocaleString()} FCFA
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              💳 Paiement à la livraison
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
