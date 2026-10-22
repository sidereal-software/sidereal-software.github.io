# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: software leads, principal investigators, and engineering managers at
  observatories, instrument teams, and space missions who need production software
  built or rescued: telescope control, data pipelines, web platforms for astronomers.
- Secondary: research and operations teams outside astronomy, often led by people
  who do not write software (for example the wildlife professionals behind ARK), who
  can describe a problem and need it turned into a working app.

They arrive by referral, from a paper or GitHub repo, or from a search, and judge
fast whether this person has done real work at real facilities.

## Product Purpose

The marketing site for Sidereal Software, Dan Avner's one-person astronomy software
consultancy. It exists to make a qualified visitor believe Dan can ship their system
and then send a message through the contact form. Success is a well-scoped inquiry.

## Positioning

Software built from inside observatories: Gemini (NSF NOIRLab), Caltech/IPAC on
NASA's SPHEREx, and Steward Observatory, end to end from dome and mirror-cover
hardware to the browser. That pedigree is the headline; the proof underneath it is
the ability to turn a scientist's described problem into production software, backed
by peer-reviewed publications.

## Operating Context

Visitors evaluate on desktop at work and on phones from links. They check named
facilities, open-source repos, papers, and recommendation letters before writing.

## Capabilities and Constraints

- One action: the contact form (Formspree), plus a reveal-on-click email.
- No rates, availability, or capacity claims.
- Single-page React site on GitHub Pages; see `CLAUDE.md` for the stack.

## Brand Commitments

- Name: Sidereal Software. Logo `src/assets/logo.png` is fixed; only size and
  placement may change.
- Voice: Dan in first person, as a solo consultancy. Plain, factual, modest -
  "buff without being too showy".
- Theme is dark-only (decided 2026-10-22).

## Evidence on Hand

- Case studies: GOATS (led Jul 2023 - Dec 2025; Dan now leads GPP Resource) and
  pyINDI (MMT, Bok, Kuiper telescopes; SPIE 2022).
- Publications: SPIE 2022 pyINDI paper, first-author SPIE 2026 GOATS paper,
  ApJS 285, 67 (2026) SPHEREx pipeline paper.
- Institutions: NSF NOIRLab, Gemini Observatory, Caltech/IPAC, NASA SPHEREx,
  Steward Observatory, Lowell Observatory, NAU. MS Applied Physics (NAU).
- Testimonials: excerpts of recommendation letters, approved verbatim by Dan
  (`src/components/sections/testimonials.tsx`).
- Portrait: `src/assets/me.jpg`. Open source: https://github.com/sidereal-software
- Source of truth for career facts: `~/github/davner/career-ops/cv.md`.
- Absent, never to be invented: client logos beyond named institutions, metrics,
  pricing, new testimonials.

## Product Principles

1. Credibility before persuasion: named facilities, repos, and papers do the selling.
2. Astronomy first; the broader offer follows, never the reverse.
3. Every claim is checkable and true; wording changes need Dan's approval.
4. One clear path to contact from every section.

## Accessibility & Inclusion

WCAG AA contrast. All motion disabled under `prefers-reduced-motion`.
