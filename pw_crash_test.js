const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Try to navigate directly to proposals/new (will redirect to login)
  console.log('Navigating to /proposals/new (expect redirect to /login)...');
  await page.goto('http://localhost:3000/proposals/new', { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Current URL:', page.url());
  
  // Capture what's on the page
  const url = page.url();
  
  // If we're at /login, try to sign in with the email/password inputs
  if (url.includes('/login')) {
    console.log('At login page, attempting sign-in...');
    const emailInput = await page.$('input[type="email"]');
    const passInput = await page.$('input[type="password"]');
    
    if (emailInput && passInput) {
      await emailInput.fill('ceo@premieralive.com');
      await passInput.fill('TestPassword123!');
      await passInput.press('Enter');
      await page.waitForTimeout(6000);
      console.log('After sign-in URL:', page.url());
    }
  }
  
  // Now check the qty input if we're on the builder
  const currentUrl = page.url();
  console.log('\nFinal URL:', currentUrl);
  
  // Capture console errors from the page
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  // If we're on the proposals page, check qty input
  if (currentUrl.includes('/proposals')) {
    const qtyInput = await page.$('input[min="1"]');
    if (qtyInput) {
      const bbox = await qtyInput.boundingBox();
      const value = await qtyInput.inputValue();
      const w = await page.evaluate(el => window.getComputedStyle(el).width, qtyInput);
      console.log('Qty input: value=', value, 'bbox=', JSON.stringify(bbox), 'computedWidth=', w);
    } else {
      console.log('No qty input found');
    }
    
    // Get the first number input's bounding rect
    const firstNumInput = await page.$('input[type="number"]');
    if (firstNumInput) {
      const bbox = await firstNumInput.boundingBox();
      console.log('First number input bbox:', JSON.stringify(bbox));
    }
    
    await page.screenshot({ path: '/tmp/qty_final.png' });
    console.log('Screenshot: /tmp/qty_final.png');
  }
  
  // Check page errors
  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));
  
  console.log('Console errors:', JSON.stringify(errors));
  console.log('Page errors:', JSON.stringify(pageErrors));
  
  await browser.close();
})();
