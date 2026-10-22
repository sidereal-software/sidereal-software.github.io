import { lazy, Suspense } from 'react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TrustStrip } from '@/components/trust-strip'
import { CaseStudies } from '@/components/sections/case-studies'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Faq } from '@/components/sections/faq'
import { Founder } from '@/components/sections/founder'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'

// PROTOTYPE - remove with src/prototype/redesign once a direction is chosen.
const RedesignPrototype =
  import.meta.env.DEV && import.meta.env.MODE !== 'test'
    ? lazy(() => import('@/prototype/redesign'))
    : null

function App() {
  const site = <LiveSite />
  if (!RedesignPrototype) return site
  return (
    <Suspense>
      <RedesignPrototype current={site} />
    </Suspense>
  )
}

function LiveSite() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <Services />
        <CaseStudies />
        <Projects />
        <Experience />
        <Testimonials />
        <Founder />
        <Process />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
