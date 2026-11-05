import type { MetadataRoute } from 'next'
import { company } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  const base = `https://${company.domain}`
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/api', '/service-expired'] },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
