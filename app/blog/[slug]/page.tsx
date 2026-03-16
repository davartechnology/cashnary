import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles, calculateReadingTime, getAdjacentArticles } from '@/lib/markdown'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxOptions } from '@/lib/markdown'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import AdsUnit from '@/components/AdsUnit'

interface ArticlePageProps {
  params: { slug: string }
}

// Generate static params for all articles
export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: ArticlePageProps) {
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === params.slug)
  
  if (!article) {
    return {
      title: 'Article non trouvé - CASHNARY',
    }
  }
  
  return {
    title: `${article.title} - CASHNARY`,
    description: article.description,
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === params.slug)
  
  if (!article) {
    notFound()
  }

  // Find the full article with content
  const fullArticle = getArticleBySlug(article.theme, article.slug)
  
  if (!fullArticle) {
    notFound()
  }

  const readingTime = calculateReadingTime(fullArticle.content)
  const { prev, next } = getAdjacentArticles(article.slug)

  const themeLabels: Record<string, string> = {
    'ia-tech': 'IA & Tech',
    'business-en-ligne': 'Business en ligne',
  }

  const themeColors: Record<string, string> = {
    'ia-tech': 'bg-blue-500/20 text-blue-400',
    'business-en-ligne': 'bg-green-500/20 text-green-400',
  }

  // Clean title and description from markdown asterisks
  const cleanTitle = article.title.replace(/\*\*/g, '').replace(/\*/g, '')
  const cleanDescription = article.description.replace(/\*\*/g, '').replace(/\*/g, '')

  return (
    <div className="min-h-screen py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-gold hover:text-gold-light transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour aux articles
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          {/* Theme badge */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${themeColors[article.theme]} mb-4`}>
            {themeLabels[article.theme]}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {cleanTitle}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-white/60">
            <time dateTime={article.date}>
              {format(new Date(article.date), 'd MMMM yyyy', { locale: fr })}
            </time>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min de lecture
            </span>
            {article.tags && article.tags.length > 0 && (
              <>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="flex gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs">#{tag}</span>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-xl text-white/70 leading-relaxed">
            {cleanDescription}
          </p>
        </header>

        {/* Publicité en haut */}
        <AdsUnit />

        {/* Article Content */}
        <div className="
          prose prose-invert max-w-none
          prose-h1:text-3xl prose-h1:font-bold prose-h1:text-white prose-h1:mb-6
          prose-h2:text-xl prose-h2:font-semibold prose-h2:text-yellow-400 prose-h2:mt-8 prose-h2:mb-4
          prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
          prose-strong:text-white
          prose-li:text-gray-300
        ">
          <MDXRemote 
            source={fullArticle.content} 
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>

        {/* Publicité en bas */}
        <AdsUnit />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap gap-2">
              {article.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-white/5 text-white/60 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link 
                href={`/blog/${prev.slug}`}
                className="group p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <span className="text-gold text-sm">← Article précédent</span>
                <h3 className="text-white font-medium mt-1 group-hover:text-gold transition-colors">
                  {prev.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link 
                href={`/blog/${next.slug}`}
                className="group p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-right"
              >
                <span className="text-gold text-sm">Article suivant →</span>
                <h3 className="text-white font-medium mt-1 group-hover:text-gold transition-colors">
                  {next.title}
                </h3>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      </article>
    </div>
  )
}
