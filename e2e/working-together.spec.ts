import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { expectMonumentFits, expectNoHorizontalScroll, openAt, widths } from './page'

function numerals(page: Page) {
  return page.locator('#process ol > li > span[aria-hidden]')
}

function opacities(page: Page) {
  return numerals(page).evaluateAll((els) =>
    els.map((el) => Number(getComputedStyle(el).opacity)),
  )
}

test('Working together has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  await page.locator('#process').getByRole('button').first().click()
  const { violations } = await new AxeBuilder({ page }).include('#process').analyze()
  expect(violations).toEqual([])
})

test('process numerals spring up in sequence the first time they enter view', async ({
  page,
}) => {
  await openAt(page, 1440)
  await expect.poll(() => opacities(page)).toEqual([0, 0, 0, 0])

  // Samples every frame from inside the page so the stagger is not lost between polls.
  const samples = page.evaluate(
    () =>
      new Promise<number[][]>((resolve) => {
        const spans = [...document.querySelectorAll('#process ol > li > span')]
        const frames: number[][] = []
        const sample = () => {
          const frame = spans.map((el) => Number(getComputedStyle(el).opacity))
          frames.push(frame)
          if (frame.every((value) => value === 1) || frames.length > 600) resolve(frames)
          else requestAnimationFrame(sample)
        }
        requestAnimationFrame(sample)
      }),
  )
  await numerals(page).first().scrollIntoViewIfNeeded()
  const frames = await samples

  const firstRisen = (index: number) => frames.findIndex((frame) => frame[index] > 0.5)
  const order = [0, 1, 2, 3].map(firstRisen)
  expect(order.every((frame) => frame >= 0)).toBe(true)
  expect(order).toEqual([...order].sort((a, b) => a - b))
  expect(order[3]).toBeGreaterThan(order[0])
  await expect.poll(() => opacities(page)).toEqual([1, 1, 1, 1])
})

test('process numerals stay visible under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  expect(await opacities(page)).toEqual([1, 1, 1, 1])
  await numerals(page).first().scrollIntoViewIfNeeded()
  expect(await opacities(page)).toEqual([1, 1, 1, 1])
})

test('opening a question reveals its answer', async ({ page }) => {
  await openAt(page, 390)
  const question = page.getByRole('button', { name: 'Who owns the work?' })
  await question.click()
  await expect(page.getByText(/^You do\. I hand over/)).toBeVisible()
  await expect(question).toHaveAttribute('aria-expanded', 'true')
})

for (const width of widths) {
  test(`Process monument fits at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await openAt(page, width)
    await expectMonumentFits(page, 'Process')
    await expectNoHorizontalScroll(page)
  })
}
