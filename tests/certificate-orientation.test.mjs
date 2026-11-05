import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const read = file => readFile(new URL(`../${file}`, import.meta.url), 'utf8')

test('only the two upside-down CCC scans are rotated for display', async () => {
  const evidence = await read('lib/evidence.ts')
  const rail = await read('components/certificates/certificate-rail.tsx')

  assert.match(evidence, /id: 'ccc-1'[^\n]+rotation: 180/)
  assert.match(evidence, /id: 'ccc-2'[^\n]+rotation: 180/)
  assert.equal((evidence.match(/rotation: 180/g) ?? []).length, 2)
  assert.match(rail, /item\.rotation === 180 \? 'rotate-180' : undefined/)
})
