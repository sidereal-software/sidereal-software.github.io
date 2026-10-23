import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import {
  expectMonumentFits,
  expectNoHorizontalScroll,
  monument,
  openAt,
  widths,
} from './page'

test('Work has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  const { violations } = await new AxeBuilder({ page }).include('#work').analyze()
  expect(violations).toEqual([])
})

test('case-study names keep their authored casing', async ({ page }) => {
  await openAt(page, 1440)
  for (const name of ['GOATS', 'pyINDI']) {
    expect(await monument(page, name).innerText()).toBe(name)
  }
})

for (const width of widths) {
  test(`Work and case-study monuments fit at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await openAt(page, width)
    await expectMonumentFits(page, 'Work')
    for (const name of ['GOATS', 'pyINDI']) {
      await expectMonumentFits(page, name, { fills: false })
    }
    await expectNoHorizontalScroll(page)
  })
}
