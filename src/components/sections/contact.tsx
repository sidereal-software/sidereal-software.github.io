import { Clock, Mail } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const CONTACT_EMAIL = 'hello@sidereal.software'

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="Let's discuss your astronomy software project and explore how we can work together."
      />
      <Card className="bg-card/60 mx-auto max-w-xl backdrop-blur-sm">
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            For project inquiries, questions, or just to say hello, reach out directly via
            email.
          </p>
          <Button size="lg" asChild>
            <a href={`mailto:${CONTACT_EMAIL}`}>
              <Mail />
              {CONTACT_EMAIL}
            </a>
          </Button>
          <Separator />
          <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
            <Clock className="size-4" aria-hidden="true" />
            Typically responds within 1-2 business days
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
