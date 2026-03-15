import { getAllArticles } from '@/lib/markdown'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export default function Home() {
  const allArticles = getAllArticles()
  
  // Get 3 latest articles from each theme
  const iaTechArticles = allArticles
    .filter(article => article.theme === 'ia-tech')
    .slice(0, 3)
  
  const businessArticles = allArticles
    .filter(article => article.theme === 'business-en-ligne')
    .slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">L'intelligence au service de</span>{' '}
              <span className="text-gradient-gold">votre succès</span>
            </h1>
            <p className="text-xl text-white/70 mb-8">
              Explorez les dernières tendances en intelligence artificielle et stratégies business en ligne. 
              Des insights premium pour les entrepreneurs ambitieux.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
              >
                Découvrir les articles
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/blog?theme=ia-tech"
                className="inline-flex items-center justify-center px-8 py-4 border border-gold/30 text-gold font-semibold rounded-lg hover:bg-gold/10 transition-colors"
              >
                IA & Tech
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IA & Tech Section */}
      <section className="py-16 bg-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">IA & Tech</h2>
            </div>
            <Link 
              href="/blog?theme=ia-tech"
              className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
            >
              Voir tout →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {iaTechArticles.length > 0 ? (
              iaTechArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))
            ) : (
              <p className="text-white/40 col-span-3 text-center py-8">
                Bientôt disponible...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Business en ligne Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Business en ligne</h2>
            </div>
            <Link 
              href="/blog?theme=business-en-ligne"
              className="text-gold hover:text-gold-light transition-colors text-sm font-medium"
            >
              Voir tout →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessArticles.length > 0 ? (
              businessArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))
            ) : (
              <p className="text-white/40 col-span-3 text-center py-8">
                Bientôt disponible...
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez informé des dernières tendances
          </h2>
          <p className="text-white/60 mb-8">
            Ne manquez aucune actualité sur l'IA et le business en ligne.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-colors"
          >
            Explorer tous les articles
          </Link>
        </div>
      </section>
    </div>
  )
}
