// PROTOTYPE - throwaway. Signal: editorial restraint with one magenta trace.
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react'
import { ArrowRight, ArrowUpRight, Menu } from 'lucide-react'

import logo from '@/assets/logo.png'
import me from '@/assets/me.jpg'
import { GitHubIcon } from '@/components/icons'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

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

const FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600&family=Red+Hat+Display:ital,wght@0,400;0,500;0,600;1,400&family=Red+Hat+Text:wght@400;500&display=swap'

const palette = {
  '--ground': '#13121B',
  '--raise': '#1A1824',
  '--fg': '#F5EDEF',
  '--dim': '#A39CAD',
  '--hair': 'rgba(245, 237, 239, 0.12)',
  '--hair-strong': 'rgba(245, 237, 239, 0.3)',
  '--signal': '#FF2E88',
  '--background': '#13121B',
  '--foreground': '#F5EDEF',
  '--card': '#1A1824',
  '--card-foreground': '#F5EDEF',
  '--popover': '#1A1824',
  '--popover-foreground': '#F5EDEF',
  '--primary': '#F5EDEF',
  '--primary-foreground': '#13121B',
  '--muted': '#1A1824',
  '--muted-foreground': '#A39CAD',
  '--accent': '#1A1824',
  '--accent-foreground': '#F5EDEF',
  '--border': 'rgba(245, 237, 239, 0.12)',
  '--input': 'rgba(245, 237, 239, 0.3)',
  '--ring': '#FF2E88',
} as CSSProperties

const scopedCss = `
html:has(.vb-root) { background: #13121B; scrollbar-color: #3A3546 #13121B; scroll-padding-top: 72px; }
.vb-root main > section { background: transparent; border: 0; }
.vb-root { font-family: 'Red Hat Text', ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
.vb-display { font-family: 'Red Hat Display', ui-sans-serif, system-ui, sans-serif; }
.vb-label { font-family: 'Chakra Petch', ui-sans-serif, system-ui, sans-serif; font-size: 11px; line-height: 1.4; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.vb-root ::selection { background: rgba(255, 46, 136, 0.4); color: #F5EDEF; }
.vb-root :focus-visible { outline: 1px solid var(--signal); outline-offset: 4px; }
.vb-root input, .vb-root textarea { caret-color: var(--signal); }
.vb-root a { text-underline-offset: 4px; text-decoration-thickness: 1px; }
.vb-fill { height: var(--trace, 100%); }
.vb-pulse { display: none; top: var(--trace, 0); }
.vb-root[data-live] .vb-pulse { display: block; }
@keyframes vb-drift {
  from { transform: scale(1.06) translate3d(-1.5%, 1%, 0) rotate(-1deg); }
  to { transform: scale(1.14) translate3d(1.5%, -1.5%, 0) rotate(1.5deg); }
}
.vb-drift { animation: vb-drift 48s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate; }
@media (prefers-reduced-motion: reduce) {
  .vb-drift { animation: none; transform: scale(1.06); }
  .vb-fill { height: 100% !important; }
  .vb-root[data-live] .vb-pulse { display: none; }
  .vb-root * { transition: none !important; }
}
`

const sectionIds = [
  'home',
  'services',
  'work',
  'testimonials',
  'about',
  'process',
  'contact',
]

// Trace sits at x=20 (mobile) and x=56 (lg); content starts at 44 / 136.
const wrap =
  'relative mx-auto w-full max-w-[1280px] pr-4 pl-11 sm:pr-6 lg:pr-10 lg:pl-[136px]'
const toTrace = 'left-[-24px] lg:left-[-80px]'

export function VariantB() {
  const rootRef = useRef<HTMLDivElement>(null)
  const active = useActiveSection()

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => link.remove()
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    const update = () => {
      frame = 0
      const top = root.getBoundingClientRect().top + window.scrollY
      const head = window.scrollY + window.innerHeight * 0.55 - top
      root.style.setProperty(
        '--trace',
        `${Math.max(0, Math.min(head, root.offsetHeight))}px`,
      )
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    root.setAttribute('data-live', '')
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      root.removeAttribute('data-live')
      root.style.removeProperty('--trace')
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="vb-root dark relative min-h-screen overflow-x-clip bg-(--ground) text-(--fg)"
      style={palette}>
      <style>{scopedCss}</style>
      <Trace />
      <Header active={active} />
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

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.45
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])
  return active
}

function Trace() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div className="relative mx-auto h-full max-w-[1280px]">
        <div className="absolute inset-y-0 left-5 w-px bg-(--hair) lg:left-14" />
        <div className="vb-fill absolute top-0 left-5 w-px bg-(--signal) lg:left-14" />
        <div className="vb-pulse absolute left-5 size-[5px] -translate-1/2 rounded-full bg-(--signal) lg:left-14" />
      </div>
    </div>
  )
}

function SectionMark({
  index,
  label,
  id,
}: {
  index: string
  label: string
  id?: string
}) {
  return (
    <div className="relative mb-12 flex items-center lg:mb-16">
      <span
        aria-hidden
        className={`absolute top-1/2 ${toTrace} h-px w-4 bg-(--signal) lg:w-[68px]`}
      />
      <span
        aria-hidden
        className={`absolute top-1/2 ${toTrace} size-[9px] -translate-1/2 rounded-full border border-(--signal) bg-(--ground)`}
      />
      <h2 id={id} className="vb-label flex gap-3 text-(--fg)">
        <span className="text-(--signal)">{index}</span>
        {label}
      </h2>
    </div>
  )
}

function PrimaryCta({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={hero.primaryCta.href}
      className={`group relative inline-flex items-center gap-2 border border-(--hair-strong) font-medium text-(--fg) transition-colors duration-300 hover:bg-white/[0.06] ${className}`}>
      {children}
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
      />
      <span
        aria-hidden
        className="absolute inset-x-[-1px] bottom-[-1px] h-px bg-(--signal)"
      />
    </a>
  )
}

function Header({ active }: { active: string }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-(--hair) bg-(--ground)">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between pr-4 pl-2 sm:pr-6 lg:pr-10 lg:pl-[44px]">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="" width={24} height={24} className="size-6 invert" />
          <span className="vb-display text-[15px] font-semibold tracking-[-0.01em]">
            Sidereal Software
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const on = active === item.href.slice(1)
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={on ? 'true' : undefined}
                className={`relative py-1 text-sm transition-colors duration-300 hover:text-(--fg) ${on ? 'text-(--fg)' : 'text-(--dim)'}`}>
                {item.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-px h-px origin-left bg-(--signal) transition-transform duration-500 ease-out ${on ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </a>
            )
          })}
          <PrimaryCta className="h-9 px-4 text-sm">{hero.primaryCta.label}</PrimaryCta>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="vb-label flex h-10 items-center gap-2 px-2 text-(--fg) md:hidden">
            <Menu aria-hidden className="size-4" />
            Menu
          </SheetTrigger>
          <SheetContent
            side="right"
            style={palette}
            className="dark vb-root w-[84%] gap-0 border-l border-(--hair) bg-(--ground) px-6 pt-16 text-(--fg)">
            <SheetTitle className="vb-label mb-6 text-(--dim)">Menu</SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="vb-display border-b border-(--hair) py-4 text-2xl font-medium">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="mt-10" onClick={() => setOpen(false)}>
              <PrimaryCta className="h-12 px-6 text-sm">
                {hero.primaryCta.label}
              </PrimaryCta>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function Credit({ image, className = '' }: { image: CreditedImage; className?: string }) {
  return (
    <span className={className}>
      {image.credit} ·{' '}
      <a href={image.licenseUrl} className="underline hover:text-(--fg)">
        {image.license}
      </a>
    </span>
  )
}

function Hero() {
  return (
    <section
      id="home"
      aria-label="Introduction"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-20">
      <div className={wrap}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <div className="relative mb-8 flex items-center">
              <span
                aria-hidden
                className={`absolute top-1/2 ${toTrace} h-px w-4 bg-(--signal) lg:w-[68px]`}
              />
              <span
                aria-hidden
                className={`absolute top-1/2 ${toTrace} size-[9px] -translate-1/2 rounded-full bg-(--signal)`}
              />
              <p className="vb-label text-(--signal)">{kickers.B}</p>
            </div>
            <h1 className="vb-display max-w-[16ch] text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.025em] text-balance sm:text-5xl lg:text-[4.25rem]">
              {hero.h1}
            </h1>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-(--dim)">
              {hero.lede}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <PrimaryCta className="h-12 px-6 text-[15px]">
                {hero.primaryCta.label}
              </PrimaryCta>
              <a
                href={hero.secondaryCta.href}
                className="group inline-flex items-center gap-2 text-[15px] text-(--dim) transition-colors hover:text-(--fg)">
                {hero.secondaryCta.label}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
          <figure className="lg:col-span-6 lg:pl-6">
            <div className="mx-auto aspect-square w-full max-w-[540px] rounded-full p-2 ring-1 ring-(--hair)">
              <div className="size-full overflow-hidden rounded-full bg-black">
                <img
                  src={heroImage.src}
                  alt={heroImage.name}
                  width={heroImage.width}
                  height={heroImage.height}
                  fetchPriority="high"
                  className="vb-drift size-full object-cover"
                />
              </div>
            </div>
            <figcaption className="mx-auto mt-6 max-w-[540px] text-xs leading-relaxed text-(--dim)">
              <span className="vb-label mr-3 text-(--fg)">{heroImage.name}</span>
              {heroImage.location}. <Credit image={heroImage} />
            </figcaption>
          </figure>
        </div>
        <ul
          aria-label="Institutions"
          className="mt-20 grid grid-cols-2 border-t border-(--hair) sm:grid-cols-4 lg:mt-24 lg:grid-cols-7">
          {institutions.map((name, i) => (
            <li
              key={name}
              className={`border-(--hair) py-5 pr-4 text-[13px] leading-snug text-(--dim) max-sm:border-b ${i > 0 ? 'lg:border-l lg:pl-4' : ''}`}>
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
    <section id="services" aria-labelledby="services-h" className="py-24 lg:py-32">
      <div className={wrap}>
        <SectionMark index="02" label="Services" id="services-h" />
        <div className="grid sm:grid-cols-2">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`border-t border-(--hair) py-10 sm:pr-10 ${i % 2 === 1 ? 'sm:border-l sm:pl-10' : ''}`}>
              <h3 className="vb-display text-2xl leading-tight font-semibold tracking-[-0.015em] text-balance">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[46ch] leading-relaxed text-(--dim)">
                {s.description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-10 border-t border-(--hair) pt-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="vb-display text-[1.75rem] leading-tight font-medium tracking-[-0.015em] text-balance">
              {servicesAside.title}
            </h3>
            <p className="mt-4 max-w-[58ch] text-lg leading-relaxed text-(--dim)">
              {servicesAside.body}
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <h3 className="vb-label text-(--dim)">Stack</h3>
            <ul className="mt-4 flex flex-wrap gap-x-3 text-sm leading-7 text-(--dim)">
              {stack.map((item, i) => (
                <li key={item} className="whitespace-nowrap">
                  {i > 0 && (
                    <span aria-hidden className="mr-3">
                      ·
                    </span>
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Photo({ image, natural = false }: { image: CreditedImage; natural?: boolean }) {
  return (
    <figure>
      <div className="overflow-hidden bg-(--raise)">
        <img
          src={image.src}
          alt={`${image.name}, ${image.location}`}
          width={image.width}
          height={image.height}
          style={
            natural ? { aspectRatio: `${image.width} / ${image.height}` } : undefined
          }
          className="aspect-[4/3] w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 text-xs leading-relaxed text-(--dim)">
        <span className="text-(--fg)">{image.name}</span>, {image.location}.{' '}
        <Credit image={image} />
      </figcaption>
    </figure>
  )
}

function CaseSpread({ study, flip }: { study: CaseStudy; flip: boolean }) {
  const [lead, ...rest] = telescopeImages(study.telescopes)
  const rows = [
    ['Problem', study.problem],
    ['Approach', study.approach],
    ['Outcome', study.outcome],
  ]
  return (
    <article className="grid gap-12 border-t border-(--hair) py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
      {lead && (
        <div className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
          <Photo image={lead} natural />
          {rest.length > 0 && (
            <div className="mt-6 grid grid-cols-2 gap-4">
              {rest.map((img) => (
                <Photo key={img.name} image={img} />
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className={`lg:col-span-5 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
        <h3 className="vb-display text-4xl font-semibold tracking-[-0.025em] lg:text-5xl">
          {study.name}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed">
          {study.role}
          <span className="block text-(--dim)">
            {study.org} · {study.period}
          </span>
        </p>
        <dl className="mt-10">
          {rows.map(([term, text]) => (
            <div
              key={term}
              className="grid gap-2 border-t border-(--hair) py-5 sm:grid-cols-[96px_1fr] sm:gap-6">
              <dt className="vb-label pt-1 text-(--dim)">{term}</dt>
              <dd className="leading-relaxed text-(--fg)/90">{text}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-(--hair) pt-5">
          {study.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center gap-2 text-sm text-(--fg) underline decoration-(--hair-strong) hover:decoration-(--fg)">
                {link.github ? (
                  <GitHubIcon className="size-4" />
                ) : (
                  <ArrowUpRight aria-hidden className="size-4" />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-h" className="py-24 lg:py-32">
      <div className={wrap}>
        <SectionMark index="03" label="Work" id="work-h" />
        {caseStudies.map((study, i) => (
          <CaseSpread key={study.name} study={study} flip={i % 2 === 1} />
        ))}

        <div className="mt-10 border-t border-(--hair) pt-14 lg:mt-16">
          <h3 className="vb-label mb-8 text-(--dim)">Career</h3>
          <div role="table" aria-label="Career">
            <div
              role="row"
              className="vb-label hidden grid-cols-[132px_1.1fr_1fr_1.7fr] gap-6 pb-3 text-(--dim) lg:grid">
              <span role="columnheader">Period</span>
              <span role="columnheader">Organization</span>
              <span role="columnheader">Role</span>
              <span role="columnheader">Summary</span>
            </div>
            {career.map((entry) => (
              <div
                role="row"
                key={entry.role}
                className="grid gap-1 border-t border-(--hair) py-5 text-[15px] leading-relaxed lg:grid-cols-[132px_1.1fr_1fr_1.7fr] lg:gap-6">
                <span role="cell" className="text-(--dim) tabular-nums">
                  {entry.period}
                </span>
                <span role="cell" className="font-medium">
                  {entry.org}
                </span>
                <span role="cell" className="text-(--fg)/90">
                  {entry.role}
                </span>
                <span role="cell" className="mt-1 text-(--dim) lg:mt-0">
                  {entry.summary}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-(--hair) pt-8 text-sm leading-relaxed text-(--dim) lg:grid-cols-[132px_1fr] lg:gap-6">
          <h3 className="vb-label pt-0.5">Publications</h3>
          <p>
            {publications.map((pub, i) => (
              <span key={pub.label}>
                {i > 0 && (
                  <span aria-hidden className="mx-3">
                    ·
                  </span>
                )}
                {pub.href ? (
                  <a
                    href={pub.href}
                    className="underline decoration-(--hair-strong) hover:text-(--fg)">
                    {pub.label}
                  </a>
                ) : (
                  pub.label
                )}
              </span>
            ))}
          </p>
          <h3 className="vb-label pt-0.5">Open source</h3>
          <p>
            {building.text}{' '}
            <a
              href={building.href}
              className="inline-flex items-center gap-1.5 text-(--fg) underline decoration-(--hair-strong) hover:decoration-(--fg)">
              <GitHubIcon className="size-3.5" />
              {building.linkLabel}
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-h"
      className="py-24 lg:py-32">
      <div className={wrap}>
        <SectionMark index="04" label="Letters of recommendation" id="testimonials-h" />
        <div className="grid gap-x-16 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} className="border-t border-(--hair) pt-10 pb-14">
              <blockquote className="vb-display text-[1.375rem] leading-[1.45] font-normal tracking-[-0.01em] text-pretty lg:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-sm leading-relaxed">
                <span className="font-medium">{t.name}</span>
                <span className="block text-(--dim)">
                  {t.title}, {t.org}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="py-24 lg:py-32">
      <div className={wrap}>
        <SectionMark index="05" label="About" id="about-h" />
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <figure className="max-w-[360px] lg:col-span-4 lg:max-w-none">
            <div className="p-2 ring-1 ring-(--hair)">
              <img
                src={me}
                alt="Portrait of Dan Avner"
                width={920}
                height={1380}
                className="aspect-[2/3] w-full object-cover"
              />
            </div>
          </figure>
          <div className="lg:col-span-7 lg:col-start-6 lg:self-end">
            <p className="vb-display text-3xl leading-[1.2] font-medium tracking-[-0.02em] text-balance lg:text-[2.75rem]">
              {about.pullQuote}
            </p>
            <div className="mt-10 max-w-[62ch] space-y-5 text-lg leading-relaxed text-(--dim)">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-(--hair) pt-6">
              <p className="leading-relaxed">
                <span className="font-medium">{about.name}</span>
                <span className="block text-sm text-(--dim)">{about.title}</span>
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {about.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 underline decoration-(--hair-strong) hover:decoration-(--fg)">
                      {link.label}
                      <ArrowUpRight aria-hidden className="size-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="process" aria-labelledby="process-h" className="py-24 lg:py-32">
      <div className={wrap}>
        <SectionMark index="06" label="Working together" id="process-h" />
        <ol className="relative grid gap-10 lg:grid-cols-4">
          <span
            aria-hidden
            className={`absolute top-[4px] ${toTrace} right-0 hidden h-px bg-(--signal) lg:block`}
          />
          {process.map((step, i) => (
            <li key={step.title} className="relative lg:pt-10 lg:pr-4">
              <span
                aria-hidden
                className="absolute top-[5px] left-[-24px] size-[9px] -translate-x-1/2 rounded-full border border-(--signal) bg-(--ground) lg:top-0 lg:left-0 lg:translate-x-0"
              />
              <p className="vb-label text-(--signal)">Step {i + 1}</p>
              <h3 className="vb-display mt-3 text-xl font-semibold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="mt-3 max-w-[34ch] leading-relaxed text-(--dim)">
                {step.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-24 grid gap-8 border-t border-(--hair) pt-12 lg:grid-cols-12 lg:gap-10">
          <h3 className="vb-label text-(--dim) lg:col-span-3">Questions</h3>
          <Accordion type="single" collapsible className="lg:col-span-8 lg:col-start-5">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="border-(--hair) first:border-t">
                <AccordionTrigger className="vb-display rounded-none py-6 text-lg font-medium text-(--fg) hover:no-underline hover:opacity-80 [&>svg]:size-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="max-w-[64ch] pb-6 text-base leading-relaxed text-(--dim)">
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

function Contact() {
  const [sent, setSent] = useState(false)
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }
  const input =
    'w-full rounded-none border-0 border-b border-(--hair-strong) bg-transparent px-0 py-3 text-base text-(--fg) transition-colors duration-300 outline-none placeholder:text-(--dim) focus:border-(--signal) focus-visible:outline-none'
  return (
    <section
      id="contact"
      aria-labelledby="contact-h"
      className="pt-24 pb-28 lg:pt-32 lg:pb-36">
      <div className={wrap}>
        <SectionMark index="07" label="Contact" />
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2
              id="contact-h"
              className="vb-display text-4xl font-semibold tracking-[-0.025em] lg:text-6xl">
              {contact.title}
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-(--dim)">
              {contact.description}
            </p>
            <dl className="mt-12 space-y-4 border-t border-(--hair) pt-6 text-sm">
              <div>
                <dt className="vb-label text-(--dim)">Status</dt>
                <dd className="mt-1">{contact.status}</dd>
              </div>
              <div>
                <dt className="vb-label text-(--dim)">Location</dt>
                <dd className="mt-1">{contact.location}</dd>
              </div>
            </dl>
          </div>
          <form onSubmit={onSubmit} className="space-y-8 lg:col-span-6 lg:col-start-7">
            {contact.fields.map((field) => {
              const id = `vb-${field.split(' ')[0].toLowerCase()}`
              const optional = field.includes('optional')
              return (
                <div key={field}>
                  <label htmlFor={id} className="vb-label text-(--dim)">
                    {field}
                  </label>
                  {field === 'Message' ? (
                    <textarea
                      id={id}
                      name={id}
                      required
                      rows={5}
                      className={`${input} resize-y`}
                    />
                  ) : (
                    <input
                      id={id}
                      name={id}
                      type={field === 'Email' ? 'email' : 'text'}
                      autoComplete={
                        field === 'Email'
                          ? 'email'
                          : field === 'Name'
                            ? 'name'
                            : 'organization'
                      }
                      required={!optional}
                      className={input}
                    />
                  )}
                </div>
              )
            })}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <button
                type="submit"
                className="group relative inline-flex h-12 cursor-pointer items-center gap-2 border border-(--hair-strong) px-6 text-[15px] font-medium transition-colors duration-300 hover:bg-white/[0.06]">
                {contact.submit}
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                />
                <span
                  aria-hidden
                  className="absolute inset-x-[-1px] bottom-[-1px] h-px bg-(--signal)"
                />
              </button>
              <p role="status" className="text-sm text-(--dim)">
                {sent ? 'Prototype - not sent.' : ''}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const credits = [
    heroImage,
    ...caseStudies.flatMap((s) => telescopeImages(s.telescopes)),
  ]
  return (
    <footer className="relative border-t border-(--hair) pt-14 pb-24">
      <div className={wrap}>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={28} height={28} className="size-7 invert" />
            <p className="text-sm leading-relaxed">
              {footer.line}
              <span className="block text-(--dim)">{footer.tagline}</span>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-(--hair) pt-8">
          <h2 className="vb-label text-(--dim)">Image credits</h2>
          <ul className="mt-4 grid gap-x-10 gap-y-2 text-xs leading-relaxed text-(--dim) md:grid-cols-2">
            {credits.map((image) => (
              <li key={image.name}>
                <a
                  href={image.sourceUrl}
                  className="text-(--fg) underline decoration-(--hair-strong)">
                  {image.name}
                </a>
                : <Credit image={image} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
