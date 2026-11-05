import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { getArticleBySlug, getPublishedArticles } from '@/lib/articles-db'
import { company } from '@/lib/site'

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return { title: 'Article not found' }
  return { title: article.title, description: article.summary, alternates: { canonical: `/news/${article.slug}` }, openGraph: { title: article.title, description: article.summary, type: 'article', url: `/news/${article.slug}`, images: article.featuredImage ? [{ url: article.featuredImage }] : undefined } }
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()
  const articleSchema = { '@context': 'https://schema.org', '@type': 'Article', '@id': `https://${company.domain}/news/${article.slug}#article`, headline: article.title, description: article.summary, datePublished: article.date, image: article.featuredImage, mainEntityOfPage: `https://${company.domain}/news/${article.slug}`, publisher: { '@id': `https://${company.domain}/#organization` } }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, '\\u003c') }} />
      <PageHeader
        eyebrow={article.date}
        title={article.title}
        lede={article.summary}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: article.title }]}
      />
      <article className="bg-white py-12 sm:py-16">
        <div className="wrap max-w-3xl space-y-5 text-base leading-relaxed text-navy-deep/90 sm:text-lg">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
      <CtaBand />
    </>
  )
}
