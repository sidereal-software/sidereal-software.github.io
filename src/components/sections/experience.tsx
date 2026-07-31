import { ExternalLink } from 'lucide-react'

import { GitHubIcon } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Job {
  org: string
  detail: string
  role: string
  period: string
  summary: string
  links: { label: string; href: string; github?: boolean }[]
}

const experience: Job[] = [
  {
    org: 'NSF NOIRLab / AURA',
    detail: 'Gemini Observatory',
    role: 'Software Engineer III',
    period: '2023 - Present',
    summary:
      "Principal engineer and architect for GOATS and the GPP Client, and now leading GPP Resource. Moved Gemini's DRAGONS data-reduction pipeline into the browser with Django and WebSockets.",
    links: [
      { label: 'GOATS', href: 'https://github.com/gemini-hlsw/goats', github: true },
      {
        label: 'GPP Client',
        href: 'https://github.com/gemini-hlsw/gpp-client',
        github: true,
      },
      {
        label: 'DRAGONS',
        href: 'https://github.com/GeminiDRSoftware/DRAGONS',
        github: true,
      },
    ],
  },
  {
    org: 'Caltech / IPAC',
    detail: 'California Institute of Technology',
    role: 'Application Developer',
    period: '2021 - 2023',
    summary:
      "Developed production data-processing pipelines for NASA's SPHEREx mission, building astrophysics algorithms with the science team and integrating Rubin Observatory pipeline and Butler software.",
    links: [{ label: 'SPHEREx mission', href: 'https://spherex.caltech.edu' }],
  },
  {
    org: 'Steward Observatory',
    detail: 'University of Arizona',
    role: 'R&D Software Engineer III',
    period: '2019 - 2021',
    summary:
      'Automated research telescopes for classical and autonomous observing, leading projects from embedded dome and mirror-cover control up to web frontends, with 150+ nights at the telescope.',
    links: [
      { label: 'pyINDI', href: 'https://github.com/MMTObservatory/pyINDI', github: true },
    ],
  },
]

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="A decade across observatories and missions"
          description="Telescope and spacecraft software, from embedded instrument control to the browser."
        />

        <Card className="bg-card/60 backdrop-blur-sm">
          <CardContent>
            <ul>
              {experience.map((job, index) => (
                <li key={job.org}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-8">
                    <div>
                      <h3 className="font-semibold">{job.org}</h3>
                      <p className="text-muted-foreground text-sm">{job.detail}</p>
                      <p className="text-muted-foreground mt-1 font-mono text-xs">
                        {job.role} · {job.period}
                      </p>
                    </div>
                    <div className="space-y-3 md:self-center">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {job.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.links.map((link) => (
                          <Button key={link.href} variant="outline" size="sm" asChild>
                            <a href={link.href} target="_blank" rel="noreferrer">
                              {link.github ? <GitHubIcon /> : <ExternalLink />}
                              {link.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <p className="text-muted-foreground mt-6 text-center text-sm">
          Now building in the open:{' '}
          <a
            href="https://github.com/sidereal-software/indi-nexus"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground font-medium underline underline-offset-4">
            INDINexus
          </a>
          , a typed Python framework for INDI instrument control.
        </p>
      </div>
    </section>
  )
}
