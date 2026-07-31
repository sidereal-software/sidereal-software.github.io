const institutions = [
  'NSF NOIRLab',
  'Gemini Observatory',
  'Caltech / IPAC',
  'NASA SPHEREx',
  'Steward Observatory',
]

export function TrustStrip() {
  return (
    <section aria-label="Institutions" className="bg-card/40 border-y">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-muted-foreground font-mono text-xs tracking-widest uppercase">
          Experience across
        </p>
        <p className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-medium">
          {institutions.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </p>
      </div>
    </section>
  )
}
