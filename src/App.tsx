import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Starfield } from '@/components/starfield'
import { Contact } from '@/components/sections/contact'
import { Experience } from '@/components/sections/experience'
import { Founder } from '@/components/sections/founder'
import { Hero } from '@/components/sections/hero'
import { Projects } from '@/components/sections/projects'
import { Services } from '@/components/sections/services'
import { Skills } from '@/components/sections/skills'

function App() {
  return (
    <div className="relative">
      <Starfield />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Services />
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
