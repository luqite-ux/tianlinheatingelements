import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getProducts } from '@/lib/products'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { ProductStage } from '@/components/site/product-stage'
import { CtaLink } from '@/components/site/cta-link'

export function ProductFamilies() {
  const products = getProducts()
  return (
    <section aria-labelledby="families-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <SectionHeading
          id="families-title"
          index="01"
          eyebrow="Product families"
          title="Six heating element families, each built to order."
          lede="Choose a family, then define voltage, power, size, material, temperature and leads. Every element is quoted from your drawing."
        >
          <CtaLink href="/products" variant="outline">
            All products
          </CtaLink>
        </SectionHeading>

        <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.slug} className="bg-white">
              <Reveal delay={(i % 3) * 70} className="h-full">
                <Link
                  href={`/products?category=${p.category}`}
                  className="group flex h-full flex-col transition-colors hover:bg-paper focus-visible:bg-paper"
                >
                  <div className="relative">
                    <ProductStage
                      src={p.image}
                      alt={p.imageAlt}
                      sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
                      fit={p.slug === 'silicone-encapsulated-ptc-heating-element' ? 'cover' : 'contain'}
                      className="aspect-[4/3] transition-colors group-hover:bg-paper"
                    />
                    <span className="eyebrow absolute left-4 top-4 text-copper-ink">{p.model}</span>
                  </div>
                  <div className="flex flex-1 flex-col border-t border-line p-5">
                    <h3 className="flex items-start justify-between gap-3 text-xl font-semibold text-navy-deep">
                      {p.name}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-1 size-5 shrink-0 text-electric transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      />
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
                      <div>
                        <dt className="eyebrow text-[0.68rem] text-muted-foreground">Voltage</dt>
                        <dd className="mt-0.5 font-medium text-navy-deep">{p.voltage}</dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-[0.68rem] text-muted-foreground">
                          {p.category === 'ptc' ? 'Temperature' : 'Power'}
                        </dt>
                        <dd className="mt-0.5 font-medium text-navy-deep">
                          {p.category === 'ptc' ? p.temperature.replace(' constant-temperature range', '') : p.power}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
