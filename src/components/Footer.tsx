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
                <span>+237 672224463</span>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@sendcan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-gold-light transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.5a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.47Z" />
                  </svg>
                  <span>@sendcan</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span>
                <span>Yaounde, Cameroun</span>
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
