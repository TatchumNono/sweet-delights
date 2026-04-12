"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const imageUrl = product.images?.[0] || "/images/placeholder.svg";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imageUrl,
    });
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gold-200 transition-all duration-300 flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gold-50">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.featured && (
            <span className="absolute top-3 left-3 bg-gold text-white text-xs px-3 py-1 rounded-full font-medium">
              ⭐ Populaire
            </span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-700 px-4 py-2 rounded-full font-medium text-sm">
                Rupture de stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-xs text-gold-600 font-medium uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-gold-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-lg font-bold text-gold-700">
              {product.price.toLocaleString()} FCFA
            </span>
            {product.inStock && (
              <button
                onClick={handleAddToCart}
                className="bg-gold text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold-dark transition-colors"
              >
                + Panier
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
