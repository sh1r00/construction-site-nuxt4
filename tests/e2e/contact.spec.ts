import { test, expect } from '@playwright/test'

test.describe('Contact Page', () => {
  test('loads successfully', async ({ page }) => {
    const response = await page.goto('/contact')
    expect(response?.status()).toBeLessThan(400)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('contact form renders with required fields', async ({ page }) => {
    await page.goto('/contact')
    const form = page.locator('form')
    await expect(form).toBeVisible()

    // Name input
    const nameInput = page.locator('#contact-name')
    await expect(nameInput).toBeVisible()

    // Email input
    const emailInput = page.locator('#contact-email')
    await expect(emailInput).toBeVisible()

    // Submit button
    const submitButton = form.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()
  })

  test('form shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/contact')
    const submitButton = page.locator('button[type="submit"]')
    await submitButton.click()

    // Validation messages should appear for required fields
    const errorMessages = page.locator('[role="alert"], .text-red-500')
    const count = await errorMessages.count()
    expect(count).toBeGreaterThan(0)
  })

  test('can type into form fields', async ({ page }) => {
    await page.goto('/contact')
    await page.fill('#contact-name', 'John Doe')
    await page.fill('#contact-email', 'john@example.com')

    // Verify filled values
    await expect(page.locator('#contact-name')).toHaveValue('John Doe')
    await expect(page.locator('#contact-email')).toHaveValue('john@example.com')
  })

  test('contact info section is visible', async ({ page }) => {
    await page.goto('/contact')
    // Contact page typically has address/phone/email info
    const main = page.locator('main')
    await expect(main).toBeVisible()
    // There should be more than just the form
    const sections = main.locator('section')
    const count = await sections.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })
})
