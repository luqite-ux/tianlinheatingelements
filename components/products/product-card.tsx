import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { categoryLabels, type Product } from '@/lib/products'
import { pick } from '@/lib/locale'
import { ProductStage } from '@/components/site/product-stage'

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const labels = pick(categoryLabels)
  return (
    <article className="group relative flex flex-col border border-line bg-white transition-colors hover:border-electric focus-within:border-electric">
      <div className="overflow-hidden border-b border-line">
        <ProductStage
          src={product.image}
          alt={product.imageAlt}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          priority={priority}
          className="transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-copper-ink">
          <span>{product.model}</span>
          <span className="text-muted-foreground">{labels[product.category]}</span>
        </p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-navy-deep">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.summary}</p>
        <dl className="mt-5 grid grid-cols-2 gap-px border border-line bg-line text-sm">
          <div className="bg-paper p-3">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Voltage</dt>
            <dd className="mt-1 font-medium text-navy-deep">{product.voltage}</dd>
          </div>
          <div className="bg-paper p-3">
            <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Power</dt>
            <dd className="mt-1 font-medium text-navy-deep">{product.power}</dd>
          </div>
        </dl>
        <span className="mt-5 inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-electric">
          View specification
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </div>
    </article>
  )
}
