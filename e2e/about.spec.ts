import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { openAt } from './page'

test('#about has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  const { violations } = await new AxeBuilder({ page }).include('#about').analyze()
  expect(violations).toEqual([])
})
