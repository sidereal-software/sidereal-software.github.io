import { useForm, ValidationError } from '@formspree/react'
import { CheckCircle2, Clock, Send } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const CONTACT_EMAIL = 'hello@sidereal.software'
const FORMSPREE_ID = 'maqrzvzv'

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

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
        {state.succeeded ? (
          <CardContent className="space-y-4 py-8 text-center">
            <CheckCircle2 className="text-primary mx-auto size-10" aria-hidden="true" />
            <p className="font-serif text-xl font-bold">Message sent</p>
            <p className="text-muted-foreground flex items-center justify-center gap-2 text-sm">
              <Clock className="size-4" aria-hidden="true" />
              Thanks for reaching out. I typically respond within 1-2 business days.
            </p>
          </CardContent>
        ) : (
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                type="hidden"
                name="_subject"
                value="New inquiry from sidereal.software"
              />
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input id="contact-name" name="name" required autoComplete="name" />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
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
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-org">Organization (optional)</Label>
                <Input id="contact-org" name="organization" autoComplete="organization" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message">What are you working on?</Label>
                <Textarea id="contact-message" name="message" required rows={5} />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-destructive text-sm"
                />
              </div>
              <Button type="submit" size="lg" disabled={state.submitting}>
                <Send />
                {state.submitting ? 'Sending...' : 'Send inquiry'}
              </Button>
              <ValidationError
                errors={state.errors}
                className="text-destructive text-sm"
              />
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
        )}
      </Card>
    </section>
  )
}
