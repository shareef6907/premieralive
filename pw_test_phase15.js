const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  const consoleErrors = [];

  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  // 1. Login
  await page.goto('http://localhost:3001/login', { waitUntil: 'networkidle', timeout: 15000 });
  const emailInput = await page.$('input[type="email"]');
  const passInput = await page.$('input[type="password"]');
  if (emailInput && passInput) {
    await emailInput.fill('ceo@premieralive.com');
    await passInput.fill('TestPassword123!');
    await passInput.press('Enter');
    await page.waitForTimeout(3000);
  }

  // 2. Test /proposals/new
  console.log('=== /proposals/new ===');
  await page.goto('http://localhost:3001/proposals/new', { waitUntil: 'networkidle', timeout: 15000 });
  console.log('URL:', page.url());
  console.log('PAGE ERRORS:', errors.length === 0 ? 'none' : errors.join('\n  '));
  console.log('CONSOLE ERRORS:', consoleErrors.length === 0 ? 'none' : consoleErrors.join('\n  '));
  errors.length = 0;
  consoleErrors.length = 0;

  // 3. Test /proposals
  console.log('\n=== /proposals ===');
  await page.goto('http://localhost:3001/proposals', { waitUntil: 'networkidle', timeout: 15000 });
  console.log('URL:', page.url());
  console.log('PAGE ERRORS:', errors.length === 0 ? 'none' : errors.join('\n  '));
  console.log('CONSOLE ERRORS:', consoleErrors.length === 0 ? 'none' : consoleErrors.join('\n  '));

  await browser.close();
  console.log('\nDone.');
  process.exit(0);
})().catch((err) => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
