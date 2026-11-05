'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ExternalLink, Expand, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type CaseDrawingViewerProps = {
  src: string
  previewSrc: string
  alt: string
  title: string
  frameClassName?: string
  sizes: string
}

export function CaseDrawingViewer({ src, previewSrc, alt, title, frameClassName, sizes }: CaseDrawingViewerProps) {
  const [open, setOpen] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const previousTrigger = useRef<HTMLButtonElement | null>(null)
  const dialog = useRef<HTMLDivElement | null>(null)
  const scrollPosition = useRef(0)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    scrollPosition.current = window.scrollY
    const previous = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.current}px`
    document.body.style.width = '100%'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'Tab' && dialog.current) {
        const controls = Array.from(dialog.current.querySelectorAll<HTMLElement>('button:not([disabled])'))
        if (!controls.length) return
        const first = controls[0]
        const last = controls[controls.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>('[data-close]')?.focus())
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.position = previous.position
      document.body.style.top = previous.top
      document.body.style.width = previous.width
      window.scrollTo({ top: scrollPosition.current, behavior: 'auto' })
      requestAnimationFrame(() => previousTrigger.current?.focus({ preventScroll: true }))
    }
  }, [open, close])

  return (
    <>
      <button
        ref={previousTrigger}
        type="button"
        aria-label={`Enlarge ${title}`}
        onClick={() => {
          setLoadFailed(false)
          setOpen(true)
        }}
        className={cn(
          'group/drawing relative z-20 block w-full cursor-zoom-in overflow-hidden bg-paper text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric',
          frameClassName,
        )}
      >
        <Image src={previewSrc} alt={alt} fill sizes={sizes} unoptimized className="object-contain p-4 transition duration-300 group-hover/drawing:scale-[1.015] motion-reduce:transition-none motion-reduce:group-hover/drawing:scale-100" />
        <span className="absolute bottom-3 right-3 inline-flex size-10 translate-y-1 items-center justify-center bg-white/95 text-navy-deep opacity-0 shadow-lg transition group-hover/drawing:translate-y-0 group-hover/drawing:opacity-100 group-focus-visible/drawing:translate-y-0 group-focus-visible/drawing:opacity-100 motion-reduce:transition-none">
          <Expand aria-hidden="true" className="size-4" />
        </span>
      </button>

      {open ? (
        <div ref={dialog} role="dialog" aria-modal="true" aria-label={`${title}, enlarged drawing`} className="fixed inset-0 z-[120] grid place-items-center bg-navy-deep/92 p-3 sm:p-6">
          <button type="button" aria-label="Close enlarged drawing" onClick={close} className="absolute inset-0 cursor-default" />
          <div className="relative z-10 h-[calc(100vh-1.5rem)] max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-[96vw] bg-white shadow-2xl sm:h-[calc(100vh-3rem)] sm:w-[calc(100vw-3rem)]">
            {loadFailed ? (
              <div className="grid h-full place-items-center p-8 text-center text-navy-deep">This drawing could not be displayed.</div>
            ) : (
              <Image src={previewSrc} alt={alt} fill priority unoptimized sizes="96vw" onError={() => setLoadFailed(true)} className="object-contain p-2 sm:p-4" />
            )}
            <a href={src} target="_blank" rel="noreferrer" className="absolute bottom-2 left-2 z-10 inline-flex min-h-11 items-center gap-2 bg-white px-4 text-sm font-semibold text-navy-deep shadow-lg hover:text-electric">
              <ExternalLink aria-hidden="true" className="size-4" />
              Open original drawing
            </a>
            <button data-close type="button" aria-label="Close enlarged drawing" onClick={close} className="absolute right-2 top-2 inline-flex size-11 items-center justify-center bg-navy-deep text-white shadow-lg hover:bg-electric focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
