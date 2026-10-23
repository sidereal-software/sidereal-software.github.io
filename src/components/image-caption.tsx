import type { CreditedImage } from '@/content/images'
import { cn } from '@/lib/utils'

export function ImageCaption({
  image,
  className,
}: {
  image: CreditedImage
  className?: string
}) {
  return (
    <figcaption className={cn('text-dim text-xs leading-relaxed', className)}>
      <span className="text-muted-foreground">{image.name}</span>
      <span aria-hidden> · </span>
      {image.location}
    </figcaption>
  )
}
