'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSlide {
  src: string
  alt: string
  eyebrow: string
  title: string
  body: string
  copySide: 'left' | 'right'
  posDesktop: string
  posMobile: string
  primary: { href: string; label: string }
  secondary: { href: string; label: string }
}

const slides: HeroSlide[] = [
  {
    src: '/images/banner/banner-1.jpg',
    alt: 'Tianlin factory buildings at dusk, with tubular, PTC and wire heating elements shown in front of the facility',
    eyebrow: 'OEM / ODM heating elements',
    title: 'Custom heating elements, built to your drawing.',
    body: 'Aluminum foil, tubular, silicone PTC, mica and heating wire, specified by voltage, power, size, material, temperature and leads.',
    copySide: 'left',
    posDesktop: '50% 50%',
    posMobile: '70% 50%',
    primary: { href: '/products', label: 'View Products' },
    secondary: { href: '/contact', label: 'Send RFQ' },
  },
  {
    src: '/images/banner/banner-2.jpg',
    alt: 'Two robotic arms working over a conveyor carrying tubular and PTC heating elements in a clean production hall',
    eyebrow: 'Made in Ningguo, Anhui',
    title: 'Production and assembly under one roof.',
    body: 'Founded in 2019, with approximately 120 employees and an approximately 15,000 m² facility.',
    copySide: 'right',
    posDesktop: '50% 50%',
    posMobile: '12% 50%',
    primary: { href: '/manufacturing', label: 'View Manufacturing' },
    secondary: { href: '/contact', label: 'Send RFQ' },
  },
  {
    src: '/images/banner/banner-3.jpg',
    alt: 'Exploded view of foil, tubular and silicone PTC heating elements arranged on a glass laboratory bench',
    eyebrow: 'Quality & Testing',
    title: 'From drawing review to sample and batch.',
    body: 'Share your requirement, we review the drawing, build a sample and test it against the agreed points.',
    copySide: 'left',
    posDesktop: '50% 50%',
    posMobile: '92% 50%',
    primary: { href: '/quality', label: 'Quality & Testing' },
    secondary: { href: '/contact?intent=sample', label: 'Request a Sample' },
  },
]

const SLIDE_DURATION = 7000

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [focusing, setFocusing] = useState(false)

  const paused = !playing || hovering || focusing
  const go = (next: number) => setIndex((next + slides.length) % slides.length)

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured capabilities"
      className="relative bg-[#d9e8fb]"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={(e) => {
        if ((e.target as HTMLElement).matches(':focus-visible')) setFocusing(true)
      }}
      onBlurCapture={() => setFocusing(false)}
    >
      <h1 className="sr-only">Custom heating elements for appliance OEM/ODM and industrial buyers</h1>

      <div className="grid" aria-live={paused ? 'polite' : 'off'}>
        {slides.map((slide, i) => {
          const active = i === index
          return (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={!active}
              data-active={active}
              className="hero-slide relative w-full [grid-area:1/1] md:aspect-[16/7] md:max-h-[740px] md:min-h-[540px]"
            >
              <div className="relative aspect-[4/3] w-full md:absolute md:inset-0 md:aspect-auto">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  quality={82}
                  sizes="100vw"
                  className="hero-img object-cover"
                  style={{ '--pos-m': slide.posMobile, '--pos-d': slide.posDesktop } as CSSProperties}
                />
              </div>

              <div
                className={cn(
                  'relative bg-gradient-to-b from-[#d9e8fb] to-white px-5 pb-24 pt-7 sm:px-8 md:absolute md:inset-0 md:flex md:items-center md:bg-none md:p-0',
                )}
              >
                <div className="wrap md:flex md:h-full md:items-center md:pb-10">
                  <div
                    className={cn(
                      'hero-copy max-w-xl md:max-w-[34rem] md:bg-white/70 md:p-8 md:backdrop-blur-[2px]',
                      slide.copySide === 'right' && 'md:ml-auto',
                    )}
                  >
                    <p className="eyebrow flex items-center gap-3 text-electric">
                      <span aria-hidden="true" className="h-px w-8 bg-electric" />
                      {slide.eyebrow}
                    </p>
                    <p className="mt-4 text-[1.75rem] font-semibold leading-[1.1] tracking-tight text-navy-deep sm:text-4xl lg:text-[2.75rem]">
                      {slide.title}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-navy-deep/80 sm:text-lg">{slide.body}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={slide.primary.href}
                        tabIndex={active ? 0 : -1}
                        className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-navy px-5 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-navy-deep"
                      >
                        {slide.primary.label}
                        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      </Link>
                      <Link
                        href={slide.secondary.href}
                        tabIndex={active ? 0 : -1}
                        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-navy bg-white/60 px-5 text-sm font-semibold tracking-wide text-navy transition-colors hover:bg-navy hover:text-white"
                      >
                        {slide.secondary.label}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 pb-5 md:pb-6">
        <div className="wrap">
          <div className="pointer-events-auto inline-flex items-center gap-1 rounded-sm border border-line bg-white/95 px-2 shadow-sm">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="inline-flex size-11 items-center justify-center text-navy-deep hover:text-electric"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>

            <div role="group" aria-label="Choose slide" className="flex items-center">
              {slides.map((slide, i) => {
                const state = i < index ? 'done' : i === index ? 'running' : undefined
                return (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to slide ${i + 1}: ${slide.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="group flex h-11 w-12 items-center sm:w-14"
                  >
                    <span className="relative block h-[3px] w-full overflow-hidden bg-navy/20 group-hover:bg-navy/35">
                      <span
                        data-state={state}
                        data-paused={paused}
                        style={{ '--seg-duration': `${SLIDE_DURATION}ms` } as CSSProperties}
                        onAnimationEnd={(e) => {
                          if (e.animationName === 'seg-fill' && i === index) go(index + 1)
                        }}
                        className="seg-fill absolute inset-0 block bg-electric"
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="inline-flex size-11 items-center justify-center text-navy-deep hover:text-electric"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>

            <span aria-hidden="true" className="mx-1 h-5 w-px bg-line" />

            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-pressed={!playing}
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              className="inline-flex size-11 items-center justify-center text-navy-deep hover:text-electric"
            >
              {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
