import {
  Braces,
  Cpu,
  Database,
  Globe,
  MonitorSmartphone,
  Telescope,
  type LucideIcon,
} from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Telescope,
    title: 'Observatory Applications',
    description:
      'Control software, automation systems, and telescope integrations designed for real-world observatory operations.',
  },
  {
    icon: Globe,
    title: 'Scientific Web Platforms',
    description:
      'Django-based web applications, TOM Toolkit deployments, and data portals for astronomical research teams.',
  },
  {
    icon: Braces,
    title: 'Python Libraries & APIs',
    description:
      'Reusable libraries, RESTful APIs, and data pipelines built with Python best practices and scientific rigor.',
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description:
      'Scalable database architectures, data processing pipelines, and integration with existing observatory infrastructure.',
  },
  {
    icon: Cpu,
    title: 'Drivers & Integrations',
    description:
      'Hardware drivers, instrument control software, and integrations with INDI and proprietary systems.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Frontend Development',
    description:
      'Modern React interfaces with TypeScript, real-time data visualization, and responsive design for astronomers.',
  },
]

const engagements = [
  {
    name: 'TOM Toolkit Deployment',
    description:
      'Stand up a target and observation manager for your survey or follow-up program.',
  },
  {
    name: 'Pipeline Modernization',
    description: 'Rescue, refactor, or web-enable an existing data-processing pipeline.',
  },
  {
    name: 'Observatory Control Software',
    description:
      'Instrument drivers, automation, and control interfaces from hardware to browser.',
  },
]

const techStack: { category: string; items: string[] }[] = [
  {
    category: 'Languages',
    items: ['Python', 'TypeScript', 'JavaScript', 'C/C++', 'Shell', 'MATLAB'],
  },
  {
    category: 'Web & Data',
    items: [
      'Django & DRF',
      'FastAPI',
      'GraphQL',
      'React',
      'WebSockets',
      'PostgreSQL',
      'Redis',
    ],
  },
  {
    category: 'Astronomy',
    items: ['DRAGONS', 'TOM Toolkit', 'INDI', 'Astropy', 'astroquery', 'IRAF'],
  },
  {
    category: 'Packaging & CI',
    items: ['conda-forge', 'Docker', 'GitHub Actions', 'Jenkins', 'pytest', 'pre-commit'],
  },
]

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Full-stack astronomy software"
          description="Deep domain expertise across the entire stack, from instrument hardware to the browser."
        />
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <service.icon className="text-primary" aria-hidden="true" />
                <CardTitle className="pt-2 text-lg">{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Card className="bg-card/60 mb-16 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center font-serif text-2xl">
              Typical Engagements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {engagements.map((engagement) => (
                <div key={engagement.name}>
                  <h3 className="font-semibold">{engagement.name}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {engagement.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center font-serif text-2xl">
              Technology Stack
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {techStack.map((group) => (
                <div key={group.category}>
                  <h3 className="text-muted-foreground mb-3 font-mono text-sm font-semibold tracking-widest uppercase">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item} variant="outline">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
