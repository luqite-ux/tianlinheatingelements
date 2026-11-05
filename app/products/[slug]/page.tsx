import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { CtaLink } from '@/components/site/cta-link'
import { ProductStage } from '@/components/site/product-stage'
import { Reveal } from '@/components/motion/reveal'
import { categoryLabels, getProducts } from '@/lib/products'
import { fetchProductBySlug, fetchProductsData } from '@/lib/products-db'
import { pick } from '@/lib/locale'
import { company } from '@/lib/site'

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }))
}

export const revalidate = 60
export const dynamicParams = true

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} (${product.model})`,
    description: product.summary,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: { title: product.name, description: product.summary, type: 'website', url: `/products/${product.slug}`, images: [{ url: product.image }] },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await fetchProductBySlug(slug)
  if (!product) notFound()

  const labels = pick(categoryLabels)
  const others = (await fetchProductsData()).filter((p) => p.slug !== product.slug)
  const productSchema = {
    '@context': 'https://schema.org', '@type': 'Product', '@id': `https://${company.domain}/products/${product.slug}#product`,
    name: product.name, model: product.model, description: product.description, image: product.gallery,
    brand: { '@type': 'Brand', name: company.shortName }, manufacturer: { '@id': `https://${company.domain}/#organization` },
    url: `https://${company.domain}/products/${product.slug}`,
  }
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${company.domain}` },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `https://${company.domain}/products` },
    { '@type': 'ListItem', position: 3, name: product.name, item: `https://${company.domain}/products/${product.slug}` },
  ] }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbs]).replace(/</g, '\\u003c') }} />
      <PageHeader
        eyebrow={`${product.model} · ${labels[product.category]}`}
        title={product.name}
        lede={product.summary}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.name },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href={`/contact?product=${product.slug}`} variant="primary">
            Request a quote for {product.model}
          </CtaLink>
          <CtaLink href="/contact?intent=drawing" variant="outline">
            Submit Drawing
          </CtaLink>
        </div>
      </PageHeader>

      <section aria-labelledby="spec-title" className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-6">
            <div className="border border-line">
              <ProductStage src={product.image} alt={product.imageAlt} sizes="(min-width: 1024px) 46vw, 92vw" priority />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <Reveal delay={60}>
              <h2 id="spec-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
                Specification
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">{product.description}</p>
            </Reveal>

            <Reveal delay={120} className="mt-8">
              <div className="overflow-x-auto border border-line">
                <table className="w-full border-collapse text-left text-sm">
                  <caption className="sr-only">{product.name} specification</caption>
                  <tbody>
                    {product.specs.map((spec) => (
                      <tr key={spec.label} className="border-b border-line last:border-0">
                        <th scope="row" className="w-2/5 bg-paper px-4 py-3 align-top font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          {spec.label}
                        </th>
                        <td className="px-4 py-3 font-medium text-navy-deep">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {product.gallery.length > 1 ? (
        <section aria-labelledby="gallery-title" className="border-t border-line bg-white py-12 sm:py-16">
          <div className="wrap">
            <Reveal>
              <h2 id="gallery-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
                Product gallery
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Reference photographs from the supplied product workbook. Final dimensions and lead configuration follow the approved drawing.
              </p>
            </Reveal>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {product.gallery.map((image, index) => (
                <Reveal key={image} delay={Math.min(index * 45, 180)}>
                  <div className="overflow-hidden border border-line bg-white">
                    <ProductStage src={image} alt={`${product.name} reference ${index + 1}`} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="options-title" className="border-t border-line bg-paper py-12 sm:py-16">
        <div className="wrap grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 id="options-title" className="text-xl font-semibold text-navy-deep sm:text-2xl">
              Customization options
            </h2>
            <ul className="mt-5 space-y-3">
              {product.options.map((option) => (
                <li key={option} className="flex items-start gap-3 text-sm sm:text-base">
                  <Check aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-electric" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="text-xl font-semibold text-navy-deep sm:text-2xl">Typical uses</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {product.typicalUses.map((use) => (
                <li key={use} className="py-3 text-sm sm:text-base">
                  {use}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="more-title" className="bg-white py-12 sm:py-16">
        <div className="wrap">
          <Reveal>
            <h2 id="more-title" className="text-xl font-semibold text-navy-deep sm:text-2xl">
              Other families
            </h2>
          </Reveal>
          <ul className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {others.map((p, i) => (
              <li key={p.slug} className="bg-white">
                <Reveal delay={i * 60} className="h-full">
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex h-full min-h-11 flex-col gap-1 p-4 transition-colors hover:bg-electric-soft focus-visible:bg-electric-soft"
                  >
                    <span className="font-mono text-xs text-copper-ink">{p.model}</span>
                    <span className="text-sm font-semibold text-navy-deep">{p.name}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
