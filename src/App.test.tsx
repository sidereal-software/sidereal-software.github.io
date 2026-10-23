import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { creditedImages } from '@/content/images'
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
      'From problem to production',
      'What Sidereal is building',
      'A career across observatories and missions',
      'In their words',
      'Meet the founder',
      'How I work',
      'Common questions',
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

  it('credits the hero image and lists every institution as authored', () => {
    render(<App />)
    const hero = screen.getByRole('region', { name: /^Production software/ })
    const caption = within(hero)
      .getByText('M27, the Dumbbell Nebula')
      .closest('figcaption')!
    expect(caption).toHaveTextContent('Mayall 4-m Telescope, Kitt Peak, Arizona')
    expect(caption).toHaveTextContent('T.A. Rector (University of Alaska Anchorage)')
    expect(within(caption).getByRole('link', { name: 'CC BY 4.0' })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by/4.0/',
    )
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
      expect(element.style.opacity).toBe('1')
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

  it('loads the hero image first, sized for the screen', () => {
    render(<App />)
    const image = screen.getByRole('img', { name: /^The Dumbbell Nebula/ })
    expect(image).toHaveAttribute('fetchpriority', 'high')
    expect(image.getAttribute('srcset')).toMatch(/ 1200w, .+ 2400w$/)
    expect(image).toHaveAttribute('sizes')
  })

  it('names the institutions only in the hero, not in a separate strip', () => {
    render(<App />)
    expect(screen.queryByRole('region', { name: 'Institutions' })).toBeNull()
    expect(screen.queryByText('Experience across')).toBeNull()
  })

  it('links the founder profiles', () => {
    render(<App />)
    for (const href of [
      'https://www.danavner.com',
      'https://github.com/davner',
      'https://www.linkedin.com/in/danavner',
    ]) {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      expect(links.length, `missing link to ${href}`).toBeGreaterThan(0)
    }
  })

  it('reveals the contact email on click', () => {
    render(<App />)
    expect(document.querySelector('a[href^="mailto:"]')).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /prefer email/i }))
    expect(
      document.querySelector('a[href="mailto:hello@sidereal.software"]'),
    ).not.toBeNull()
  })

  it('features both Sidereal projects', () => {
    render(<App />)
    expect(screen.getByText('INDINexus')).toBeInTheDocument()
    expect(screen.getByText('ARK - Animal Record Keeper')).toBeInTheDocument()
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
    // Testimonial attributions also use <footer>, so find the site footer by its own link.
    const footer = screen.getByRole('link', { name: 'Back to top' }).closest('footer')!
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

  it('states availability and location', () => {
    render(<App />)
    expect(screen.getByText('Currently taking on new projects')).toBeInTheDocument()
    expect(screen.getByText('Los Angeles, California · Pacific Time')).toBeInTheDocument()
  })

  it('credits every testimonial author', () => {
    render(<App />)
    for (const author of [
      'Chris Johnson',
      'Scott Swindell',
      'David Trilling',
      'Christina Nelson',
    ]) {
      expect(screen.getByText(author)).toBeInTheDocument()
    }
  })

  it('links every featured repository', () => {
    render(<App />)
    for (const href of [
      'https://github.com/gemini-hlsw/goats',
      'https://github.com/gemini-hlsw/gpp-client',
      'https://github.com/GeminiDRSoftware/DRAGONS',
      'https://github.com/MMTObservatory/pyINDI',
      'https://github.com/sidereal-software/indi-nexus',
    ]) {
      const links = document.querySelectorAll(`a[href="${href}"]`)
      expect(links.length, `missing link to ${href}`).toBeGreaterThan(0)
    }
  })
})
