'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Reveal } from '@/components/motion/reveal'

const images = [
  ...Array.from({ length: 16 }, (_, index) => ({
    src: `/images/factory/${index + 1}.jpg`,
    width: [2, 4, 6, 9, 12, 13, 14, 16].includes(index + 1) ? 1344 : 1792,
    height: [2, 4, 6, 9, 12, 13, 14, 16].includes(index + 1) ? 1792 : 1344,
    alt: `Anhui Tianlin factory and production area ${index + 1}`,
  })),
  { src: '/images/factory/ptc-workshop-1.jpg', width: 1080, height: 1920, alt: 'PTC heating element production workshop' },
  { src: '/images/factory/tubular-workshop-1.jpg', width: 1080, height: 1920, alt: 'Tubular heating element production workshop' },
]

export function FactoryMasonryGallery() {
  const [active, setActive] = useState<number | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const previousTrigger = useRef<HTMLButtonElement | null>(null)
  const scrollPosition = useRef(0)
  const dialog = useRef<HTMLDivElement | null>(null)
  const activeRef = useRef<number | null>(null)
  const isOpen = active !== null

  const close = useCallback(() => setActive(null), [])
  const show = useCallback((index: number) => {
    setLoadFailed(false)
    setActive((index + images.length) % images.length)
  }, [])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (active === null) return
    scrollPosition.current = window.scrollY
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const previous = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      paddingRight: document.body.style.paddingRight,
    }
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPosition.current}px`
    document.body.style.width = '100%'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft' && activeRef.current !== null) show(activeRef.current - 1)
      if (event.key === 'ArrowRight' && activeRef.current !== null) show(activeRef.current + 1)
      if (event.key === 'Tab' && dialog.current) {
        const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>('button:not([disabled])'))
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
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
      document.body.style.paddingRight = previous.paddingRight
      window.scrollTo({ top: scrollPosition.current, behavior: 'auto' })
      requestAnimationFrame(() => previousTrigger.current?.focus({ preventScroll: true }))
    }
  }, [isOpen, close, show])

  return (
    <>
      <div className="mt-7 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4" aria-label="Factory and production gallery">
        {images.map((image, index) => (
          <Reveal key={image.src} delay={(index % 4) * 70} className="mb-4 break-inside-avoid">
            <figure className="group relative overflow-hidden bg-navy-deep">
              <button
                type="button"
                aria-label={`View factory image ${index + 1} of ${images.length}`}
                onClick={(event) => {
                  previousTrigger.current = event.currentTarget
                  show(index)
                }}
                className="relative block w-full cursor-zoom-in overflow-hidden text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-electric"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 31vw, (min-width: 640px) 47vw, 94vw"
                  className="h-auto w-full transition duration-500 ease-out group-hover:scale-[1.025] group-hover:opacity-90 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute bottom-3 right-3 inline-flex size-10 translate-y-2 items-center justify-center bg-white/95 text-navy-deep opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none">
                  <Expand aria-hidden="true" className="size-4" />
                </span>
              </button>
            </figure>
          </Reveal>
        ))}
      </div>

      {active !== null ? (
        <div ref={dialog} role="dialog" aria-modal="true" aria-label={`Factory image ${active + 1} of ${images.length}`} className="fixed inset-0 z-[110] grid place-items-center bg-navy-deep/90 p-3 sm:p-6">
          <button type="button" aria-label="Close enlarged factory image" onClick={close} className="absolute inset-0 cursor-default" />
          <div className="relative z-10 flex h-full max-h-[92vh] w-full max-w-6xl items-center justify-center">
            <div className="relative flex max-h-full max-w-full flex-col items-center">
              {loadFailed ? (
                <div className="grid min-h-64 w-[min(90vw,720px)] place-items-center border border-white/20 bg-white p-8 text-center text-navy-deep">
                  This image could not be displayed. Use the close button and select it again.
                </div>
              ) : (
                <Image
                  src={images[active].src}
                  alt={images[active].alt}
                  width={images[active].width}
                  height={images[active].height}
                  priority
                  onError={() => setLoadFailed(true)}
                  className="max-h-[82vh] max-w-[88vw] object-contain"
                />
              )}
              <p className="mt-3 bg-navy-deep/80 px-3 py-1 font-mono text-xs text-white">{active + 1} / {images.length}</p>
            </div>
            <button type="button" aria-label="Previous image" onClick={() => show(active - 1)} className="absolute left-0 inline-flex size-11 items-center justify-center bg-white text-navy-deep shadow-lg hover:bg-electric hover:text-white sm:left-2">
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" aria-label="Next image" onClick={() => show(active + 1)} className="absolute right-0 inline-flex size-11 items-center justify-center bg-white text-navy-deep shadow-lg hover:bg-electric hover:text-white sm:right-2">
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
            <button data-close type="button" aria-label="Close enlarged factory image" onClick={close} className="absolute right-0 top-0 inline-flex size-11 items-center justify-center bg-white text-navy-deep shadow-lg hover:bg-electric hover:text-white sm:right-2 sm:top-2">
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
