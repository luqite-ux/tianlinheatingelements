import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const asset = (path) => readFileSync(new URL(`../${path}`, import.meta.url))
const source = (path) => asset(path).toString('utf8')
const sha256 = (path) => createHash('sha256').update(asset(path)).digest('hex')

test('the quality test-bench proof image is not reused as the PTC product cover', () => {
  assert.notEqual(
    sha256('public/images/quality/test-bench.jpg'),
    sha256('public/images/products/ptc-silicone.jpg'),
  )
  assert.equal(
    sha256('public/images/products/ptc-silicone.jpg'),
    sha256('public/images/products/gallery/图片12.jpg'),
  )

  const products = source('lib/products.ts')
  assert.match(products, /Wired finned PTC heater assemblies prepared for installation/)
  assert.doesNotMatch(products, /Bench test setup with multi-channel power meters/)
})
