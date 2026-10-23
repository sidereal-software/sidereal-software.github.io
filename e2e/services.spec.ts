import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { expectMonumentFits, expectNoHorizontalScroll, openAt, widths } from './page'

test('Services has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  const { violations } = await new AxeBuilder({ page }).include('#services').analyze()
  expect(violations).toEqual([])
})

for (const width of widths) {
  test(`Services monument fits at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await openAt(page, width)
    await expectMonumentFits(page, 'Services')
    await expectNoHorizontalScroll(page)
  })
}
