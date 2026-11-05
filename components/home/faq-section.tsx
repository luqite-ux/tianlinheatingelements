import { Plus } from 'lucide-react'
import { faqGroups } from '@/lib/content'
import { pick } from '@/lib/locale'
import { Reveal } from '@/components/motion/reveal'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'

export function FaqSection({ index = '09' }: { index?: string }) {
  const groups = pick(faqGroups)
  return (
    <section aria-labelledby="faq-title" className="border-t border-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading
            id="faq-title"
            index={index}
            eyebrow="FAQ"
            title="Questions we hear before an RFQ."
            lede="Customization, MOQ, sampling, lead time and testing, answered plainly."
          />
          <Reveal delay={80} className="mt-8">
            <CtaLink href="/contact" variant="primary">
              Contact Engineering
            </CtaLink>
          </Reveal>
        </div>

        <div className="space-y-10 lg:col-span-8">
          {groups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 50}>
              <h3 className="eyebrow mb-3 text-copper-ink">{group.title}</h3>
              <div className="divide-y divide-line border-y border-line bg-white">
                {group.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 text-left text-base font-semibold text-navy-deep marker:content-none hover:text-electric [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <Plus
                        aria-hidden="true"
                        className="size-5 shrink-0 text-electric transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      />
                    </summary>
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:text-base">{item.a}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
