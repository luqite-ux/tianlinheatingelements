import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('published certificate copy does not claim scans are still being prepared', () => {
  const content = read('lib/content.ts')
  assert.doesNotMatch(content, /Certificate scans are being prepared/i)
  assert.match(content, /View each certificate and report/i)
})

test('the 11-page type approval report is available as one independently viewable document', () => {
  const evidence = read('lib/evidence.ts')
  const rail = read('components/certificates/certificate-rail.tsx')

  assert.match(evidence, /pageCount:\s*11/)
  for (let page = 1; page <= 11; page += 1) {
    assert.match(evidence, new RegExp(`type-approval\/page-${String(page).padStart(2, '0')}\\.png`))
  }
  assert.match(rail, /View document/)
  assert.match(rail, /CertificateDocumentDialog/)
})

test('drawing cases retain supplied electrical and assembly parameters', () => {
  const evidence = read('lib/evidence.ts')
  assert.match(evidence, /2000 W/)
  assert.match(evidence, /-10% to \+5%/)
  assert.match(evidence, /label:'PTC element',value:'245 °C'/)
  assert.match(evidence, /label:'Thermostat',value:'90 °C \/ 8 A'/)
  assert.match(evidence, /label:'Thermal fuse',value:'121 °C'/)
  assert.match(evidence, /Drawing number[^\n]*9023000912/)
  assert.match(evidence, /Drawing number[^\n]*9023001625/)
})

test('all supplied partner logos remain in the continuous client loop', () => {
  const logoFiles = readdirSync(new URL('../public/images/clients', import.meta.url)).filter((name) => /^client-\d{2}\./.test(name))
  assert.equal(logoFiles.length, 11)
  assert.match(read('components/clients/logo-loop.tsx'), /Partner logos, scrolling left/)
})
