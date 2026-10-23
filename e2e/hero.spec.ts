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
