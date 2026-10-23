import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { expectNoHorizontalScroll, openAt, widths } from './page'

// Walks the page so every observer and lazy image has fired before measuring.
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let y = 0; y < height; y += 600) {
    await page.evaluate((top) => window.scrollTo(0, top), y)
  }
  await page.evaluate(() => window.scrollTo(0, 0))
}

for (const width of widths) {
  test(`every monument fits its container at ${width}px with no horizontal scroll`, async ({
    page,
  }) => {
    await openAt(page, width)
    await scrollThrough(page)
    const titles = page.locator('[data-monument]')
    expect(await titles.count()).toBeGreaterThanOrEqual(7)
    for (const title of await titles.all()) {
      await expect(title).toHaveAttribute('data-monument', 'fitted')
    }
    const overflows = await titles.evaluateAll((els) =>
      els.flatMap((el) => {
        const style = getComputedStyle(el)
        const inner =
          el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
        const text = (el.firstElementChild as HTMLElement).getBoundingClientRect().width
        return text > inner + 0.5 ? [`${el.textContent}: ${text} > ${inner}`] : []
      }),
    )
    expect(overflows).toEqual([])
    await expectNoHorizontalScroll(page)
  })

  test(`the whole page has no accessibility violations at ${width}px`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await openAt(page, width)
    await scrollThrough(page)
    const { violations } = await new AxeBuilder({ page }).analyze()
    expect(violations.map(({ id, nodes }) => ({ id, nodes: nodes.length }))).toEqual([])
  })
}

// Reads every element in main two frames after a change, too soon for any running spring to finish.
function unsettledElements(page: Page) {
  return page.evaluate(async () => {
    for (let i = 0; i < 2; i++) await new Promise(requestAnimationFrame)
    return [...document.querySelectorAll<HTMLElement>('main *')].flatMap((el) => {
      const style = getComputedStyle(el)
      const moving = el.getAnimations().length > 0
      const faded = Number(style.opacity) < 1 && el.checkVisibility()
      const shifted =
        (el.style.opacity !== '' || el.style.transform !== '') &&
        style.transform !== 'none' &&
        !new DOMMatrix(style.transform).isIdentity
      return moving || faded || shifted
        ? [`${el.tagName} ${(el.textContent ?? '').trim().slice(0, 40)}`]
        : []
    })
  })
}

test('under reduced motion all content is visible, the hero is still, and springs are settled', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  expect(await unsettledElements(page)).toEqual([])

  const hero = page.locator('#home')
  for (const text of [
    'Software that does the heavy lifting',
    'Production software for observatories, missions, and research teams.',
    /I build the systems behind modern astronomy/,
  ]) {
    await expect(hero.getByText(text)).toBeVisible()
  }
  await expect(hero.getByRole('link', { name: 'Start a project' })).toBeVisible()
  await expect(hero.getByRole('link', { name: 'See the work' })).toBeVisible()
  expect(
    await hero
      .locator('img')
      .first()
      .evaluate((img) => img.getAnimations().length),
  ).toBe(0)

  for (const id of ['services', 'work', 'testimonials', 'about', 'process', 'contact']) {
    const section = page.locator(`#${id}`)
    await section.evaluate((el) => el.scrollIntoView({ behavior: 'instant' }))
    expect(await unsettledElements(page), `#${id}`).toEqual([])
    await expect(section.getByRole('heading').first()).toBeVisible()
  }
})
