import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('manufacturing uses the complete natural-ratio masonry gallery', () => {
  const page = read('app/manufacturing/page.tsx')
  const gallery = read('components/manufacturing/factory-masonry-gallery.tsx')

  assert.match(page, /FactoryMasonryGallery/)
  assert.match(gallery, /columns-1/)
  assert.match(gallery, /sm:columns-2/)
  assert.match(gallery, /lg:columns-3/)
  assert.match(gallery, /xl:columns-4/)
  assert.match(gallery, /break-inside-avoid/)
  assert.match(gallery, /width=\{image\.width\}/)
  assert.match(gallery, /height=\{image\.height\}/)
  assert.doesNotMatch(gallery, /object-cover/)
  assert.match(gallery, /ptc-workshop-1\.jpg/)
  assert.match(gallery, /tubular-workshop-1\.jpg/)
})

test('each factory image reveals independently and opens an accessible position-preserving lightbox', () => {
  const gallery = read('components/manufacturing/factory-masonry-gallery.tsx')

  assert.match(gallery, /<Reveal[^>]*key=\{image\.src\}/)
  assert.match(gallery, /View factory image/)
  assert.match(gallery, /role="dialog"/)
  assert.match(gallery, /aria-modal="true"/)
  assert.match(gallery, /window\.scrollY/)
  assert.match(gallery, /window\.scrollTo/)
  assert.match(gallery, /previousTrigger\.current\?\.focus/)
  assert.match(gallery, /event\.key === 'Escape'/)
  assert.match(gallery, /Previous image/)
  assert.match(gallery, /Next image/)
  assert.match(gallery, /motion-reduce:/)
})
