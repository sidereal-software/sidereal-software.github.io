import { SectionHeading } from '@/components/section-heading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

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

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Common questions" />
        <Accordion type="single" collapsible className="mx-auto max-w-2xl">
          {faqs.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question}>
              <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
