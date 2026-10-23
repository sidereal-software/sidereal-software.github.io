import { ArrowUpRight, ChevronDown } from 'lucide-react'
import { useId, useState } from 'react'

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
import {
  allPublications,
  featuredPublications,
  publicationProfiles,
  type Work as Publication,
} from '@/content/publications'

const altText = (image: CreditedImage) => `${image.name}, ${image.location}`

function ExternalLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="link-accent inline-flex items-center gap-2 text-sm">
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
    { label: 'Problem', text: study.problem, lead: false },
    { label: 'Approach', text: study.approach, lead: false },
    { label: 'Outcome', text: study.outcome, lead: true },
  ]

  return (
    <article className="mt-24 first:mt-0 md:mt-40">
      <figure>
        <div className="relative h-[26rem] overflow-hidden md:h-[clamp(20rem,72vh,46rem)]">
          <img
            src={lead.src}
            alt={altText(lead)}
            width={lead.width}
            height={lead.height}
            loading="lazy"
            className="size-full object-cover"
          />
          <div className="from-background absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t to-transparent" />
          <div className="page-gutter absolute inset-x-0 bottom-0">
            <Monument as="h3" properName>
              {study.name}
            </Monument>
          </div>
        </div>
        <div className="page-gutter">
          <ImageCredit
            image={lead}
            className="pt-6 md:ml-auto md:max-w-[42rem] md:text-right"
          />
        </div>
      </figure>

      <div className="page-gutter mt-14 grid gap-14 md:grid-cols-12 md:gap-8">
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
          {parts.map(({ label, text, lead }) => (
            <div
              key={label}
              className="border-border grid gap-3 border-t pt-6 sm:grid-cols-[8rem_1fr]">
              <dt className="text-dim text-xs tracking-[0.24em] uppercase sm:pt-1.5">
                {label}
              </dt>
              <dd
                className={
                  lead
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
        <p className="text-muted-foreground mt-4 max-w-[60ch] leading-relaxed text-pretty">
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
      <h3 id="career" className="label-heading">
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

function PublicationEntry({ work }: { work: Publication }) {
  return (
    <li className="border-border grid gap-1 border-t py-5 sm:grid-cols-[5rem_1fr] sm:gap-6">
      <p className="text-dim text-sm tabular-nums sm:pt-0.5">{work.year}</p>
      <div>
        <p className="leading-snug text-pretty">
          {work.link ? (
            <a
              href={work.link}
              target="_blank"
              rel="noreferrer"
              className="decoration-dim hover:decoration-primary underline underline-offset-[5px] transition-colors">
              {work.title}
            </a>
          ) : (
            work.title
          )}
        </p>
        {work.venue && <p className="text-muted-foreground mt-1 text-sm">{work.venue}</p>}
      </div>
    </li>
  )
}

function Publications() {
  const [expanded, setExpanded] = useState(false)
  const listId = useId()
  return (
    <section
      aria-labelledby="publications"
      className="mt-16 grid gap-8 md:mt-24 md:grid-cols-12">
      <h3 id="publications" className="label-heading md:col-span-5 md:pt-2">
        Publications
      </h3>
      <div className="md:col-span-7">
        <ul className="flex flex-col gap-4">
          {featuredPublications.map((paper) => (
            <li key={paper.link} className="text-balance">
              <a
                href={paper.link}
                target="_blank"
                rel="noreferrer"
                className="font-display decoration-dim hover:decoration-primary text-lg leading-[1.45] font-medium tracking-[-0.01em] underline underline-offset-[6px] transition-colors md:text-xl">
                {/* A no-break space glues the separator dash to the word before, so no line opens with it. */}
                {paper.label
                  .slice(0, paper.label.lastIndexOf(' ') + 1)
                  .replace(' - ', '\u00a0- ')}
                {/* The arrow rides with the last word so it never wraps onto a line alone. */}
                <span className="whitespace-nowrap">
                  {paper.label.slice(paper.label.lastIndexOf(' ') + 1)}
                  <ArrowUpRight
                    aria-hidden
                    className="text-primary ml-2 inline size-4 align-[-0.05em]"
                    strokeWidth={2}
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
          {publicationProfiles.map((profile) => (
            <li key={profile.href}>
              <ExternalLink href={profile.href}>{profile.label}</ExternalLink>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((open) => !open)}
          className="text-muted-foreground hover:text-foreground mt-10 inline-flex cursor-pointer items-center gap-2 text-sm transition-colors">
          All publications ({allPublications.length})
          <ChevronDown
            aria-hidden
            className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </button>
        <ol
          id={listId}
          aria-label="All publications"
          hidden={!expanded}
          className="border-border mt-6 border-b">
          {allPublications.map((work) => (
            <PublicationEntry key={work.title} work={work} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function OpenSource() {
  return (
    <p className="border-border text-muted-foreground mt-14 border-t pt-10 text-lg text-pretty">
      What I'm building next lives in the open.{' '}
      <a
        href="https://github.com/sidereal-software"
        target="_blank"
        rel="noreferrer"
        className="link-accent whitespace-nowrap">
        github.com/sidereal-software
      </a>
    </p>
  )
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-16 overflow-x-clip pt-32 pb-28 md:pt-48">
      <div className="page-gutter">
        <Monument className="mb-16 md:mb-24">Work</Monument>
      </div>
      {caseStudies.map((study) => (
        <CaseStudyBand key={study.name} study={study} />
      ))}
      <div className="page-gutter mt-32 md:mt-48">
        <Career />
        <Publications />
        <OpenSource />
      </div>
    </section>
  )
}
