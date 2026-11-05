import { type Localized } from './locale'

export const company = {
  name: 'Anhui Tianlin Electric Appliance Co., Ltd.',
  shortName: 'Tianlin Electric',
  domain: 'tianlinheatingelements.com',
  founded: 2019,
  employees: 'Approx. 120',
  facility: 'Approx. 15,000 m²',
  address: 'No. 237 Meihong Road, Meilin Town, Ningguo, Anhui, China',
  phone: '+86 138 6696 2695',
  phoneHref: 'tel:+8613866962695',
  email: 'info@tianlinheatingelements.com',
  emailHref: 'mailto:info@tianlinheatingelements.com',
} as const

export interface NavItem {
  href: string
  label: string
}

export const navItems: Localized<NavItem[]> = {
  en: [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/applications', label: 'Applications' },
    { href: '/manufacturing', label: 'Manufacturing' },
    { href: '/quality', label: 'Quality & Testing' },
    { href: '/cases', label: 'Cases' },
    { href: '/about', label: 'About' },
    { href: '/news', label: 'News' },
  ],
}

export const footerExtra: Localized<NavItem[]> = {
  en: [
    { href: '/certificates', label: 'Certificates' },
    { href: '/contact', label: 'Contact / RFQ' },
  ],
}
