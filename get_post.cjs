const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    
    // Find links on the page that might be a posting
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'))
            .map(a => a.href)
            .filter(href => href.includes('localhost:3000') && !href.endsWith('/eligibility') && !href.endsWith('/calendar') && !href.endsWith('/login') && href !== 'http://localhost:3000' && href !== 'http://localhost:3000/');
    });
    console.log("Candidate links:", links);
    await browser.close();
})();
