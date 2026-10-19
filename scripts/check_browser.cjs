// Run against the local preview: node scripts/check_browser.cjs [path-to-playwright]
const { chromium } = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true});
 const context = await browser.newContext({ viewport:{width:1440,height:1000}, deviceScaleFactor:1 });
 await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
 const page=await context.newPage(); const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 const visit = async path => { await page.goto('http://127.0.0.1:4000'+path,{waitUntil:'networkidle'}); };
 const overflow = async () => page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
 for(const route of ['/','/language/','/products/particles/','/grammar/','/japanese/grammar-particles/','/about/','/jumpstart/']) {
  await visit(route); assert.equal(await page.locator('h1').count(),1,route);
  const o=await overflow();assert.ok(o.scroll<=o.width+1,`${route}: ${JSON.stringify(o)}`);
 }
 await visit('/'); await page.screenshot({path:'/tmp/everjapan-home-desktop.png',fullPage:true});
 await visit('/language/'); assert.equal(await page.locator('.topic-grid .topic-card').count(),11);
 await page.screenshot({path:'/tmp/everjapan-language-desktop.png',fullPage:true});
 await visit('/japanese/grammar-particles/');
 assert.ok(await page.locator('.article-toc').count());
 assert.ok(await page.locator('.article-followup a[href="/products/particles/"]').count());
 await page.screenshot({path:'/tmp/everjapan-article-desktop.png',fullPage:true});
 await visit('/products/particles/'); assert.equal(await page.locator('.product-catalogue li').count(),21);
 await page.getByRole('link',{name:'获取完整专栏',exact:true}).click(); await page.waitForTimeout(150);
 assert.equal(new URL(page.url()).hash,'#purchase');
 assert.ok(await page.locator('#purchase a[href="https://www.zhihu.com/column/c_2060335403073287993"]').count());
 await visit('/jlpt-grammars/');
 const initialCount = await page.locator('[data-filter-item]').count();
 await page.locator('[data-filter-input]').fill('条件');
 assert.equal(await page.locator('[data-filter-item]:visible').count(),2);
 await page.locator('[data-filter-input]').fill('zzzz-no-results');assert.ok(await page.locator('[data-filter-empty]').isVisible());
 await page.locator('[data-filter-input]').fill('');assert.equal(await page.locator('[data-filter-item]:visible').count(),initialCount);
 await visit('/search/?q='+encodeURIComponent('助词'));
 await page.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.startsWith('找到'));
 assert.ok(await page.locator('[data-search-results] li').count()>0);
 await page.locator('#site-query').fill('は が');await page.locator('button[type=submit]').click();
 await page.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.startsWith('找到'));
 assert.ok(await page.locator('[data-search-results] li').count()>0);
 await page.locator('#site-query').fill('<img src=x onerror=alert(1)>');await page.locator('button[type=submit]').click();
 await page.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.startsWith('没有'));
 assert.equal(await page.locator('[data-search-results] img').count(),0);
 await page.goBack();await page.waitForFunction(()=>document.querySelector('#site-query').value==='は が');
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  for(const route of ['/','/language/','/products/particles/','/about/','/jumpstart/','/japanese/grammar-particles/','/search/']){
   await visit(route); const o=await overflow(); assert.ok(o.scroll<=o.width+1,`${width} ${route}: ${JSON.stringify(o)}`);
  }
 }
 await page.setViewportSize({width:390,height:844}); await visit('/');
 await page.locator('.follow-strip img').scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>{const img=document.querySelector('.follow-strip img');return img.complete && img.naturalWidth>0});
 await page.screenshot({path:'/tmp/everjapan-home-mobile.png',fullPage:true});
 const toggle=page.locator('.greedy-nav__toggle');assert.ok(await toggle.isVisible());await toggle.click();
 assert.ok(await page.locator('.hidden-links').isVisible());
 await page.emulateMedia({colorScheme:'dark'});await visit('/about/');await page.screenshot({path:'/tmp/everjapan-about-dark.png',fullPage:true});
 const offline = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 const p2=await offline.newPage(); await p2.goto('http://127.0.0.1:4000/language/');assert.equal(await p2.locator('.topic-card').count(),11);
 await p2.goto('http://127.0.0.1:4000/jlpt-grammars/');assert.equal(await p2.locator('.reading-item').count(),initialCount);assert.equal(await p2.locator('[data-filter-control]:visible').count(),0);
 // Audit every searchable article at the narrow mobile breakpoint, including audio and tables.
 await page.emulateMedia({colorScheme:'light'});
 await page.setViewportSize({width:320,height:844});
 const rows=await (await context.request.get('http://127.0.0.1:4000/search-index.json')).json();
 const overflowErrors=[];
 for(const row of rows) {
  await page.goto('http://127.0.0.1:4000'+row.url,{waitUntil:'load'});
  const o=await overflow();
  if(o.scroll>o.width+1) overflowErrors.push(`${row.url}: ${JSON.stringify(o)}`);
 }
 assert.deepEqual(overflowErrors,[],'Article mobile overflow');
 // Search errors provide a retry path; a failed fetch must not poison later searches.
 const failurePage=await context.newPage();
 await failurePage.route('**/search-index.json',r=>r.fulfill({status:503,body:'Unavailable'}));
 await failurePage.goto('http://127.0.0.1:4000/search/?q=test');
 await failurePage.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.includes('暂时无法加载'));
 await failurePage.unroute('**/search-index.json');
 await failurePage.locator('#site-query').fill('助词');await failurePage.locator('button[type=submit]').click();
 await failurePage.waitForFunction(()=>document.querySelector('[data-search-status]').textContent.startsWith('找到'));
 await failurePage.close();
 assert.deepEqual(errors,[]);
 console.log(`PASS: desktop/mobile (1440/390/320), ${rows.length} article layouts, nav, search/recovery, back navigation, filter, product CTA, article recommendations, dark mode and no-JS access.`);
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
