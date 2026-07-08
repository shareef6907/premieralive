const { chromium } = require('playwright');

const brand_films = [
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Horizontal%20Videos/Atme%20Press%20Conference%20-%20Fintech%20Forward.m4v",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Horizontal%20Videos/Empire%20Limo%20-%20Final%20Horizontal.M4V",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Horizontal%20Videos/Horse%20Slow%20mo.m4v",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Horizontal+Videos/+MEOS%20Day%201%20-%20HDP%20Version.mp4",
];

const shorts = [
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/EMAAD%20GRADUATION%20VIDEO.m4v",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/bmw%20vertical.mp4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Apparel%20Group%20-%20Jamies%20Italian.MP4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/LC%20Waikiki.M4V",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Mado%20Eid%20Box%20Final%206.m4v",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Manara%20Art%20-%20Road%20Map%20-%20T3.mp4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Noor%20Interview%20MYS%20for%20instagram.MP4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Sketchers%20Bahrain%20Nights%20FINAL%20T1.MP4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Interview%20Instagram%202nd%20interview%20.mp4",
  "https://premiera-live-media.s3.us-east-1.amazonaws.com/Shorts-reel/Womens%20Day%20%20-%20Apparel%20Group%20-%20T10%20with%20VO.mp4",
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const all = [...brand_films, ...shorts];

  for (const url of all) {
    const filename = decodeURIComponent(url.split('/').pop());
    let status = null, contentType = null, playResult = null;

    // HEAD check
    try {
      const resp = await page.request.fetch(url, { method: 'HEAD' });
      status = resp.status();
      contentType = resp.headers()['content-type'];
    } catch(e) {
      status = 'NETWORK_ERROR';
      contentType = e.message;
    }

    // Video element test
    try {
      const outcome = await page.evaluate(async (u) => {
        return new Promise((resolve) => {
          const v = document.createElement('video');
          v.muted = true;
          v.preload = 'metadata';
          v.src = u;
          const t = setTimeout(() => resolve({ event: 'timeout' }), 6000);
          v.addEventListener('canplay', () => { clearTimeout(t); resolve({ event: 'canplay', w: v.videoWidth, h: v.videoHeight }); });
          v.addEventListener('error', () => { clearTimeout(t); resolve({ event: 'error', msg: v.error?.message || 'unknown' }); });
          v.load();
        });
      }, url);
      playResult = outcome;
    } catch(e) {
      playResult = { event: 'eval_error', msg: e.message };
    }

    console.log(JSON.stringify({ filename, status, contentType, playResult }));
  }

  await browser.close();
})();
