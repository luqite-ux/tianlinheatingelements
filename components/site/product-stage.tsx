import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ProductStageProps {
  src: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
  fit?: 'contain' | 'cover'
}

export function ProductStage({ src, alt, sizes, priority, className, fit = 'contain' }: ProductStageProps) {
  return (
    <div className={cn('relative aspect-square w-full bg-white', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === 'cover' ? 'object-cover object-center' : 'object-contain'}
      />
    </div>
  )
}
