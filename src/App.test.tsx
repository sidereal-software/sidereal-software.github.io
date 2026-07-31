import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
      'Engineering the night sky',
      'What Sidereal is building now',
      'A full-stack toolkit, proven in production',
      'A decade across observatories and missions',
      'Full-stack astronomy software',
      'Meet the founder',
      'Get in touch',
    ]) {
      expect(
        screen.getByRole('heading', { name: new RegExp(heading, 'i') }),
      ).toBeInTheDocument()
    }
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

  it('links the contact email', () => {
    render(<App />)
    expect(
      document.querySelector('a[href="mailto:hello@sidereal.software"]'),
    ).not.toBeNull()
  })

  it('links the experience repos', () => {
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
