import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { CtaLink } from '@/components/site/cta-link'
import { EvidenceEmpty } from '@/components/site/evidence-empty'
import { Reveal } from '@/components/motion/reveal'
import { caseReviews } from '@/lib/evidence'
import { pick } from '@/lib/locale'

export const metadata: Metadata = {
  title: 'Cases',
  description: 'Application and drawing reviews from Anhui Tianlin Electric Appliance engineering.',
}

export default function CasesPage() {
  const cases = pick(caseReviews)

  return (
    <>
      <PageHeader
        eyebrow="Cases"
        title="Application and drawing reviews."
        lede="This section will show real application and drawing reviews, each with its requirement, review notes and parameters."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Cases' }]}
      />

      <section aria-labelledby="cases-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap">
          <h2 id="cases-title" className="sr-only">
            Case list
          </h2>
          {cases.length === 0 ? (
            <Reveal>
              <EvidenceEmpty
                title="No public cases are published yet."
                body="We publish a case only when the drawing and application details can be shared. If you want your own application reviewed, send your parameters and drawing."
              >
                <CtaLink href="/contact?intent=drawing" variant="primary">
                  Submit Drawing
                </CtaLink>
                <CtaLink href="/products" variant="outline">
                  View Products
                </CtaLink>
              </EvidenceEmpty>
            </Reveal>
          ) : (
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c, i) => (
                <li key={c.slug}>
                  <Reveal delay={(i % 3) * 70} className="h-full">
                    <article className="group relative flex h-full flex-col border border-line bg-white transition-colors hover:border-electric">
                      {c.image && (
                        <div className="relative aspect-[4/3] border-b border-line bg-paper">
                          <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1024px) 30vw, 92vw" className="object-contain p-4" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <p className="eyebrow text-electric">{c.application}</p>
                        <h3 className="mt-2 text-xl font-semibold text-navy-deep">
                          <Link href={`/cases/${c.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                            {c.title}
                          </Link>
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
