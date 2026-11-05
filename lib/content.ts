import { type Localized } from './locale'
import { type ProductCategory } from './products'

export interface ApplicationItem {
  id: string
  title: string
  summary: string
  needs: string[]
  families: ProductCategory[]
}

export const applications: Localized<ApplicationItem[]> = {
  en: [
    {
      id: 'refrigerators',
      title: 'Refrigerators',
      summary:
        'Defrost and anti-condensation heating around evaporators, drains and door frames, built to fit tight cavity geometries.',
      needs: ['Cavity or evaporator drawing', 'Voltage and wattage', 'Lead length and connector', 'Mounting method'],
      families: ['foil', 'steel-tubular', 'aluminum-tubular'],
    },
    {
      id: 'freezers',
      title: 'Freezers & cold cabinets',
      summary:
        'Heating elements for low-temperature enclosures, where element shape, sheath material and lead routing matter.',
      needs: ['Cabinet or evaporator layout', 'Operating temperature', 'Sheath material', 'Termination type'],
      families: ['aluminum-tubular', 'steel-tubular', 'wire'],
    },
    {
      id: 'air-conditioning',
      title: 'Air conditioning',
      summary:
        'Heating for indoor and outdoor units, including drain and base-pan areas and constant-temperature modules.',
      needs: ['Installation space', 'Target temperature', 'Voltage', 'Mounting holes or bracket'],
      families: ['ptc', 'steel-tubular', 'foil'],
    },
    {
      id: 'bathroom',
      title: 'Bathroom & sanitary',
      summary:
        'Low-profile heating for panels and surfaces where thin construction and clean lead exits are needed.',
      needs: ['Surface size and shape', 'Voltage', 'Power density', 'Adhesive or mechanical mounting'],
      families: ['foil', 'wire', 'ptc'],
    },
    {
      id: 'equipment',
      title: 'Equipment heating',
      summary:
        'Custom heaters for enclosures, tooling and small equipment, from flat mica plates to flexible heating wire.',
      needs: ['Part drawing', 'Operating temperature', 'Wattage', 'Lead configuration'],
      families: ['mica', 'wire', 'ptc'],
    },
  ],
}

export interface ParameterItem {
  label: string
  detail: string
}

export const rfqParameters: Localized<ParameterItem[]> = {
  en: [
    { label: 'Voltage', detail: 'Supply voltage, for example 12, 24, 220 or 230 V' },
    { label: 'Power', detail: 'Total wattage, or W/m for heating wire' },
    { label: 'Size & shape', detail: 'Overall dimensions, bend pattern or die-cut outline' },
    { label: 'Material', detail: 'Sheath, foil, mica or encapsulation preference' },
    { label: 'Operating temperature', detail: 'Working range and any maximum surface limit' },
    { label: 'Lead configuration', detail: 'Wire type, length, termination or connector' },
    { label: 'Drawing', detail: 'Drawing, sample photo or cavity layout if available' },
    { label: 'Order volume', detail: 'Expected sample, trial and annual quantities' },
  ],
}

export interface ProcessStep {
  title: string
  detail: string
}

export const processSteps: Localized<ProcessStep[]> = {
  en: [
    { title: 'Requirement', detail: 'Share voltage, power, size, material, temperature, leads and volume.' },
    { title: 'Drawing Review', detail: 'Engineering checks your drawing against the supplied product families.' },
    { title: 'Sampling', detail: 'A sample build is agreed from the reviewed drawing and parameters.' },
    { title: 'Testing', detail: 'Samples are measured against the agreed electrical and dimensional points.' },
    { title: 'Production', detail: 'Approved specifications move into batch production.' },
  ],
}

export interface FaqGroup {
  title: string
  items: { q: string; a: string }[]
}

export const faqGroups: Localized<FaqGroup[]> = {
  en: [
    {
      title: 'Customization',
      items: [
        {
          q: 'Can you build a heating element to my drawing?',
          a: 'Yes. Send a drawing, a sample photo or the cavity layout together with voltage, power, material, operating temperature and lead details. Engineering reviews it against the six product families and replies with questions or a proposed specification.',
        },
        {
          q: 'Which parameters do you need for a quotation?',
          a: 'Voltage, power, size and shape, material, operating temperature, lead configuration, drawing and expected order volume. Missing items can be clarified during drawing review.',
        },
      ],
    },
    {
      title: 'MOQ & sampling',
      items: [
        {
          q: 'What is the minimum order quantity?',
          a: 'Minimum order quantity depends on the product family, material and tooling needed. Tell us your trial and annual volume in the RFQ and we confirm the MOQ in our reply.',
        },
        {
          q: 'Can I request samples?',
          a: 'Yes. Samples are arranged after drawing review, once the specification is clear. Use Request a Sample to start.',
        },
      ],
    },
    {
      title: 'Lead time',
      items: [
        {
          q: 'How long does production take?',
          a: 'Lead time depends on design complexity, materials and order volume. We give a schedule after drawing review, not before.',
        },
      ],
    },
    {
      title: 'Quality & testing',
      items: [
        {
          q: 'How are heating elements tested?',
          a: 'Our test area uses multi-channel power parameter meters to read voltage, current and power on elements under load. The test points for your project are agreed during drawing review.',
        },
        {
          q: 'Can I see certificates?',
          a: 'Certificate scans are being prepared for publication on the Certificates page. Contact us to discuss the documents your supplier review requires.',
        },
      ],
    },
  ],
}
