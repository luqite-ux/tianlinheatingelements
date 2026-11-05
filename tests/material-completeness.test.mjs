import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFileSync, readdirSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const sha256 = (path) => createHash('sha256').update(readFileSync(new URL(`../${path}`, import.meta.url))).digest('hex')

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

test('case cards use the three supplied full-resolution engineering drawings', () => {
  assert.deepEqual(
    [1, 2, 3].map((index) => sha256(`public/images/cases/ptc-drawing-${index}.png`)),
    [
      'f71601d903c5a92d9d8d56701149895a977ebbef99b370155183b77d1fe505f8',
      '8b32d2931fd46a81a0fa0ca24b48243b3f2094d65078e4c58bd28cf210b9272a',
      '370ec0eac800092577af43c679dad3c2acfbb02c7650891352c5184b9d4ea6ce',
    ],
  )
})

test('case drawings open from thumbnails in an accessible full-size viewer', () => {
  const evidence = read('lib/evidence.ts')
  const list = read('app/cases/page.tsx')
  const detail = read('app/cases/[slug]/page.tsx')
  const viewer = read('components/cases/case-drawing-viewer.tsx')

  assert.match(evidence, /ptc-drawing-1-preview\.jpg/)
  assert.match(evidence, /ptc-drawing-2-preview\.jpg/)
  assert.match(evidence, /ptc-drawing-3-preview\.jpg/)
  assert.match(list, /CaseDrawingViewer/)
  assert.match(detail, /CaseDrawingViewer/)
  assert.match(viewer, /previewSrc/)
  assert.match(viewer, /unoptimized/)
  assert.match(viewer, /Open original drawing/)
  assert.match(viewer, /cursor-zoom-in/)
  assert.match(viewer, /role="dialog"/)
  assert.match(viewer, /aria-modal="true"/)
  assert.match(viewer, /event\.key === 'Escape'/)
  assert.match(viewer, /previousTrigger\.current\?\.focus/)
  assert.match(viewer, /max-h-\[90vh\]/)
})

test('all supplied partner logos remain in the continuous client loop', () => {
  const logoFiles = readdirSync(new URL('../public/images/clients', import.meta.url)).filter((name) => /^client-\d{2}\./.test(name))
  assert.equal(logoFiles.length, 11)
  assert.match(read('components/clients/logo-loop.tsx'), /Partner logos, scrolling left/)
})
