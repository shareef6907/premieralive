const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/en', { waitUntil: 'networkidle' });
  // Scroll to Work section
  await page.evaluate(() => document.getElementById('work')?.scrollIntoView());
  await page.waitForTimeout(1000);
  // Hover first brand film card
  const firstCard = await page.locator('#work video').first();
  await firstCard.hover();
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/work-fix-hover.png', fullPage: false });
  await browser.close();
})();
