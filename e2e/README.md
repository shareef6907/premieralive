# E2E Tests

Playwright end-to-end tests for Studio OS Agency application.

## Setup

1. Install dependencies (from project root):
   ```bash
   npm install
   ```

2. Configure test environment:
   ```bash
   cp e2e/.env.local.example e2e/.env.local
   # Edit e2e/.env.local with your test credentials
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Configuration

Edit `e2e/.env.local` to set:

```env
BASE_URL=http://localhost:3000
TEST_QA_EMAIL=qa@premieralive.com
TEST_QA_PASSWORD=your-qa-password
TEST_CEO_EMAILS=ceo@premieralive.com,ceo2@premieralive.com,ceo3@premieralive.com
SCREENSHOT_DIR=./screenshots
```

## Running Tests

From project root:

```bash
# Run all tests
npm run test:e2e

# Run with UI
npm run test:e2e:ui

# Run specific test file
npx playwright test e2e/tests/auth.spec.ts

# Run with debug
npm run test:e2e:debug
```

## Features

- **QA Bypass Guard**: Detects preview environments and provides bypass logic for QA users
- **CEO Multi-Email**: Supports multiple CEO email addresses for testing
- **Screenshot Capture**: Automatically captures screenshots on test failures
- **Environment-based Config**: Uses `env.local` for test configuration

## Structure

```
e2e/
├── .env.local           # Test environment (not committed)
├── .env.local.example   # Example configuration
├── playwright.config.ts # Playwright configuration
├── tests/
│   └── auth.spec.ts     # Authentication tests
├── utils/
│   └── test-config.ts   # Test utilities and helpers
└── screenshots/         # Test failure screenshots
```

## Preview URL Testing

For testing against preview URL:
```
agency-git-feat-phase16-retainers-v2-shareef-alis-projects.vercel.app
```

Set `BASE_URL=https://agency-git-feat-phase16-retainers-v2-shareef-alis-projects.vercel.app` in `.env.local`.
