import { getAllArticles } from '@/lib/markdown'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

interface BlogPageProps {
  searchParams: { theme?: string }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const allArticles = getAllArticles()
  const currentTheme = searchParams.theme
  
  const filteredArticles = currentTheme 
    ? allArticles.filter(article => article.theme === currentTheme)
    : allArticles

  const themes = [
    { value: '', label: 'Tous' },
    { value: 'ia-tech', label: 'IA & Tech' },
    { value: 'business-en-ligne', label: 'Business en ligne' },
  ]

  const themeDescriptions: Record<string, string> = {
    'ia-tech': 'Découvrez les dernières avancées en intelligence artificielle et technologie.',
    'business-en-ligne': 'Stratégies et conseils pour développer votre activité en ligne.',
    '': 'Tous nos articles sur l\'IA et le business en ligne.',
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nos <span className="text-gradient-gold">Articles</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {themeDescriptions[currentTheme || '']}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {themes.map(theme => (
            <Link
              key={theme.value}
              href={theme.value ? `/blog?theme=${theme.value}` : '/blog'}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                currentTheme === theme.value || (!currentTheme && !theme.value)
                  ? 'bg-gold text-black'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {theme.label}
            </Link>
          ))}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-white/40 text-lg">
              Aucun article trouvé pour cette catégorie.
            </p>
          </div>
        )}

        {/* Articles Count */}
        <div className="mt-12 text-center text-white/40 text-sm">
          {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} disponible{filteredArticles.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}
