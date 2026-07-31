import {
  Braces,
  Globe,
  Package,
  SquareTerminal,
  Telescope,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface SkillGroup {
  icon: LucideIcon
  title: string
  description: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    icon: Braces,
    title: 'Languages',
    description:
      'A decade of Python at the core, with JavaScript and TypeScript in the browser and C/C++ at the instrument.',
    items: ['Python', 'TypeScript', 'JavaScript', 'C', 'C++', 'Shell', 'MATLAB'],
  },
  {
    icon: Globe,
    title: 'Web & APIs',
    description:
      'Django and FastAPI services, REST and GraphQL APIs, and fully typed Python clients generated straight from API schemas.',
    items: ['Django', 'FastAPI', 'Flask', 'GraphQL', 'REST', 'Pydantic'],
  },
  {
    icon: Zap,
    title: 'Real-time & Async',
    description:
      'Async-first engineering: WebSocket streams to the browser, background task processing, and reconnecting clients built on asyncio.',
    items: ['asyncio', 'WebSockets', 'Django Channels', 'Dramatiq', 'Redis'],
  },
  {
    icon: Telescope,
    title: 'Astronomy Stack',
    description:
      'The domain toolkit: data reduction with DRAGONS, observation management with TOM Toolkit, instrument control over INDI, and Astropy everywhere.',
    items: ['DRAGONS', 'TOM Toolkit', 'INDI', 'Astropy', 'astroquery', 'IRAF'],
  },
  {
    icon: Package,
    title: 'Packaging & CI',
    description:
      'Conda and conda-forge packaging across a stack of feedstocks, containerized deployments, and CI on GitHub Actions and Jenkins.',
    items: ['conda-forge', 'Docker', 'GitHub Actions', 'Jenkins', 'pytest', 'pre-commit'],
  },
  {
    icon: SquareTerminal,
    title: 'Interfaces & Tooling',
    description:
      'From React control panels and Bootstrap dashboards to PyQt desktop tools and rich-output command-line interfaces.',
    items: ['React', 'shadcn/ui', 'Bootstrap', 'PyQt', 'CLIs', 'Jupyter'],
  },
]

export function Skills() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Skills"
        title="A full-stack toolkit, proven in production"
        description="Drawn from years of commits: observatory platforms, mission pipelines, and the tooling around them."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Card key={group.title} className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <group.icon className="text-primary" aria-hidden="true" />
              <CardTitle className="pt-2 text-lg">{group.title}</CardTitle>
              <CardDescription className="leading-relaxed">
                {group.description}
              </CardDescription>
              <div className="flex flex-wrap gap-2 pt-3">
                {group.items.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
