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
  links?: { label: string; href: string; github?: boolean }[]
}

const experience: Job[] = [
  {
    org: 'NSF NOIRLab / AURA',
    detail: 'Gemini Observatory',
    role: 'Software Engineer III',
    period: '2023 - Present',
    summary:
      "I am the principal engineer and architect for GOATS and the GPP Client, and I now lead GPP Resource. I moved Gemini's DRAGONS data-reduction pipeline into the browser with Django and WebSockets.",
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
      "I developed production data-processing pipelines for NASA's SPHEREx mission, building astrophysics algorithms alongside the science team and integrating Rubin Observatory pipeline and Butler software.",
    links: [{ label: 'SPHEREx mission', href: 'https://spherex.caltech.edu' }],
  },
  {
    org: 'Steward Observatory',
    detail: 'University of Arizona',
    role: 'R&D Software Engineer III',
    period: '2019 - 2021',
    summary:
      'I automated research telescopes for classical and autonomous observing, owning projects from embedded dome and mirror-cover control up to the web interfaces operators use. This is where pyINDI began, and where I logged 150+ nights at the telescope.',
  },
]

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="A career across observatories and missions"
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
                      {job.links && (
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
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
