import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { CheckCircle2, Clock, Send } from 'lucide-react'

import { SectionHeading } from '@/components/section-heading'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

// Assembled at render time so the address never appears as a contiguous
// scrapable string in the served HTML or the bundle.
const EMAIL_USER = 'hello'
const EMAIL_DOMAIN = ['sidereal', 'software'].join('.')
const FORMSPREE_ID = 'maqrzvzv'

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [emailRevealed, setEmailRevealed] = useState(false)
  const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`

  return (
    <section id="contact" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Start a project"
          description="Tell me about your observatory, your mission, or the tool your team needs."
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
                <input
                  type="text"
                  name="_gotcha"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
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
                  <Input
                    id="contact-org"
                    name="organization"
                    autoComplete="organization"
                  />
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
                {emailRevealed ? (
                  <a
                    href={`mailto:${email}`}
                    className="hover:text-foreground font-mono underline underline-offset-4">
                    {email}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setEmailRevealed(true)}
                    className="hover:text-foreground cursor-pointer underline underline-offset-4">
                    Prefer email? Click to reveal the address.
                  </button>
                )}
              </p>
              <p className="text-muted-foreground mt-3 flex items-center justify-center gap-2 text-sm">
                <Clock className="size-4" aria-hidden="true" />
                Typically responds within 1-2 business days
              </p>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  )
}
