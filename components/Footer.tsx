import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold tracking-tight">
                <span className="text-white">CASH</span>
                <span className="text-gradient-gold">NARY</span>
              </span>
            </Link>
            <p className="mt-4 text-white/60 text-sm">
              L'intelligence au service de votre succès. Découvrez les dernières tendances en IA et business en ligne.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Tous les articles
                </Link>
              </li>
              <li>
                <Link href="/blog?theme=ia-tech" className="text-white/60 hover:text-gold transition-colors text-sm">
                  IA & Tech
                </Link>
              </li>
              <li>
                <Link href="/blog?theme=business-en-ligne" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Business en ligne
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gold font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="text-white/60 hover:text-gold transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-white/60 hover:text-gold transition-colors text-sm">
                  Mentions légales
                </Link>
              </li>
              <li>
                <span className="text-white/40 text-sm">© 2026 CASHNARY. Tous droits réservés.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gold/10">
          <p className="text-center text-white/40 text-xs">
            Propulsé par Next.js • Design par CASHNARY
          </p>
        </div>
      </div>
    </footer>
  )
}
