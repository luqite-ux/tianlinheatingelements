import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion/reveal'

interface SectionHeadingProps {
  index?: string
  eyebrow: string
  title: string
  lede?: string
  tone?: 'light' | 'dark'
  id?: string
  className?: string
  children?: React.ReactNode
}

export function SectionHeading({ index, eyebrow, title, lede, tone = 'light', id, className, children }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <Reveal className={cn('flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p className={cn('eyebrow flex items-center gap-3', dark ? 'text-[#8fb6ff]' : 'text-electric')}>
          {index && <span className={cn('font-semibold', dark ? 'text-copper' : 'text-copper-ink')}>{index}</span>}
          <span aria-hidden="true" className={cn('h-px w-8', dark ? 'bg-white/40' : 'bg-navy/30')} />
          <span>{eyebrow}</span>
        </p>
        <h2
          id={id}
          className={cn('mt-4 text-3xl font-semibold leading-tight sm:text-4xl', dark ? 'text-white' : 'text-navy-deep')}
        >
          {title}
        </h2>
        {lede && (
          <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-white/75' : 'text-muted-foreground')}>
            {lede}
          </p>
        )}
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  )
}
