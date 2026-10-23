import { animated } from '@react-spring/web'
import { ArrowRight } from 'lucide-react'

import { ImageCaption } from '@/components/image-caption'
import { PressLink } from '@/components/press'
import { heroImage } from '@/content/images'
import { institutions } from '@/content/institutions'
import { useStaggerIn } from '@/lib/motion'

export function Hero() {
  const [kicker, title, lede, actions] = useStaggerIn(4, true)
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <div className="page-gutter flex flex-1 flex-col pt-7 pb-12 md:justify-center md:pt-24 md:pb-36">
        <div className="max-w-[40rem] md:max-w-[46%]">
          <animated.p
            style={kicker}
            className="text-primary mb-5 text-[0.7rem] font-medium tracking-[0.2em] text-balance uppercase sm:mb-6 lg:text-xs lg:tracking-[0.32em]">
            Software that does the heavy lifting
          </animated.p>
          <animated.h1
            id="hero-title"
            style={title}
            className="font-display text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance uppercase">
            Production software for observatories, missions, and research teams.
          </animated.h1>
          <animated.p
            style={lede}
            className="text-muted-foreground mt-6 max-w-[34rem] text-base leading-relaxed text-pretty sm:mt-7 sm:text-lg">
            I build the systems behind modern astronomy, from instrument control to
            real-time data platforms, and bring the same engineering to every science.
          </animated.p>
          <animated.div
            style={actions}
            className="mt-8 flex flex-wrap sm:mt-9 items-center gap-x-8 gap-y-4">
            <PressLink
              href="#contact"
              className="group bg-primary text-primary-foreground hover:bg-foreground inline-flex h-12 items-center gap-2 px-6 text-sm font-semibold tracking-wide transition-colors">
              Start a project
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
                strokeWidth={2}
              />
            </PressLink>
            <PressLink
              href="#work"
              className="decoration-dim hover:decoration-foreground inline-block text-sm font-medium underline underline-offset-[6px] transition-colors">
              See the work
            </PressLink>
          </animated.div>
        </div>
      </div>

      <figure className="relative -z-10 m-0 max-md:order-first h-[46svh] shrink-0 md:absolute md:inset-0 md:h-auto">
        <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:inset-y-0 md:right-[-14%] md:left-auto md:w-[92%] md:[mask-image:linear-gradient(to_right,transparent,black_38%)]">
          <img
            src={heroImage.src}
            srcSet={`${heroImage.smallSrc} 1200w, ${heroImage.src} 2400w`}
            sizes={heroImage.sizes}
            fetchPriority="high"
            alt="The Dumbbell Nebula, a glowing cloud of red and blue gas around a pale core, set in a dense star field"
            width={heroImage.width}
            height={heroImage.height}
            className="hero-image size-full object-cover object-[50%_40%] md:brightness-[0.85]"
          />
        </div>
        <div className="from-background/80 absolute inset-x-0 top-0 h-32 bg-linear-to-b to-transparent" />
        <ImageCaption
          image={heroImage}
          className="absolute inset-x-5 bottom-0 sm:inset-x-8 md:inset-x-auto md:right-8 md:bottom-32 lg:bottom-24 md:max-w-[24rem] md:bg-background/85 md:px-4 md:py-3 md:text-right lg:right-12"
        />
      </figure>

      <div className="border-border border-t md:absolute md:inset-x-0 md:bottom-0 md:bg-background/85">
        <ul
          aria-label="Institutions I have worked with"
          className="page-gutter text-muted-foreground flex flex-wrap gap-x-7 gap-y-2 py-5 text-sm lg:flex-nowrap lg:justify-between">
          {institutions.map((name) => (
            <li key={name} className="whitespace-nowrap">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
