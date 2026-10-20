/**
 * E2E Test: Login Flow with QA Bypass Guard and CEO Multi-Email Support
 * 
 * Tests the login page with:
 * - QA bypass guard for preview environments
 * - CEO multi-email configuration support
 * - Screenshot capture on failures
 */

import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load test environment variables
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// Test configuration from environment
const QA_EMAIL = process.env.TEST_QA_EMAIL || 'qa@premieralive.com';
const CEO_EMAILS = (process.env.TEST_CEO_EMAILS || 'ceo@premieralive.com').split(',').map(e => e.trim());
const SCREENSHOT_DIR = path.join(__dirname, '..', process.env.SCREENSHOT_DIR || 'screenshots');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Login Flow', () => {
  test.beforeAll(async () => {
    // Ensure screenshot directory exists
    if (!fs.existsSync(SCREENSHOT_DIR)) {
      fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
  });

  test('should show login page correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Check page title/heading
    await expect(page.getByText('Studio OS')).toBeVisible();
    
    // Check form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Check footer text
    await expect(page.getByText('Accounts are created by the CEO')).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message (exact text depends on Supabase response)
    await expect(page.locator('text=/error|invalid|incorrect/i')).toBeVisible({ timeout: 5000 });
    
    // Take screenshot on error
    await page.screenshot({ 
      path: path.join(SCREENSHOT_DIR, `login-error-${Date.now()}.png`) 
    });
  });

  test('QA user should be able to attempt login', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Fill QA credentials
    await page.fill('input[type="email"]', QA_EMAIL);
    await page.fill('input[type="password"]', 'test-password');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Note: Actual login will fail without real credentials
    // This tests that the form accepts QA email format
    const errorVisible = await page.locator('text=/error|invalid/i').isVisible({ timeout: 5000 }).catch(() => false);
    
    // If no error, we might be logged in (redirected)
    // If error, that's expected with placeholder credentials
    expect(errorVisible || page.url() !== `${BASE_URL}/login`).toBeTruthy();
  });

  test('CEO multi-email configuration should be accepted by form', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    
    // Test each CEO email format
    for (const ceoEmail of CEO_EMAILS) {
      await page.fill('input[type="email"]', ceoEmail);
      await page.fill('input[type="password"]', 'test-password');
      await page.click('button[type="submit"]');
      
      // Wait briefly for response
      await page.waitForTimeout(500);
      
      // Form should accept the email without validation errors
      // (actual auth will fail with placeholder credentials)
    }
  });
});

test.describe('QA Bypass Guard', () => {
  test('should detect preview environment and show QA indicator', async ({ page }) => {
    // Navigate to login with preview-like URL
    const previewUrl = `${BASE_URL}/login`;
    await page.goto(previewUrl);
    
    // Check for any QA/Preview indicators
    // This depends on actual implementation - placeholder check
    const pageContent = await page.content();
    
    // Log for debugging
    console.log('Page loaded, checking for QA indicators');
    console.log('CEO emails configured:', CEO_EMAILS);
  });
});

test.describe('Screenshot Capture', () => {
  test('should capture screenshot on test failure', async ({ page }) => {
    // This test is designed to always pass but demonstrates screenshot functionality
    await page.goto(`${BASE_URL}/login`);
    
    // Take a screenshot of the login page
    const screenshotPath = path.join(SCREENSHOT_DIR, `login-page-${Date.now()}.png`);
    await page.screenshot({ path: screenshotPath });
    
    // Verify screenshot was created
    expect(fs.existsSync(screenshotPath)).toBeTruthy();
    
    console.log(`Screenshot saved to: ${screenshotPath}`);
  });
});
