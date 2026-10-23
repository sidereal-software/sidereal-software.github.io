import { expect, test, type Locator } from '@playwright/test'

import { openAt } from './page'

async function box(locator: Locator) {
  const rect = await locator.boundingBox()
  if (!rect) throw new Error('element has no box')
  return rect
}

for (const width of [390, 768]) {
  test(`the header fits the brand, Start a project, and Menu at ${width}px`, async ({
    page,
  }) => {
    await openAt(page, width)
    const header = page.getByRole('banner')
    const brand = header.getByRole('link', { name: 'Sidereal Software' })
    const start = header.getByRole('link', { name: 'Start a project' })
    const menu = header.getByRole('button', { name: 'Menu' })
    for (const item of [brand, start, menu]) await expect(item).toBeVisible()

    const [b, s, m] = [await box(brand), await box(start), await box(menu)]
    expect(m.width, 'Menu hit area width').toBeGreaterThanOrEqual(44)
    expect(m.height, 'Menu hit area height').toBeGreaterThanOrEqual(44)
    expect(s.x - (b.x + b.width), 'room between brand and Start').toBeGreaterThanOrEqual(
      16,
    )
    expect(m.x - (s.x + s.width), 'room between Start and Menu').toBeGreaterThanOrEqual(
      12,
    )
    expect(m.x + m.width).toBeLessThanOrEqual(width)
  })
}

test('the desktop header shows Start a project beside the section links', async ({
  page,
}) => {
  await openAt(page, 1440)
  const header = page.getByRole('banner')
  await expect(header.getByRole('link', { name: 'Start a project' })).toBeVisible()
  await expect(header.getByRole('button', { name: 'Menu' })).toBeHidden()
})
