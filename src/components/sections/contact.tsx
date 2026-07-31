import { Clock, Mail, Send } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'

const CONTACT_EMAIL = 'hello@sidereal.software'

// Set to the Formspree form ID (e.g. "xzbqwxyz") to enable the inquiry form.
// While empty, the section falls back to the direct email card so the live
// site never ships a form that cannot submit.
const FORMSPREE_ID = ''

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Contact"
        title="Start a project"
        description="Tell me about your observatory, mission, or research software problem."
      />
      <Card className="bg-card/60 mx-auto max-w-xl backdrop-blur-sm">
        {FORMSPREE_ID ? (
          <CardContent>
            <form
              action={`https://formspree.io/f/${FORMSPREE_ID}`}
              method="POST"
              className="flex flex-col gap-5">
              <input
                type="hidden"
                name="_subject"
                value="New inquiry from sidereal.software"
              />
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required autoComplete="name" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-org">Organization (optional)</Label>
                <Input id="contact-org" name="organization" autoComplete="organization" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">What are you working on?</Label>
                <Textarea id="contact-message" name="message" required rows={5} />
              </div>
              <Button type="submit" size="lg">
                <Send />
                Send inquiry
              </Button>
            </form>
            <p className="text-muted-foreground mt-6 text-center text-sm">
              Prefer email?{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-foreground font-mono underline underline-offset-4">
                {CONTACT_EMAIL}
              </a>
            </p>
          </CardContent>
        ) : (
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">
              For project inquiries, questions, or just to say hello, reach out directly
              via email.
            </p>
            <Button size="lg" className="font-mono" asChild>
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
        )}
      </Card>
    </section>
  )
}
