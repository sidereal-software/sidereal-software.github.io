// PROTOTYPE - throwaway. Console: observatory control-room panels, phosphor amber readouts.
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { ArrowUpRight, Menu } from 'lucide-react'

import logo from '@/assets/logo.png'
import { GitHubIcon } from '@/components/icons'
import me from '@/assets/me.jpg'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

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
  'https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,300..600&family=Saira:wdth,wght@75..112.5,300..700&display=swap'

const tokens = {
  '--vc-ground': '#0B0C0E',
  '--vc-panel': '#15171B',
  '--vc-panel-2': '#1A1D22',
  '--vc-line': '#2A2D33',
  '--vc-tick': '#5C616B',
  '--vc-text': '#ECEAE4',
  '--vc-mute': '#A0A4AC',
  '--vc-lamp-off': '#3A3E46',
  '--vc-amber': '#FFB000',
  '--vc-amber-hi': '#FFC53D',
  '--background': '#0B0C0E',
  '--foreground': '#ECEAE4',
  '--card': '#15171B',
  '--card-foreground': '#ECEAE4',
  '--popover': '#15171B',
  '--popover-foreground': '#ECEAE4',
  '--primary': '#FFB000',
  '--primary-foreground': '#0B0C0E',
  '--secondary': '#1A1D22',
  '--secondary-foreground': '#ECEAE4',
  '--muted': '#1A1D22',
  '--muted-foreground': '#A0A4AC',
  '--accent': '#1A1D22',
  '--accent-foreground': '#ECEAE4',
  '--border': '#2A2D33',
  '--input': '#2A2D33',
  '--ring': '#FFB000',
} as CSSProperties

const styles = `@layer components {
.vc { background: var(--vc-ground); color: var(--vc-text); font-family: 'Saira', ui-sans-serif, sans-serif; font-size: 17px; line-height: 1.6; caret-color: var(--vc-amber); font-variant-numeric: tabular-nums; }
.vc ::selection, .vc-sheet ::selection { background: var(--vc-amber); color: var(--vc-ground); }
html:has(.vc) { background: #0B0C0E; scrollbar-color: #3A3E46 #0B0C0E; scroll-padding-top: 4.5rem; }
.vc-head { font-family: 'Saira', ui-sans-serif, sans-serif; font-stretch: 85%; font-weight: 600; letter-spacing: -0.01em; text-wrap: balance; }
.vc-mono { font-family: 'Martian Mono', ui-monospace, monospace; font-stretch: 87.5%; font-variant-numeric: tabular-nums; letter-spacing: 0.02em; }
.vc-label { font-family: 'Martian Mono', ui-monospace, monospace; font-stretch: 87.5%; font-size: 11px; line-height: 1.5; letter-spacing: 0.08em; text-transform: uppercase; color: var(--vc-mute); }
.vc a, .vc button, .vc input, .vc textarea, .vc-sheet a { outline: none; }
.vc :focus-visible, .vc-sheet :focus-visible { outline: 2px solid var(--vc-amber); outline-offset: 2px; }
.vc-link { color: var(--vc-text); text-decoration: underline; text-decoration-color: var(--vc-tick); text-underline-offset: 4px; text-decoration-thickness: 1px; transition: color .2s, text-decoration-color .2s; }
.vc-link:hover { color: var(--vc-amber); text-decoration-color: var(--vc-amber); }
.vc-lamp { display: inline-block; width: 7px; height: 7px; border-radius: 999px; background: var(--vc-lamp-off); flex: none; }
.vc-lamp[data-on] { background: var(--vc-amber); box-shadow: 0 0 6px rgba(255,176,0,.55); }
.vc-tick { position: absolute; width: 9px; height: 9px; border-color: var(--vc-tick); pointer-events: none; }
.vc-btn { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; height: 2.75rem; padding: 0 1.1rem; border: 1px solid var(--vc-line); background: var(--vc-panel-2); color: var(--vc-text); font-family: 'Martian Mono', ui-monospace, monospace; font-stretch: 87.5%; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; border-radius: 2px; transition: border-color .2s, color .2s, background-color .2s; white-space: nowrap; }
.vc-btn:hover { border-color: var(--vc-amber); color: var(--vc-amber); }
.vc-btn-sm { height: 2.1rem; padding: 0 .8rem; font-size: 11px; }
.vc-btn-amber { background: var(--vc-amber); border-color: var(--vc-amber); color: #0B0C0E; font-weight: 600; }
.vc-btn-amber:hover { background: var(--vc-amber-hi); border-color: var(--vc-amber-hi); color: #0B0C0E; }
.vc-field { width: 100%; background: var(--vc-ground); border: 1px solid var(--vc-line); border-radius: 2px; padding: .7rem .85rem; color: var(--vc-text); font-size: 16px; transition: border-color .2s; }
.vc-field::placeholder { color: #8A8F98; }
.vc-field:hover { border-color: var(--vc-tick); }
.vc-field:focus-visible { outline: none; border-color: var(--vc-amber); box-shadow: 0 0 0 1px var(--vc-amber); }
.vc-feed img { transform: scale(1.06); }
@media (prefers-reduced-motion: no-preference) {
  .vc-feed img { animation: vc-drift 70s ease-in-out infinite alternate; }
  .vc-lamp[data-pulse] { animation: vc-pulse 3.6s ease-in-out infinite; }
  @supports (animation-timeline: view()) {
    .vc-reveal { animation: vc-rise linear both; animation-timeline: view(); animation-range: entry 0% entry 35%; }
  }
}
@keyframes vc-drift { from { transform: scale(1.14) translate(-2%, -1.5%); } to { transform: scale(1.14) translate(2%, 1.5%); } }
@keyframes vc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes vc-rise { from { opacity: .4; transform: translateY(18px); } to { opacity: 1; transform: none; } }
}`

function useFonts() {
  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = FONTS_HREF
    document.head.appendChild(link)
    return () => link.remove()
  }, [])
}

function Ticks() {
  return (
    <>
      <span aria-hidden className="vc-tick -top-px -left-px border-t border-l" />
      <span aria-hidden className="vc-tick -top-px -right-px border-t border-r" />
      <span aria-hidden className="vc-tick -bottom-px -left-px border-b border-l" />
      <span aria-hidden className="vc-tick -right-px -bottom-px border-r border-b" />
    </>
  )
}

function Lamp({ on, pulse }: { on?: boolean; pulse?: boolean }) {
  return (
    <span
      aria-hidden
      className="vc-lamp"
      data-on={on || undefined}
      data-pulse={pulse || undefined}
    />
  )
}

function StripHeader({
  code,
  label,
  right,
  className,
}: {
  code: string
  label: string
  right?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'vc-label flex min-h-9 items-center justify-between gap-4 border-b border-(--vc-line) px-4 py-2',
        className,
      )}>
      <span className="whitespace-nowrap">
        <span className="text-(--vc-amber)">{code}</span>
        <span className="px-2 text-(--vc-tick)">/</span>
        {label}
      </span>
      {right && <span className="flex items-center gap-2 text-right">{right}</span>}
    </div>
  )
}

function Module({
  id,
  code,
  label,
  right,
  title,
  children,
}: {
  id: string
  code: string
  label: string
  right?: ReactNode
  title?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className="px-4 py-6 md:px-8 md:py-10">
      <div className="vc-reveal relative mx-auto max-w-[88rem] border border-(--vc-line) bg-(--vc-panel)">
        <Ticks />
        <StripHeader code={code} label={label} right={right} />
        <div className="p-5 md:p-10">
          {title && (
            <h2
              id={`${id}-title`}
              className="vc-head mb-8 text-[2rem] leading-[1.05] md:mb-10 md:text-[2.75rem]">
              {title}
            </h2>
          )}
          {children}
        </div>
      </div>
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const pending = useRef<string | null>(null)
  // Radix scroll lock swallows the anchor jump, so scroll after the sheet has closed.
  const go = (href: string) => (e: MouseEvent) => {
    e.preventDefault()
    pending.current = href
    setOpen(false)
  }
  const afterClose = (e: Event) => {
    const href = pending.current
    pending.current = null
    if (!href) return
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView()
    history.replaceState(null, '', href)
  }
  return (
    <header className="sticky top-0 z-40 border-b border-(--vc-line) bg-(--vc-ground)/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[88rem] items-center justify-between gap-6 px-4 md:px-8">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="" width={28} height={28} className="size-7 invert" />
          <span className="vc-head text-[1.2rem] tracking-[0.01em]">
            Sidereal Software
          </span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="vc-label transition-colors hover:text-(--vc-amber)">
              {item.label}
            </a>
          ))}
          <a href={hero.primaryCta.href} className="vc-btn vc-btn-amber vc-btn-sm">
            {hero.primaryCta.label}
          </a>
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="vc-btn vc-btn-sm md:hidden" aria-label="Open menu">
            <Menu className="size-4" aria-hidden />
            Menu
          </SheetTrigger>
          <SheetContent
            side="right"
            onCloseAutoFocus={afterClose}
            style={tokens}
            className="vc-sheet dark border-(--vc-line) bg-(--vc-panel) text-(--vc-text)">
            <SheetTitle className="vc-label border-b border-(--vc-line) px-5 py-4 pr-12">
              <span className="text-(--vc-amber)">NAV</span>
              <span className="px-2 text-(--vc-tick)">/</span>Sidereal Software
            </SheetTitle>
            <nav aria-label="Mobile" className="flex flex-col px-5">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={go(item.href)}
                  className="vc-head border-b border-(--vc-line) py-4 text-2xl transition-colors hover:text-(--vc-amber)">
                  {item.label}
                </a>
              ))}
              <a
                href={hero.primaryCta.href}
                onClick={go(hero.primaryCta.href)}
                className="vc-btn vc-btn-amber mt-6">
                {hero.primaryCta.label}
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function Readout({ k, children }: { k: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3">
      <dt className="vc-label">{k}</dt>
      <dd className="vc-mono text-[13px] text-(--vc-text)">{children}</dd>
    </div>
  )
}

function ScopeFeed() {
  return (
    <figure className="flex flex-col border border-(--vc-line) bg-(--vc-ground)">
      <StripHeader
        code="FEED"
        label="Scope view"
        right={
          <>
            <Lamp on /> Mayall 4-m
          </>
        }
      />
      <div className="vc-feed relative aspect-[2800/2351] overflow-hidden">
        <img
          src={heroImage.src}
          alt={`${heroImage.name}, a planetary nebula glowing red and blue-green against a field of stars`}
          width={heroImage.width}
          height={heroImage.height}
          className="absolute inset-0 size-full object-cover"
        />
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none">
          <g
            stroke="rgba(236,234,228,.38)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            fill="none">
            <line x1="50" y1="4" x2="50" y2="40" vectorEffect="non-scaling-stroke" />
            <line x1="50" y1="60" x2="50" y2="96" vectorEffect="non-scaling-stroke" />
            <line x1="4" y1="50" x2="40" y2="50" vectorEffect="non-scaling-stroke" />
            <line x1="60" y1="50" x2="96" y2="50" vectorEffect="non-scaling-stroke" />
          </g>
          <g stroke="#FFB000" strokeWidth="1" fill="none">
            <polyline points="35,22 41,22 46,44" vectorEffect="non-scaling-stroke" />
            <polyline points="65,78 59,78 54,56" vectorEffect="non-scaling-stroke" />
          </g>
          <g stroke="rgba(236,234,228,.7)" strokeWidth="1.5" fill="none">
            <polyline points="3,9 3,3 9,3" vectorEffect="non-scaling-stroke" />
            <polyline points="91,3 97,3 97,9" vectorEffect="non-scaling-stroke" />
            <polyline points="3,91 3,97 9,97" vectorEffect="non-scaling-stroke" />
            <polyline points="91,97 97,97 97,91" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 size-[20%] -translate-1/2 rounded-full border border-dashed border-[rgba(255,176,0,.75)]"
        />
        <div className="absolute right-[65%] bottom-[78%] border border-(--vc-line) bg-[rgba(11,12,14,.82)] px-2 py-1 sm:px-2.5 sm:py-1.5 text-right">
          <div className="vc-mono text-[13px] font-medium text-(--vc-amber)">M27</div>
          <div className="vc-mono text-[10px] whitespace-nowrap text-(--vc-text) sm:text-[11px]">
            Dumbbell Nebula
          </div>
        </div>
        <div className="absolute top-[78%] left-[65%] border border-(--vc-line) bg-[rgba(11,12,14,.82)] px-2 py-1 sm:px-2.5 sm:py-1.5">
          <div className="vc-mono text-[10px] whitespace-nowrap text-(--vc-text) sm:text-[11px]">
            <span className="text-(--vc-mute)">RA </span>19h 59m 36s
          </div>
          <div className="vc-mono text-[10px] whitespace-nowrap text-(--vc-text) sm:text-[11px]">
            <span className="text-(--vc-mute)">Dec </span>+22° 43′
          </div>
        </div>
      </div>
      <figcaption className="border-t border-(--vc-line)">
        <dl className="grid grid-cols-2 divide-(--vc-line) border-b border-(--vc-line) sm:grid-cols-[1.4fr_1fr_1fr] sm:divide-x">
          <div className="col-span-2 border-b border-(--vc-line) sm:col-span-1 sm:border-b-0">
            <Readout k="Object">{heroImage.name}</Readout>
          </div>
          <div className="border-r border-(--vc-line) sm:border-r-0">
            <Readout k="RA (J2000)">19h 59m 36s</Readout>
          </div>
          <Readout k="Dec (J2000)">+22° 43′</Readout>
        </dl>
        <p className="vc-mono px-4 py-3 text-[11px] leading-relaxed text-(--vc-mute)">
          {heroImage.location}. Image: {heroImage.credit}.{' '}
          <a href={heroImage.licenseUrl} className="vc-link text-(--vc-mute)!">
            {heroImage.license}
          </a>
        </p>
      </figcaption>
    </figure>
  )
}

const CURRENT = new Set(['NSF NOIRLab', 'Gemini Observatory'])

function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="px-4 pt-6 pb-6 md:px-8 md:pt-10 md:pb-10">
      <div className="relative mx-auto max-w-[88rem] border border-(--vc-line) bg-(--vc-panel)">
        <Ticks />
        <StripHeader
          code="MOD 01"
          label="Sidereal Software"
          right={<span className="hidden sm:inline">{contact.location}</span>}
        />
        <div className="grid gap-8 p-5 md:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="vc-mono text-[12px] tracking-[0.06em] text-(--vc-amber) uppercase">
              {kickers.C}
            </p>
            <h1
              id="home-title"
              className="vc-head mt-5 text-[2.5rem] leading-[1.02] md:text-[3.5rem] xl:text-[4.1rem]">
              {hero.h1}
            </h1>
            <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed text-(--vc-mute)">
              {hero.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={hero.primaryCta.href} className="vc-btn vc-btn-amber">
                {hero.primaryCta.label}
              </a>
              <a href={hero.secondaryCta.href} className="vc-btn">
                {hero.secondaryCta.label}
              </a>
            </div>
            <p className="vc-label mt-8 flex items-center gap-2.5 text-(--vc-text)">
              <Lamp on pulse />
              {contact.status}
            </p>
          </div>
          <ScopeFeed />
        </div>
        <div className="border-t border-(--vc-line) px-5 py-5 md:px-10">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <h2 className="vc-label">Connected sites</h2>
            <p className="vc-label flex items-center gap-2">
              <Lamp on /> Current
              <span className="ml-3 inline-flex items-center gap-2">
                <Lamp /> Past
              </span>
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {institutions.map((name) => (
              <li
                key={name}
                className="vc-mono flex items-center gap-2 border border-(--vc-line) bg-(--vc-ground) px-3 py-2 text-[12px]">
                <Lamp on={CURRENT.has(name)} />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <Module
      id="services"
      code="MOD 02"
      label="Services"
      title="Services"
      right={`${services.length} units`}>
      <ul className="grid gap-px border border-(--vc-line) bg-(--vc-line) sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.title} className="flex flex-col bg-(--vc-panel-2)">
            <div className="vc-label flex items-center justify-between border-b border-(--vc-line) px-4 py-2">
              <span>U{i + 1}</span>
              <Lamp on />
            </div>
            <div className="p-5">
              <h3 className="vc-head text-[1.35rem] leading-tight">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-(--vc-mute)">
                {s.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <div className="border-t border-(--vc-amber) pt-5">
          <h3 className="vc-head text-[1.6rem] leading-tight">{servicesAside.title}</h3>
          <p className="mt-3 max-w-[38rem] text-(--vc-mute)">{servicesAside.body}</p>
        </div>
        <div className="border-t border-(--vc-line) pt-5">
          <h3 className="vc-label mb-3 flex justify-between">
            <span>Stack</span>
            <span>{stack.length} loaded</span>
          </h3>
          <ul className="flex flex-wrap gap-1.5">
            {stack.map((t) => (
              <li
                key={t}
                className="vc-mono border border-(--vc-line) px-2.5 py-1 text-[12px] text-(--vc-text)">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Module>
  )
}

function Photo({ image, className }: { image: CreditedImage; className?: string }) {
  return (
    <figure className={cn('flex flex-col', className)}>
      <div className="relative aspect-[4/3] overflow-hidden border border-(--vc-line)">
        <img
          src={image.src}
          alt={`${image.name}, ${image.location}`}
          width={image.width}
          height={image.height}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <figcaption className="mt-2 border-l border-(--vc-amber) pl-2.5 [overflow-wrap:anywhere]">
        <div className="vc-mono text-[11px] text-(--vc-text)">
          {image.name} <span className="text-(--vc-mute)">/ {image.location}</span>
        </div>
        <div className="vc-mono mt-0.5 text-[10px] leading-snug text-(--vc-mute)">
          {image.credit}.{' '}
          <a href={image.licenseUrl} className="vc-link text-(--vc-mute)!">
            {image.license}
          </a>
        </div>
      </figcaption>
    </figure>
  )
}

function ChannelStrip({ study, index }: { study: CaseStudy; index: number }) {
  const photos = telescopeImages(study.telescopes)
  const columns = [
    ['Problem', study.problem],
    ['Approach', study.approach],
    ['Outcome', study.outcome],
  ] as const
  return (
    <article className="border border-(--vc-line) bg-(--vc-panel-2)">
      <div className="flex flex-col gap-3 border-b border-(--vc-line) px-5 py-4 md:flex-row md:items-end md:justify-between md:px-6">
        <div>
          <p className="vc-label">
            <span className="text-(--vc-amber)">CH {index + 1}</span>
            <span className="px-2 text-(--vc-tick)">/</span>
            {study.org}
          </p>
          <h3 className="vc-head mt-1 text-[2rem] leading-none md:text-[2.4rem]">
            {study.name}
          </h3>
        </div>
        <dl className="vc-mono grid grid-cols-2 gap-x-8 gap-y-1 text-[12px] md:text-right">
          <dt className="vc-label">Role</dt>
          <dt className="vc-label">Period</dt>
          <dd>{study.role}</dd>
          <dd>{study.period}</dd>
        </dl>
      </div>
      <div className="grid gap-6 p-5 md:p-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-8">
        <div className="grid grid-cols-2 gap-3 lg:gap-4 self-start">
          {photos.map((p) => (
            <Photo key={p.name} image={p} />
          ))}
        </div>
        <div className="flex flex-col">
          <div className="grid gap-px bg-(--vc-line) md:grid-cols-3">
            {columns.map(([k, v]) => (
              <div key={k} className="bg-(--vc-panel-2) py-4 md:px-5 md:first:pl-0">
                <h4
                  className={cn(
                    'vc-label mb-2 flex items-center gap-2',
                    k === 'Outcome' && 'text-(--vc-amber)',
                  )}>
                  <Lamp on={k === 'Outcome'} />
                  {k}
                </h4>
                <p
                  className={cn(
                    'text-[15px] leading-relaxed',
                    k === 'Outcome' ? 'text-(--vc-text)' : 'text-(--vc-mute)',
                  )}>
                  {v}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2 border-t border-(--vc-line) pt-4">
            {study.links.map((l) => (
              <a key={l.href} href={l.href} className="vc-btn vc-btn-sm">
                {l.github ? <GitHubIcon className="size-3.5" aria-hidden /> : null}
                {l.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

function Work() {
  return (
    <Module
      id="work"
      code="MOD 03"
      label="Work"
      title="Selected work"
      right={`${caseStudies.length} channels`}>
      <div className="flex flex-col gap-6">
        {caseStudies.map((s, i) => (
          <ChannelStrip key={s.name} study={s} index={i} />
        ))}
      </div>

      <div className="mt-12">
        <h3 className="vc-label mb-3 flex justify-between">
          <span>Career log</span>
          <span>{career.length} entries</span>
        </h3>
        <table className="w-full border-collapse border-t border-(--vc-line) text-left">
          <thead className="vc-label hidden md:table-header-group">
            <tr className="border-b border-(--vc-line)">
              <th scope="col" className="py-2.5 pr-6 font-normal">
                Period
              </th>
              <th scope="col" className="py-2.5 pr-6 font-normal">
                Organization
              </th>
              <th scope="col" className="py-2.5 pr-6 font-normal">
                Role
              </th>
              <th scope="col" className="py-2.5 font-normal">
                Note
              </th>
            </tr>
          </thead>
          <tbody>
            {career.map((c) => (
              <tr
                key={c.role + c.period}
                className="grid grid-cols-1 gap-1 border-b border-(--vc-line) py-4 align-top md:table-row md:py-0">
                <td className="vc-mono text-[12px] whitespace-nowrap text-(--vc-amber) md:py-4 md:pr-6">
                  {c.period}
                </td>
                <td className="font-medium md:w-[16rem] md:py-4 md:pr-6">{c.org}</td>
                <td className="vc-mono text-[12px] md:w-[14rem] md:py-4 md:pr-6">
                  {c.role}
                </td>
                <td className="text-[15px] text-(--vc-mute) md:py-4">{c.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dl className="mt-8 flex flex-col gap-3 border border-(--vc-line) bg-(--vc-ground) px-4 py-3 md:flex-row md:items-baseline md:gap-6">
        <dt className="vc-label shrink-0 text-(--vc-amber)">Publications</dt>
        <dd className="vc-mono flex flex-wrap gap-x-2 gap-y-1 text-[12px]">
          {publications.map((p, i) => (
            <span key={p.label} className="flex gap-2">
              {i > 0 && (
                <span className="text-(--vc-tick)" aria-hidden>
                  /
                </span>
              )}
              {p.href ? (
                <a href={p.href} className="vc-link">
                  {p.label}
                </a>
              ) : (
                <span>{p.label}</span>
              )}
            </span>
          ))}
        </dd>
      </dl>
      <p className="mt-3 flex flex-col gap-1 px-4 md:flex-row md:items-baseline md:gap-6">
        <span className="vc-label shrink-0">Source</span>
        <span className="text-[15px] text-(--vc-mute)">
          {building.text}{' '}
          <a href={building.href} className="vc-link vc-mono text-[12px]">
            {building.linkLabel}
          </a>
        </span>
      </p>
    </Module>
  )
}

function Testimonials() {
  return (
    <Module
      id="testimonials"
      code="MOD 04"
      label="Testimonials"
      title="From letters of recommendation"
      right={`${testimonials.length} received`}>
      <ul className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <li
            key={t.name}
            className="flex flex-col border border-(--vc-line) bg-(--vc-panel-2)">
            <figure className="flex h-full flex-col">
              <figcaption className="vc-label flex flex-wrap items-baseline gap-x-2 border-b border-(--vc-line) px-5 py-2.5">
                <span className="text-(--vc-amber)">
                  RX {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-(--vc-tick)">/</span>
                <span className="text-(--vc-text)">{t.name}</span>
                <span className="normal-case tracking-normal">
                  {t.title}, {t.org}
                </span>
              </figcaption>
              <blockquote className="flex-1 px-5 py-5 text-[1.15rem] leading-relaxed text-(--vc-text)">
                {t.quote}
              </blockquote>
            </figure>
          </li>
        ))}
      </ul>
    </Module>
  )
}

function About() {
  return (
    <Module id="about" code="MOD 05" label="About" title="About">
      <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
        <figure className="relative max-w-[20rem] self-start border border-(--vc-line) bg-(--vc-ground) p-2">
          <Ticks />
          <img
            src={me}
            alt="Dan Avner"
            width={920}
            height={1380}
            loading="lazy"
            className="aspect-[2/3] w-full object-cover"
          />
          <figcaption className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 px-1 pb-1">
            <span className="vc-label">Name</span>
            <span className="vc-mono text-[12px]">{about.name}</span>
            <span className="vc-label">Title</span>
            <span className="vc-mono text-[12px]">{about.title}</span>
          </figcaption>
        </figure>
        <div className="max-w-[42rem]">
          <p className="vc-head text-[1.8rem] leading-[1.15] text-(--vc-amber) md:text-[2.25rem]">
            {about.pullQuote}
          </p>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mt-5 text-(--vc-mute)">
              {p}
            </p>
          ))}
          <div className="mt-8 flex flex-wrap gap-2">
            {about.links.map((l) => (
              <a key={l.href} href={l.href} className="vc-btn vc-btn-sm">
                {l.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Module>
  )
}

function Process() {
  return (
    <Module
      id="process"
      code="MOD 06"
      label="Process"
      title="Working together"
      right={`${process.length} steps`}>
      <ol className="relative grid gap-px border border-(--vc-line) bg-(--vc-line) md:grid-cols-4">
        {process.map((step, i) => (
          <li key={step.title} className="bg-(--vc-panel-2) p-5">
            <div className="flex items-center gap-3">
              <Lamp on={i === 0} />
              <span className={cn('vc-label', i === 0 && 'text-(--vc-amber)')}>
                Step {i + 1}
              </span>
              <span aria-hidden className="h-px flex-1 bg-(--vc-line)" />
            </div>
            <h3 className="vc-head mt-4 text-[1.35rem] leading-tight">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-(--vc-mute)">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-10 border border-(--vc-line) bg-(--vc-panel-2)">
        <StripHeader
          code="FAQ"
          label="Common questions"
          right={`${faqs.length} entries`}
        />
        <Accordion type="single" collapsible className="px-5 md:px-6">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.question}
              value={`q${i}`}
              className="border-(--vc-line)">
              <AccordionTrigger className="vc-head items-center rounded-none py-5 text-[1.15rem] font-medium hover:text-(--vc-amber) hover:no-underline md:text-[1.25rem]">
                <span className="flex gap-4">
                  <span className="vc-mono pt-1 text-[11px] text-(--vc-mute)">
                    Q{i + 1}
                  </span>
                  {f.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="max-w-[44rem] pb-6 pl-9 text-[16px] leading-relaxed text-(--vc-mute)">
                {f.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Module>
  )
}

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }
  return (
    <Module
      id="contact"
      code="MOD 07"
      label="Contact"
      right={
        <>
          <Lamp on /> Open
        </>
      }>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2
            id="contact-title"
            className="vc-head text-[2.25rem] leading-[1.05] md:text-[3rem]">
            {contact.title}
          </h2>
          <p className="mt-4 max-w-[30rem] text-[1.1rem] text-(--vc-mute)">
            {contact.description}
          </p>
          <dl className="mt-8 border-t border-(--vc-line)">
            <div className="flex items-center justify-between gap-4 border-b border-(--vc-line) py-3">
              <dt className="vc-label">Status</dt>
              <dd className="vc-mono flex items-center gap-2 text-right text-[12px]">
                <Lamp on />
                {contact.status}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-(--vc-line) py-3">
              <dt className="vc-label">Location</dt>
              <dd className="vc-mono text-right text-[12px]">{contact.location}</dd>
            </div>
          </dl>
        </div>
        <form
          onSubmit={onSubmit}
          className="grid gap-5 border border-(--vc-line) bg-(--vc-panel-2) p-5 md:grid-cols-2 md:p-6">
          {contact.fields.map((field) => {
            const name = field.toLowerCase().split(' ')[0]
            const id = `vc-${name}`
            const isMessage = name === 'message'
            const optional = field.includes('optional')
            return (
              <div
                key={field}
                className={cn(
                  'flex flex-col gap-2',
                  (isMessage || name === 'organization') && 'md:col-span-2',
                )}>
                <label htmlFor={id} className="vc-label">
                  {field}
                </label>
                {isMessage ? (
                  <textarea
                    id={id}
                    name={name}
                    required
                    rows={6}
                    className="vc-field resize-y"
                  />
                ) : (
                  <input
                    id={id}
                    name={name}
                    type={name === 'email' ? 'email' : 'text'}
                    required={!optional}
                    autoComplete={
                      name === 'email'
                        ? 'email'
                        : name === 'name'
                          ? 'name'
                          : 'organization'
                    }
                    className="vc-field"
                  />
                )}
              </div>
            )
          })}
          <div className="flex flex-wrap items-center gap-4 md:col-span-2">
            <button type="submit" className="vc-btn vc-btn-amber">
              {contact.submit}
            </button>
            <p role="status" className="vc-mono text-[12px] text-(--vc-amber)">
              {submitted ? 'Prototype - not sent' : ''}
            </p>
          </div>
        </form>
      </div>
    </Module>
  )
}

function Footer() {
  const shown = [heroImage, ...telescopeImages(caseStudies.flatMap((s) => s.telescopes))]
  return (
    <footer className="px-4 pt-6 pb-24 md:px-8">
      <div className="mx-auto max-w-[88rem] border-t border-(--vc-line) pt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" width={24} height={24} className="size-6 invert" />
            <span className="vc-mono text-[12px]">{footer.line}</span>
          </div>
          <span className="vc-label">{footer.tagline}</span>
        </div>
        <h2 className="vc-label mt-10 mb-3">Image credits</h2>
        <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
          {shown.map((img) => (
            <li
              key={img.name}
              className="vc-mono text-[11px] leading-relaxed [overflow-wrap:anywhere] text-(--vc-mute)">
              <span className="text-(--vc-text)">{img.name}</span> - {img.credit}.{' '}
              <a href={img.licenseUrl} className="vc-link text-(--vc-mute)!">
                {img.license}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export function VariantC() {
  useFonts()
  return (
    <div className="vc dark min-h-screen overflow-x-clip" style={tokens}>
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
