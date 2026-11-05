import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { CertificatesSection } from '@/components/certificates/certificates-section'

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'ISO, CCC, CE and explosion-proof certificates of Anhui Tianlin Electric Appliance, each shown as its own page.',
}

export default function CertificatesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Certificates"
        title="ISO, CCC, CE and explosion-proof documents."
        lede="Each certificate is a separate portrait page. Use the rail controls, swipe on touch screens, or pause the auto-advance."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Certificates' }]}
      />
      <CertificatesSection index="01" showLink={false} />
      <CtaBand />
    </>
  )
}
