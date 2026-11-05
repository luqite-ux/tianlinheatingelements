import type { Product, ProductCategory } from './products'
import { getProducts as getFallbackProducts } from './products'
import { getSupabaseClient } from './supabase'

const tenantId = () => process.env.NEXT_PUBLIC_TENANT_ID
const text = (value: unknown, fallback = '') => typeof value === 'string' && value.trim() ? value : fallback
const localized = (row: Record<string, any>, key: string) => text(row[`${key}_i18n`]?.en, text(row[`${key}_en`], text(row[key])))
const list = (value: unknown) => Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []

function mapProduct(row: Record<string, any>): Product {
  const fallback = getFallbackProducts().find(item => item.slug === row.slug) ?? getFallbackProducts()[0]
  const specs = row.specs && typeof row.specs === 'object' && !Array.isArray(row.specs)
    ? Object.entries(row.specs).map(([label, value]) => ({ label, value: String(value) }))
    : fallback.specs
  return {
    ...fallback,
    slug: text(row.slug, fallback.slug), model: text(row.model, fallback.model),
    category: text(row.category_slug, text(row.category, fallback.category)) as ProductCategory,
    name: localized(row, 'name') || fallback.name,
    summary: localized(row, 'description') || fallback.summary,
    description: localized(row, 'overview') || localized(row, 'description') || fallback.description,
    image: text(row.image_url, fallback.image), imageAlt: localized(row, 'name') || fallback.imageAlt,
    gallery: list(row.extra_data?.images).length ? list(row.extra_data?.images) : fallback.gallery,
    voltage: text(row.extra_data?.voltage, specs.find(s => /voltage/i.test(s.label))?.value || fallback.voltage),
    power: text(row.extra_data?.power, specs.find(s => /power/i.test(s.label))?.value || fallback.power),
    material: text(row.extra_data?.material, specs.find(s => /material|construction/i.test(s.label))?.value || fallback.material),
    temperature: text(row.extra_data?.temperature, fallback.temperature), specs,
    options: list(row.features_i18n?.en).length ? list(row.features_i18n.en) : list(row.features).length ? list(row.features) : fallback.options,
    typicalUses: list(row.applications_i18n?.en).length ? list(row.applications_i18n.en) : list(row.applications).length ? list(row.applications) : fallback.typicalUses,
  }
}

export async function fetchProductsData(): Promise<Product[]> {
  const supabase = getSupabaseClient(); const tenant = tenantId()
  if (!supabase || !tenant) return getFallbackProducts()
  const { data, error } = await supabase.from('products').select('*').eq('tenant_id', tenant).eq('is_active', true).order('sort_order')
  if (error || !data?.length) return getFallbackProducts()
  return data.map(mapProduct)
}

export async function fetchProductBySlug(slug: string) {
  const products = await fetchProductsData()
  return products.find(product => product.slug === slug)
}
