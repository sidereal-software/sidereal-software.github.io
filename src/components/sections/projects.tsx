import { ExternalLink } from 'lucide-react'

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

export function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Projects"
        title="What Sidereal is building now"
        description="Open source work in active development at Sidereal Software."
      />
      <Card className="bg-card/60 mx-auto max-w-3xl backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-display text-2xl">INDINexus</CardTitle>
          <CardDescription>In active development · MIT licensed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            A modern, typed Python framework for INDI astronomical instrument control,
            layered on the proven indiserver architecture. INDINexus pairs a driver SDK
            for writing instrument drivers with a reconnecting async client, a FastAPI
            WebSocket bridge, and a React control panel, so observatories can drive
            telescopes, domes, and cameras from the browser with type safety end to end.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'Python',
              'Pydantic',
              'asyncio',
              'FastAPI',
              'TypeScript',
              'React',
              'INDI',
            ].map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/sidereal-software/indi-nexus"
              target="_blank"
              rel="noreferrer">
              <GitHubIcon />
              View on GitHub
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/sidereal-software"
              target="_blank"
              rel="noreferrer">
              Follow the org
              <ExternalLink />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
