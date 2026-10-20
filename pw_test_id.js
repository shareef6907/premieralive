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

  // Inject a fake supabase auth cookie so the page doesn't redirect to /login
  await page.context().addCookies([
    {
      name: 'sb-access-token',
      value: 'fake-token-for-testing',
      domain: 'localhost',
      path: '/',
    }
  ]);

  // Navigate directly to /proposals/[id] with a fake ID
  console.log('=== Testing /proposals/[id] with useParams fix ===');
  await page.goto('http://localhost:3001/proposals/00000000-0000-0000-0000-000000000001', {
    waitUntil: 'domcontentloaded',
    timeout: 15000
  });
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
