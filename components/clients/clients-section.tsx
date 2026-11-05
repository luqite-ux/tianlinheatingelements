import { clientLogos } from '@/lib/evidence'
import { pick } from '@/lib/locale'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'
import { EvidenceEmpty } from '@/components/site/evidence-empty'
import { Reveal } from '@/components/motion/reveal'
import { LogoLoop } from './logo-loop'

export function ClientsSection({ index = '07' }: { index?: string }) {
  const logos = pick(clientLogos)
  return (
    <section aria-labelledby="clients-title" className="border-y border-line bg-paper py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <SectionHeading
          id="clients-title"
          index={index}
          eyebrow="Clients"
          title="Brands we work with."
          lede="Logos are shown only where the customer has been supplied to us for publication."
        >
          <CtaLink href="/contact" variant="primary">
            Start a Project
          </CtaLink>
        </SectionHeading>

        <div className="mt-12">
          {logos.length > 0 ? (
            <Reveal>
              <LogoLoop logos={logos} />
            </Reveal>
          ) : (
            <Reveal>
              <EvidenceEmpty
                title="Client logos will appear here."
                body="This area shows partner logos once they are cleared for publication. Until then, we do not list customer names."
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
