import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TrustStrip } from '@/components/trust-strip'
import { CaseStudies } from '@/components/sections/case-studies'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Founder } from '@/components/sections/founder'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Skills } from '@/components/sections/skills'
import { Testimonials } from '@/components/sections/testimonials'

function App() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <CaseStudies />
        <Process />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        <Testimonials />
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
