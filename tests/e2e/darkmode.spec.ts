import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle button exists', async ({ page }) => {
    await page.goto('/')
    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]')
    await expect(toggle.first()).toBeVisible()
  })

  test('toggling dark mode adds dark class to document', async ({ page }) => {
    await page.goto('/')

    // Find the toggle
    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    // Check initial state
    const isDarkBefore = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    // Toggle
    await toggle.click()

    // Wait a moment for class change
    await page.waitForTimeout(300)

    // Check the theme changed
    const isDarkAfter = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    expect(isDarkAfter).toBe(!isDarkBefore)
  })

  test('dark mode persists across page navigation', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    // Toggle once
    await toggle.click()
    await page.waitForTimeout(300)

    const darkState = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    // Navigate to another page
    await page.goto('/about')
    await page.waitForTimeout(300)

    // Theme should persist
    const darkAfterNav = await page.evaluate(() =>
      document.documentElement.classList.contains('dark')
    )

    expect(darkAfterNav).toBe(darkState)
  })

  test('toggle button icon changes with theme', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    const labelBefore = await toggle.getAttribute('aria-label')

    await toggle.click()
    await page.waitForTimeout(300)

    const labelAfter = await toggle.getAttribute('aria-label')

    // Label should change
    expect(labelAfter).not.toBe(labelBefore)
  })

  test('page is still functional after multiple toggles', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"], [aria-label*="dark"], [aria-label*="light"]').first()
    if (!(await toggle.isVisible())) {
      test.skip(true, 'Dark mode toggle not found')
      return
    }

    for (let i = 0; i < 3; i++) {
      await toggle.click()
      await page.waitForTimeout(200)
    }

    // Page should still have header and main content
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })
})
