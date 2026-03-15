import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gold/20 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-white">CASH</span>
              <span className="text-gradient-gold">NARY</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-gold transition-colors font-medium"
            >
              Accueil
            </Link>
            <Link 
              href="/blog" 
              className="text-white hover:text-gold transition-colors font-medium"
            >
              Articles
            </Link>
            <Link 
              href="/blog?theme=ia-tech" 
              className="text-white/70 hover:text-gold transition-colors text-sm"
            >
              IA & Tech
            </Link>
            <Link 
              href="/blog?theme=business-en-ligne" 
              className="text-white/70 hover:text-gold transition-colors text-sm"
            >
              Business en ligne
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:text-gold"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
