import type { Metadata, Viewport } from 'next'
import { Barlow, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SiteHeader } from '@/components/site/header'
import { SiteFooter } from '@/components/site/footer'
import './globals.css'
import { company } from '@/lib/site'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(`https://${company.domain}`),
  title: {
    default: 'Custom Heating Elements for OEM/ODM | Anhui Tianlin Electric Appliance',
    template: '%s | Anhui Tianlin Electric Appliance',
  },
  description:
    'Anhui Tianlin Electric Appliance builds custom aluminum foil, tubular, silicone PTC, mica and silicone wire heating elements for appliance OEM/ODM and industrial buyers. Send your drawing for an RFQ.',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#0a2a5c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const organization = {
    '@context': 'https://schema.org', '@type': 'Organization', '@id': `https://${company.domain}/#organization`,
    name: company.name, url: `https://${company.domain}`, logo: `https://${company.domain}/images/logo.png`,
    email: company.email, telephone: company.phone, address: { '@type': 'PostalAddress', streetAddress: company.address, addressCountry: 'CN' },
  }
  const website = { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `https://${company.domain}/#website`, url: `https://${company.domain}`, name: company.name, publisher: { '@id': `https://${company.domain}/#organization` }, inLanguage: 'en' }
  return (
    <html lang="en" className={`${barlow.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organization, website]).replace(/</g, '\\u003c') }} />
        <a
          href="#main"
          className="sr-only z-[60] bg-white px-4 py-3 text-navy-deep focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
