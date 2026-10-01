const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
    
    // Single posting
    await page.goto('http://localhost:3000/notice/6aa4f7c70f7759b8893d598b', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'src/assets/showcase/noticeboard-single.jpg' });

    await browser.close();
})();
