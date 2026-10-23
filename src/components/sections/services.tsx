import { Caps } from '@/components/caps'
import { Monument } from '@/components/monument'

interface Service {
  title: string
  description: string
}

const services: Service[] = [
  {
    title: 'Observatory & instrument control',
    description:
      'Telescope automation, instrument drivers over INDI and serial or network links, and the operator interfaces that run them.',
  },
  {
    title: 'Data pipelines & backends',
    description:
      'Processing pipelines that turn raw frames into science-ready data, and the databases and services behind them.',
  },
  {
    title: 'Scientific web platforms',
    description:
      'Django and TOM Toolkit platforms, data portals, and React interfaces with live updates for working scientists.',
  },
  {
    title: 'Python libraries & APIs',
    description:
      'Typed SDKs, REST and GraphQL clients, and packages released to PyPI and conda-forge.',
  },
]

const stack = [
  'Python',
  'TypeScript',
  'C/C++',
  'Django',
  'FastAPI',
  'React',
  'GraphQL',
  'PostgreSQL',
  'WebSockets',
  'Astropy',
  'DRAGONS',
  'TOM Toolkit',
  'INDI',
  'conda-forge',
  'Docker',
  'GitHub Actions',
]

export function Services() {
  return (
    <section id="services" className="section-y scroll-mt-16">
      <div className="page-gutter">
        <Monument>Services</Monument>

        <ol className="border-border border-t">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="border-border grid gap-4 border-b py-8 md:py-14 lg:grid-cols-12 lg:gap-8">
              <span className="font-display text-primary text-sm tabular-nums lg:col-span-1 lg:pt-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance uppercase lg:col-span-7">
                <Caps>{service.title}</Caps>
              </h3>
              <p className="text-muted-foreground max-w-[52ch] text-base lg:max-w-[36ch] leading-relaxed lg:col-span-4 lg:pt-2">
                {service.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <h3 className="font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance md:text-3xl lg:col-span-5">
            Don't write software? That's the point.
          </h3>
          <p className="text-muted-foreground max-w-[60ch] text-lg leading-relaxed text-pretty lg:col-span-6 lg:col-start-7">
            If you can describe the problem, I can build the app that removes it. ARK
            began that way: wildlife professionals needed their record keeping to be
            easier.
          </p>
        </div>

        <ul
          aria-label="Technology stack"
          className="text-muted-foreground mt-12 flex flex-wrap text-sm leading-loose md:mt-20">
          {stack.map((item, index) => (
            <li key={item} className="whitespace-nowrap">
              {item}
              {index < stack.length - 1 && (
                <span aria-hidden="true" className="text-dim px-3">
                  /
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
