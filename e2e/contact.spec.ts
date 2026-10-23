import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Locator, type Page } from '@playwright/test'

import { monument, openAt } from './page'

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

// Groups the title's words by the line they render on, since soft wraps never reach innerText.
function renderedLines(title: Locator) {
  return title.evaluate((el) => {
    const text = document.createTreeWalker(el, NodeFilter.SHOW_TEXT).nextNode()!
    const lines = new Map<number, string[]>()
    for (const match of (text.textContent ?? '').matchAll(/\S+/g)) {
      const range = document.createRange()
      range.setStart(text, match.index)
      range.setEnd(text, match.index + match[0].length)
      const top = Math.round(range.getBoundingClientRect().top)
      lines.set(top, [...(lines.get(top) ?? []), match[0]])
    }
    return [...lines.values()].map((words) => words.join(' '))
  })
}

for (const [width, lines] of [
  [390, ['Start a', 'project']],
  [1440, ['Start a project']],
] as const) {
  test(`Start a project takes ${lines.length} line(s) at ${width}px`, async ({
    page,
  }) => {
    await openAt(page, width)
    const title = monument(page, 'Start a project')
    await expect(title).toBeVisible()
    expect(await renderedLines(title)).toEqual(lines)
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

test('a focused field shows a heavier cyan underline and a cyan label without shifting', async ({
  page,
}) => {
  await openAt(page, 1440)
  const form = page.locator('#contact form')
  const field = form.getByLabel('Name')
  const label = form.locator('label[for="contact-name"]')
  const look = async () => ({
    underline: await field.evaluate((el) => getComputedStyle(el).borderBottomWidth),
    line: await field.evaluate((el) => getComputedStyle(el).borderBottomColor),
    label: await label.evaluate((el) => getComputedStyle(el).color),
    height: (await field.boundingBox())?.height,
  })
  const cyan = 'rgb(155, 231, 255)'
  const rest = await look()
  expect(rest.underline).toBe('1px')
  expect(rest.label).not.toBe(cyan)

  await field.focus()
  await expect.poll(look).toEqual({
    underline: '2px',
    line: cyan,
    label: cyan,
    height: rest.height,
  })
})
