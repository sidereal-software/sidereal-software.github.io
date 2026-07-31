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
  description: string
  tags: string[]
  link?: { href: string; label: string }
}

const projects: Project[] = [
  {
    name: 'GOATS',
    role: 'Lead Engineer',
    description:
      'Full-stack platform engineering: a Django and TOM Toolkit backend, WebSocket-driven real-time updates with Django Channels, asynchronous task processing on Dramatiq and Redis, REST APIs, automated data retrieval and reduction, and interactive visualization in the browser. Packaged and distributed with conda.',
    tags: ['Python', 'Django', 'WebSockets', 'Redis', 'TOM Toolkit'],
    link: { href: 'https://github.com/gemini-hlsw/goats', label: 'View on GitHub' },
  },
  {
    name: 'GPP Client',
    role: 'Lead Engineer',
    description:
      'An asynchronous Python client and CLI that makes a complex GraphQL API pain-free: type-safe queries and mutations backed by Pydantic models generated from the schema, high-level resource managers instead of raw GraphQL, and a full CRUD command line with rich output.',
    tags: ['Python', 'GraphQL', 'asyncio', 'Pydantic', 'CLI'],
    link: { href: 'https://github.com/gemini-hlsw/gpp-client', label: 'View on GitHub' },
  },
  {
    name: 'Open Source',
    role: 'Contributor',
    description:
      'Conda packaging, bug fixes, and enhancements across many open-source projects in the astronomy ecosystem, from observation-management frameworks to a pure-Python implementation of the INDI instrument control protocol.',
    tags: ['Python', 'Conda', 'INDI', 'Community'],
    link: { href: 'https://github.com/davner', label: 'Browse my commits' },
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
        description="Selected work, focused on the engineering: the stacks, the architecture, and the code."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.name} className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-display text-xl">{project.name}</CardTitle>
              <CardDescription>{project.role}</CardDescription>
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
