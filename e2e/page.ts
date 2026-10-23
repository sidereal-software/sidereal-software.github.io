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
  return page.getByRole('heading', { name, exact: true })
}
