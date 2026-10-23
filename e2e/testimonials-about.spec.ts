import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { expectMonumentFits, expectNoHorizontalScroll, openAt, widths } from './page'

for (const section of ['#testimonials', '#about']) {
  test(`${section} has no accessibility violations`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openAt(page, 1440)
    const { violations } = await new AxeBuilder({ page }).include(section).analyze()
    expect(violations).toEqual([])
  })
}

for (const width of widths) {
  test(`About monument fits at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await openAt(page, width)
    await expectMonumentFits(page, 'About')
    await expectNoHorizontalScroll(page)
  })
}

function activeQuoteOpacity(page: Page) {
  return page
    .locator('#testimonials figure:not([aria-hidden="true"])')
    .evaluate((el) => Number(getComputedStyle(el).opacity))
}

test('the next testimonial springs in and settles fully visible', async ({ page }) => {
  await openAt(page, 1440)
  const next = page.getByRole('button', { name: 'Next testimonial' })
  await next.scrollIntoViewIfNeeded()
  await next.click()
  await expect.poll(() => activeQuoteOpacity(page), { intervals: [10] }).toBeLessThan(1)
  await expect.poll(() => activeQuoteOpacity(page)).toBe(1)
  await expect(page.getByText('2 / 4')).toBeVisible()
})

test('testimonials are labelled for screen readers without a visible eyebrow', async ({
  page,
}) => {
  await openAt(page, 1440)
  const section = page.getByRole('region', { name: 'Testimonials' })
  await expect(section).toHaveCount(1)
  const box = await section.getByRole('heading', { name: 'Testimonials' }).boundingBox()
  expect(box?.width ?? 0).toBeLessThanOrEqual(1)
  expect(box?.height ?? 0).toBeLessThanOrEqual(1)
})

for (const width of [390, 1440]) {
  test(`controls sit under each attribution and the section never resizes at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openAt(page, width)
    const section = page.locator('#testimonials')
    const previous = page.getByRole('button', { name: 'Previous testimonial' })
    const next = page.getByRole('button', { name: 'Next testimonial' })
    const heights = new Set<number>()
    for (let step = 0; step < 4; step++) {
      const caption = section.locator('figure:not([aria-hidden="true"]) figcaption')
      const captionBottom = await caption.evaluate(
        (el) => el.getBoundingClientRect().bottom,
      )
      const controlsTop = await previous.evaluate((el) => el.getBoundingClientRect().top)
      const gap = controlsTop - captionBottom
      expect(gap, `gap under testimonial ${step + 1}`).toBeGreaterThanOrEqual(24)
      expect(gap, `gap under testimonial ${step + 1}`).toBeLessThanOrEqual(64)
      heights.add(await section.evaluate((el) => el.getBoundingClientRect().height))
      await next.click()
    }
    expect([...heights]).toHaveLength(1)
  })
}

test('the next testimonial appears at once under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  await page.getByRole('button', { name: 'Next testimonial' }).click()
  expect(await activeQuoteOpacity(page)).toBe(1)
})
