'use client'

import { useState, type CSSProperties } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import type { ClientLogo } from '@/lib/evidence'

function LogoItem({ logo }: { logo: ClientLogo }) {
  return (
    <Image
      src={logo.image}
      alt={`${logo.name} logo`}
      width={logo.width}
      height={logo.height}
      className="h-10 w-auto max-w-[160px] object-contain"
    />
  )
}

export function LogoLoop({ logos }: { logos: ClientLogo[] }) {
  const [playing, setPlaying] = useState(true)
  const [hovering, setHovering] = useState(false)
  const [focusing, setFocusing] = useState(false)
  const paused = !playing || hovering || focusing
  const duration = Math.max(24, logos.length * 6)

  return (
    <div>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-6 md:motion-safe:hidden">
        {logos.map((logo) => (
          <li key={logo.id} className="flex min-h-11 items-center">
            <LogoItem logo={logo} />
          </li>
        ))}
      </ul>

      <div
        className="hidden md:motion-safe:block"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onFocusCapture={() => setFocusing(true)}
        onBlurCapture={() => setFocusing(false)}
      >
        <div
          className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
          role="group"
          aria-label="Partner logos, scrolling left"
        >
          <div
            className="loop-track"
            data-paused={paused}
            style={{ '--loop-duration': `${duration}s` } as CSSProperties}
          >
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center gap-16 pr-16">
                {logos.map((logo) => (
                  <li key={logo.id} className="flex h-16 items-center">
                    <LogoItem logo={logo} />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-pressed={!playing}
          onClick={() => setPlaying((v) => !v)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 border border-line bg-white px-4 text-sm font-medium text-navy-deep hover:border-electric hover:text-electric"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? 'Pause logo loop' : 'Play logo loop'}
        </button>
      </div>
    </div>
  )
}
