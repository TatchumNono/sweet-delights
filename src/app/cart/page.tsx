"use client";

import { useCart } from "@/components/CartProvider";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-900">Votre panier est vide</h1>
        <p className="text-gray-500 mt-2">Ajoutez des produits pour commencer</p>
        <Link
          href="/#products"
          className="inline-block mt-6 bg-gold text-white px-6 py-3 rounded-xl font-semibold hover:bg-gold-dark transition-colors"
        >
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">🛒 Mon Panier</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gold-50 shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
              <p className="text-gold-700 font-bold">{item.price.toLocaleString()} FCFA</p>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-3 py-1 text-gray-600 hover:text-gold-700"
              >
                −
              </button>
              <span className="px-3 py-1 font-medium border-x border-gray-200 text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:text-gold-700"
              >
                +
              </button>
            </div>
            <p className="font-bold text-gray-900 w-28 text-right">
              {(item.price * item.quantity).toLocaleString()} FCFA
            </p>
            <button
              onClick={() => removeItem(item.id)}
              className="text-red-400 hover:text-red-600 p-2 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gold-50 rounded-2xl p-6 border border-gold-100">
        <div className="flex justify-between items-center text-lg">
          <span className="font-medium text-gray-700">Total</span>
          <span className="text-2xl font-bold text-gold-700">
            {totalPrice.toLocaleString()} FCFA
          </span>
        </div>
        <Link
          href="/checkout"
          className="block mt-4 bg-gold text-white text-center py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-colors text-lg"
        >
          Passer la commande →
        </Link>
      </div>
    </div>
  );
}
