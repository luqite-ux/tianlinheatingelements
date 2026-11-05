'use client'

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { CertificateItem } from '@/lib/evidence'

const SEGMENT_DURATION = 6000

export function CertificateRail({ items }: { items: CertificateItem[] }) {
  const scroller = useRef<HTMLUListElement | null>(null)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [focusing, setFocusing] = useState(false)
  const paused = !playing || focusing

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scroller.current
      if (!el) return
      const target = el.children[(index + items.length) % items.length] as HTMLElement | undefined
      if (!target) return
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: reduced ? 'auto' : 'smooth' })
    },
    [items.length],
  )

  useEffect(() => {
    if (paused || items.length < 2) return
    const timer = setTimeout(() => scrollToIndex(active + 1), SEGMENT_DURATION)
    return () => clearTimeout(timer)
  }, [active, items.length, paused, scrollToIndex])

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const children = Array.from(el.children) as HTMLElement[]
        let nearest = 0
        let best = Infinity
        children.forEach((child, i) => {
          const distance = Math.abs(child.offsetLeft - el.offsetLeft - el.scrollLeft)
          if (distance < best) {
            best = distance
            nearest = i
          }
        })
        setActive(nearest)
      })
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      onFocusCapture={(e) => {
        if ((e.target as HTMLElement).matches(':focus-visible')) setFocusing(true)
      }}
      onBlurCapture={() => setFocusing(false)}
    >
      <ul
        ref={scroller}
        aria-label="Certificates"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] sm:gap-6"
      >
        {items.map((item, i) => (
          <li key={item.id} className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]">
            <figure className="group">
              <div className="relative aspect-[3/4] w-full border border-line bg-white transition-colors group-hover:border-electric/50">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-2"
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              </div>
              <figcaption className="mt-3">
                <span className="eyebrow block text-copper-ink">{item.type}</span>
                <span className="mt-1 block text-sm font-medium text-navy-deep">{item.title}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-2 motion-reduce:hidden">
        <button
          type="button"
          aria-label="Previous certificate"
          onClick={() => scrollToIndex(active - 1)}
          className="inline-flex size-11 items-center justify-center border border-line bg-white text-navy-deep hover:border-electric hover:text-electric"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <div role="group" aria-label="Choose certificate" className="flex flex-1 items-center">
          {items.map((item, i) => {
            const state = i < active ? 'done' : i === active ? 'running' : undefined
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Show ${item.type}`}
                aria-current={i === active ? 'true' : undefined}
                className="group flex h-11 min-w-8 flex-1 items-center px-0.5"
              >
                <span className="relative block h-[3px] w-full overflow-hidden bg-navy/20 group-hover:bg-navy/35">
                  <span
                    data-state={state}
                    data-paused={paused}
                    style={{ '--seg-duration': `${SEGMENT_DURATION}ms` } as CSSProperties}
                    className="seg-fill absolute inset-0 block bg-electric"
                  />
                </span>
              </button>
            )
          })}
        </div>
        <button
          type="button"
          aria-label="Next certificate"
          onClick={() => scrollToIndex(active + 1)}
          className="inline-flex size-11 items-center justify-center border border-line bg-white text-navy-deep hover:border-electric hover:text-electric"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
        <button
          type="button"
          aria-pressed={!playing}
          aria-label={playing ? 'Pause certificate rail' : 'Play certificate rail'}
          onClick={() => setPlaying((v) => !v)}
          className="inline-flex size-11 items-center justify-center border border-line bg-white text-navy-deep hover:border-electric hover:text-electric"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
        </button>
      </div>
    </div>
  )
}
