import { certificates } from '@/lib/evidence'
import { pick } from '@/lib/locale'
import { SectionHeading } from '@/components/site/section-heading'
import { CtaLink } from '@/components/site/cta-link'
import { EvidenceEmpty } from '@/components/site/evidence-empty'
import { Reveal } from '@/components/motion/reveal'
import { CertificateRail } from './certificate-rail'

interface CertificatesSectionProps {
  index?: string
  headingLevelTitle?: string
  showLink?: boolean
}

export function CertificatesSection({ index = '06', showLink = true }: CertificatesSectionProps) {
  const items = pick(certificates)
  return (
    <section aria-labelledby="certs-title" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="wrap">
        <SectionHeading
          id="certs-title"
          index={index}
          eyebrow="Certificates"
          title="Every certificate, shown in full."
          lede="Each certificate is presented as its own portrait page so the text can be read, not as a collage."
        >
          {showLink && (
            <CtaLink href="/certificates" variant="outline">
              View Certificates
            </CtaLink>
          )}
        </SectionHeading>

        <div className="mt-12">
          {items.length > 0 ? (
            <Reveal>
              <CertificateRail items={items} />
            </Reveal>
          ) : (
            <Reveal>
              <EvidenceEmpty
                title="Certificate scans are being prepared."
                body="ISO, CCC, CE and explosion-proof certificate pages will be published here, one portrait item each. If your supplier review needs documents now, contact engineering."
              >
                <CtaLink href="/contact" variant="primary">
                  Contact Engineering
                </CtaLink>
              </EvidenceEmpty>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
