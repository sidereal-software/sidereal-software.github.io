import { useState } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { animated } from '@react-spring/web'
import { ArrowRight } from 'lucide-react'

import { Monument } from '@/components/monument'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { usePress } from '@/lib/motion'
import { cn } from '@/lib/utils'

// Assembled at render time so the address never appears as a contiguous
// scrapable string in the served HTML or the bundle.
const EMAIL_USER = 'hello'
const EMAIL_DOMAIN = ['sidereal', 'software'].join('.')
const FORMSPREE_ID = 'maqrzvzv'

const labelClass = 'text-muted-foreground text-xs font-normal tracking-[0.2em] uppercase'
const fieldClass =
  'h-auto rounded-none border-0 border-b bg-transparent px-0 py-3 text-lg shadow-none focus-visible:border-primary focus-visible:ring-0 md:text-lg dark:bg-transparent'
const errorClass = 'text-destructive text-sm'

export function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [emailRevealed, setEmailRevealed] = useState(false)
  const { style: pressStyle, bind: pressBind } = usePress()
  const email = `${EMAIL_USER}@${EMAIL_DOMAIN}`

  return (
    <section id="contact" className="scroll-mt-16 pt-32 pb-28 md:pt-48">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Monument>{'Start a\nproject'}</Monument>

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="text-muted-foreground max-w-[34ch] text-lg leading-relaxed text-pretty">
              Tell me about your observatory, your lab, your field work, or the tool your
              team needs.
            </p>
            <p className="mt-8 flex items-start gap-3 text-sm">
              <span
                aria-hidden="true"
                className="bg-primary mt-[0.45em] size-2 shrink-0"
              />
              Currently taking on new projects
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              I typically respond within 1-2 business days
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              Los Angeles, California · Pacific Time
            </p>
            <p className="mt-8 text-sm">
              {emailRevealed ? (
                <a
                  href={`mailto:${email}`}
                  className="text-primary decoration-primary/40 hover:decoration-primary underline underline-offset-[6px]">
                  {email}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setEmailRevealed(true)}
                  className="text-muted-foreground decoration-dim hover:text-foreground hover:decoration-foreground cursor-pointer underline underline-offset-[6px]">
                  Prefer email? Click to reveal the address.
                </button>
              )}
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            {state.succeeded ? (
              <div className="border-border border-t pt-8">
                <p className="font-display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  Message sent
                </p>
                <p className="text-muted-foreground mt-4 max-w-[48ch] text-lg leading-relaxed">
                  Thanks for reaching out. I typically respond within 1-2 business days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-10 sm:grid-cols-2">
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
                <div className="grid content-start gap-1">
                  <Label htmlFor="contact-name" className={labelClass}>
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldClass}
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className={cn(errorClass, 'mt-2')}
                  />
                </div>
                <div className="grid content-start gap-1">
                  <Label htmlFor="contact-email" className={labelClass}>
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className={cn(errorClass, 'mt-2')}
                  />
                </div>
                <div className="grid content-start gap-1 sm:col-span-2">
                  <Label htmlFor="contact-org" className={labelClass}>
                    Organization (optional)
                  </Label>
                  <Input
                    id="contact-org"
                    name="organization"
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>
                <div className="grid content-start gap-1 sm:col-span-2">
                  <Label htmlFor="contact-message" className={labelClass}>
                    What do you need help with?
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className={cn(fieldClass, 'min-h-36 resize-y')}
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className={cn(errorClass, 'mt-2')}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
                  <animated.button
                    type="submit"
                    disabled={state.submitting}
                    style={pressStyle}
                    {...pressBind}
                    className="group bg-primary text-primary-foreground hover:bg-foreground inline-flex h-12 cursor-pointer items-center gap-2 px-7 text-sm font-semibold tracking-wide transition-colors disabled:cursor-wait disabled:opacity-70">
                    {state.submitting ? 'Sending...' : 'Send inquiry'}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </animated.button>
                  <ValidationError errors={state.errors} className={errorClass} />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
