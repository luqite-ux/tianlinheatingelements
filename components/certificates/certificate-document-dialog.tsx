'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Download, X } from 'lucide-react'
import type { CertificateItem } from '@/lib/evidence'
import { cn } from '@/lib/utils'

export function CertificateDocumentDialog({ item, onClose }: { item: CertificateItem; onClose: () => void }) {
  const pages = item.pages?.length ? item.pages : [item.image]

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-navy-deep/85 p-3 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="certificate-dialog-title">
      <button type="button" aria-label="Close certificate document" onClick={onClose} className="absolute inset-0 cursor-default" />
      <section className="relative z-10 flex max-h-full w-full max-w-5xl flex-col border border-white/20 bg-paper shadow-2xl">
        <header className="flex items-center gap-4 border-b border-line bg-white px-4 py-3 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-copper-ink">{item.type}</p>
            <h2 id="certificate-dialog-title" className="truncate text-base font-semibold text-navy-deep sm:text-lg">{item.title}</h2>
            <p className="text-xs text-muted-foreground">{pages.length} {pages.length === 1 ? 'page' : 'pages'}</p>
          </div>
          {item.documentUrl ? (
            <a href={item.documentUrl} download className="inline-flex min-h-11 items-center gap-2 border border-line px-3 text-sm font-semibold text-navy-deep hover:border-electric hover:text-electric">
              <Download aria-hidden="true" className="size-4" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>
          ) : null}
          <button type="button" aria-label="Close certificate document" onClick={onClose} className="inline-flex size-11 items-center justify-center border border-line bg-white text-navy-deep hover:border-electric hover:text-electric">
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>
        <div className="overflow-y-auto bg-navy/5 p-3 sm:p-6">
          <ol className="mx-auto grid max-w-3xl gap-6">
            {pages.map((page, index) => (
              <li key={page} className="bg-white p-2 shadow-sm">
                <p className="mb-2 font-mono text-xs text-muted-foreground">Page {index + 1} of {pages.length}</p>
                <div className="relative aspect-[3/4] w-full">
                  <Image src={page} alt={`${item.title}, page ${index + 1} of ${pages.length}`} fill sizes="(min-width: 768px) 720px, 94vw" className={cn('object-contain', item.rotation === 180 ? 'rotate-180' : undefined)} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}
