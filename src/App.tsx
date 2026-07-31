import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { TrustStrip } from '@/components/trust-strip'
import { CaseStudies } from '@/components/sections/case-studies'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Founder } from '@/components/sections/founder'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Skills } from '@/components/sections/skills'
// The testimonial excerpts come from private letters of recommendation; do not
// render the section until each author has approved public use of their quote.
// import { Testimonials } from '@/components/sections/testimonials'

function App() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <TrustStrip />
        <CaseStudies />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        {/* <Testimonials /> */}
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
