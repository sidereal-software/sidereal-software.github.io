import { ExternalLink } from 'lucide-react'

import { GitHubIcon } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CaseStudy {
  name: string
  meta: string
  problem: string
  approach: string
  outcome: string
  links: { label: string; href: string; github?: boolean }[]
}

const caseStudies: CaseStudy[] = [
  {
    name: 'GOATS',
    meta: 'Principal Engineer & Architect · NSF NOIRLab / Gemini Observatory',
    problem:
      'Time-domain astronomers juggled separate tools for alerts, triggering, data retrieval, and reduction. When following up a transient event, every lost hour costs science.',
    approach:
      'I architected an end-to-end web platform on Django, TOM Toolkit, and WebSockets: target ingestion, target-of-opportunity triggering, automated data retrieval, and real-time reduction in one application.',
    outcome:
      'Astronomers go from an incoming alert to calibrated Gemini data inside a single browser tab.',
    links: [
      { label: 'GOATS', href: 'https://github.com/gemini-hlsw/goats', github: true },
    ],
  },
  {
    name: 'pyINDI',
    meta: 'Frontend Lead · MMT & Steward Observatories',
    problem:
      'Writing INDI instrument drivers was slow, and desktop-bound control GUIs kept operators tied to the control room. Staff needed to command telescopes from anywhere, including a phone.',
    approach:
      'I co-developed a pure-Python implementation of the INDI protocol on asyncio and led the frontend: web tooling that auto-generates responsive control GUIs straight from INDI device properties. Presented at SPIE 2022.',
    outcome:
      'Faster driver development and browser control panels that work from a phone, in service at the MMT, Bok, and Kuiper telescopes. Its lessons now drive INDINexus.',
    links: [
      {
        label: 'pyINDI',
        href: 'https://github.com/MMTObservatory/pyINDI',
        github: true,
      },
      { label: 'SPIE 2022 paper', href: 'https://doi.org/10.1117/12.2630471' },
    ],
  },
]

export function CaseStudies() {
  return (
    <section id="work" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="From problem to production"
          description="Two engagements in depth: the problem, the approach, and what changed."
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
              <CardFooter className="gap-2">
                {study.links.map((link) => (
                  <Button key={link.href} variant="outline" size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.github ? <GitHubIcon /> : <ExternalLink />}
                      {link.label}
                    </a>
                  </Button>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
