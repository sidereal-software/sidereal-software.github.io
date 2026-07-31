import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

const stats = [
  { value: '10+', label: 'Years in Astronomy' },
  { value: '~10', label: 'Years of Observatory Software' },
  { value: '100%', label: 'Production Quality' },
]

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center justify-center">
      <div className="mx-auto max-w-5xl px-4 pt-16 text-center sm:px-6 lg:px-8">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-balance md:text-7xl">
          Engineering the{' '}
          <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent">
            night sky
          </span>
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-xl text-balance md:text-2xl">
          Production-quality astronomy software for observatories, research teams, and
          scientific institutions. From telescope control to real-time data platforms.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#projects">
              Explore projects
              <ArrowRight />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#contact">Get in touch</a>
          </Button>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text font-serif text-4xl font-bold text-transparent md:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
