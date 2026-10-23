import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { About } from '@/components/sections/about'
import { Contact } from '@/components/sections/contact'
import { Hero } from '@/components/sections/hero'
import { Services } from '@/components/sections/services'
import { Work } from '@/components/sections/work'
import { WorkingTogether } from '@/components/sections/working-together'

function App() {
  return (
    <div className="relative">
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Services />
        <Work />
        <About />
        <WorkingTogether />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
