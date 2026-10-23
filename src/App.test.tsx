import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { career, formatPeriod } from '@/content/career'
import { creditedImages, heroImage } from '@/content/images'
import App from './App'

describe('App', () => {
  it('renders the brand in the header', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    expect(within(header).getByText('Sidereal Software')).toBeInTheDocument()
  })

  it('has a section for every desktop nav link', () => {
    const { container } = render(<App />)
    const nav = screen.getByRole('navigation')
    const links = within(nav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))
      .filter((href): href is string => href !== null && href.startsWith('#'))
    expect(links.length).toBeGreaterThan(0)
    for (const href of links) {
      expect(container.querySelector(href), `missing section for ${href}`).not.toBeNull()
    }
  })

  it('renders every major section heading', () => {
    render(<App />)
    for (const heading of [
      'Production software for observatories, missions, and research teams',
      '^Work$',
      'About',
      'Process',
      'Questions',
      'Start a project',
    ]) {
      expect(
        screen.getByRole('heading', { name: new RegExp(heading, 'i') }),
      ).toBeInTheDocument()
    }
  })

  it('opens on the M27 hero with the kicker and authored-casing institutions', () => {
    render(<App />)
    const hero = screen.getByRole('region', {
      name: 'Production software for observatories, missions, and research teams.',
    })
    expect(
      within(hero).getByText('Software that does the heavy lifting'),
    ).toBeInTheDocument()
    expect(within(hero).getByText('M27, the Dumbbell Nebula')).toBeInTheDocument()
    expect(within(hero).getByText('NSF NOIRLab')).toBeInTheDocument()
  })

  it('sends hero visitors to contact or the work', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    expect(within(hero).getByRole('link', { name: 'Start a project' })).toHaveAttribute(
      'href',
      '#contact',
    )
    expect(within(hero).getByRole('link', { name: 'See the work' })).toHaveAttribute(
      'href',
      '#work',
    )
    expect(
      within(hero).getByText(/^I build the systems behind modern astronomy/),
    ).toBeInTheDocument()
  })

  it('names the hero image and lists every institution as authored', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    const caption = within(hero)
      .getByText('M27, the Dumbbell Nebula')
      .closest('figcaption')!
    expect(caption).toHaveTextContent(
      'M27, the Dumbbell Nebula · Mayall 4-m Telescope, Kitt Peak, Arizona',
    )
    expect(caption).not.toHaveTextContent('T.A. Rector')
    expect(within(caption).queryByRole('link')).toBeNull()
    const institutions = within(
      within(hero).getByRole('list', { name: 'Institutions I have worked with' }),
    )
      .getAllByRole('listitem')
      .map((item) => item.textContent)
    expect(institutions).toEqual([
      'NSF NOIRLab',
      'Gemini Observatory',
      'Caltech / IPAC',
      'NASA SPHEREx',
      'Steward Observatory',
      'Lowell Observatory',
      'Northern Arizona University',
    ])
  })

  it('settles the hero copy and calls to action in fully visible', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    for (const element of [
      within(hero).getByText('Software that does the heavy lifting'),
      within(hero).getByRole('heading', { level: 1 }),
      within(hero).getByText(/^I build the systems/),
      within(hero).getByRole('link', { name: 'Start a project' }).parentElement!,
    ]) {
      expect(element).toBeVisible()
      expect(element.style.transform).toBe('none')
    }
  })

  it('presses both hero calls to action down and lets them spring back', async () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    for (const name of ['Start a project', 'See the work']) {
      const cta = within(hero).getByRole('link', { name })
      fireEvent.pointerDown(cta)
      await waitFor(() => expect(cta.style.transform).toBe('scale(0.97)'))
      fireEvent.pointerUp(cta)
      await waitFor(() => expect(cta.style.transform).toBe('none'))
    }
  })

  it('offers only the two calls to action as hero links', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    const links = within(hero)
      .getAllByRole('link')
      .map((link) => link.textContent)
    expect(links).toEqual(['Start a project', 'See the work'])
  })

  it('loads the hero image first, sized for the screen', () => {
    render(<App />)
    const image = screen.getByRole('img', { name: /^The Dumbbell Nebula/ })
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(image.getAttribute('srcset')).toMatch(/ 1200w, .+ 2400w$/)
    expect(image).toHaveAttribute('sizes', heroImage.sizes)
  })

  it('names the institutions only in the hero, not in a separate strip', () => {
    render(<App />)
    expect(screen.queryByRole('region', { name: 'Institutions' })).toBeNull()
    expect(screen.queryByText('Experience across')).toBeNull()
  })

  it('introduces Dan in About with the pull quote, his MS, and profile links', () => {
    render(<App />)
    const about = screen.getByRole('region', { name: 'About' })
    expect(
      within(about).getByText(
        'I build the tools I wished I had at 3 a.m. on the mountain.',
      ),
    ).toBeInTheDocument()
    expect(
      within(about).getByText(
        /an MS in Applied Physics from Northern Arizona University/,
      ),
    ).toBeInTheDocument()
    expect(within(about).getByText('Dan Avner')).toBeInTheDocument()
    expect(within(about).getByText('Founder & Principal Engineer')).toBeInTheDocument()
    expect(
      within(about).getByRole('img', { name: 'Portrait of Dan Avner' }),
    ).toBeInTheDocument()
    expect(
      within(about)
        .getAllByRole('link')
        .map((link) => [link.textContent, link.getAttribute('href')]),
    ).toEqual([
      ['danavner.com', 'https://www.danavner.com'],
      ['GitHub', 'https://github.com/davner'],
      ['LinkedIn', 'https://www.linkedin.com/in/danavner'],
    ])
  })

  it('walks through the four process steps and answers questions on demand', () => {
    render(<App />)
    const section = screen
      .getByRole('heading', { level: 2, name: 'Process' })
      .closest('section')!
    expect(
      within(within(section).getAllByRole('list')[0])
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Step 1: Intro call',
      'Step 2: Scoped proposal',
      'Step 3: Build',
      'Step 4: Handover',
    ])
    const question = within(section).getByRole('button', {
      name: 'What kinds of projects are a good fit?',
    })
    expect(within(section).queryByText(/^Observatory control systems/)).toBeNull()
    fireEvent.click(question)
    expect(within(section).getByText(/^Observatory control systems/)).toBeVisible()
  })

  it('reveals the contact email on click', () => {
    render(<App />)
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /prefer email/i }))
    expect(
      document.querySelector('a[href="mailto:hello@sidereal.software"]'),
    ).not.toBeNull()
  })

  it('lists the four services under a Services title with the stack', () => {
    render(<App />)
    const services = screen
      .getByRole('heading', { level: 2, name: 'Services' })
      .closest('section')!
    expect(
      within(services)
        .getAllByRole('heading', { level: 3 })
        .map((heading) => heading.textContent),
    ).toEqual([
      'Observatory & instrument control',
      'Data pipelines & backends',
      'Scientific web platforms',
      'Python libraries & APIs',
      "Don't write software? That's the point.",
    ])
    expect(within(services).getByText('TOM Toolkit')).toBeInTheDocument()
  })

  it('keeps the mixed-case acronym in the uppercase Python service title', () => {
    render(<App />)
    const title = screen.getByRole('heading', {
      level: 3,
      name: 'Python libraries & APIs',
    })
    expect(within(title).getByText('APIs')).toHaveStyle({ textTransform: 'none' })
  })

  it('speaks to non-software clients', () => {
    render(<App />)
    expect(
      screen.getByText("Don't write software? That's the point."),
    ).toBeInTheDocument()
  })

  it('links the header to every section a visitor needs', () => {
    render(<App />)
    const nav = within(screen.getByRole('banner')).getByRole('navigation')
    const links = within(nav)
      .getAllByRole('link')
      .map((link) => [link.textContent, link.getAttribute('href')])
    expect(links).toEqual([
      ['Services', '#services'],
      ['Work', '#work'],
      ['About', '#about'],
      ['Process', '#process'],
      ['Start a project', '#contact'],
    ])
  })

  it('presses the header call to action down and lets it spring back', async () => {
    render(<App />)
    const cta = within(screen.getByRole('banner')).getByRole('link', {
      name: 'Start a project',
    })
    fireEvent.pointerDown(cta)
    await waitFor(() => expect(cta.style.transform).toBe('scale(0.97)'))
    fireEvent.pointerUp(cta)
    await waitFor(() => expect(cta.style.transform).toBe('none'))
  })

  it('opens a menu with every section including Contact', async () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }))
    const menu = await screen.findByRole('dialog', { name: 'Menu' })
    const links = within(menu)
      .getAllByRole('link')
      .map((link) => [link.textContent, link.getAttribute('href')])
    expect(links).toEqual([
      ['Services', '#services'],
      ['Work', '#work'],
      ['About', '#about'],
      ['Process', '#process'],
      ['Contact', '#contact'],
    ])
  })

  it('closes the footer with the tagline and credits for every image', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    expect(
      within(footer).getByText('Sidereal Software · Los Angeles, California'),
    ).toBeInTheDocument()
    expect(
      within(footer).getByText('Software that does the heavy lifting'),
    ).toBeInTheDocument()
    expect(within(footer).getByRole('link', { name: 'Back to top' })).toHaveAttribute(
      'href',
      '#home',
    )
    const credits = within(
      within(footer).getByRole('list', { name: 'Image credits' }),
    ).getAllByRole('listitem')
    for (const image of creditedImages) {
      const entry = credits.find((item) => item.textContent?.startsWith(image.name))
      expect(entry, `missing credit for ${image.name}`).toBeDefined()
      expect(entry).toHaveTextContent(image.credit)
      expect(within(entry!).getByRole('link', { name: image.license })).toHaveAttribute(
        'href',
        image.licenseUrl,
      )
    }
  })

  it('offers no theme switch', () => {
    render(<App />)
    expect(
      screen.queryByRole('button', { name: /theme|dark mode|light mode/i }),
    ).toBeNull()
  })

  it('renders the labeled contact form with its spam honeypot', () => {
    render(<App />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Organization (optional)')).toBeInTheDocument()
    expect(screen.getByLabelText('What do you need help with?')).toBeInTheDocument()
    expect(document.querySelector('input[name="_gotcha"]')).not.toBeNull()
  })

  it('presses the inquiry button down and lets it spring back', async () => {
    render(<App />)
    const submit = screen.getByRole('button', { name: 'Send inquiry' })
    fireEvent.pointerDown(submit)
    await waitFor(() => expect(submit.style.transform).toBe('scale(0.97)'))
    fireEvent.pointerUp(submit)
    await waitFor(() => expect(submit.style.transform).toBe('none'))
  })

  it('states availability and location', () => {
    render(<App />)
    expect(screen.getByText('Currently taking on new projects')).toBeInTheDocument()
    expect(screen.getByText('Los Angeles, California · Pacific Time')).toBeInTheDocument()
  })

  it('dates GOATS, keeps pyINDI in its casing, and drops INDINexus', () => {
    render(<App />)
    const work = screen
      .getByRole('heading', { level: 2, name: 'Work' })
      .closest('section')!
    const goats = within(work).getByRole('heading', { level: 3, name: 'GOATS' })
    expect(goats.closest('article')).toHaveTextContent('Jul 2023 - Dec 2025')
    const pyindi = within(work).getByRole('heading', { level: 3, name: 'pyINDI' })
    expect(pyindi).not.toHaveClass('uppercase')
    expect(document.body).not.toHaveTextContent('INDINexus')
  })

  it('lists every career entry with its organization and period', () => {
    render(<App />)
    const list = screen.getByRole('list', { name: 'Career' })
    const entries = within(list)
      .getAllByRole('listitem')
      .filter((item) => item.parentElement === list)
      .map((item) => item.textContent)
    expect(entries).toHaveLength(career.length)
    career.forEach((entry, index) => {
      expect(entries[index]).toContain(entry.org)
      expect(entries[index]).toContain(formatPeriod(entry.period))
    })
    expect(entries[0]).toContain('2023 - present')
  })

  it('captions every Work photo by name and place and credits it only in the footer', () => {
    render(<App />)
    const work = screen
      .getByRole('heading', { level: 2, name: 'Work' })
      .closest('section')!
    const footer = within(
      screen.getByRole('link', { name: 'Back to top' }).closest('footer')!,
    ).getByRole('list', { name: 'Image credits' })
    const photos = within(work).getAllByRole('img')
    expect(photos.length).toBeGreaterThan(0)
    for (const photo of photos) {
      const image = creditedImages.find(
        (entry) => entry.src === photo.getAttribute('src'),
      )
      expect(image, `no credit data for ${photo.getAttribute('src')}`).toBeDefined()
      const figure = photo.closest('figure')!
      expect(figure).toHaveTextContent(`${image!.name} · ${image!.location}`)
      expect(figure).not.toHaveTextContent(image!.credit)
      expect(within(footer).getByRole('link', { name: image!.name })).toBeInTheDocument()
    }
  })

  it('points to the Sidereal GitHub organization for current work', () => {
    render(<App />)
    const work = screen
      .getByRole('heading', { level: 2, name: 'Work' })
      .closest('section')!
    expect(
      within(work).getByRole('link', { name: /github\.com\/sidereal-software/ }),
    ).toHaveAttribute('href', 'https://github.com/sidereal-software')
  })

  it('links every featured repository', () => {
    render(<App />)
    for (const href of [
      'https://github.com/gemini-hlsw/goats',
      'https://github.com/gemini-hlsw/gpp-client',
      'https://github.com/GeminiDRSoftware/DRAGONS',
      'https://github.com/MMTObservatory/pyINDI',
      'https://github.com/sidereal-software',
    ]) {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      expect(links.length, `missing link to ${href}`).toBeGreaterThan(0)
    }
  })
})
