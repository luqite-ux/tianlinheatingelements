import Link from 'next/link'
import { MapPin, Mail, Phone } from 'lucide-react'
import { company, footerExtra, navItems } from '@/lib/site'
import { categoryLabels, categoryOrder } from '@/lib/products'
import { pick } from '@/lib/locale'
import { CurrentYear } from './current-year'

export function SiteFooter() {
  const links = [...pick(navItems), ...pick(footerExtra)]
  const labels = pick(categoryLabels)

  return (
    <footer className="tech-grid-dark bg-navy-deep text-white/80">
      <div className="wrap grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="text-xl font-semibold text-white">{company.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            Custom heating elements for appliance OEM/ODM and industrial buyers. Founded in {company.founded}, based in Ningguo, Anhui, China.
          </p>
          <ul className="mt-6 space-y-1 text-sm">
            <li>
              <span className="flex min-h-11 items-start gap-3 py-2">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-copper" />
                <span>{company.address}</span>
              </span>
            </li>
            <li>
              <a href={company.phoneHref} className="flex min-h-11 items-center gap-3 hover:text-white">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-copper" />
                {company.phone}
              </a>
            </li>
            <li>
              <a href={company.emailHref} className="flex min-h-11 items-center gap-3 break-all hover:text-white">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-copper" />
                {company.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow text-white">Site</h2>
          <ul className="mt-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center text-sm hover:text-white hover:underline underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Product families" className="md:col-span-4">
          <h2 className="eyebrow text-white">Product families</h2>
          <ul className="mt-4">
            {categoryOrder.map((c) => (
              <li key={c}>
                <Link
                  href={`/products?category=${c}`}
                  className="inline-flex min-h-11 items-center text-sm hover:text-white hover:underline underline-offset-4"
                >
                  {labels[c]} Heating Element
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> Anhui Tianlin Electric Appliance Co., Ltd. All rights reserved.
          </p>
          <p>{company.domain}</p>
        </div>
      </div>
    </footer>
  )
}
