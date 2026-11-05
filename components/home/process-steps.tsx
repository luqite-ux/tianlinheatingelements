import { processSteps } from '@/lib/content'
import { pick } from '@/lib/locale'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

export function ProcessSteps({ index = '08' }: { index?: string }) {
  const steps = pick(processSteps)
  return (
    <section aria-labelledby="process-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <SectionHeading
          id="process-title"
          index={index}
          eyebrow="Cooperation process"
          title="From first inquiry to batch production."
          lede="Five steps, each with a clear output, so both sides know what is agreed before the next one starts."
        >
          <CtaLink href="/contact?intent=sample" variant="primary">
            Request a Sample
          </CtaLink>
        </SectionHeading>

        <ol className="relative mt-14 grid gap-0 lg:grid-cols-5">
          <span aria-hidden="true" className="absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line max-lg:block" />
          <span aria-hidden="true" className="absolute left-0 right-0 top-[19px] hidden h-px bg-line lg:block" />
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 70} className="flex gap-5 pb-10 lg:block lg:pb-0 lg:pr-6">
                <span className="relative z-10 flex size-10 shrink-0 items-center justify-center border border-navy bg-white font-mono text-sm font-medium text-navy-deep">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="lg:mt-6">
                  <h3 className="text-lg font-semibold text-navy-deep">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
