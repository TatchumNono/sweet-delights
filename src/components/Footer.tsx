import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo.png"
                alt="Sendcan"
                width={44}
                height={44}
                className="rounded-lg"
              />
              <span className="text-xl font-bold">
                Send<span className="text-gold-light">can</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Découvrez nos délicieux gâteaux en conserve et jus de fruits frais.
              Qualité artisanale, livraison rapide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gold-light mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-gold-light transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-gold-light transition-colors">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-gold-light transition-colors">
                  Panier
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gold-light mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span>📱</span>
                <span>+237 6XX XXX XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <span>contact@sendcan.com</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Douala, Cameroun</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Sendcan. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
