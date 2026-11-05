import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('certificate rail advances from a timer and does not pause merely because the pointer is over it', async () => {
  const rail = await read('components/certificates/certificate-rail.tsx')

  assert.match(rail, /setTimeout\(\(\) => scrollToIndex\(active \+ 1\), SEGMENT_DURATION\)/)
  assert.doesNotMatch(rail, /onMouseEnter|onMouseLeave|hovering/)
})
