import Link from 'next/link'
import { ArticleMeta } from '@/lib/markdown'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

interface ArticleCardProps {
  article: ArticleMeta
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const themeLabels = {
    'ia-tech': 'IA & Tech',
    'business-en-ligne': 'Business en ligne',
  }

  const themeColors = {
    'ia-tech': 'bg-blue-500/20 text-blue-400',
    'business-en-ligne': 'bg-green-500/20 text-green-400',
  }

  return (
    <Link 
      href={`/blog/${article.slug}`}
      className="group block bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-gold/40 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
    >
      <div className="p-6">
        {/* Theme badge */}
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${themeColors[article.theme as keyof typeof themeColors]} mb-4`}>
          {themeLabels[article.theme as keyof typeof themeLabels]}
        </span>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white group-hover:text-gold transition-colors mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {article.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-white/40">
          <time dateTime={article.date}>
            {format(new Date(article.date), 'd MMMM yyyy', { locale: fr })}
          </time>
          <span className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>5 min</span>
          </span>
        </div>
      </div>

      {/* Hover effect line */}
      <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Link>
  )
}
