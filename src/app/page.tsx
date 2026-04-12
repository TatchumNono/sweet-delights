"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["all", ...new Set(products.map((p) => p.category))];
  const filtered =
    filter === "all" ? products : products.filter((p) => p.category === filter);
  const featured = products.filter((p) => p.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gold-50 via-white to-gold-100 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold-light rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-gold-100 text-gold-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              🍰 Fait avec amour, livré avec soin
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Des Gâteaux en Conserve &{" "}
              <span className="text-gold">Jus de Fruits</span> d&apos;Exception
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Savourez nos créations artisanales : gâteaux en conserve moelleux
              et jus de fruits 100% naturels. Commandez facilement et
              faites-vous livrer chez vous.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#products"
                className="bg-gold text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-gold-dark transition-colors text-lg shadow-lg shadow-gold/20"
              >
                Voir nos produits
              </Link>
              <Link
                href="/cart"
                className="border-2 border-gold text-gold-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gold-50 transition-colors text-lg"
              >
                🛒 Mon Panier
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🍰
              </div>
              <h3 className="font-semibold text-gray-900">Qualité Artisanale</h3>
              <p className="text-sm text-gray-500 mt-2">
                Chaque produit est préparé avec des ingrédients soigneusement
                sélectionnés
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                🚚
              </div>
              <h3 className="font-semibold text-gray-900">Livraison Rapide</h3>
              <p className="text-sm text-gray-500 mt-2">
                Recevez votre commande rapidement, partout dans la ville
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-gold-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
                💳
              </div>
              <h3 className="font-semibold text-gray-900">Commande Facile</h3>
              <p className="text-sm text-gray-500 mt-2">
                Pas besoin de compte ! Commandez directement et payez à la
                livraison
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="py-16 bg-gold-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                ⭐ Nos <span className="text-gold">Best-sellers</span>
              </h2>
              <p className="text-gray-500 mt-2">
                Les favoris de nos clients
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section id="products" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              Tous nos <span className="text-gold">Produits</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Gâteaux en conserve et jus de fruits frais
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-gold text-white"
                    : "bg-gold-50 text-gold-700 hover:bg-gold-100"
                }`}
              >
                {cat === "all" ? "Tout" : cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl mb-2">🍰</p>
              <p className="text-gray-500">Aucun produit disponible pour le moment.</p>
              <p className="text-sm text-gray-400 mt-1">
                Revenez bientôt pour découvrir nos nouveautés !
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Envie de passer commande ?
          </h2>
          <p className="text-gold-100 mb-8 text-lg">
            Pas besoin de créer un compte ! Ajoutez vos produits au panier et
            commandez directement.
          </p>
          <Link
            href="#products"
            className="inline-block bg-white text-gold-700 px-8 py-3.5 rounded-xl font-semibold hover:bg-gold-50 transition-colors text-lg"
          >
            Commander maintenant →
          </Link>
        </div>
      </section>
    </div>
  );
}
