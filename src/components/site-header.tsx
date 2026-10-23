import { useEffect, useState } from 'react'
import { animated } from '@react-spring/web'
import { Menu } from 'lucide-react'

import logo from '@/assets/logo.png'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { usePress, useStaggerIn } from '@/lib/motion'
import { cn } from '@/lib/utils'

const sections = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
]

const menuLinks = [...sections, { href: '#contact', label: 'Contact' }]

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])
  return scrolled
}

function StartProjectLink() {
  const { style, bind } = usePress()
  return (
    <animated.a
      href="#contact"
      style={style}
      {...bind}
      className="text-primary decoration-primary/40 hover:decoration-primary inline-block py-3 text-sm font-medium whitespace-nowrap underline underline-offset-[6px] transition-colors">
      Start a project
    </animated.a>
  )
}

function MenuLinks() {
  const trail = useStaggerIn(menuLinks.length, true)
  return (
    <ul className="flex flex-col gap-1">
      {trail.map((style, index) => (
        <animated.li key={menuLinks[index].href} style={style}>
          <SheetClose asChild>
            <a
              href={menuLinks[index].href}
              className="font-display hover:text-primary block py-2 text-3xl font-bold tracking-tight uppercase transition-colors">
              {menuLinks[index].label}
            </a>
          </SheetClose>
        </animated.li>
      ))}
    </ul>
  )
}

export function SiteHeader() {
  const scrolled = useScrolled()

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 border-b transition-colors duration-500',
        scrolled ? 'border-border bg-background' : 'border-transparent',
      )}>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="" className="size-7 invert" width={28} height={28} />
          <span className="font-display text-[0.8rem] leading-[1.15] font-semibold tracking-[0.18em] uppercase max-sm:w-min">
            Sidereal Software
          </span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-4 sm:gap-8">
          <ul className="hidden items-center gap-8 lg:flex">
            {sections.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <StartProjectLink />
          <Sheet>
            <SheetTrigger className="-mr-2.5 flex h-11 items-center gap-2 px-2.5 text-sm lg:hidden">
              <Menu className="size-5" strokeWidth={1.5} />
              <span>Menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="border-border w-full px-6 pt-20 motion-reduce:animate-none! sm:max-w-md">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <MenuLinks />
              <p className="text-muted-foreground mt-auto pb-8 text-sm">
                Los Angeles, California
              </p>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}
