import { expect, test, type Locator } from '@playwright/test'

import { openAt } from './page'

function runningAnimations(locator: Locator) {
  return locator.evaluate(
    (el) =>
      el.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length,
  )
}

test.beforeEach(({ page }) => page.emulateMedia({ reducedMotion: 'reduce' }))

test('in-page links jump instead of scrolling smoothly', async ({ page }) => {
  await openAt(page, 1440)
  expect(
    await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
  ).toBe('auto')
})

test('the mobile menu opens without sliding or fading', async ({ page }) => {
  await openAt(page, 390)
  await page.getByRole('button', { name: 'Menu' }).click()
  const menu = page.getByRole('dialog', { name: 'Menu' })
  await expect(menu).toBeVisible()
  expect(await runningAnimations(menu)).toBe(0)
  expect(await runningAnimations(page.locator('[data-slot="sheet-overlay"]'))).toBe(0)
})

test('an FAQ answer opens without animating', async ({ page }) => {
  await openAt(page, 1440)
  await page
    .locator('#process')
    .getByRole('button', { name: 'What kinds of projects are a good fit?' })
    .click()
  const answer = page.locator(
    '#process [data-slot="accordion-content"][data-state="open"]',
  )
  await expect(answer).toBeVisible()
  expect(await runningAnimations(answer)).toBe(0)
})
