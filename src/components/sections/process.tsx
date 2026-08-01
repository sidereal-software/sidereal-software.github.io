import { SectionHeading } from '@/components/section-heading'
import { Card, CardContent } from '@/components/ui/card'

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

export function Process() {
  return (
    <section id="process" className="scroll-mt-16 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="How I work"
          description="A defined path from first conversation to handover."
        />
        <Card className="bg-card/60 backdrop-blur-sm">
          <CardContent>
            <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <div className="text-primary font-mono text-xs font-medium tracking-widest uppercase">
                    Step {index + 1}
                  </div>
                  <h3 className="mt-2 font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
