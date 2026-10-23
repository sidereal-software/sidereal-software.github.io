import { animated } from '@react-spring/web'

import { Monument } from '@/components/monument'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useStaggerOnEntry } from '@/lib/motion'

const steps = [
  {
    title: 'Intro call',
    description:
      'A conversation about your problem, constraints, and timeline. No cost, no obligation.',
  },
  {
    title: 'Scoped proposal',
    description: 'A written plan with deliverables, milestones, and a clear price.',
  },
  {
    title: 'Build',
    description: 'Iterative development with tests, documentation, and regular demos.',
  },
  {
    title: 'Handover',
    description: 'Your team owns the result: deployed, documented, and maintainable.',
  },
]

const faqs = [
  {
    question: 'What kinds of projects are a good fit?',
    answer:
      'Observatory control systems, data-processing pipelines, and scientific web platforms are what I build most, but any science with a software problem is a good fit: ARK exists because wildlife professionals needed better record keeping. I take on new builds and modernizations of systems you already run.',
  },
  {
    question: 'Where are you based, and do you work remotely?',
    answer:
      'I am based in Los Angeles, California (Pacific Time) and work fully remotely. Most of my career has been spent shipping production systems for observatories and teams spread across sites and time zones.',
  },
  {
    question: 'How are engagements structured?',
    answer:
      'Every project starts with a free intro call, after which I send a written proposal with deliverables, milestones, and a clear price. I take both fixed-scope projects and ongoing support arrangements.',
  },
  {
    question: 'We already have a codebase. Is that a problem?',
    answer:
      'That is the normal case. Most of my engagements start inside an existing system: rescuing a pipeline, modernizing an interface, or extending a platform without breaking operations.',
  },
  {
    question: 'Who owns the work?',
    answer:
      'You do. I hand over every deliverable documented and tested, and open-sourcing components can be part of the plan when it benefits your project.',
  },
]

export function WorkingTogether() {
  const { ref, trail } = useStaggerOnEntry<HTMLOListElement>(steps.length)
  return (
    <section id="process" className="scroll-mt-16 pt-32 pb-28 md:pt-48">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <Monument>Process</Monument>

        <ol
          ref={ref}
          className="mt-16 grid gap-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => (
            <li key={step.title} className="border-border border-t pt-6">
              <animated.span
                aria-hidden="true"
                style={trail[index]}
                className="font-display text-dim block text-[clamp(5rem,9vw,8.5rem)] leading-none font-bold tracking-[-0.04em] tabular-nums">
                {index + 1}
              </animated.span>
              <h3 className="font-display mt-6 text-lg font-semibold tracking-[0.04em] uppercase">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-3 max-w-[32ch] leading-relaxed text-pretty">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
          <h3 className="text-dim text-xs tracking-[0.32em] uppercase md:col-span-4 md:pt-7">
            Questions
          </h3>
          <Accordion type="single" collapsible className="md:col-span-8">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-border first:border-t">
                <AccordionTrigger className="font-display hover:text-primary rounded-none py-6 text-base font-medium tracking-tight hover:no-underline md:text-xl [&>svg]:size-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground max-w-[62ch] pb-8 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
