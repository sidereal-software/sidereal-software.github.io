import { expect, test } from '@playwright/test'

import { openAt } from './page'

test('the hero lede never ends on a lone word, from phone to desktop', async ({
  page,
}) => {
  await openAt(page, 320)
  const lede = page.locator('#home p').filter({ hasText: /^I build the systems/ })
  const orphans: string[] = []
  for (let width = 320; width <= 1440; width += 10) {
    await page.setViewportSize({ width, height: 900 })
    const lastLine = await lede.evaluate((el) => {
      const text = el.firstChild as Text
      const words: { word: string; top: number }[] = []
      for (const match of text.data.matchAll(/\S+/g)) {
        const range = document.createRange()
        range.setStart(text, match.index)
        range.setEnd(text, match.index + match[0].length)
        words.push({ word: match[0], top: Math.round(range.getBoundingClientRect().top) })
      }
      const bottom = words[words.length - 1].top
      return words.filter((entry) => entry.top === bottom).map((entry) => entry.word)
    })
    if (lastLine.length < 2) orphans.push(`${width}px: ${lastLine.join(' ')}`)
  }
  expect(orphans).toEqual([])
})

test('the built page preloads the hero image the img will use', async ({ page }) => {
  const html = await (await page.request.get('/')).text()
  const preload = new RegExp('<link[^>]*rel="preload"[^>]*>').exec(html)?.[0] ?? ''
  const attribute = (name: string) =>
    new RegExp(`${name}="([^"]*)"`).exec(preload)?.[1] ?? null

  await openAt(page, 390)
  const image = page.getByRole('img', { name: /^The Dumbbell Nebula/ })
  expect(attribute('imagesrcset')).toBe(await image.getAttribute('srcset'))
  expect(attribute('imagesizes')).toBe(await image.getAttribute('sizes'))
  const candidates = (attribute('imagesrcset') ?? '')
    .split(', ')
    .map((c) => c.split(' ')[0])
  expect(candidates).toHaveLength(2)
  for (const url of candidates) {
    expect(url).toMatch(/^\/assets\/m27[-\w]*\.jpg$/)
    expect((await page.request.get(url)).status()).toBe(200)
  }
})
