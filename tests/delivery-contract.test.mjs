import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('inquiry submission consumes scoped CAPTCHA before database insert', async () => {
  const action = await read('app/contact/actions.ts')
  assert.match(action, /verifyCaptchaSubmission/)
  assert.match(action, /captchaScope/)
  assert.ok(action.indexOf('verifyCaptchaSubmission') < action.indexOf("from('inquiries').insert"))
})

test('contact form uses the server action and never falls back to mailto submission', async () => {
  const form = await read('components/contact/rfq-form.tsx')
  assert.match(form, /submitInquiry/)
  assert.doesNotMatch(form, /window\.location|mailto:/)
})

test('public products and articles are read through server data modules', async () => {
  const products = await read('lib/products-db.ts')
  const articles = await read('lib/articles-db.ts')
  assert.match(products, /from\('products'\)/)
  assert.match(articles, /from\('articles'\)/)
})

test('product galleries and the complete inspection register are exposed on public pages', async () => {
  const productType = await read('lib/products.ts')
  const productMapper = await read('lib/products-db.ts')
  const productPage = await read('app/products/[slug]/page.tsx')
  const qualityPage = await read('app/quality/page.tsx')

  assert.match(productType, /gallery:\s*string\[\]/)
  assert.match(productMapper, /extra_data\?\.images/)
  assert.match(productPage, /product\.gallery\.map/)
  assert.match(qualityPage, /TL001/)
  assert.match(qualityPage, /TL026/)
})

test('technical SEO exposes robots, canonical metadata and page-specific schemas', async () => {
  const layout = await read('app/layout.tsx')
  const robots = await read('app/robots.ts')
  const productPage = await read('app/products/[slug]/page.tsx')
  const articlePage = await read('app/news/[slug]/page.tsx')
  assert.match(layout, /metadataBase/)
  assert.match(layout, /Organization/)
  assert.match(layout, /WebSite/)
  assert.match(robots, /sitemap/)
  assert.match(productPage, /Product/)
  assert.match(articlePage, /Article/)
})
