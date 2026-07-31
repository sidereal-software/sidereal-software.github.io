import { SectionHeading } from '@/components/section-heading'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CaseStudy {
  name: string
  meta: string
  problem: string
  approach: string
  outcome: string
}

const caseStudies: CaseStudy[] = [
  {
    name: 'GOATS',
    meta: 'Principal Engineer & Architect · NSF NOIRLab / Gemini Observatory',
    problem:
      'Time-domain astronomers juggled separate tools for alerts, triggering, data retrieval, and reduction. When following up a transient event, every lost hour costs science.',
    approach:
      'Architected an end-to-end web platform on Django, TOM Toolkit, and WebSockets: target ingestion, target-of-opportunity triggering, automated data retrieval, and real-time reduction in one application.',
    outcome:
      'Astronomers go from an incoming alert to calibrated Gemini data inside a single browser tab.',
  },
]

export function CaseStudies() {
  return (
    <section
      id="work"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Selected Work"
        title="From problem to production"
        description="One engagement in depth: the problem, the approach, and what changed."
      />
      <div className="flex flex-col gap-6">
        {caseStudies.map((study) => (
          <Card key={study.name} className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif text-xl">{study.name}</CardTitle>
              <CardDescription className="font-mono text-xs">
                {study.meta}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {(
                  [
                    ['Problem', study.problem],
                    ['Approach', study.approach],
                    ['Outcome', study.outcome],
                  ] as const
                ).map(([label, text]) => (
                  <div key={label}>
                    <dt className="text-primary mb-2 font-mono text-xs font-medium tracking-widest uppercase">
                      {label}
                    </dt>
                    <dd className="text-muted-foreground text-sm leading-relaxed">
                      {text}
                    </dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
