import { type Localized } from './locale'

export interface CertificateItem {
  id: string
  type: string
  title: string
  image: string
  alt: string
}

/**
 * Add one entry per supplied certificate scan (portrait image in /public/images/certificates).
 * The certificate rail renders each entry as an independent, fully visible portrait item.
 */
export const certificates: Localized<CertificateItem[]> = {
  en: [
    { id: 'iso-9001-cn', type: 'Management system', title: 'ISO 9001 Certificate — Chinese', image: '/images/certificates/iso-9001-cn.png', alt: 'ISO 9001 quality management system certificate in Chinese' },
    { id: 'iso-9001-en', type: 'Management system', title: 'ISO 9001 Certificate — English', image: '/images/certificates/iso-9001-en.png', alt: 'ISO 9001 certificate of registration in English' },
    { id: 'ccc-1', type: 'Product certification', title: 'CCC Certificate — Product Group 1', image: '/images/certificates/ccc-1.jpg', alt: 'China Compulsory Certification certificate supplied by Tianlin' },
    { id: 'ccc-2', type: 'Product certification', title: 'CCC Certificate — Product Group 2', image: '/images/certificates/ccc-2.jpg', alt: 'Second China Compulsory Certification certificate supplied by Tianlin' },
    { id: 'ce', type: 'Product certification', title: 'CE Certificate', image: '/images/certificates/ce.jpg', alt: 'CE certificate supplied for Tianlin products' },
    { id: 'explosion-proof', type: 'Product certification', title: 'Explosion-Proof Certificate', image: '/images/certificates/explosion-proof.png', alt: 'Explosion-proof conformity certificate supplied by Tianlin' },
    { id: 'type-approval', type: 'Test evidence', title: 'Product Type Approval Report', image: '/images/certificates/type-approval.png', alt: 'Cover page of the supplied product type approval report' },
  ],
}

export interface ClientLogo {
  id: string
  name: string
  image: string
  width: number
  height: number
}

/**
 * Add only logos supplied by the client (files in /public/images/clients).
 * The logo loop and the static fallback both read from this list.
 */
export const clientLogos: Localized<ClientLogo[]> = {
  en: [
    ['homa','Homa','jpg'],['hisense','Hisense','png'],['fresTech','FRESTECH / Xinfei','png'],['simake','Simake','png'],['soyea','Soyeа','png'],['only','ONLY','png'],['midi','Midi','png'],['pce','PCE Phase Change Technology','png'],['jiucheng','Qingdao Jiucheng','png'],['yuanye','Yuanye Intelligent','png'],['zungui','Zungui Electric','png'],
  ].map(([id,name,ext], index) => ({ id, name, image: `/images/clients/client-${String(index + 1).padStart(2, '0')}.${ext}`, width: 220, height: 96 })),
}

export interface NewsArticle {
  slug: string
  title: string
  date: string
  summary: string
  body: string[]
}

export const newsArticles: Localized<NewsArticle[]> = {
  en: [],
}

export interface CaseReview {
  slug: string
  title: string
  application: string
  summary: string
  requirement: string[]
  reviewNotes: string[]
  parameters: { label: string; value: string }[]
  image?: { src: string; alt: string }
}

export const caseReviews: Localized<CaseReview[]> = {
  en: [
    {
      slug: '2kw-ptc-air-conditioner-heater-review', title: '2 kW PTC Air-Conditioner Heater Drawing Review', application: 'Air conditioning',
      summary: 'A supplied production drawing records a 220 V / 50 Hz, 2 kW ceramic PTC heating assembly for an air-conditioning unit.',
      requirement: ['Match the supplied installation envelope', 'Keep lead and terminal positions consistent with the drawing', 'Confirm rated electrical values against the approved drawing'],
      reviewNotes: ['This page describes the supplied drawing, not a universal PTC specification.', 'Final dimensions and tolerances are confirmed for each order.'],
      parameters: [{label:'Rated voltage',value:'220 V / 50 Hz'},{label:'Rated power',value:'2 kW drawing reference'},{label:'Product family',value:'Silicone-encapsulated ceramic PTC heater'}],
      image: {src:'/images/cases/ptc-drawing-1.png',alt:'Supplied 2 kW ceramic PTC heater technical drawing'}
    },
    {
      slug: 'kfrd-72-ptc-assembly-model-review', title: 'KFRD-72 PTC Assembly Model Review', application: 'HVAC integration',
      summary: 'A second supplied model drawing records the mechanical arrangement used to review heater placement, mounting and lead routing.',
      requirement: ['Review mounting geometry', 'Check the assembly envelope', 'Confirm lead routing before sampling'],
      reviewNotes: ['Model references are retained as drawing evidence only.', 'No customer appliance identity is used as a public performance claim.'],
      parameters: [{label:'Review input',value:'Customer-supplied model drawing'},{label:'Engineering focus',value:'Envelope, mounting and leads'},{label:'Product family',value:'Ceramic PTC assembly'}],
      image: {src:'/images/cases/ptc-drawing-2.png',alt:'Supplied PTC heater assembly model drawing'}
    },
    {
      slug: 'kfrd-120-ptc-heater-review', title: 'KFRD-120 PTC Heater Drawing Review', application: 'Commercial air conditioning',
      summary: 'The supplied KFRD-120 drawing provides a documented example of a larger PTC heater assembly reviewed against installation constraints.',
      requirement: ['Confirm the installation envelope', 'Review electrical and dimensional callouts', 'Prepare the sample from the approved revision'],
      reviewNotes: ['Values shown belong to this drawing reference.', 'They are not applied to other PTC products without review.'],
      parameters: [{label:'Drawing reference',value:'9023001625'},{label:'Review stage',value:'Drawing-led configuration'},{label:'Product family',value:'Ceramic PTC assembly'}],
      image: {src:'/images/cases/ptc-drawing-3.png',alt:'Supplied KFRD-120 ceramic PTC heater drawing'}
    },
  ],
}
