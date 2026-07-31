import { ExternalLink } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Project {
  name: string
  role: string
  org: string
  description: string
  tags: string[]
  link?: { href: string; label: string }
}

const projects: Project[] = [
  {
    name: 'GOATS',
    role: 'Lead Engineer',
    org: 'NSF NOIRLab / Gemini Observatory',
    description:
      'The Gemini Observation and Analysis of Targets System: an end-to-end platform for time-domain and multi-messenger astronomy. GOATS takes astronomers from an incoming alert to calibrated data products in a single web application, covering target ingestion, target-of-opportunity triggering, automated data retrieval, real-time reduction, and analysis.',
    tags: ['Python', 'Django', 'TOM Toolkit', 'Real-time'],
  },
  {
    name: 'TOM Toolkit',
    role: 'Contributor',
    org: 'Open Source',
    description:
      'An open-source framework for building Target and Observation Manager systems, powering follow-up observation workflows across the time-domain astronomy community.',
    tags: ['Python', 'Django', 'Open Source'],
    link: { href: 'https://github.com/TOMToolkit/tom_base', label: 'View on GitHub' },
  },
  {
    name: 'SPHEREx',
    role: 'Pipeline Engineer',
    org: 'Caltech / IPAC',
    description:
      'Data-processing pipeline development for SPHEREx, the NASA mission surveying the entire sky in near-infrared spectra to probe the origins of the universe, galaxies, and water in planetary systems.',
    tags: ['Python', 'Data Pipelines', 'NASA'],
    link: { href: 'https://spherex.caltech.edu', label: 'Mission site' },
  },
  {
    name: 'Autonomous Telescope Control',
    role: 'Software Engineer',
    org: 'Steward Observatory, University of Arizona',
    description:
      'Autonomous telescope and instrument control software for research observatories, from low-level hardware drivers to scheduling and automation.',
    tags: ['Python', 'C/C++', 'Instrument Control'],
  },
]

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="Software running under real skies"
        description="Current and past work spanning alert-driven follow-up platforms, mission data pipelines, and autonomous observatory control."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Card key={project.name} className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-display text-xl">{project.name}</CardTitle>
              <CardDescription>
                {project.role} · {project.org}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {project.link && (
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <a href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label}
                    <ExternalLink />
                  </a>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}
