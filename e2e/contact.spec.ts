import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

import { expectMonumentFits, expectNoHorizontalScroll, openAt, widths } from './page'

function multipartFields(body: string) {
  const fields: Record<string, string> = {}
  for (const [, name, value] of body.matchAll(/name="([^"]+)"\r\n\r\n([^\r]*)/g)) {
    fields[name] = value
  }
  return fields
}

async function fillInquiry(page: Page) {
  const form = page.locator('#contact form')
  await form.getByLabel('Name').fill('Ada Lovelace')
  await form.getByLabel('Email').fill('ada@example.org')
  await form.getByLabel('What do you need help with?').fill('A pipeline for our survey.')
}

test('an inquiry shows sending, then the thank-you message', async ({ page }) => {
  let release: () => void = () => {}
  const held = new Promise<void>((resolve) => (release = resolve))
  let posted: Record<string, string> = {}
  await page.route('https://formspree.io/f/maqrzvzv', async (route) => {
    posted = multipartFields(route.request().postData() ?? '')
    await held
    await route.fulfill({ json: { ok: true, next: '' } })
  })
  await openAt(page, 1440)
  await fillInquiry(page)
  await page.getByRole('button', { name: 'Send inquiry' }).click()

  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled()
  release()
  await expect(page.getByText('Message sent')).toBeVisible()
  await expect(page.locator('#contact form')).toHaveCount(0)
  expect(posted).toMatchObject({
    name: 'Ada Lovelace',
    email: 'ada@example.org',
    _subject: 'New inquiry from sidereal.software',
    _gotcha: '',
  })
})

test('a rejected inquiry shows the field error and keeps the form', async ({ page }) => {
  await page.route('https://formspree.io/f/maqrzvzv', (route) =>
    route.fulfill({
      status: 422,
      json: {
        errors: [{ field: 'email', code: 'TYPE_EMAIL', message: 'should be an email' }],
      },
    }),
  )
  await openAt(page, 390)
  await fillInquiry(page)
  await page.getByRole('button', { name: 'Send inquiry' }).click()

  await expect(page.getByText('Email should be an email')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Send inquiry' })).toBeEnabled()
})

test('the email address appears only after a click', async ({ page }) => {
  await openAt(page, 390)
  await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(0)
  await page.getByRole('button', { name: /prefer email/i }).click()
  await expect(
    page.getByRole('link', { name: 'hello@sidereal.software' }),
  ).toHaveAttribute('href', 'mailto:hello@sidereal.software')
})

test('Contact has no accessibility violations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await openAt(page, 1440)
  const { violations } = await new AxeBuilder({ page }).include('#contact').analyze()
  expect(violations).toEqual([])
})

for (const width of widths) {
  test(`Start a project monument fits on two lines at ${width}px`, async ({ page }) => {
    await openAt(page, width)
    await expectMonumentFits(page, 'Start a project')
    const lines = await page
      .locator('#contact [data-monument] > span[aria-hidden]')
      .evaluate((el) =>
        Math.round(
          el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight),
        ),
      )
    expect(lines).toBe(2)
    await expect(
      page.getByRole('heading', { level: 2, name: 'Start a project', exact: true }),
    ).toBeVisible()
    await expectNoHorizontalScroll(page)
  })
}

test('the message field grows with its text and shows no resize grabber', async ({
  page,
}) => {
  await openAt(page, 1440)
  const message = page.locator('#contact form').getByLabel('What do you need help with?')
  expect(await message.evaluate((el) => getComputedStyle(el).resize)).toBe('none')
  const before = (await message.boundingBox())?.height ?? 0
  await message.fill(Array.from({ length: 12 }, (_, line) => `Line ${line}`).join('\n'))
  expect((await message.boundingBox())?.height ?? 0).toBeGreaterThan(before)
})
