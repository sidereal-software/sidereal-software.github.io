interface SectionHeadingProps {
  title: string
  description?: string
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <h2 className="font-serif text-3xl font-bold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 text-lg text-balance">{description}</p>
      )}
    </div>
  )
}
