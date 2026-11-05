import type { MetadataRoute } from 'next'
import { company } from '@/lib/site'
import { getProducts } from '@/lib/products'
import { fetchProductsData } from '@/lib/products-db'
import { getPublishedArticles } from '@/lib/articles-db'

const staticRoutes = [
  '',
  '/products',
  '/applications',
  '/manufacturing',
  '/quality',
  '/certificates',
  '/cases',
  '/about',
  '/news',
  '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${company.domain}`
  const [products, articles] = await Promise.all([fetchProductsData(), getPublishedArticles()])
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}` })),
    ...products.map((product) => ({ url: `${base}/products/${product.slug}` })),
    ...articles.map((article) => ({ url: `${base}/news/${article.slug}` })),
  ]
}
