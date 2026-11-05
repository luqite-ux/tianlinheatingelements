import { CtaLink } from './cta-link'
import { Reveal } from '@/components/motion/reveal'

interface CtaBandProps {
  title?: string
  body?: string
}

export function CtaBand({
  title = 'Send your drawing and parameters.',
  body = 'Share voltage, power, size, material, operating temperature, lead configuration and volume. Engineering reviews them and replies by email.',
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-title" className="tech-grid-dark bg-navy-deep text-white">
      <Reveal className="wrap flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-xl">
          <h2 id="cta-band-title" className="text-3xl font-semibold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/75">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/contact" variant="electric">
            Send RFQ
          </CtaLink>
          <CtaLink href="/contact?intent=drawing" variant="outline-dark">
            Submit Drawing
          </CtaLink>
        </div>
      </Reveal>
    </section>
  )
}
