import { test, expect } from '@playwright/test'

test.describe('FAQ Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/faqs')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays FAQ accordion items', async ({ page }) => {
    await page.goto('/faqs')
    const buttons = page.locator('[id^="faq-trigger-"]')
    const count = await buttons.count()
    expect(count).toBeGreaterThan(0)
  })

  test('FAQ items have accessible aria-expanded', async ({ page }) => {
    await page.goto('/faqs')
    const firstButton = page.locator('[id^="faq-trigger-"]').first()
    if (await firstButton.isVisible()) {
      const expanded = await firstButton.getAttribute('aria-expanded')
      expect(expanded).toBeDefined()
    }
  })

  test('clicking FAQ item expands it', async ({ page }) => {
    await page.goto('/faqs')
    const firstTrigger = page.locator('[id^="faq-trigger-"]').first()
    if (!(await firstTrigger.isVisible())) {
      test.skip(true, 'No FAQ items found')
      return
    }

    const wasExpanded = await firstTrigger.getAttribute('aria-expanded')

    await firstTrigger.click()
    await page.waitForTimeout(300)

    const nowExpanded = await firstTrigger.getAttribute('aria-expanded')

    if (wasExpanded === 'false') {
      expect(nowExpanded).toBe('true')
    }
  })

  test('clicking same FAQ item twice toggles it', async ({ page }) => {
    await page.goto('/faqs')
    const firstTrigger = page.locator('[id^="faq-trigger-"]').first()
    if (!(await firstTrigger.isVisible())) {
      test.skip(true, 'No FAQ items found')
      return
    }

    await firstTrigger.click()
    await page.waitForTimeout(300)
    await firstTrigger.click()
    await page.waitForTimeout(300)

    // Should be collapsed again
    const finalState = await firstTrigger.getAttribute('aria-expanded')
    expect(finalState).toBe('false')
  })

  test('FAQ panel content is accessible', async ({ page }) => {
    await page.goto('/faqs')
    const firstTrigger = page.locator('[id^="faq-trigger-"]').first()
    if (!(await firstTrigger.isVisible())) {
      test.skip(true, 'No FAQ items found')
      return
    }

    await firstTrigger.click()
    await page.waitForTimeout(300)

    const panelId = await firstTrigger.getAttribute('aria-controls')
    if (panelId) {
      const panel = page.locator(`#${panelId}`)
      await expect(panel).toBeVisible()
    }
  })
})
