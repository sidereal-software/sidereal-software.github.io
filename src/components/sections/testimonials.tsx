import { useState, type ComponentProps } from 'react'
import { animated } from '@react-spring/web'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { usePress, useSpringIn } from '@/lib/motion'

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

function StepButton(props: ComponentProps<typeof animated.button>) {
  const { style, bind } = usePress()
  return (
    <animated.button
      type="button"
      {...props}
      style={style}
      {...bind}
      className="group border-border hover:border-primary hover:text-primary grid size-12 place-items-center border transition-colors"
    />
  )
}

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const incoming = useSpringIn(index)
  const step = (delta: number) =>
    setIndex((current) => (current + delta + testimonials.length) % testimonials.length)

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      className="scroll-mt-16 overflow-x-clip py-28 md:py-44">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <h2 id="testimonials-title" className="sr-only">
          Testimonials
        </h2>
        <div className="grid grid-rows-[auto_auto_1fr] [--controls-h:6rem] md:[--controls-h:6.5rem]">
          {testimonials.map((testimonial, position) => (
            <animated.figure
              key={testimonial.name}
              aria-hidden={position !== index}
              style={position === index ? incoming : undefined}
              className={
                position === index
                  ? 'm-0 [grid-area:1/1]'
                  : 'invisible m-0 pb-(--controls-h) [grid-area:1/1/-1/2]'
              }>
              <blockquote className="font-display max-w-[24ch] indent-[-0.42em] text-[clamp(1.5rem,3.8vw,3.5rem)] leading-[1.14] font-normal tracking-[-0.02em] text-pretty sm:max-w-[28ch]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10 md:mt-12">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-muted-foreground mt-1">
                  {testimonial.title}, {testimonial.org}
                </p>
              </figcaption>
            </animated.figure>
          ))}
          <div className="flex h-(--controls-h) items-center gap-4 pt-12 [grid-area:2/1] md:pt-14">
            <StepButton aria-label="Previous testimonial" onClick={() => step(-1)}>
              <ArrowLeft
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:-translate-x-0.5"
                strokeWidth={1.75}
              />
            </StepButton>
            <StepButton aria-label="Next testimonial" onClick={() => step(1)}>
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0.5"
                strokeWidth={1.75}
              />
            </StepButton>
            <p aria-live="polite" className="text-dim ml-2 text-sm tabular-nums">
              {index + 1} / {testimonials.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
