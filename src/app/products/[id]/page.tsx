"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { Product } from "@/types";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || "/images/placeholder.svg",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-gold-200 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl mb-2">😢</p>
        <p className="text-gray-500">Produit introuvable</p>
      </div>
    );
  }

  const images = product.images?.length ? product.images : ["/images/placeholder.svg"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gold-50 mb-4">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-gold" : "border-gray-200"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className="text-sm text-gold-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
          <p className="text-2xl font-bold text-gold-700 mt-4">
            {product.price.toLocaleString()} FCFA
          </p>
          <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantité:</span>
            <div className="flex items-center border border-gray-200 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:text-gold-700 transition-colors"
              >
                −
              </button>
              <span className="px-4 py-2 font-medium border-x border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:text-gold-700 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 rounded-xl font-semibold transition-colors text-lg ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-gold text-white hover:bg-gold-dark"
                }`}
              >
                {added ? "✓ Ajouté au panier !" : "Ajouter au panier"}
              </button>
            ) : (
              <button
                disabled
                className="flex-1 bg-gray-200 text-gray-500 py-3.5 rounded-xl font-semibold cursor-not-allowed text-lg"
              >
                Rupture de stock
              </button>
            )}
          </div>

          <div className="mt-8 border-t border-gray-100 pt-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-lg">🚚</span>
              Livraison rapide disponible
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-lg">💳</span>
              Paiement à la livraison
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-lg">📱</span>
              Commandez sans compte
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
