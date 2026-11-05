import Image from 'next/image'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

const points = [
  {
    title: 'Live electrical readings',
    body: 'Elements are powered on separate test channels while voltage, current, power and power factor are read from dedicated meters.',
  },
  {
    title: 'Channel-by-channel testing',
    body: 'Each channel has its own breaker and indicator, so several elements can be tested side by side.',
  },
  {
    title: 'Points agreed with you',
    body: 'Test points for your project are set during drawing review and applied to the sample.',
  },
]

export function QualityLab() {
  return (
    <section aria-labelledby="lab-title" className="border-t border-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure>
            <Image
              src="/images/quality/test-bench.jpg"
              alt="Test bench with multi-channel power parameter meters, breakers and two PTC heating strips connected for testing"
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="mt-3 text-xs text-muted-foreground">Test bench in our quality area.</figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <SectionHeading
            id="lab-title"
            index="05"
            eyebrow="Quality lab"
            title="Measured on a test bench, not assumed."
            lede="Our test area reads electrical values from elements under load, so the sample you receive can be checked against the figures agreed in the drawing."
          />
          <ol className="mt-10 divide-y divide-line border-y border-line">
            {points.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 70} className="grid gap-2 py-5 sm:grid-cols-[3rem_1fr]">
                  <span className="eyebrow pt-1 text-copper-ink">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-deep">{p.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-8">
            <CtaLink href="/quality" variant="primary">
              Quality &amp; Testing
            </CtaLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
