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
      className="section-y scroll-mt-16 overflow-x-clip">
      <div className="page-gutter">
        <Monument>About</Monument>

        <p className="font-display max-w-[22ch] text-[clamp(1.75rem,3.6vw,3.25rem)] leading-[1.1] font-medium tracking-[-0.02em] text-balance">
          I build the tools I wished I had at 3&nbsp;a.m. on the mountain.
        </p>

        <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-8 md:gap-y-6">
          <div className="flex items-center gap-5 md:col-[1/span_4] md:row-start-1 md:flex-col md:items-start md:gap-6">
            <img
              src={portrait}
              alt="Portrait of Dan Avner"
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="size-24 shrink-0 object-cover grayscale-[15%] md:size-48 lg:size-52"
            />
            <div>
              <p className="font-display text-lg font-semibold tracking-[-0.01em]">
                Dan Avner
              </p>
              <p className="text-muted-foreground mt-1">Founder & Principal Engineer</p>
            </div>
          </div>

          <div className="text-muted-foreground flex max-w-[60ch] flex-col gap-5 text-lg leading-relaxed text-pretty md:col-[5/span_8] md:row-[1/span_2] lg:col-[5/span_7]">
            <p>
              I've spent my career inside observatories, not just writing code for them:
              over 150 nights at the telescope, mountain operations at Steward
              Observatory, and an MS in Applied Physics from Northern Arizona University.
            </p>
            <p>
              Today I'm a software engineer at NSF NOIRLab supporting the international
              Gemini Observatory. Sidereal Software is where that experience goes to work
              for teams who need production software shaped around how they actually
              operate.
            </p>
          </div>

          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-[1/span_4] md:row-start-2 md:flex-col md:items-start md:gap-y-2 md:self-start">
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
    </section>
  )
}
