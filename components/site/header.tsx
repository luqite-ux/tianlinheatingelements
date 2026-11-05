'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { company, navItems } from '@/lib/site'
import { pick } from '@/lib/locale'
import { cn } from '@/lib/utils'

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const items = pick(navItems)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="hidden bg-navy-deep text-xs text-white/80 lg:block">
        <div className="wrap flex min-h-9 items-center justify-between">
          <p className="eyebrow !tracking-[0.12em]">Custom heating elements · OEM / ODM</p>
          <div className="flex items-center gap-6">
            <a href={company.phoneHref} className="inline-flex items-center gap-2 hover:text-white">
              <Phone aria-hidden="true" className="size-3.5" />
              {company.phone}
            </a>
            <a href={company.emailHref} className="inline-flex items-center gap-2 hover:text-white">
              <Mail aria-hidden="true" className="size-3.5" />
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="wrap flex min-h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Anhui Tianlin Electric Appliance, home" className="flex min-h-11 shrink-0 items-center">
          <Image
            src="/images/logo.png"
            alt="TL Anhui Tianlin Electric Appliance Co., Ltd."
            width={442}
            height={80}
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center">
            {items.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex min-h-11 items-center px-3 text-[15px] font-medium transition-colors hover:text-electric',
                      active ? 'text-navy-deep' : 'text-navy/75',
                      'after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-electric after:transition-transform hover:after:scale-x-100 motion-reduce:after:transition-none',
                      active && 'after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center rounded-sm bg-electric px-5 text-sm font-semibold text-white transition-colors hover:bg-[#1450b8] sm:inline-flex"
          >
            Send RFQ
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-11 items-center justify-center rounded-sm border border-line text-navy-deep hover:bg-paper xl:hidden"
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white xl:hidden"
      >
        <nav aria-label="Mobile primary" className="wrap py-3">
          <ul className="divide-y divide-line">
            {items.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center justify-between text-base font-medium',
                      active ? 'text-electric' : 'text-navy-deep',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Link href="/contact" className="flex min-h-12 items-center text-base font-semibold text-electric">
                Contact / RFQ
              </Link>
            </li>
          </ul>
          <div className="mt-3 flex flex-col gap-1 border-t border-line pt-3 text-sm text-muted-foreground">
            <a href={company.phoneHref} className="inline-flex min-h-11 items-center gap-2">
              <Phone aria-hidden="true" className="size-4" />
              {company.phone}
            </a>
            <a href={company.emailHref} className="inline-flex min-h-11 items-center gap-2 break-all">
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              {company.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
