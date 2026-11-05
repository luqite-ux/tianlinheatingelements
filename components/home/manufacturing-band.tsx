import Image from 'next/image'
import { company } from '@/lib/site'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

const stats = [
  { value: String(company.founded), label: 'Founded' },
  { value: '≈120', label: 'Employees' },
  { value: '≈15,000 m²', label: 'Facility' },
]

export function ManufacturingBand() {
  return (
    <section aria-labelledby="mfg-title" className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-0">
        <div className="wrap lg:col-span-6 lg:max-w-none lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16">
          <SectionHeading
            id="mfg-title"
            index="04"
            eyebrow="Manufacturing"
            title="Winding, forming and assembly in one facility."
            lede={`Based in Ningguo, Anhui, Tianlin has built heating elements since ${company.founded}. Foil, tubular, PTC, mica and wire products share one site, one engineering team and one test area.`}
          />
          <Reveal delay={80}>
            <dl className="mt-10 grid grid-cols-3 border-y border-line">
              {stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? 'border-l border-line py-5 pl-4 sm:pl-6' : 'py-5 pr-4'}>
                  <dd className="font-mono text-xl font-medium text-navy-deep sm:text-3xl">{s.value}</dd>
                  <dt className="eyebrow mt-2 text-[0.68rem] text-muted-foreground">{s.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <CtaLink href="/manufacturing" variant="primary">
                View Manufacturing
              </CtaLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="lg:col-span-6">
          <figure>
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
              <Image
                src="/images/banner/banner-2.jpg"
                alt="Robotic arms handling tubular and PTC heating elements on a production conveyor"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[18%_50%]"
              />
            </div>
            <figcaption className="wrap mt-3 text-xs text-muted-foreground lg:px-0">
              Illustrative artwork of a heating-element production line.
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
