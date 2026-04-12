"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "./CartProvider";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin = (session?.user as { role?: string })?.role === "ADMIN";

  return (
    <nav className="bg-white shadow-sm border-b border-gold-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍰</span>
            <span className="text-xl font-bold text-gold-700">
              Sweet<span className="text-gold">Delights</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gold-600 transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/#products"
              className="text-gray-700 hover:text-gold-600 transition-colors font-medium"
            >
              Produits
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-gold-600 transition-colors font-medium"
            >
              🛒 Panier
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-gold text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            {session ? (
              <div className="flex items-center gap-4">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="text-gold-700 hover:text-gold-600 font-medium"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="text-gray-700 hover:text-gold-600 font-medium"
                >
                  Mes Commandes
                </Link>
                <button
                  onClick={() => signOut()}
                  className="bg-gold-50 text-gold-700 px-4 py-2 rounded-lg hover:bg-gold-100 transition-colors font-medium"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-gold text-white px-5 py-2 rounded-lg hover:bg-gold-dark transition-colors font-medium"
              >
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gold-100">
            <Link
              href="/"
              className="block text-gray-700 hover:text-gold-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/#products"
              className="block text-gray-700 hover:text-gold-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Produits
            </Link>
            <Link
              href="/cart"
              className="block text-gray-700 hover:text-gold-600 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              🛒 Panier {totalItems > 0 && `(${totalItems})`}
            </Link>
            {session ? (
              <>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="block text-gold-700 hover:text-gold-600 font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/orders"
                  className="block text-gray-700 hover:text-gold-600 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  Mes Commandes
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block text-red-600 font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="block bg-gold text-white px-4 py-2 rounded-lg text-center font-medium"
                onClick={() => setMobileOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
