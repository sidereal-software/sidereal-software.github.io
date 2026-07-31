import { Globe } from 'lucide-react'

import portrait from '@/assets/me.jpg'
import { GitHubIcon, LinkedInIcon } from '@/components/icons'
import { SectionHeading } from '@/components/section-heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const affiliations = ['NSF NOIRLab', 'Caltech / IPAC', 'Steward Observatory']

const links = [
  { icon: Globe, label: 'danavner.com', href: 'https://www.danavner.com' },
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/davner' },
  { icon: LinkedInIcon, label: 'LinkedIn', href: 'https://www.linkedin.com/in/danavner' },
]

export function Founder() {
  return (
    <section id="about" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Meet the founder"
          description="Sidereal Software is founded and led by an engineer who builds observatory software for a living."
        />
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
            <div className="flex flex-col justify-center gap-5 p-8 md:p-10">
              <div>
                <h3 className="font-serif text-2xl font-bold">Dan Avner</h3>
                <p className="text-muted-foreground mt-1 font-mono text-sm">
                  Founder & Principal Engineer
                </p>
              </div>
              <div className="text-muted-foreground space-y-4 text-sm leading-relaxed">
                <p>
                  Dan is a software engineer at NSF NOIRLab supporting the international
                  Gemini Observatory, where he is the principal engineer and architect for
                  GOATS and the GPP Client, and now leads GPP Resource.
                </p>
                <p>
                  Before NOIRLab, he built data-processing pipelines for NASA's SPHEREx
                  mission at Caltech/IPAC and autonomous telescope and instrument control
                  software at Steward Observatory. His work centers on full-stack
                  engineering and real-time web applications, with an emphasis on
                  intuitive, reliable interfaces that make complex astronomical workflows
                  efficient for scientists.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {affiliations.map((affiliation) => (
                  <Badge key={affiliation} variant="secondary">
                    {affiliation}
                  </Badge>
                ))}
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
