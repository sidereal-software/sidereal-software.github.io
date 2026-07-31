import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'

interface Testimonial {
  quote: string
  name: string
  title: string
  org: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'He has an eye for GUIs and graphical design that I have never seen equaled... Everything he touched became instantly improved.',
    name: 'Chris Johnson',
    title: 'Lead Software Engineer, Mountain Operations',
    org: 'Steward Observatory',
  },
  {
    quote:
      'What truly sets Dan apart is his innate ability to present solutions when faced with challenges... He consistently met deadlines and exceeded expectations, thriving under pressure while delivering exceptional results.',
    name: 'Scott Swindell',
    title: 'Software Engineer',
    org: 'Steward Observatory',
  },
  {
    quote:
      'The range of skills that Dan mastered to complete this project is really astounding... Not only did Dan essentially complete the project, but he made it look easy.',
    name: 'David Trilling',
    title: 'Professor & Chair, Astronomy & Planetary Science',
    org: 'Northern Arizona University',
  },
  {
    quote:
      "He is attentive, well-spoken, and responsive... I have learned from him the practice of trying to 'always leave code better than when you found it.'",
    name: 'Christina Nelson',
    title: 'Application Developer, SPHEREx',
    org: 'Caltech / IPAC',
  },
]

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Testimonials"
        title="In their words"
        description="Excerpts from letters of recommendation, shared with permission."
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.name} className="bg-card/60 backdrop-blur-sm">
            <CardContent className="flex h-full flex-col gap-6">
              <blockquote className="flex-1 font-serif text-base italic leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="font-mono text-xs">
                <div className="text-foreground font-medium">{testimonial.name}</div>
                <div className="text-muted-foreground mt-1">
                  {testimonial.title} · {testimonial.org}
                </div>
              </footer>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
