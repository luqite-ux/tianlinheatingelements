import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { Reveal } from '@/components/motion/reveal'
import { ProductCard } from '@/components/products/product-card'
import { categoryLabels, categoryOrder, isProductCategory } from '@/lib/products'
import { fetchProductsData } from '@/lib/products-db'
import { pick } from '@/lib/locale'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Heating Element Products',
  description:
    'Six custom heating element families: aluminum foil, steel tubular, aluminum tubular, silicone PTC, mica plate and silicone heating wire.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>
}) {
  const params = await searchParams
  const raw = Array.isArray(params.category) ? params.category[0] : params.category
  const active = isProductCategory(raw) ? raw : undefined
  const all = await fetchProductsData()
  const products = active ? all.filter((p) => p.category === active) : all
  const labels = pick(categoryLabels)

  const filters = [{ key: 'all', label: 'All families', href: '/products' }].concat(
    categoryOrder.map((c) => ({ key: c, label: labels[c], href: `/products?category=${c}` })),
  )

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Six heating element families, built to your drawing."
        lede="Choose a family to see its voltage, power, material and option range. Every element is custom-specified, so send your parameters for a technical reply."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section aria-labelledby="catalog-title" className="bg-white py-12 sm:py-16">
        <div className="wrap">
          <h2 id="catalog-title" className="sr-only">
            Product catalog
          </h2>
          <nav aria-label="Filter by product family" className="-mx-1 overflow-x-auto pb-2">
            <ul className="flex min-w-max gap-2 px-1 sm:min-w-0 sm:flex-wrap">
              {filters.map((f) => {
                const selected = (f.key === 'all' && !active) || f.key === active
                return (
                  <li key={f.key}>
                    <Link
                      href={f.href}
                      aria-current={selected ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-11 items-center border px-4 text-sm font-medium transition-colors',
                        selected
                          ? 'border-navy bg-navy text-white'
                          : 'border-line bg-white text-navy-deep hover:border-electric hover:text-electric',
                      )}
                    >
                      {f.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-muted-foreground" aria-live="polite">
            Showing {products.length} of {all.length} families
          </p>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <li key={product.slug}>
                <Reveal delay={(i % 3) * 70} className="h-full">
                  <ProductCard product={product} priority={i < 3} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="compare-title" className="border-t border-line bg-paper py-12 sm:py-16">
        <div className="wrap">
          <Reveal>
            <h2 id="compare-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
              Family comparison
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Published ranges for each family. Final values are set per drawing during review.
            </p>
          </Reveal>
          <Reveal delay={80} className="mt-6">
            <div className="overflow-x-auto border border-line bg-white" tabIndex={0} role="region" aria-label="Product comparison table, scrollable">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <caption className="sr-only">Comparison of Tianlin heating element families</caption>
                <thead>
                  <tr className="border-b border-line bg-navy-deep text-white">
                    <th scope="col" className="px-4 py-3 font-medium">Model</th>
                    <th scope="col" className="px-4 py-3 font-medium">Family</th>
                    <th scope="col" className="px-4 py-3 font-medium">Voltage</th>
                    <th scope="col" className="px-4 py-3 font-medium">Power</th>
                    <th scope="col" className="px-4 py-3 font-medium">Material</th>
                  </tr>
                </thead>
                <tbody>
                  {all.map((p) => (
                    <tr key={p.slug} className="border-b border-line last:border-0">
                      <th scope="row" className="px-4 py-3 font-mono text-xs font-medium text-copper-ink">
                        {p.model}
                      </th>
                      <td className="px-4 py-3">
                        <Link href={`/products/${p.slug}`} className="inline-flex min-h-11 items-center font-medium text-navy-deep underline-offset-4 hover:text-electric hover:underline">
                          {p.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{p.voltage}</td>
                      <td className="px-4 py-3">{p.power}</td>
                      <td className="px-4 py-3">{p.material}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
