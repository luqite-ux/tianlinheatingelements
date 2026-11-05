import type { Metadata } from 'next'
import { PageHeader } from '@/components/site/page-header'
import { CtaBand } from '@/components/site/cta-band'
import { CtaLink } from '@/components/site/cta-link'
import { Reveal } from '@/components/motion/reveal'
import { QualityLab } from '@/components/home/quality-lab'
import { CertificatesSection } from '@/components/certificates/certificates-section'

const inspectionEquipment = [
  ['TL001–TL006', 'Resistance tester', 'QJ83'],
  ['TL007', 'Resistance tester', 'RS-232C'],
  ['TL008 / TL010 / TL023', 'Withstand-voltage tester', 'ZHZ8'],
  ['TL009', 'Insulation resistance meter', 'ZC93-3'],
  ['TL011', 'Vernier caliper', '0–150 mm'],
  ['TL012', 'Digital caliper', '0–150 mm'],
  ['TL013–TL015', 'Digital micrometer', '0–25 mm'],
  ['TL016', 'Power-frequency spark tester', 'CHJ-2'],
  ['—', 'Digital multimeter', '15 units'],
  ['TL017', 'DC resistance bridge', 'QJ57'],
  ['TL018', 'Bridge fixture', 'DQ-I'],
  ['TL019', 'Terminal cross-section analyzer', 'Micro2SPLUS'],
  ['TL020', 'Automatic horizontal pull tester', 'MicroPull1000'],
  ['TL021', 'Digital force gauge', 'HR-300'],
  ['TL022', 'Tensile-strength tester', 'JK-L-2000'],
  ['TL024', 'Microscope', '0.5×'],
  ['TL025', 'Constant temperature and humidity chamber', 'JK-S-150L'],
  ['TL026', 'Digital measuring microscope', '15JF (JQC-S)'],
] as const

export const metadata: Metadata = {
  title: 'Quality & Testing',
  description:
    'Electrical test equipment and certificate documents at Anhui Tianlin Electric Appliance, shown with real lab photography.',
}

export default function QualityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Quality & Testing"
        title="Elements are measured before they ship."
        lede="Our test area reads voltage, current and power on elements under load. Test points for your project are agreed during drawing review."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Quality & Testing' }]}
      >
        <CtaLink href="/contact" variant="primary">
          Ask About Test Points
        </CtaLink>
      </PageHeader>

      <QualityLab />

      <section aria-labelledby="equipment-title" className="border-t border-line bg-white py-12 sm:py-16">
        <div className="wrap">
          <Reveal>
            <h2 id="equipment-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">Inspection equipment register</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">Translated from the supplied equipment workbook. Asset numbers are retained for supplier-review traceability.</p>
          </Reveal>
          <div className="mt-7 overflow-x-auto border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-navy-deep text-white"><tr><th className="px-4 py-3">Asset No.</th><th className="px-4 py-3">Equipment</th><th className="px-4 py-3">Model / range</th></tr></thead>
              <tbody>{inspectionEquipment.map(([asset, name, model]) => <tr key={`${asset}-${name}`} className="border-t border-line"><td className="px-4 py-3 font-mono text-xs text-copper-ink">{asset}</td><td className="px-4 py-3 font-medium text-navy-deep">{name}</td><td className="px-4 py-3 text-muted-foreground">{model}</td></tr>)}</tbody>
            </table>
          </div>
        </div>
      </section>
      <CertificatesSection index="02" />

      <section aria-labelledby="doc-title" className="border-t border-line bg-paper py-12 sm:py-16">
        <div className="wrap max-w-3xl">
          <Reveal>
            <h2 id="doc-title" className="text-2xl font-semibold text-navy-deep sm:text-3xl">
              Documents for supplier review
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              If your approval process needs specific documents, list them in your RFQ. We tell you which ones we can
              provide for your product family.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
