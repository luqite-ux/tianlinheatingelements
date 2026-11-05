import Image from 'next/image'
import { Factory, Fan, ShowerHead, Snowflake, ThermometerSnowflake, type LucideIcon } from 'lucide-react'
import { applications } from '@/lib/content'
import { getProductByCategory } from '@/lib/products'
import { pick } from '@/lib/locale'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

const icons: Record<string, LucideIcon> = {
  refrigerators: Snowflake,
  freezers: ThermometerSnowflake,
  'air-conditioning': Fan,
  bathroom: ShowerHead,
  equipment: Factory,
}

export function ApplicationsStrip() {
  const items = pick(applications)
  return (
    <section aria-labelledby="apps-title" className="tech-grid border-y border-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <SectionHeading
          id="apps-title"
          index="02"
          eyebrow="Applications"
          title="Where our heating elements go to work."
          lede="Refrigerators, cold cabinets, air conditioning, bathroom products and equipment heating, each with its own space, temperature and lead constraints."
        >
          <CtaLink href="/contact?intent=application" variant="primary">
            Discuss Your Application
          </CtaLink>
        </SectionHeading>
      </div>

      <div className="mt-12">
        <ul className="wrap flex snap-x snap-mandatory gap-px overflow-x-auto pb-4 [scrollbar-width:thin] lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {items.map((item, i) => {
            const Icon = icons[item.id] ?? Factory
            return (
              <li key={item.id} className="w-[78vw] max-w-[320px] shrink-0 snap-start lg:w-auto lg:max-w-none">
                <Reveal delay={i * 70} className="h-full">
                  <article className="group flex h-full flex-col border border-line bg-white p-6 transition-colors hover:border-electric/50">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-copper-ink">{String(i + 1).padStart(2, '0')}</span>
                      <Icon aria-hidden="true" className="size-5 text-electric" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold text-navy-deep">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
                    <ul className="mt-6 flex gap-2 border-t border-line pt-4">
                      {item.families.map((f) => {
                        const p = getProductByCategory(f)
                        if (!p) return null
                        return (
                          <li key={f} className="relative size-14 border border-line bg-white">
                            <Image src={p.image} alt={p.name} fill sizes="56px" className="object-contain p-1" />
                          </li>
                        )
                      })}
                    </ul>
                  </article>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
