import { ArrowRight } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const leadProjects = [
  { name: 'GOATS', descriptor: 'Time-domain follow-up platform' },
  { name: 'GPP Client', descriptor: 'Async Python GraphQL client' },
  { name: 'GPP Resource', descriptor: 'Now in development' },
]

const experience = [
  {
    org: 'NSF NOIRLab',
    detail: 'Gemini Observatory',
    role: 'Software Engineer',
    summary:
      'Full-stack engineering for the international Gemini Observatory, leading development of time-domain follow-up and Gemini Program Platform tooling.',
  },
  {
    org: 'Caltech / IPAC',
    detail: 'California Institute of Technology',
    role: 'Software Engineer',
    summary:
      "Developed data-processing pipelines for NASA's SPHEREx all-sky spectral survey mission.",
  },
  {
    org: 'Steward Observatory',
    detail: 'University of Arizona',
    role: 'Software Engineer',
    summary:
      'Built autonomous telescope and instrument control software for research observatories.',
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Experience"
        title="A decade across observatories and missions"
        description="Lead engineer for GOATS and GPP Client, and now GPP Resource, at NSF NOIRLab."
      />

      <Card className="bg-card/60 mb-6 backdrop-blur-sm">
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            {leadProjects.map((project, index) => (
              <div
                key={project.name}
                className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
                {index > 0 && (
                  <ArrowRight
                    className="text-muted-foreground size-5 rotate-90 md:rotate-0"
                    aria-hidden="true"
                  />
                )}
                <div className="text-center">
                  <div className="font-display text-lg font-semibold">{project.name}</div>
                  <div className="text-muted-foreground text-sm">
                    {project.descriptor}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm">
        <CardContent>
          <ul>
            {experience.map((job, index) => (
              <li key={job.org}>
                {index > 0 && <Separator className="my-6" />}
                <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_2fr] md:gap-8">
                  <div>
                    <h3 className="font-display font-semibold">{job.org}</h3>
                    <p className="text-muted-foreground text-sm">{job.detail}</p>
                    <p className="text-muted-foreground mt-1 text-sm">{job.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed md:self-center">
                    {job.summary}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
