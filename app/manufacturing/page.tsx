import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { ManufacturingBand } from '@/components/home/manufacturing-band'
import { ProcessSteps } from '@/components/home/process-steps'
import { FactoryMasonryGallery } from '@/components/manufacturing/factory-masonry-gallery'
import { company } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Manufacturing',
  description:
    'Manufacturing at Anhui Tianlin Electric Appliance in Ningguo, Anhui: a facility of approximately 15,000 m² and approximately 120 employees.',
}

const facts = [
  { label: 'Founded', value: String(company.founded) },
  { label: 'Employees', value: company.employees },
  { label: 'Facility', value: company.facility },
  { label: 'Location', value: 'Ningguo, Anhui, China' },
]

export default function ManufacturingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Manufacturing"
        title="Made in Ningguo, Anhui."
        lede="One site covers forming, assembly and electrical testing for six heating element families."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing' }]}
      />

      <section aria-labelledby="facts-title" className="bg-white py-12 sm:py-16">
        <div className="wrap">
          <h2 id="facts-title" className="sr-only">
            Facility facts
          </h2>
          <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} delay={i * 70} className="bg-white p-6">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{fact.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-navy-deep">{fact.value}</dd>
              </Reveal>
            ))}
          </dl>
          <p className="mt-4 text-sm text-muted-foreground">{company.address}</p>
        </div>
      </section>

      <ManufacturingBand />

      <section aria-labelledby="factory-gallery-title" className="border-t border-line bg-white py-12 sm:py-16">
        <div className="wrap">
          <Reveal><h2 id="factory-gallery-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">Factory and production floor</h2><p className="mt-3 max-w-2xl text-muted-foreground">Real facility and production photographs supplied by Anhui Tianlin Electric Appliance.</p></Reveal>
          <FactoryMasonryGallery />
        </div>
      </section>
      <ProcessSteps index="02" />
      <CtaBand />
    </>
  )
}
