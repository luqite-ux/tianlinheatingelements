import { HeroCarousel } from '@/components/home/hero-carousel'
import { ProductFamilies } from '@/components/home/product-families'
import { ApplicationsStrip } from '@/components/home/applications-strip'
import { EngineeringProof } from '@/components/home/engineering-proof'
import { ManufacturingBand } from '@/components/home/manufacturing-band'
import { QualityLab } from '@/components/home/quality-lab'
import { CertificatesSection } from '@/components/certificates/certificates-section'
import { ClientsSection } from '@/components/clients/clients-section'
import { ProcessSteps } from '@/components/home/process-steps'
import { FaqSection } from '@/components/home/faq-section'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ProductFamilies />
      <ApplicationsStrip />
      <EngineeringProof />
      <ManufacturingBand />
      <QualityLab />
      <CertificatesSection />
      <ClientsSection />
      <ProcessSteps />
      <FaqSection />
    </>
  )
}
