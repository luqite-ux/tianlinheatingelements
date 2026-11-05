import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { caseReviews } from '@/lib/evidence'
import { pick } from '@/lib/locale'

export function generateStaticParams() {
  return pick(caseReviews).map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const review = pick(caseReviews).find((c) => c.slug === slug)
  if (!review) return { title: 'Case not found' }
  return { title: review.title, description: review.summary }
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const review = pick(caseReviews).find((c) => c.slug === slug)
  if (!review) notFound()

  return (
    <>
      <PageHeader
        eyebrow={review.application}
        title={review.title}
        lede={review.summary}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Cases', href: '/cases' }, { label: review.title }]}
      />

      <article className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl font-semibold text-navy-deep">Requirement</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
                {review.requirement.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-electric" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-2xl font-semibold text-navy-deep">Review notes</h2>
              <ul className="mt-4 space-y-2 text-base leading-relaxed text-muted-foreground">
                {review.reviewNotes.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-electric" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="space-y-8 lg:col-span-5">
            {review.image && (
              <Reveal>
                <div className="relative aspect-[4/3] border border-line bg-paper">
                  <Image src={review.image.src} alt={review.image.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-contain p-4" />
                </div>
              </Reveal>
            )}
            <Reveal delay={80}>
              <div className="overflow-x-auto border border-line">
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">Parameters for {review.title}</caption>
                  <tbody>
                    {review.parameters.map((p) => (
                      <tr key={p.label} className="border-b border-line last:border-0">
                        <th scope="row" className="w-2/5 bg-paper px-4 py-3 align-top font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {p.label}
                        </th>
                        <td className="px-4 py-3 font-medium text-navy-deep">{p.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  )
}
