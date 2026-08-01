import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh items-center justify-center">
      <div className="mx-auto max-w-4xl px-4 pt-16 text-center sm:px-6 lg:px-8">
        <p className="bg-gradient-to-r from-amber-700 via-orange-700 to-rose-700 bg-clip-text font-serif text-lg italic text-transparent md:text-xl dark:from-amber-300 dark:via-orange-400 dark:to-rose-400">
          Engineering the night sky
        </p>
        <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-balance md:text-6xl">
          Production software for observatories, missions, and research teams.
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance md:text-xl">
          Sidereal Software builds the systems behind modern astronomy, from instrument
          control to real-time data platforms, and brings the same engineering to every
          science.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild>
            <a href="#contact">
              Start a project
              <ArrowRight />
            </a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="#work">See the work</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
