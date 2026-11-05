import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { ClientsSection } from '@/components/clients/clients-section'
import { company } from '@/lib/site'
import { categoryLabels, getProducts } from '@/lib/products'
import { pick } from '@/lib/locale'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Anhui Tianlin Electric Appliance Co., Ltd. was founded in 2019 in Ningguo, Anhui, and makes custom heating elements for appliance OEM/ODM and industrial buyers.',
}

export default function AboutPage() {
  const products = getProducts()
  const labels = pick(categoryLabels)
  const facts = [
    { label: 'Founded', value: String(company.founded) },
    { label: 'Employees', value: company.employees },
    { label: 'Facility', value: company.facility },
    { label: 'Product families', value: String(products.length) },
  ]

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Anhui Tianlin Electric Appliance Co., Ltd."
        lede="A heating element manufacturer in Ningguo, Anhui, working with appliance OEM/ODM and industrial buyers who need elements specified to a drawing."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      <section aria-labelledby="who-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 id="who-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
              What we make
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Founded in {company.founded}, Tianlin builds six families of heating elements: aluminum foil, steel
              tubular, aluminum tubular, silicone-encapsulated PTC, mica plate and silicone insulated heating wire.
              Each one is specified by voltage, power, size, material, operating temperature, lead configuration and
              volume.
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex min-h-11 items-center justify-between gap-4 py-3 text-sm hover:text-electric"
                  >
                    <span className="font-medium text-navy-deep">{labels[p.category]}</span>
                    <span className="font-mono text-xs text-copper-ink">{p.model}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="lg:col-span-6">
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {facts.map((fact, i) => (
                <Reveal key={fact.label} delay={i * 70} className="bg-paper p-6">
                  <dt className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{fact.label}</dt>
                  <dd className="mt-2 text-2xl font-semibold text-navy-deep">{fact.value}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={120}>
              <address className="mt-6 space-y-1 text-sm not-italic text-muted-foreground">
                <p className="font-medium text-navy-deep">{company.name}</p>
                <p>{company.address}</p>
                <p>
                  <a className="inline-flex min-h-11 items-center underline-offset-4 hover:text-electric hover:underline" href={company.phoneHref}>
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a className="inline-flex min-h-11 items-center underline-offset-4 hover:text-electric hover:underline" href={company.emailHref}>
                    {company.email}
                  </a>
                </p>
              </address>
            </Reveal>
          </div>
        </div>
      </section>

      <ClientsSection index="02" />
      <CtaBand />
    </>
  )
}
