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

const techStack: { category: string; items: string[] }[] = [
  {
    category: 'Backend',
    items: ['Python', 'Django & DRF', 'FastAPI', 'Celery', 'PostgreSQL', 'Redis'],
  },
  { category: 'Frontend', items: ['React', 'TypeScript', 'WebSockets'] },
  { category: 'Astronomy', items: ['TOM Toolkit', 'Astropy', 'INDI'] },
  { category: 'DevOps', items: ['Docker', 'GitHub Actions', 'pytest', 'Git'] },
]

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Full-stack astronomy software"
        description="Deep domain expertise across the entire stack, from instrument hardware to the browser."
      />
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Card key={service.title} className="bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <service.icon className="text-primary" aria-hidden="true" />
              <CardTitle className="font-display pt-2 text-lg">{service.title}</CardTitle>
              <CardDescription className="leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-display text-center text-2xl">
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {techStack.map((group) => (
              <div key={group.category}>
                <h3 className="text-muted-foreground mb-3 text-sm font-semibold tracking-widest uppercase">
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
    </section>
  )
}
