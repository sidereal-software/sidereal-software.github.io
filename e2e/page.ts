import { expect, type Page } from '@playwright/test'

export const widths = [390, 768, 1440] as const

export async function openAt(page: Page, width: number) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
}

export async function expectNoHorizontalScroll(page: Page) {
  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))
  expect(scrollWidth, 'page scrolls horizontally').toBeLessThanOrEqual(clientWidth)
}

export function monument(page: Page, name: string) {
  return page.locator('[data-monument]').filter({ hasText: name })
}

// Pass fills: false for a monument whose per-use cap stops it short of the edge.
export async function expectMonumentFits(
  page: Page,
  name: string,
  { fills = true }: { fills?: boolean } = {},
) {
  const title = monument(page, name)
  await expect(title).toHaveCount(1)
  await title.scrollIntoViewIfNeeded()
  await expect(title).toHaveAttribute('data-monument', 'fitted')
  const { text, container } = await title.evaluate((el) => {
    const style = getComputedStyle(el)
    const inner =
      el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    const span = el.firstElementChild as HTMLElement
    return { text: span.getBoundingClientRect().width, container: inner }
  })
  expect(text, `${name} overflows its container`).toBeLessThanOrEqual(container + 0.5)
  if (fills) {
    expect(text, `${name} falls short of its container`).toBeGreaterThan(container * 0.98)
  }
}
