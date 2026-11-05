import { cn } from '@/lib/utils'

interface EvidenceEmptyProps {
  title: string
  body: string
  className?: string
  children?: React.ReactNode
}

export function EvidenceEmpty({ title, body, className, children }: EvidenceEmptyProps) {
  return (
    <div className={cn('border border-dashed border-navy/30 bg-white px-6 py-12 text-center sm:py-16', className)}>
      <div className="mx-auto max-w-lg">
        <p className="text-xl font-semibold text-navy-deep">{title}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{body}</p>
        {children && <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">{children}</div>}
      </div>
    </div>
  )
}
