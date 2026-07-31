import { GitHubIcon } from '@/components/icons'
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
  meta: string
  description: string
  tags: string[]
  link?: { label: string; href: string }
}

const projects: Project[] = [
  {
    name: 'INDINexus',
    meta: 'In active development · MIT licensed',
    description:
      'A modern, typed Python framework for INDI astronomical instrument control: a driver SDK, a reconnecting async client, and a FastAPI WebSocket bridge with a React control panel, layered on the proven indiserver architecture.',
    tags: ['Python', 'Pydantic', 'asyncio', 'FastAPI', 'React', 'INDI'],
    link: {
      label: 'View on GitHub',
      href: 'https://github.com/sidereal-software/indi-nexus',
    },
  },
  {
    name: 'ARK - Animal Record Keeper',
    meta: 'In active development',
    description:
      'Cloud-based, mobile-first record keeping for zoos, wildlife rehabilitation centers, sanctuaries, and rescues. Built so a keeper standing at an enclosure can find an animal, add a categorized note with a photo, and save it in about thirty seconds.',
    tags: ['Django', 'PostgreSQL', 'React', 'TypeScript', 'TanStack Query'],
  },
]

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="What Sidereal is building"
          description="Two products in active development."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.name} className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif text-xl">{project.name}</CardTitle>
                <CardDescription className="font-mono text-xs">
                  {project.meta}
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
                      <GitHubIcon />
                      {project.link.label}
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
