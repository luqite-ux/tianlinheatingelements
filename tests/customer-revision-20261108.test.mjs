import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('desktop hero slides fill the full carousel width', async () => {
  const hero = await read('components/home/hero-carousel.tsx')

  assert.match(hero, /className="hero-slide relative w-full/)
})

test('desktop hero copy uses a whiter translucent panel', async () => {
  const hero = await read('components/home/hero-carousel.tsx')

  assert.match(hero, /md:bg-white\/70/)
})

test('home manufacturing section uses the supplied workshop photograph', async () => {
  const manufacturing = await read('components/home/manufacturing-band.tsx')

  assert.match(manufacturing, /\/images\/factory\/customer-workshop-overview\.jpg/)
  assert.doesNotMatch(manufacturing, /Illustrative artwork/)
})

test('about company section displays the supplied factory entrance photograph', async () => {
  const about = await read('app/about/page.tsx')

  assert.match(about, /\/images\/factory\/1\.jpg/)
  assert.match(about, /Tianlin factory entrance/)
})
