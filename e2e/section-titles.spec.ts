import { expect, test, type Locator } from '@playwright/test'

import { expectNoHorizontalScroll, monument, openAt, widths } from './page'

const sectionTitles = ['Services', 'Work', 'About', 'Process', 'Start a project']
const caseStudyNames = ['GOATS', 'pyINDI']

// Expected px from the spec's clamps: section clamp(2.5rem, 5.5vw, 4.75rem), case-study clamp(2.25rem, 5vw, 4.25rem).
const expectedSize = {
  390: { section: 40, caseStudy: 36 },
  768: { section: 42.24, caseStudy: 38.4 },
  1440: { section: 76, caseStudy: 68 },
} as const

// 2rem on phones, 3rem from 768px: a heading that sits with its content.
const expectedGap = { 390: 32, 768: 48, 1440: 48 } as const

async function measure(title: Locator) {
  await title.scrollIntoViewIfNeeded()
  return title.evaluate((el) => {
    const style = getComputedStyle(el)
    const text = document.createTreeWalker(el, NodeFilter.SHOW_TEXT).nextNode()
    const box = el.getBoundingClientRect()
    const range = document.createRange()
    range.selectNodeContents(el)
    const ink = range.getBoundingClientRect()
    return {
      fontSize: parseFloat(getComputedStyle(text?.parentElement ?? el).fontSize),
      left: box.left + parseFloat(style.paddingLeft),
      right: box.right - parseFloat(style.paddingRight),
      inkLeft: ink.left,
      inkRight: ink.right,
    }
  })
}

for (const width of widths) {
  test(`section titles and case-study names sit at peer scale at ${width}px`, async ({
    page,
  }) => {
    await openAt(page, width)
    const groups = [
      { names: sectionTitles, size: expectedSize[width].section },
      { names: caseStudyNames, size: expectedSize[width].caseStudy },
    ]
    for (const { names, size } of groups) {
      for (const name of names) {
        const title = monument(page, name)
        await expect(title).toHaveCount(1)
        const m = await measure(title)
        expect(m.fontSize, `${name} font size`).toBeCloseTo(size, 0)
        expect(m.inkLeft, `${name} overflows left`).toBeGreaterThanOrEqual(m.left - 0.5)
        expect(m.inkRight, `${name} overflows right`).toBeLessThanOrEqual(m.right + 0.5)
      }
    }
    await expectNoHorizontalScroll(page)
  })

  test(`section titles outrank the service titles at ${width}px`, async ({ page }) => {
    await openAt(page, width)
    const serviceSizes = await page
      .locator('#services ol h3')
      .evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)))
    expect(serviceSizes.length).toBe(4)
    const { fontSize } = await measure(monument(page, 'Services'))
    expect(fontSize).toBeGreaterThan(Math.max(...serviceSizes))
  })

  test(`every section title sits the same distance above its content at ${width}px`, async ({
    page,
  }) => {
    // The scroll reveal would shift titles mid-animation.
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openAt(page, width)
    const gaps: Record<string, number> = {}
    for (const name of sectionTitles) {
      const title = monument(page, name)
      await title.scrollIntoViewIfNeeded()
      gaps[name] = await title.evaluate((el) => {
        const bottom = el.getBoundingClientRect().bottom
        const below = [...el.closest('section')!.querySelectorAll('*')]
          .filter((other) => !el.contains(other) && !other.contains(el))
          .map((other) => other.getBoundingClientRect())
          .filter((box) => box.height > 0 && box.top >= bottom - 1)
          .map((box) => box.top)
        return Math.round(Math.min(...below) - bottom)
      })
    }
    const gap = expectedGap[width]
    expect(gaps).toEqual(Object.fromEntries(sectionTitles.map((name) => [name, gap])))
  })

  test(`the Process title outranks the step numerals at ${width}px`, async ({ page }) => {
    await openAt(page, width)
    const numeralSizes = await page
      .locator('#process ol > li > span[aria-hidden]')
      .evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)))
    expect(numeralSizes.length).toBe(4)
    const { fontSize } = await measure(monument(page, 'Process'))
    expect(fontSize).toBeGreaterThan(Math.max(...numeralSizes))
  })
}
