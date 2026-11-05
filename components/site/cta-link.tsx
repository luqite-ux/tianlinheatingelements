import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'electric' | 'outline' | 'outline-dark' | 'light'

const variants: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-deep',
  electric: 'bg-electric text-white hover:bg-[#1450b8]',
  outline: 'border border-navy/40 text-navy hover:border-navy hover:bg-navy hover:text-white',
  'outline-dark': 'border border-white/40 text-white hover:border-white hover:bg-white hover:text-navy-deep',
  light: 'bg-white text-navy-deep hover:bg-electric-soft',
}

interface CtaLinkProps {
  href: string
  children: React.ReactNode
  variant?: Variant
  className?: string
  arrow?: boolean
}

export function CtaLink({ href, children, variant = 'primary', className, arrow = true }: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold tracking-wide transition-colors',
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      )}
    </Link>
  )
}
