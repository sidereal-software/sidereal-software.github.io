import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { About } from '@/components/sections/about'
import { CaseStudies } from '@/components/sections/case-studies'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { Process } from '@/components/sections/process'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Testimonials } from '@/components/sections/testimonials'

function App() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Services />
        <CaseStudies />
        <Projects />
        <Experience />
        <Testimonials />
        <About />
        <Process />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
