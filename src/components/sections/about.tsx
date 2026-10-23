import { ArrowUpRight } from 'lucide-react'

import portrait from '@/assets/me.jpg'
import { Monument } from '@/components/monument'

const links = [
  { label: 'danavner.com', href: 'https://www.danavner.com' },
  { label: 'GitHub', href: 'https://github.com/davner' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/danavner' },
]

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="scroll-mt-16 overflow-x-clip pt-32 pb-28 md:pt-48">
      <div className="page-gutter">
        <Monument>About</Monument>

        <div className="mt-16 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          <figure className="m-0 md:col-span-5">
            <img
              src={portrait}
              alt="Portrait of Dan Avner"
              width={920}
              height={1380}
              loading="lazy"
              decoding="async"
              className="aspect-[3/4] w-full object-cover object-top grayscale-[15%] md:aspect-[2/3]"
            />
          </figure>

          <div className="md:col-span-7 md:self-end lg:col-span-6 lg:col-start-7">
            <p className="font-display text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.14] font-medium tracking-[-0.02em] text-balance">
              I build the tools I wished I had at 3&nbsp;a.m. on the mountain.
            </p>
            <div className="text-muted-foreground mt-10 flex max-w-[60ch] flex-col gap-5 text-lg leading-relaxed text-pretty">
              <p>
                I've spent my career inside observatories, not just writing code for them:
                over 150 nights at the telescope, mountain operations at Steward
                Observatory, and an MS in Applied Physics from Northern Arizona
                University.
              </p>
              <p>
                Today I'm a software engineer at NSF NOIRLab supporting the international
                Gemini Observatory. Sidereal Software is where that experience goes to
                work for teams who need production software shaped around how they
                actually operate.
              </p>
            </div>

            <div className="border-border mt-12 border-t pt-6">
              <p className="font-display text-lg font-semibold tracking-[-0.01em]">
                Dan Avner
              </p>
              <p className="text-muted-foreground mt-1">Founder & Principal Engineer</p>
              <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group decoration-dim hover:text-primary hover:decoration-primary inline-flex items-center gap-1.5 py-1 text-sm underline underline-offset-[6px] transition-colors">
                      {link.label}
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
