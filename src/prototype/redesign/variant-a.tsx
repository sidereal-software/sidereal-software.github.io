// PROTOTYPE - throwaway. Monolith: restraint plus oversized uppercase monument type.
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu } from 'lucide-react'

import logo from '@/assets/logo.png'
import portrait from '@/assets/me.jpg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'

import {
  about,
  building,
  career,
  caseStudies,
  contact,
  faqs,
  footer,
  hero,
  institutions,
  kickers,
  nav,
  process,
  publications,
  services,
  servicesAside,
  stack,
  testimonials,
  type CaseStudy,
} from './content'
import { heroImage, telescopeImages, type CreditedImage } from './images'

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:ital,wght@0,300..700;1,300..700&family=Unbounded:wght@400..800&display=swap'

const tokens = {
  '--va-ground': '#050507',
  '--va-panel': '#0c0d10',
  '--va-ink': '#edece7',
  '--va-mute': '#a8a8b0',
  '--va-dim': '#8a8a94',
  '--va-rule': '#26272d',
  '--va-ice': '#9be7ff',
  '--background': '#050507',
  '--foreground': '#edece7',
  '--card': '#0c0d10',
  '--card-foreground': '#edece7',
  '--popover': '#0c0d10',
  '--popover-foreground': '#edece7',
  '--primary': '#9be7ff',
  '--primary-foreground': '#050507',
  '--secondary': '#15161a',
  '--secondary-foreground': '#edece7',
  '--muted': '#15161a',
  '--muted-foreground': '#a8a8b0',
  '--accent': '#15161a',
  '--accent-foreground': '#edece7',
  '--border': '#26272d',
  '--input': '#3a3b42',
  '--ring': '#9be7ff',
  fontFamily: "'Hanken Grotesk', ui-sans-serif, system-ui, sans-serif",
} as CSSProperties

const styles = `
.va { background: var(--va-ground); color: var(--va-ink); }
.va ::selection { background: var(--va-ice); color: var(--va-ground); }
.va main > section { background: transparent; border: 0; }
.va .va-display { font-family: 'Unbounded', ui-sans-serif, sans-serif; }
.va .va-monument {
  font-family: 'Unbounded', ui-sans-serif, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 0.82;
  letter-spacing: -0.04em;
  white-space: nowrap;
  font-size: min(var(--va-cap, 22rem), calc(108vw / (var(--len) * 0.86)));
  margin-left: -0.05em;
}
.va a:focus-visible, .va button:focus-visible { outline: 2px solid var(--va-ice); outline-offset: 4px; }
.va-hero-img { transform: scale(1.04); transform-origin: 62% 45%; }
@media (prefers-reduced-motion: no-preference) {
  .va-hero-img { animation: va-zoom 60s ease-in-out infinite alternate; }
  @supports (animation-timeline: view()) {
    .va .va-drift {
      animation: va-drift linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
  }
}
@keyframes va-zoom {
  from { transform: scale(1.04) translate3d(0, 0, 0); }
  to { transform: scale(1.12) translate3d(-1.5%, -1%, 0); }
}
@keyframes va-drift {
  from { transform: translateX(4vw); }
  to { transform: translateX(-2vw); }
}
`

function useFonts() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONT_HREF
    document.head.appendChild(link)
    return () => link.remove()
  }, [])
}

function Monument({
  text,
  as: Tag = 'h2',
  len,
  cap,
  className = '',
}: {
  text: string
  as?: 'h2' | 'p'
  len?: number
  cap?: string
  className?: string
}) {
  const style = { '--len': len ?? text.length, '--va-cap': cap } as CSSProperties
  return (
    <Tag className={`va-monument va-drift ${className}`} style={style}>
      {text}
    </Tag>
  )
}

function Credit({ image, className = '' }: { image: CreditedImage; className?: string }) {
  return (
    <figcaption className={`text-xs leading-relaxed text-(--va-dim) ${className}`}>
      <span className="text-(--va-mute)">{image.name}</span>
      <span aria-hidden> · </span>
      {image.location}
      <span aria-hidden> · </span>
      {image.credit}
      <span aria-hidden> · </span>
      <a
        href={image.licenseUrl}
        className="underline decoration-(--va-rule) underline-offset-4 hover:text-(--va-ink) hover:decoration-(--va-ice)"
        target="_blank"
        rel="noreferrer">
        {image.license}
      </a>
    </figcaption>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-(--va-rule) bg-(--va-ground)'
          : 'border-b border-transparent'
      }`}>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="" className="size-7 invert" />
          <span className="va-display text-[0.8rem] font-semibold tracking-[0.18em] uppercase">
            Sidereal Software
          </span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-(--va-mute) transition-colors hover:text-(--va-ink)">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={hero.primaryCta.href}
            className="hidden text-sm font-medium text-(--va-ice) underline decoration-(--va-ice)/40 underline-offset-[6px] transition-colors hover:decoration-(--va-ice) sm:inline">
            {hero.primaryCta.label}
          </a>
          <Sheet>
            <SheetTrigger className="flex items-center gap-2 text-sm text-(--va-ink) lg:hidden">
              <Menu className="size-5" strokeWidth={1.5} />
              <span>Menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              style={tokens}
              className="va dark w-full border-(--va-rule) bg-(--va-ground) px-6 pt-20 text-(--va-ink) sm:max-w-md">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="flex flex-col gap-2">
                {[...nav, { href: '#contact', label: 'Contact' }].map((item) => (
                  <li key={item.href}>
                    <SheetClose asChild>
                      <a
                        href={item.href}
                        className="va-display block py-2 text-3xl font-bold tracking-tight uppercase hover:text-(--va-ice)">
                        {item.label}
                      </a>
                    </SheetClose>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pb-8 text-sm text-(--va-mute)">{contact.location}</p>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <figure className="relative -z-10 m-0 h-[54svh] shrink-0 md:absolute md:inset-0 md:h-auto">
        <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:inset-y-0 md:right-[-14%] md:left-auto md:h-full md:w-[92%] md:[mask-image:linear-gradient(to_right,transparent,black_38%)]">
          <img
            src={heroImage.src}
            alt="The Dumbbell Nebula, a glowing cloud of red and blue gas around a pale core, set in a dense star field"
            width={heroImage.width}
            height={heroImage.height}
            className="va-hero-img size-full object-cover object-[50%_40%] md:brightness-[0.85]"
          />
        </div>
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-(--va-ground)/80 to-transparent" />
        <Credit
          image={heroImage}
          className="absolute right-5 bottom-24 hidden max-w-[24rem] bg-(--va-ground)/85 px-4 py-3 text-right md:block lg:right-12"
        />
      </figure>

      <div className="mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-start px-5 -mt-12 pb-10 md:mt-0 md:pt-24 sm:px-8 md:justify-center md:pb-36 lg:px-12">
        <div className="max-w-[40rem] md:max-w-[46%]">
          <p className="mb-6 text-[0.7rem] font-medium tracking-[0.2em] text-(--va-ice) uppercase sm:text-xs sm:tracking-[0.32em]">
            {kickers.A}
          </p>
          <h1 className="va-display text-[clamp(1.75rem,3.5vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.02em] text-balance uppercase">
            {hero.h1}
          </h1>
          <p className="mt-7 max-w-[34rem] text-lg leading-relaxed text-(--va-mute)">
            {hero.lede}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center gap-2 bg-(--va-ice) px-6 text-sm font-semibold tracking-wide text-(--va-ground) transition-[background-color] hover:bg-(--va-ink)">
              {hero.primaryCta.label}
              <ArrowRight className="size-4" strokeWidth={2} />
            </a>
            <a
              href={hero.secondaryCta.href}
              className="text-sm font-medium underline decoration-(--va-dim) underline-offset-[6px] transition-colors hover:decoration-(--va-ink)">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
        <Credit image={heroImage} className="mt-10 md:hidden" />
      </div>

      <div className="border-t border-(--va-rule) md:absolute md:inset-x-0 md:bottom-0 md:bg-(--va-ground)/85">
        <ul
          aria-label="Institutions I have worked with"
          className="mx-auto flex max-w-[90rem] flex-wrap gap-x-7 gap-y-2 px-5 py-5 text-[0.7rem] tracking-[0.2em] text-(--va-mute) uppercase sm:px-8 lg:flex-nowrap lg:justify-between lg:px-12">
          {institutions.map((name) => (
            <li key={name} className="whitespace-nowrap">
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="overflow-x-clip pt-32 pb-28 md:pt-48">
      <Monument text="Services" className="text-(--va-ink)" />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <ol className="mt-16 border-t border-(--va-rule) md:mt-24">
          {services.map((service, i) => (
            <li
              key={service.title}
              className="grid gap-4 border-b border-(--va-rule) py-10 md:grid-cols-12 md:gap-8 md:py-14">
              <span className="va-display text-sm text-(--va-ice) tabular-nums md:col-span-1 md:pt-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="va-display text-[clamp(1.6rem,3.6vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance uppercase md:col-span-7">
                {service.title}
              </h3>
              <p className="max-w-[36ch] text-base leading-relaxed text-(--va-mute) md:col-span-4 md:pt-2">
                {service.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-10 md:grid-cols-12 md:gap-8">
          <h3 className="va-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance md:col-span-5 md:text-3xl">
            {servicesAside.title}
          </h3>
          <p className="max-w-[60ch] text-lg leading-relaxed text-(--va-mute) md:col-span-6 md:col-start-7">
            {servicesAside.body}
          </p>
        </div>

        <p className="mt-20 text-sm leading-loose text-(--va-dim)">
          {stack.map((item, i) => (
            <span key={item}>
              <span className="whitespace-nowrap text-(--va-mute)">{item}</span>
              {i < stack.length - 1 && (
                <span aria-hidden className="px-3">
                  /
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

function CaseStudyBand({ study }: { study: CaseStudy }) {
  const images = [...telescopeImages(study.telescopes)].sort(
    (a, b) => b.width / b.height - a.width / a.height,
  )
  const [lead, ...rest] = images
  const parts = [
    ['Problem', study.problem],
    ['Approach', study.approach],
    ['Outcome', study.outcome],
  ] as const

  return (
    <article className="mt-24 first:mt-0 md:mt-40">
      {lead && (
        <figure className="m-0">
          <div className="relative h-[clamp(20rem,72vh,46rem)] overflow-hidden">
            <img
              src={lead.src}
              alt={`${lead.name} telescope, ${lead.location}`}
              width={lead.width}
              height={lead.height}
              loading="lazy"
              className="size-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--va-ground) to-transparent" />
            <h3
              className="va-monument absolute bottom-0 left-0 translate-y-[0.14em] text-(--va-ink)"
              style={
                {
                  '--len': Math.max(study.name.length, 6),
                  '--va-cap': '16rem',
                } as CSSProperties
              }>
              {study.name}
            </h3>
          </div>
          <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
            <Credit image={lead} className="pt-6 md:text-right" />
          </div>
        </figure>
      )}

      <div className="mx-auto mt-14 grid max-w-[90rem] gap-14 px-5 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
        <div className="md:col-span-4">
          {!lead && (
            <h3 className="va-display mb-6 text-4xl font-bold uppercase">{study.name}</h3>
          )}
          <p className="va-display text-lg font-semibold tracking-tight">{study.role}</p>
          <p className="mt-2 text-(--va-mute)">{study.org}</p>
          <p className="mt-1 text-sm text-(--va-dim) tabular-nums">{study.period}</p>
          <ul className="mt-8 flex flex-col gap-3">
            {study.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-(--va-ice) underline decoration-(--va-ice)/40 underline-offset-[6px] hover:decoration-(--va-ice)">
                  {link.github ? `GitHub: ${link.label}` : link.label}
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
          {rest.map((image) => (
            <figure key={image.name} className="m-0 mt-12 hidden md:block">
              <img
                src={image.src}
                alt={`${image.name} telescope, ${image.location}`}
                width={image.width}
                height={image.height}
                loading="lazy"
                className="max-h-[26rem] w-full object-cover"
              />
              <Credit image={image} className="pt-3" />
            </figure>
          ))}
        </div>
        <dl className="flex flex-col gap-10 md:col-span-7 md:col-start-6">
          {parts.map(([label, text]) => (
            <div
              key={label}
              className="grid gap-3 border-t border-(--va-rule) pt-6 sm:grid-cols-[8rem_1fr]">
              <dt className="text-xs tracking-[0.24em] text-(--va-dim) uppercase">
                {label}
              </dt>
              <dd
                className={`m-0 max-w-[62ch] leading-relaxed ${
                  label === 'Outcome'
                    ? 'va-display text-xl font-medium tracking-tight text-(--va-ink) md:text-2xl'
                    : 'text-lg text-(--va-mute)'
                }`}>
                {text}
              </dd>
            </div>
          ))}
        </dl>
        {rest.map((image) => (
          <figure key={image.name} className="m-0 md:hidden">
            <img
              src={image.src}
              alt={`${image.name} telescope, ${image.location}`}
              width={image.width}
              height={image.height}
              loading="lazy"
              className="max-h-[28rem] w-full object-cover"
            />
            <Credit image={image} className="pt-3" />
          </figure>
        ))}
      </div>
    </article>
  )
}

function Work() {
  return (
    <section id="work" className="overflow-x-clip pt-32 pb-28 md:pt-48">
      <Monument text="Work" len={4.9} cap="20rem" className="mb-16 md:mb-24" />
      {caseStudies.map((study) => (
        <CaseStudyBand key={study.name} study={study} />
      ))}

      <div className="mx-auto mt-32 max-w-[90rem] px-5 sm:px-8 md:mt-48 lg:px-12">
        <h3 className="text-xs tracking-[0.32em] text-(--va-dim) uppercase">Career</h3>
        <ol className="mt-8 border-t border-(--va-rule)">
          {career.map((entry) => (
            <li
              key={`${entry.org}-${entry.period}`}
              className="grid gap-4 border-b border-(--va-rule) py-10 md:grid-cols-12 md:gap-8">
              <p className="va-display text-[clamp(1.75rem,3.4vw,3rem)] leading-none font-semibold tracking-[-0.03em] tabular-nums md:col-span-5">
                {entry.period}
              </p>
              <div className="md:col-span-7">
                <p className="va-display text-sm font-semibold tracking-[0.08em] uppercase">
                  {entry.org}
                </p>
                <p className="mt-1 text-(--va-mute)">{entry.role}</p>
                <p className="mt-4 max-w-[60ch] leading-relaxed text-(--va-mute)">
                  {entry.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <h3 className="text-xs tracking-[0.32em] text-(--va-dim) uppercase md:col-span-5">
            Publications
          </h3>
          <ul className="flex flex-col gap-3 md:col-span-7">
            {publications.map((pub) =>
              pub.href ? (
                <li key={pub.label}>
                  <a
                    href={pub.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-(--va-dim) underline-offset-[6px] hover:decoration-(--va-ice)">
                    {pub.label}
                  </a>
                </li>
              ) : (
                <li key={pub.label}>{pub.label}</li>
              ),
            )}
          </ul>
        </div>

        <p className="mt-16 border-t border-(--va-rule) pt-10 text-lg text-(--va-mute)">
          {building.text}{' '}
          <a
            href={building.href}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap text-(--va-ice) underline decoration-(--va-ice)/40 underline-offset-[6px] hover:decoration-(--va-ice)">
            {building.linkLabel}
          </a>
        </p>
      </div>
    </section>
  )
}

function Testimonials() {
  const [index, setIndex] = useState(0)
  const step = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)

  return (
    <section
      id="testimonials"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      className="overflow-x-clip border-y border-(--va-rule) py-28 md:py-44">
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="grid">
          {testimonials.map((t, i) => (
            <figure
              key={t.name}
              aria-hidden={i !== index}
              className={`m-0 [grid-area:1/1] transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'invisible opacity-0'
              }`}>
              <blockquote className="va-display max-w-[24ch] text-[clamp(1.6rem,3.8vw,3.5rem)] leading-[1.12] font-normal tracking-[-0.02em] text-pretty sm:max-w-[28ch]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-10">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-1 text-(--va-mute)">
                  {t.title}, {t.org}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-14 flex items-center gap-6">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous testimonial"
            className="grid size-12 place-items-center border border-(--va-rule) transition-colors hover:border-(--va-ice) hover:text-(--va-ice)">
            <ArrowLeft className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next testimonial"
            className="grid size-12 place-items-center border border-(--va-rule) transition-colors hover:border-(--va-ice) hover:text-(--va-ice)">
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </button>
          <p className="text-sm text-(--va-dim) tabular-nums" aria-live="polite">
            {index + 1} / {testimonials.length}
          </p>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="overflow-x-clip pt-32 pb-28 md:pt-48">
      <Monument text="About" len={5.4} className="mb-16 md:mb-24" />
      <div className="mx-auto grid max-w-[90rem] gap-14 px-5 sm:px-8 md:grid-cols-12 md:gap-8 lg:px-12">
        <figure className="m-0 md:col-span-5">
          <img
            src={portrait}
            alt="Portrait of Dan Avner"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover grayscale-[15%] md:aspect-[3/4.4]"
          />
        </figure>
        <div className="md:col-span-6 md:col-start-7 md:self-end">
          <p className="va-display text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.02em] text-balance">
            {about.pullQuote}
          </p>
          <div className="mt-10 flex flex-col gap-5 text-lg leading-relaxed text-(--va-mute)">
            {about.paragraphs.map((p) => (
              <p key={p} className="max-w-[60ch]">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-10 border-t border-(--va-rule) pt-6">
            <p className="va-display font-semibold uppercase tracking-[0.08em]">
              {about.name}
            </p>
            <p className="mt-1 text-(--va-mute)">{about.title}</p>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {about.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm underline decoration-(--va-dim) underline-offset-[6px] hover:text-(--va-ice) hover:decoration-(--va-ice)">
                    {link.label}
                    <ArrowUpRight className="size-3.5" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" className="overflow-x-clip pt-32 pb-28 md:pt-48">
      <Monument text="Process" len={7.6} className="mb-16 md:mb-24" />
      <div className="mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.map((step, i) => (
            <li key={step.title} className="border-t border-(--va-rule) pt-6">
              <span
                aria-hidden
                className="va-display block text-[clamp(5rem,9vw,8.5rem)] leading-none font-bold tracking-[-0.06em] text-(--va-dim)">
                {i + 1}
              </span>
              <h3 className="va-display mt-6 text-lg font-semibold uppercase tracking-[0.04em]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-3 max-w-[32ch] leading-relaxed text-(--va-mute)">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-8">
          <h3 className="text-xs tracking-[0.32em] text-(--va-dim) uppercase md:col-span-4 md:pt-7">
            Questions
          </h3>
          <Accordion type="single" collapsible className="md:col-span-8">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-(--va-rule) first:border-t">
                <AccordionTrigger className="va-display rounded-none py-6 text-base font-medium tracking-tight hover:text-(--va-ice) hover:no-underline md:text-xl [&>svg]:size-5 [&>svg]:text-(--va-mute)">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[62ch] pb-8 text-base leading-relaxed text-(--va-mute)">
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

const fieldClass =
  'h-auto rounded-none border-0 border-b border-(--va-input) bg-transparent px-0 py-3 text-lg shadow-none placeholder:text-(--va-dim) focus-visible:border-(--va-ice) focus-visible:ring-0 md:text-lg dark:bg-transparent'

function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }
  const [name, email, organization, message] = contact.fields

  return (
    <section id="contact" className="overflow-x-clip pt-32 pb-28 md:pt-48">
      <h2 className="va-monument va-drift" style={{ '--len': 7.4 } as CSSProperties}>
        Start a
        <br />
        project
      </h2>
      <div
        className="mx-auto mt-16 grid max-w-[90rem] gap-16 px-5 sm:px-8 md:mt-24 md:grid-cols-12 md:gap-8 lg:px-12"
        style={{ '--va-input': '#5a5b63' } as CSSProperties}>
        <div className="md:col-span-4">
          <p className="max-w-[34ch] text-lg leading-relaxed text-(--va-mute)">
            {contact.description}
          </p>
          <p className="mt-8 flex items-center gap-3 text-sm">
            <span aria-hidden className="size-2 rounded-full bg-(--va-ice)" />
            {contact.status}
          </p>
          <p className="mt-2 text-sm text-(--va-dim)">{contact.location}</p>
        </div>
        <form
          onSubmit={onSubmit}
          className="grid gap-10 md:col-span-7 md:col-start-6 sm:grid-cols-2">
          <div className="grid gap-1">
            <Label
              htmlFor="va-name"
              className="text-xs tracking-[0.2em] text-(--va-mute) uppercase">
              {name}
            </Label>
            <Input
              id="va-name"
              name="name"
              autoComplete="name"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1">
            <Label
              htmlFor="va-email"
              className="text-xs tracking-[0.2em] text-(--va-mute) uppercase">
              {email}
            </Label>
            <Input
              id="va-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1 sm:col-span-2">
            <Label
              htmlFor="va-org"
              className="text-xs tracking-[0.2em] text-(--va-mute) uppercase">
              {organization}
            </Label>
            <Input
              id="va-org"
              name="organization"
              autoComplete="organization"
              className={fieldClass}
            />
          </div>
          <div className="grid gap-1 sm:col-span-2">
            <Label
              htmlFor="va-message"
              className="text-xs tracking-[0.2em] text-(--va-mute) uppercase">
              {message}
            </Label>
            <Textarea
              id="va-message"
              name="message"
              required
              rows={5}
              className={`${fieldClass} min-h-36 resize-y`}
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 bg-(--va-ice) px-7 text-sm font-semibold tracking-wide text-(--va-ground) transition-[background-color] hover:bg-(--va-ink)">
              {contact.submit}
              <ArrowRight className="size-4" strokeWidth={2} />
            </button>
            <p role="status" className="text-sm text-(--va-mute)">
              {sent ? 'Prototype - not sent' : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  const shown = new Map<string, CreditedImage>()
  for (const image of [
    heroImage,
    ...caseStudies.flatMap((s) => telescopeImages(s.telescopes)),
  ])
    shown.set(image.name, image)

  return (
    <footer className="border-t border-(--va-rule)">
      <div className="mx-auto max-w-[90rem] px-5 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Sidereal Software" className="size-10 invert" />
            <div>
              <p className="text-sm">{footer.line}</p>
              <p className="mt-1 text-sm text-(--va-dim)">{footer.tagline}</p>
            </div>
          </div>
          <a
            href="#home"
            className="text-sm text-(--va-mute) underline underline-offset-[6px] hover:text-(--va-ink)">
            Back to top
          </a>
        </div>
        <div className="mt-14 border-t border-(--va-rule) pt-8">
          <h2 className="text-xs tracking-[0.32em] text-(--va-dim) uppercase">
            Image credits
          </h2>
          <ul className="mt-5 grid gap-3 text-xs leading-relaxed text-(--va-dim) md:grid-cols-2 md:gap-x-12">
            {[...shown.values()].map((image) => (
              <li key={image.name}>
                <span className="text-(--va-mute)">{image.name}</span>: {image.credit} ·{' '}
                <a
                  href={image.licenseUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4 hover:text-(--va-ink)">
                  {image.license}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

export function VariantA() {
  useFonts()
  return (
    <div className="va dark min-h-screen" style={tokens}>
      <style>{styles}</style>
      <Header />
      <main>
        <Hero />
        <Services />
        <Work />
        <Testimonials />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
