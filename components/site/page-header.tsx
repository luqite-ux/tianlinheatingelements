import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  eyebrow: string
  title: string
  lede?: string
  crumbs?: Crumb[]
  children?: React.ReactNode
}

export function PageHeader({ eyebrow, title, lede, crumbs, children }: PageHeaderProps) {
  return (
    <section className="tech-grid border-b border-line bg-paper">
      <div className="wrap py-12 sm:py-16 lg:py-20">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="animate-rise mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight aria-hidden="true" className="size-3.5" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-electric hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-medium text-navy-deep">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <p className="eyebrow animate-rise flex items-center gap-3 text-electric">
          <span aria-hidden="true" className="h-px w-8 bg-navy/30" />
          {eyebrow}
        </p>
        <h1
          style={{ '--rise-delay': '70ms' } as React.CSSProperties}
          className="animate-rise mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] text-navy-deep sm:text-5xl"
        >
          {title}
        </h1>
        {lede && (
          <p
            style={{ '--rise-delay': '140ms' } as React.CSSProperties}
            className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {lede}
          </p>
        )}
        {children && (
          <div style={{ '--rise-delay': '210ms' } as React.CSSProperties} className="animate-rise mt-8">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
