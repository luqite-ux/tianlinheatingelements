import { rfqParameters } from '@/lib/content'
import { pick } from '@/lib/locale'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

export function EngineeringProof() {
  const params = pick(rfqParameters)
  return (
    <section aria-labelledby="proof-title" className="tech-grid-dark bg-navy-deep py-16 text-white sm:py-20 lg:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="proof-title"
            index="03"
            tone="dark"
            eyebrow="Engineering"
            title="We build to your drawing, not to a catalog."
            lede="Eight parameters define a heating element. Give us what you have; drawing review closes the gaps before any sample is made."
          />
          <Reveal delay={120} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/contact?intent=drawing" variant="electric">
              Submit Drawing
            </CtaLink>
            <CtaLink href="/products" variant="outline-dark">
              Browse product families
            </CtaLink>
          </Reveal>
        </div>

        <Reveal delay={80} className="lg:col-span-7">
          <table className="w-full border-collapse text-left">
            <caption className="eyebrow pb-3 text-left text-[#8fb6ff]">RFQ parameter sheet</caption>
            <thead className="sr-only">
              <tr>
                <th scope="col">Parameter</th>
                <th scope="col">What to provide</th>
              </tr>
            </thead>
            <tbody>
              {params.map((row, i) => (
                <tr key={row.label} className="border-t border-white/15 align-top transition-colors hover:bg-white/[0.04]">
                  <th scope="row" className="w-[42%] py-4 pr-4 text-base font-semibold text-white sm:w-1/3">
                    <span className="eyebrow mr-3 text-copper">{String(i + 1).padStart(2, '0')}</span>
                    {row.label}
                  </th>
                  <td className="py-4 text-sm leading-relaxed text-white/75">{row.detail}</td>
                </tr>
              ))}
              <tr className="border-t border-white/15">
                <td colSpan={2} />
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
