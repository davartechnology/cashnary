import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'

const contentDirectory = path.join(process.cwd(), 'content')

export interface ArticleMeta {
  slug: string
  title: string
  date: string
  description: string
  theme: 'ia-tech' | 'business-en-ligne'
  tags: string[]
}

export interface Article extends ArticleMeta {
  content: string
}

export function getArticleSlugs(theme: string): string[] {
  const themeDirectory = path.join(contentDirectory, theme)
  
  if (!fs.existsSync(themeDirectory)) {
    return []
  }
  
  return fs.readdirSync(themeDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace(/\.md$/, ''))
}

export function getArticleBySlug(theme: string, slug: string): Article | null {
  const fullPath = path.join(contentDirectory, theme, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    theme: data.theme,
    tags: data.tags || [],
    content,
  }
}

export function getAllArticles(): ArticleMeta[] {
  const themes = ['ia-tech', 'business-en-ligne']
  const articles: ArticleMeta[] = []
  
  for (const theme of themes) {
    const slugs = getArticleSlugs(theme)
    for (const slug of slugs) {
      const article = getArticleBySlug(theme, slug)
      if (article) {
        articles.push({
          slug: article.slug,
          title: article.title,
          date: article.date,
          description: article.description,
          theme: article.theme,
          tags: article.tags,
        })
      }
    }
  }
  
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticlesByTheme(theme: string): ArticleMeta[] {
  return getAllArticles().filter(article => article.theme === theme)
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export function getAdjacentArticles(currentSlug: string): { prev: ArticleMeta | null; next: ArticleMeta | null } {
  const articles = getAllArticles()
  const currentIndex = articles.findIndex(a => a.slug === currentSlug)
  
  return {
    prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
    next: currentIndex > 0 ? articles[currentIndex - 1] : null,
  }
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
}
