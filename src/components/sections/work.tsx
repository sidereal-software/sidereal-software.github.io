import { ArrowUpRight } from 'lucide-react'

import { ImageCredit } from '@/components/image-credit'
import { Monument } from '@/components/monument'
import {
  career,
  caseStudies,
  formatPeriod,
  type CareerEntry,
  type CaseStudy,
} from '@/content/career'
import { telescopes, type CreditedImage } from '@/content/images'

const gutter = 'mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12'

const altText = (image: CreditedImage) => `${image.name}, ${image.location}`

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-primary decoration-primary/40 hover:decoration-primary inline-flex items-center gap-2 text-sm underline underline-offset-[6px] transition-colors">
      {children}
      <ArrowUpRight aria-hidden className="size-3.5 shrink-0" strokeWidth={2} />
    </a>
  )
}

function CreditedPhoto({
  image,
  className,
}: {
  image: CreditedImage
  className?: string
}) {
  return (
    <figure className={className}>
      <img
        src={image.src}
        alt={altText(image)}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="aspect-[4/3] w-full object-cover"
      />
      <ImageCredit image={image} className="pt-3" />
    </figure>
  )
}

function CaseStudyBand({ study }: { study: CaseStudy }) {
  // The widest photo carries the full-bleed band; the rest sit beside the details.
  const [lead, ...rest] = study.telescopes
    .map((key) => telescopes[key])
    .sort((a, b) => b.width / b.height - a.width / a.height)
  const parts = [
    ['Problem', study.problem],
    ['Approach', study.approach],
    ['Outcome', study.outcome],
  ] as const

  return (
    <article className="mt-24 first:mt-0 md:mt-40">
      <figure>
        <div className="relative h-[clamp(20rem,72vh,46rem)] overflow-hidden">
          <img
            src={lead.src}
            alt={altText(lead)}
            width={lead.width}
            height={lead.height}
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="from-background absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t to-transparent" />
          <div className={`absolute inset-x-0 bottom-0 ${gutter}`}>
            {/* Padding in the span's own em keeps descenders such as pyINDI's inside the photo. */}
            <Monument as="h3" properName cap={16} className="[&>span]:pb-[0.2em]">
              {study.name}
            </Monument>
          </div>
        </div>
        <div className={gutter}>
          <ImageCredit
            image={lead}
            className="pt-6 md:ml-auto md:max-w-[42rem] md:text-right"
          />
        </div>
      </figure>

      <div className={`mt-14 grid gap-14 md:grid-cols-12 md:gap-8 ${gutter}`}>
        <div className="md:col-span-4">
          <p className="font-display text-lg font-semibold tracking-[-0.01em]">
            {study.role}
          </p>
          <p className="text-muted-foreground mt-2">{study.org}</p>
          <p className="text-dim mt-1 text-sm tabular-nums">
            {formatPeriod(study.period)}
          </p>
          <ul className="mt-8 flex flex-col gap-3">
            {study.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
          {rest.map((image) => (
            <CreditedPhoto
              key={image.name}
              image={image}
              className="mt-12 max-md:hidden"
            />
          ))}
        </div>
        <dl className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
          {parts.map(([label, text]) => (
            <div
              key={label}
              className="border-border grid gap-3 border-t pt-6 sm:grid-cols-[8rem_1fr]">
              <dt className="text-dim text-xs tracking-[0.24em] uppercase sm:pt-1.5">
                {label}
              </dt>
              <dd
                className={
                  label === 'Outcome'
                    ? 'font-display max-w-[40ch] text-xl leading-snug font-medium tracking-[-0.01em] text-balance md:text-2xl'
                    : 'text-muted-foreground max-w-[62ch] text-lg leading-relaxed'
                }>
                {text}
              </dd>
            </div>
          ))}
        </dl>
        {rest.map((image) => (
          <CreditedPhoto key={image.name} image={image} className="md:hidden" />
        ))}
      </div>
    </article>
  )
}

function CareerItem({ entry }: { entry: CareerEntry }) {
  const image = entry.telescope && telescopes[entry.telescope]
  return (
    <li className="border-border grid gap-6 border-b py-10 md:grid-cols-12 md:gap-8 md:py-14">
      <p className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums md:col-span-12 lg:col-span-4">
        {formatPeriod(entry.period)}
      </p>
      <div className="md:col-span-7 lg:col-span-5">
        <p className="font-display text-lg leading-snug font-semibold tracking-[-0.01em] text-balance">
          {entry.org}
        </p>
        <p className="text-muted-foreground mt-1">{entry.role}</p>
        <p className="text-muted-foreground mt-4 max-w-[60ch] leading-relaxed">
          {entry.summary}
        </p>
        {entry.links && (
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {entry.links.map((link) => (
              <li key={link.href}>
                <ExternalLink href={link.href}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        )}
      </div>
      {image && <CreditedPhoto image={image} className="md:col-span-5 lg:col-span-3" />}
    </li>
  )
}

function Career() {
  return (
    <div>
      <h3
        id="career"
        className="text-dim text-xs font-medium tracking-[0.32em] uppercase">
        Career
      </h3>
      <ol aria-labelledby="career" className="border-border mt-8 border-t">
        {career.map((entry) => (
          <CareerItem key={`${entry.org} ${entry.role}`} entry={entry} />
        ))}
      </ol>
    </div>
  )
}

function OpenSource() {
  return (
    <p className="text-muted-foreground mt-14 text-lg text-pretty">
      What I'm building next lives in the open.{' '}
      <a
        href="https://github.com/sidereal-software"
        target="_blank"
        rel="noreferrer"
        className="text-primary decoration-primary/40 hover:decoration-primary whitespace-nowrap underline underline-offset-[6px] transition-colors">
        github.com/sidereal-software
      </a>
    </p>
  )
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 overflow-x-clip pt-32 pb-28 md:pt-48">
      <div className={gutter}>
        <Monument cap={24} className="mb-16 md:mb-24">
          Work
        </Monument>
      </div>
      {caseStudies.map((study) => (
        <CaseStudyBand key={study.name} study={study} />
      ))}
      <div className={`mt-32 md:mt-48 ${gutter}`}>
        <Career />
        <OpenSource />
      </div>
    </section>
  )
}
