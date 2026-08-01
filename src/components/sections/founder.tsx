import { Globe } from 'lucide-react'

import portrait from '@/assets/me.jpg'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const links = [
  { icon: Globe, label: 'danavner.com', href: 'https://www.danavner.com' },
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/davner' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/danavner' },
]

export function Founder() {
  return (
    <section id="about" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Meet the founder" />
        <Card className="bg-card/60 overflow-hidden py-0 backdrop-blur-sm">
          <CardContent className="grid grid-cols-1 gap-0 p-0 md:grid-cols-[2fr_3fr]">
            <div className="relative max-h-[420px] md:max-h-none">
              <img
                src={portrait}
                alt="Portrait of Dan Avner"
                className="h-full w-full object-cover object-top saturate-[0.85] sepia-[0.15]"
              />
              <div
                className="bg-primary/15 absolute inset-0 mix-blend-soft-light"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col justify-center gap-6 p-8 md:p-10">
              <p className="font-serif text-2xl leading-snug font-bold text-balance md:text-3xl">
                &ldquo;I build the tools I wished I had at 3 a.m. on the mountain.&rdquo;
              </p>
              <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
                <p>
                  I've spent my career inside observatories, not just writing code for
                  them: over 150 nights at the telescope, mountain operations at Steward
                  Observatory, a master's in applied physics, and years of building the
                  tools my colleagues and I had to rely on the next night. That's where my
                  obsession with intuitive, reliable interfaces comes from.
                </p>
                <p>
                  Today I'm a software engineer at NSF NOIRLab supporting the
                  international Gemini Observatory, and Sidereal Software is where that
                  experience goes to work for everyone else: teams who need production
                  software shaped around how they actually operate, built by someone who
                  has stood where they stand.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold">Dan Avner</h3>
                <p className="text-muted-foreground mt-1 font-mono text-sm">
                  Founder & Principal Engineer
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {links.map((link) => (
                  <Button key={link.href} variant="outline" size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      <link.icon />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
