import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/site/page-header'
import { CtaLink } from '@/components/site/cta-link'
import { EvidenceEmpty } from '@/components/site/evidence-empty'
import { Reveal } from '@/components/motion/reveal'
import { getPublishedArticles } from '@/lib/articles-db'

export const metadata: Metadata = {
  title: 'News',
  description: 'Company and product news from Anhui Tianlin Electric Appliance.',
}

export const revalidate = 60

export default async function NewsPage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Company and product news."
        lede="Announcements appear here once they are published."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />

      <section aria-labelledby="news-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap">
          <h2 id="news-title" className="sr-only">
            News list
          </h2>
          {articles.length === 0 ? (
            <Reveal>
              <EvidenceEmpty
                title="No news has been published yet."
                body="We only post real announcements. In the meantime, browse the product families or send us your project parameters."
              >
                <CtaLink href="/products" variant="primary">
                  View Products
                </CtaLink>
                <CtaLink href="/contact" variant="outline">
                  Send RFQ
                </CtaLink>
              </EvidenceEmpty>
            </Reveal>
          ) : (
            <ul className="divide-y divide-line border-y border-line">
              {articles.map((a, i) => (
                <li key={a.slug}>
                  <Reveal delay={i * 60}>
                    <article className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
                      <time dateTime={a.date} className="font-mono text-xs text-muted-foreground md:col-span-2 md:pt-1.5">
                        {a.date}
                      </time>
                      <div className="md:col-span-10">
                        <h3 className="text-xl font-semibold text-navy-deep">
                          <Link href={`/news/${a.slug}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-electric hover:underline">
                            {a.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">{a.summary}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
