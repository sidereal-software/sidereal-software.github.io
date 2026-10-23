---
name: Sidereal Software
description: Software that does the heavy lifting - a dark, art-led monolith for an astronomy software consultancy.
colors:
  night-ground: '#050507'
  bone-ink: '#edece7'
  ice-cyan: '#9be7ff'
  ice-cyan-ink: '#050507'
  moon-grey: '#a8a8b0'
  dust-grey: '#8a8a94'
  hairline: '#26272d'
  field-line: '#5a5b63'
  coral-alert: '#ff8a80'
typography:
  display:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'fitted to container width, capped at 20rem (Work 24rem, case-study names 16rem)'
    fontWeight: 700
    lineHeight: 0.86
    letterSpacing: '0.01em'
  headline:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.75rem, 3.5vw, 3.25rem)'
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: '-0.02em'
  headline-list:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.6rem, 3.6vw, 3.25rem)'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.03em'
  quote:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(1.5rem, 3.8vw, 3.5rem)'
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: '-0.02em'
  numeral:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: 'clamp(5rem, 9vw, 8.5rem)'
    fontWeight: 700
    lineHeight: 1
    letterSpacing: '-0.04em'
    fontFeature: 'tnum'
  title:
    fontFamily: 'Unbounded Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 600
    lineHeight: 1.375
    letterSpacing: '-0.01em'
  body:
    fontFamily: 'Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '1.125rem'
    fontWeight: 400
    lineHeight: 1.625
  body-small:
    fontFamily: 'Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: 'Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: '0.32em'
  kicker:
    fontFamily: 'Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 500
    lineHeight: 1.33
    letterSpacing: '0.32em'
  caption:
    fontFamily: 'Hanken Grotesk Variable, ui-sans-serif, system-ui, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 400
    lineHeight: 1.625
rounded:
  none: '0px'
spacing:
  gutter-mobile: '20px'
  gutter-tablet: '32px'
  gutter-desktop: '48px'
  content-max: '1440px'
  header-height: '64px'
  title-to-content: '96px'
  section-top: '192px'
  section-bottom: '112px'
components:
  button-primary:
    backgroundColor: '{colors.ice-cyan}'
    textColor: '{colors.ice-cyan-ink}'
    typography: '{typography.body-small}'
    rounded: '{rounded.none}'
    padding: '0 24px'
    height: '48px'
  button-primary-hover:
    backgroundColor: '{colors.bone-ink}'
    textColor: '{colors.ice-cyan-ink}'
  link-accent:
    textColor: '{colors.ice-cyan}'
    typography: '{typography.body-small}'
  link-quiet:
    textColor: '{colors.bone-ink}'
    typography: '{typography.body-small}'
  step-button:
    textColor: '{colors.bone-ink}'
    rounded: '{rounded.none}'
    size: '48px'
  step-button-hover:
    textColor: '{colors.ice-cyan}'
  input-underline:
    backgroundColor: 'transparent'
    textColor: '{colors.bone-ink}'
    rounded: '{rounded.none}'
    padding: '12px 0'
  nav-link:
    textColor: '{colors.moon-grey}'
    typography: '{typography.body-small}'
  nav-link-hover:
    textColor: '{colors.bone-ink}'
---

# Design System: Sidereal Software

## Overview

**Creative North Star: "The Monolith"**

A night ground, one cold accent, and giant upright type standing in front of real telescope photographs. The site borrows the restraint of a large observatory's public face: almost nothing on the page is decorative, so the photographs of facilities Dan's work touched and the oversized section titles carry the whole atmosphere. One retro-future signature, the Monument title, does the shouting; everything else is quiet, small, and set in a humanist grotesk.

Density is low and vertical. Sections are separated by space and hairline rules, never by background bands or cards. Photography is full-bleed or plainly cropped, always credited in a caption under it, and the hero nebula is the only image that moves. Motion is slow (a 60 s zoom) or small (springs that settle in under half a second); nothing loops for decoration.

The theme is dark-only. There is no light mode and no theme switch, and every text color is chosen to pass WCAG AA on the night ground.

**Key Characteristics:**

- Dark-only ground with a single ice-cyan accent.
- Monument titles that fill their container exactly, uppercase for generic words only.
- Square everything: zero radius on every surface and control.
- Credited observatory photography as the only imagery.
- Hairline rules and space as the only separators.
- Soft spring micro-motion, fully disabled under reduced motion.

## Colors

A near-black, slightly blue night with warm bone ink and one ice-cyan accent; greys step down for secondary and tertiary text.

### Primary

- **Ice Cyan** (`ice-cyan`): the one accent. Primary button fill, "Start a project" and external links, service numbers, the hero kicker, focus outlines and focused form fields, text selection, the availability square, and the hover state of controls and link underlines. Accent links use it at 40% for the underline at rest and full strength on hover.
- **Ice Cyan Ink** (`ice-cyan-ink`): text on a cyan fill. Always dark on cyan, never white.

### Neutral

- **Night Ground** (`night-ground`): the page, the scrolled header, the mobile menu panel, and the 85% translucent strips over the hero (institutions row, image caption).
- **Bone Ink** (`bone-ink`): headings, Monument titles, primary text, and the primary button's hover fill.
- **Moon Grey** (`moon-grey`): body copy, ledes, descriptions, nav links at rest, and form labels (8.6:1 on the ground).
- **Dust Grey** (`dust-grey`): tertiary text: periods, years, counters, captions, small section labels, and the large process numerals (6.0:1 on the ground).
- **Hairline** (`hairline`): every rule and border: list dividers, section-block tops, the scrolled header's bottom edge, the testimonial step buttons.
- **Field Line** (`field-line`): the underline of form fields at rest (3:1, the control contrast floor).
- **Coral Alert** (`coral-alert`): form validation errors only.

The shadcn surface tokens (card, popover, secondary, muted, accent) map onto the same night palette so the vendored primitives match without edits; no site surface is filled with them.

### Named Rules

**The One Cold Light Rule.** Ice cyan is the only chromatic color in the interface. Color in the page beyond it comes from the photographs.

**The No Bands Rule.** Sections never get their own background color. They separate by space and a hairline.

## Typography

**Display Font:** Unbounded Variable (with ui-sans-serif, system-ui)
**Body Font:** Hanken Grotesk Variable (with ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto)

Both are self-hosted through Fontsource; no font is loaded from a third party.

**Character:** Unbounded is wide, geometric, and a little retro-future; at monument size it reads as architecture. Hanken Grotesk is calm and legible at small sizes, so everything that is not a heading steps back.

### Hierarchy

- **Display** (Unbounded 700, fitted to the container, line-height 0.86, 0.01em tracking): Monument titles only - section titles (Services, Work, About, Process, Start a project) and the case-study names over their photos.
- **Headline** (Unbounded 600, clamp(1.75rem, 3.5vw, 3.25rem), 1.05, -0.02em, uppercase): the hero H1.
- **Headline list** (Unbounded 600, clamp(1.6rem, 3.6vw, 3.25rem), 1.02, -0.03em, uppercase): the four service titles.
- **Quote** (Unbounded 400, clamp(1.5rem, 3.8vw, 3.5rem), 1.14): testimonials, max 24-28ch with a hanging opening quote. The About pull quote uses the same face at 500 and clamp(1.5rem, 2.8vw, 2.5rem).
- **Numeral** (Unbounded 700, clamp(5rem, 9vw, 8.5rem), 1, tabular, dust grey): process step numbers. Career years use Unbounded 600 at clamp(1.75rem, 3vw, 2.5rem).
- **Title** (Unbounded 600, 1.125rem, -0.01em): roles, organizations, names. Outcome statements and featured publications sit between title and headline in Unbounded 500 (1.125-1.5rem).
- **Body** (Hanken Grotesk 400, 1.125rem, 1.625): paragraphs, 34-62ch measures. 1rem in dense lists.
- **Body small** (Hanken Grotesk 400, 0.875rem): nav, buttons, links, metadata.
- **Label** (Hanken Grotesk 500, 0.75rem, 0.32em tracking, uppercase, dust grey): small headings that name their own block (Career, Publications, Questions, Image credits) and term labels (Problem, Approach, Outcome; form labels at 0.2em in moon grey).
- **Caption** (Hanken Grotesk 400, 0.75rem, 1.625, dust grey with the image name in moon grey): image credits, separated by middle dots.

### Named Rules

**The Monument Fit Rule.** A Monument title fills its container's inner width exactly at every width and never crops. Its size is measured, not guessed: the fit-text hook sets the font size from the rendered text width against the container, re-measures on resize and after web fonts load, and respects a per-use cap. Before measurement a CSS fallback (container query width divided by character count) errs small. No negative margins, no viewport-overflowing sizes, no horizontal translation. Authored newlines are the only line breaks.

**The Casing Rule.** Uppercase is applied by CSS and only to generic words: Monument section titles, the H1, service titles, process step titles, labels, menu links. Anything containing a proper name keeps its authored casing: institutions, case-study names (pyINDI, never PYINDI), organizations, publication titles, testimonial attributions. When uppercase text contains a mixed-case acronym, the text stays uppercase and only the acronym keeps its casing ("PYTHON LIBRARIES & APIs"); route such text through Caps. Generic titles are authored in sentence case in source and transformed; proper-name Monuments are not transformed.

**The One Kicker Rule.** The hero line "Software that does the heavy lifting" is the site's only kicker: a tracked uppercase ice-cyan line above the H1 (0.7rem at 0.2em on mobile, 0.75rem at 0.32em on desktop). This is Dan's deliberate override of impeccable's eyebrow ban, decided after the finish review, because the tagline is the brand line and its pun lands through the M27 caption. No other eyebrow labels are allowed anywhere: a small tracked label may be the heading of its own block, but never a tag stacked above another heading.

## Layout

One centered column, max 90rem (1440px) wide, with gutters of 20px, 32px from 640px, and 48px from 1024px. Inside it, content sits on a 12-column grid from 768px or 1024px, typically a narrow left column (4-5 columns: labels, metadata, portraits) and a wide right column (6-7 columns: lists and prose). Mobile collapses to one column.

Rhythm is generous and vertical: sections open with 128px of top space (192px from 768px) and close with 112px; a Monument title is followed by 64px (96px from 768px) before content. Lists are rows divided by hairlines with 40-56px of vertical padding per row.

The hero fills the small viewport height. On desktop the nebula sits full-bleed to the right with a left fade mask and the text column takes the left 46%; on mobile the image takes the top 46% of the viewport with a bottom fade and the text follows. The institutions row is a hairline-topped strip pinned to the hero's bottom on desktop.

Case studies break out of the column: a full-bleed photo band (26rem tall on mobile, clamp(20rem, 72vh, 46rem) on desktop) with the name as a Monument over a bottom gradient, then the detail grid back in the column.

The header is fixed, 64px tall, transparent over the hero and night ground with a hairline once scrolled. Below 1024px the section links collapse into a "Menu" button that opens a full-height right sheet; "Start a project" stays in the header at every width, and below 640px the wordmark stacks onto two lines to make room for it.

Breakpoints are Tailwind's defaults: 640, 768, 1024px. Mobile is checked at 390px with no horizontal scroll.

## Elevation & Depth

Flat. There are no shadows in the site's own components; field shadows from the vendored primitives are switched off at the call site. Depth comes from the photographs and from gradients toward the night ground: the hero's mask fades, a top scrim behind the header, and the bottom gradient that seats a case-study name on its photo. Overlapping text strips over an image use the night ground at 85% opacity, not blur.

### Named Rules

**The Flat Night Rule.** Nothing floats. Separation is space, a hairline, or a fade to the ground.

## Shapes

Square. The radius token is 0 and every Tailwind radius step maps to it, so vendored primitives render square too. Controls are rectangles (48px tall buttons, 48px square step buttons), images are plain rectangles cropped with object-fit (4:3 for secondary photos, 3:4 to 2:3 for the portrait), and the only ornamental form is the small cyan square beside the availability line. Borders are 1px hairlines.

## Components

### Buttons

Few, solid, and square.

- **Shape:** square corners (0px), 48px tall.
- **Primary:** ice-cyan fill, dark ink, Hanken Grotesk 600 at 0.875rem with slight tracking, 24-28px side padding, trailing arrow icon. Used for "Start a project" in the hero and "Send inquiry".
- **Hover / Focus:** fill shifts to bone ink; the arrow nudges 4px right (only when motion is allowed). Focus is a 2px ice-cyan outline offset 4px. Press scales to 0.97 on a spring.
- **Step button:** 48px square with a hairline border and a 1.75-stroke arrow; hover turns border and arrow ice cyan. Used for testimonial previous and next.
- **Disabled / sending:** 70% opacity and a wait cursor.

### Links

- **Accent link:** ice-cyan text, underline offset 6px at 40% cyan, full cyan on hover. Used for "Start a project" in the header, repository and paper links (with an up-right arrow), the GitHub organization line, and the revealed email.
- **Quiet link:** ink or moon-grey text with a dust-grey underline that turns ink or cyan on hover. Used for "See the work", profile links, publication titles, "Back to top", and caption license links.

### Inputs / Fields

- **Style:** underline only: transparent background, no box, a 1px field-line bottom border, 12px vertical padding, 1.125rem text. Labels sit above in tracked uppercase moon grey.
- **Focus:** the underline thickens to 2px ice cyan (padding gives back the extra pixel, so nothing shifts) and the label above turns ice cyan; no ring.
- **Error:** coral text below the field. The message field does not resize.

### Navigation

- **Desktop:** moon-grey 0.875rem links (Services, Work, About, Process) that turn ink on hover, then the cyan "Start a project" accent link. Logo mark inverted to white beside an Unbounded 600 uppercase wordmark at 0.8rem with 0.18em tracking.
- **Mobile:** the cyan "Start a project" link stays beside a "Menu" text button (both with 44px tall hit areas), which opens a full-height sheet on the night ground with Unbounded 700 uppercase links at 1.875rem, staggered in on a spring, and the location at the foot.

### Lists

Numbered or dated rows divided by hairlines: services (cyan two-digit number, uppercase title, description), career (big years, organization in authored casing, role, summary, optional credited photo), publications (year column, title, venue), process (big dust-grey numerals over a hairline). The FAQ is a square accordion with Unbounded questions that turn cyan on hover.

### Image Credit

Every photo carries a caption: name, location, credit, and a linked license, middle-dot separated, in 0.75rem dust grey. The footer repeats every credit with the source link.

### Monument (signature)

The giant fitted title described in the Monument Fit Rule. It is an h2 by default (h3 for case-study names), uppercase unless marked as a proper name, multi-line only through authored newlines, and carries the scroll reveal.

### Motion

- **Hero zoom:** the nebula scales slowly from 1.04 to 1.12 with a slight drift, 60 s ease-in-out, alternating forever. The only looping motion on the site.
- **Scroll reveal:** Monument titles rise 1.5rem from 15% opacity as they enter the viewport, driven by the CSS scroll timeline where supported, ending fully visible. Where scroll timelines are unsupported, titles simply show.
- **Springs** (react-spring, one shared motion module): a settle spring (tension 280, friction 30) and a press spring (tension 520, friction 40), both damped near 0.9 so they settle without visible bounce. Used in five places only: the hero entrance stagger (kicker, H1, lede, actions rising 12px, already visible, with no fade), the 0.97 press on buttons and CTA links, the incoming testimonial quote, the process numerals rising 24px in a 90 ms sequence the first time the row scrolls into view, and the mobile menu link stagger.
- **Reduced motion:** under prefers-reduced-motion the hero zoom, scroll reveal, smooth in-page scrolling, and the menu sheet and FAQ open animations are not applied and every spring skips straight to its end state, following live changes to the setting. Hover nudges are gated to motion-safe. Entrance springs (hero, menu links) only move content that is already visible, and the process numerals hide only once they are known to be off-screen, so content is never left invisible if a spring never runs.

## Do's and Don'ts

### Do:

- **Do** use ice cyan as the only accent, with dark ink on any cyan fill.
- **Do** separate sections with space and hairlines on the one night ground.
- **Do** use the Monument component for a new section title so it fits its container; give it a cap and let it measure.
- **Do** author generic titles in sentence case and let CSS uppercase them; route uppercase text with a mixed-case acronym through Caps.
- **Do** keep proper names, institutions, and brands in their authored casing (pyINDI, NSF NOIRLab, Caltech / IPAC, SPHEREx).
- **Do** credit every photo in a caption and in the footer credits list.
- **Do** show CC BY-SA photos unaltered: CSS cropping (object-fit, aspect ratio, overflow) only.
- **Do** keep every new animation behind the shared motion module or a reduced-motion query, and start content visible.
- **Do** keep every text color at WCAG AA on the night ground and every control boundary at 3:1.

### Don't:

- **Don't** add a light theme, theme switch, or second accent color.
- **Don't** add eyebrow labels or kickers; the hero tagline is the single sanctioned kicker.
- **Don't** uppercase a proper name or brand, and don't crop, overflow, translate, or negatively-margin a Monument title.
- **Don't** retint, recolor, filter, mask, dim, or overlay a CC BY-SA photo (MMT, VATT, Lowell Discovery Telescope); masks, dimming, and gradients are only for CC BY and public-domain images such as the M27 hero and the case-study bands.
- **Don't** round corners or add shadows.
- **Don't** use card grids or background bands to group content.
- **Don't** add springs on scroll position, decorative loops, horizontal title drift, WebGL, video, or canvas animation.
