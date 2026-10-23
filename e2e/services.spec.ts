import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { openAt } from './page'

test('Services has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  const { violations } = await new AxeBuilder({ page }).include('#services').analyze()
  expect(violations).toEqual([])
})

test('service titles read as one uppercase set', async ({ page }) => {
  await openAt(page, 1440)
  const titles = page.locator('#services ol h3')
  expect(
    await titles.evaluateAll((els) => els.map((el) => (el as HTMLElement).innerText)),
  ).toEqual([
    'OBSERVATORY & INSTRUMENT CONTROL',
    'DATA PIPELINES & BACKENDS',
    'SCIENTIFIC WEB PLATFORMS',
    'PYTHON LIBRARIES & APIs',
  ])
})
