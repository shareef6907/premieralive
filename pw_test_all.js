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

  // Inject fake auth cookie so layout doesn't redirect to /login
  await page.context().addCookies([
    { name: 'sb-access-token', value: 'fake-token', domain: 'localhost', path: '/' },
    { name: 'sb-refresh-token', value: 'fake-refresh', domain: 'localhost', path: '/' },
  ]);

  console.log('=== /proposals/new ===');
  await page.goto('http://localhost:3001/proposals/new', {
    waitUntil: 'domcontentloaded',
    timeout: 15000
  });
  console.log('URL:', page.url());
  console.log('PAGE ERRORS:', errors.length === 0 ? 'none' : errors.join('\n  '));
  console.log('CONSOLE ERRORS:', consoleErrors.length === 0 ? 'none' : consoleErrors.join('\n  '));

  errors.length = 0;
  consoleErrors.length = 0;

  console.log('\n=== /proposals ===');
  await page.goto('http://localhost:3001/proposals', {
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
