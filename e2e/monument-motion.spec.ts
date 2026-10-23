import { expect, test, type Page } from '@playwright/test'

import { monument, openAt } from './page'

function motionOf(page: Page) {
  return monument(page, 'Services').evaluate((el) => {
    const style = getComputedStyle(el)
    return {
      scrollDriven: el
        .getAnimations()
        .some((animation) => animation.timeline instanceof ViewTimeline),
      running: el.getAnimations().length,
      opacity: style.opacity,
      unmoved: new DOMMatrix(style.transform).isIdentity,
    }
  })
}

test('the Services monument reveals on scroll and ends fully visible', async ({
  page,
}) => {
  await openAt(page, 1440)
  await monument(page, 'Services').scrollIntoViewIfNeeded()
  await page.evaluate(() => window.scrollBy(0, 200))
  await expect
    .poll(() => motionOf(page))
    .toEqual({
      scrollDriven: true,
      running: 1,
      opacity: '1',
      unmoved: true,
    })
})

test('the Services monument stays still under reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  await monument(page, 'Services').scrollIntoViewIfNeeded()
  expect(await motionOf(page)).toEqual({
    scrollDriven: false,
    running: 0,
    opacity: '1',
    unmoved: true,
  })
})
