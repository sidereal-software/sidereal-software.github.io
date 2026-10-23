import type { CreditedImage } from '@/content/images'
import { cn } from '@/lib/utils'

export function ImageCredit({
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
      <span aria-hidden> · </span>
      {image.credit}
      <span aria-hidden> · </span>
      <a
        href={image.licenseUrl}
        target="_blank"
        rel="noreferrer"
        className="decoration-border hover:text-foreground hover:decoration-primary underline underline-offset-4 transition-colors">
        {image.license}
      </a>
    </figcaption>
  )
}
