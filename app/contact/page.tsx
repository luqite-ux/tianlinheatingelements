import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { Reveal } from '@/components/motion/reveal'
import { RfqForm } from '@/components/contact/rfq-form'
import { company } from '@/lib/site'
import { rfqParameters } from '@/lib/content'
import { getProductBySlug, getProducts } from '@/lib/products'
import { pick } from '@/lib/locale'

export const metadata: Metadata = {
  title: 'Contact / RFQ',
  description:
    'Send your heating element parameters and drawing to Anhui Tianlin Electric Appliance engineering for a quotation.',
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string | string[]; intent?: string | string[] }>
}) {
  const params = await searchParams
  const productParam = Array.isArray(params.product) ? params.product[0] : params.product
  const intentParam = Array.isArray(params.intent) ? params.intent[0] : params.intent
  const defaultProduct = productParam && getProductBySlug(productParam) ? productParam : undefined
  const products = getProducts().map((p) => ({ slug: p.slug, label: `${p.name} (${p.model})` }))
  const checklist = pick(rfqParameters)

  return (
    <>
      <PageHeader
        eyebrow="Contact / RFQ"
        title="Send your parameters and drawing."
        lede="Engineering reviews each request against the six product families and replies by email."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact / RFQ' }]}
      />

      <section aria-labelledby="rfq-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="rfq-title" className="mb-8 text-2xl font-semibold text-navy-deep sm:text-3xl">
              Request for quotation
            </h2>
            <RfqForm products={products} defaultProduct={defaultProduct} drawingIntent={intentParam === 'drawing'} />
          </div>

          <aside aria-label="Company contact and checklist" className="space-y-10 lg:col-span-5">
            <Reveal>
              <h2 className="text-xl font-semibold text-navy-deep">Direct contact</h2>
              <address className="mt-4 space-y-1 text-sm not-italic">
                <p className="flex gap-3 py-2">
                  <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-electric" />
                  <span>
                    {company.name}
                    <br />
                    {company.address}
                  </span>
                </p>
                <p>
                  <a href={company.phoneHref} className="flex min-h-11 items-center gap-3 hover:text-electric">
                    <Phone aria-hidden="true" className="size-5 shrink-0 text-electric" />
                    {company.phone}
                  </a>
                </p>
                <p>
                  <a href={company.emailHref} className="flex min-h-11 items-center gap-3 break-all hover:text-electric">
                    <Mail aria-hidden="true" className="size-5 shrink-0 text-electric" />
                    {company.email}
                  </a>
                </p>
              </address>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="text-xl font-semibold text-navy-deep">What to include</h2>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {checklist.map((item) => (
                  <li key={item.label} className="py-3">
                    <p className="text-sm font-semibold text-navy-deep">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  )
}
