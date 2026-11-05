import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { CtaLink } from '@/components/site/cta-link'
import { Reveal } from '@/components/motion/reveal'
import { applications, rfqParameters } from '@/lib/content'
import { categoryLabels, getProductByCategory } from '@/lib/products'
import { pick } from '@/lib/locale'

export const metadata: Metadata = {
  title: 'Applications',
  description:
    'Custom heating elements for refrigerators, freezers and cold cabinets, air conditioning, bathroom and sanitary products, and equipment heating.',
}

export default function ApplicationsPage() {
  const items = pick(applications)
  const labels = pick(categoryLabels)
  const params = pick(rfqParameters)

  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="Heating built around your appliance."
        lede="Each application starts from the same set of parameters. Tell us the space, the voltage and the temperature, and we match a product family to it."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
      />

      <section aria-labelledby="app-list-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap">
          <h2 id="app-list-title" className="sr-only">
            Application areas
          </h2>
          <ol className="divide-y divide-line border-y border-line">
            {items.map((item, i) => (
              <li key={item.id} id={item.id} className="scroll-mt-24">
                <Reveal className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-xs text-copper-ink">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 text-2xl font-semibold text-navy-deep">{item.title}</h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="text-base leading-relaxed text-muted-foreground">{item.summary}</p>
                    <h4 className="eyebrow mt-6 text-electric">What we need from you</h4>
                    <ul className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                      {item.needs.map((need) => (
                        <li key={need} className="flex gap-2 py-1">
                          <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-electric" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="lg:col-span-3">
                    <h4 className="eyebrow text-electric">Relevant families</h4>
                    <ul className="mt-3 space-y-1">
                      {item.families.map((cat) => {
                        const p = getProductByCategory(cat)
                        if (!p) return null
                        return (
                          <li key={cat}>
                            <Link
                              href={`/products/${p.slug}`}
                              className="inline-flex min-h-11 items-center text-sm font-medium text-navy-deep underline-offset-4 hover:text-electric hover:underline"
                            >
                              {labels[cat]}
                              <span className="ml-2 font-mono text-xs text-muted-foreground">{p.model}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <CtaLink href="/contact" variant="primary">
              Discuss Your Application
            </CtaLink>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="params-title" className="border-t border-line bg-paper py-12 sm:py-16">
        <div className="wrap">
          <Reveal>
            <h2 id="params-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
              Parameters that define every project
            </h2>
          </Reveal>
          <dl className="mt-8 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {params.map((param, i) => (
              <Reveal key={param.label} delay={(i % 4) * 60} className="bg-white p-5">
                <dt className="text-sm font-semibold text-navy-deep">{param.label}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{param.detail}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
