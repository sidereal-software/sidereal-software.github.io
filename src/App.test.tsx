import { fireEvent, render, screen, within } from '@testing-library/react'
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
      'Production software for observatories, missions, and research teams',
      'Full-stack scientific software',
      'From problem to production',
      'What Sidereal is building',
      'A decade across observatories and missions',
      'In their words',
      'Meet the founder',
      'How we work',
      'Common questions',
      'Start a project',
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

  it('speaks to non-software clients', () => {
    render(<App />)
    expect(
      screen.getByText("Don't write software? That's the point."),
    ).toBeInTheDocument()
  })

  it('toggles and persists the theme', () => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'Switch to dark mode' }))
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
    fireEvent.click(screen.getByRole('button', { name: 'Switch to light mode' }))
    expect(document.documentElement.classList.contains('dark')).toBe(false)
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('renders the labeled contact form with its spam honeypot', () => {
    render(<App />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Organization (optional)')).toBeInTheDocument()
    expect(screen.getByLabelText('What are you working on?')).toBeInTheDocument()
    expect(document.querySelector('input[name="_gotcha"]')).not.toBeNull()
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
