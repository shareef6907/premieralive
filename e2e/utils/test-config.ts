/**
 * Test Configuration Utilities
 * 
 * Provides QA bypass guard and CEO multi-email support
 * for preview environment testing.
 */

import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Load environment
const envLocalPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

export interface TestConfig {
  baseUrl: string;
  qaEmail: string;
  qaPassword: string;
  ceoEmails: string[];
  screenshotDir: string;
  previewMode: boolean;
}

// Load configuration from environment
export function getTestConfig(): TestConfig {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  const qaEmail = process.env.TEST_QA_EMAIL || 'qa@premieralive.com';
  const qaPassword = process.env.TEST_QA_PASSWORD || '';
  const ceoEmails = (process.env.TEST_CEO_EMAILS || 'ceo@premieralive.com')
    .split(',')
    .map(e => e.trim());
  const screenshotDir = process.env.SCREENSHOT_DIR || './screenshots';
  
  // Detect preview mode from URL
  const previewMode = baseUrl.includes('preview') || 
                      baseUrl.includes('vercel') || 
                      process.env.PREVIEW_MODE === 'true';

  return {
    baseUrl,
    qaEmail,
    qaPassword,
    ceoEmails,
    screenshotDir,
    previewMode,
  };
}

/**
 * QA Bypass Guard
 * 
 * In preview environments, QA users should have a way to bypass
 * normal authentication flow for testing purposes.
 */
export class QABypassGuard {
  private config: TestConfig;

  constructor(config: TestConfig) {
    this.config = config;
  }

  /**
   * Check if current environment is a preview/QA environment
   */
  isPreviewEnvironment(): boolean {
    return this.config.previewMode;
  }

  /**
   * Check if email is a QA user
   */
  isQAUser(email: string): boolean {
    return email.toLowerCase() === this.config.qaEmail.toLowerCase();
  }

  /**
   * Check if email is a CEO user (from multi-email list)
   */
  isCEOUser(email: string): boolean {
    return this.config.ceoEmails.some(
      ceoEmail => ceoEmail.toLowerCase() === email.toLowerCase()
    );
  }

  /**
   * Check if email has bypass privileges in preview mode
   */
  hasBypassPrivileges(email: string): boolean {
    if (!this.isPreviewEnvironment()) {
      return false;
    }
    return this.isQAUser(email) || this.isCEOUser(email);
  }

  /**
   * Get bypass reason for logging
   */
  getBypassReason(email: string): string {
    if (this.isQAUser(email)) {
      return 'QA User bypass requested';
    }
    if (this.isCEOUser(email)) {
      return `CEO User bypass requested (one of ${this.config.ceoEmails.length} configured)`;
    }
    return 'No bypass privileges';
  }
}

/**
 * CEO Multi-Email Manager
 * 
 * Manages multiple CEO email addresses for testing
 */
export class CEOMultiEmailManager {
  private emails: string[];

  constructor(emails: string[]) {
    this.emails = emails;
  }

  /**
   * Get all configured CEO emails
   */
  getAllEmails(): string[] {
    return [...this.emails];
  }

  /**
   * Get first CEO email
   */
  getPrimaryEmail(): string {
    return this.emails[0];
  }

  /**
   * Check if email is a configured CEO email
   */
  isCEOEmail(email: string): boolean {
    return this.emails.some(e => e.toLowerCase() === email.toLowerCase());
  }

  /**
   * Get CEO email by index
   */
  getEmailByIndex(index: number): string | undefined {
    return this.emails[index];
  }

  /**
   * Get total count of CEO emails
   */
  getCount(): number {
    return this.emails.length;
  }
}

// Screenshot utility
export async function captureScreenshot(
  page: any,
  name: string,
  screenshotDir: string
): Promise<string> {
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }
  
  const timestamp = Date.now();
  const filename = `${name}-${timestamp}.png`;
  const filepath = path.join(screenshotDir, filename);
  
  await page.screenshot({ path: filepath });
  
  return filepath;
}
