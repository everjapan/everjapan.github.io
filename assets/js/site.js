/* Progressive enhancement: indexes stay readable without JavaScript. */
(() => {
  'use strict';
  const normalize = value => String(value || '').normalize('NFKC').toLocaleLowerCase().trim();
  const termsFor = value => normalize(value).split(/\s+/u).filter(Boolean);

  document.querySelectorAll('[data-filter-list]').forEach(section => {
    const input = section.querySelector('[data-filter-input]');
    const items = [...section.querySelectorAll('[data-filter-item]')];
    const status = section.querySelector('[data-filter-status]');
    const empty = section.querySelector('[data-filter-empty]');
    section.querySelector('[data-filter-control]').hidden = false;
    input.addEventListener('input', () => {
      const terms = termsFor(input.value);
      let count = 0;
      items.forEach(item => {
        item.hidden = !terms.every(term => normalize(item.dataset.filterText).includes(term));
        if (!item.hidden) count++;
      });
      status.hidden = !terms.length;
      status.textContent = `找到 ${count} 篇内容`;
      empty.hidden = count !== 0;
    });
  });

  const search = document.querySelector('[data-site-search]');
  if (search) {
    const form = search.querySelector('form');
    const input = search.querySelector('input');
    const status = search.querySelector('[data-search-status]');
    const results = search.querySelector('[data-search-results]');
    let indexPromise;
    let requestId = 0;
    const getIndex = () => {
      if (!indexPromise) indexPromise = fetch(search.dataset.indexUrl)
        .then(response => { if (!response.ok) throw new Error('Search unavailable'); return response.json(); })
        .then(rows => rows.map(row => ({ ...row, titleKey: normalize(row.title), textKey: normalize(`${row.title} ${row.tags} ${row.topic} ${row.text}`) })))
        .catch(error => { indexPromise = undefined; throw error; });
      return indexPromise;
    };
    async function run(updateUrl) {
      const current = ++requestId;
      const query = input.value.trim();
      results.replaceChildren();
      if (updateUrl) {
        const url = new URL(location.href);
        if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
        history.pushState(null, '', url);
      }
      if (!query) { status.textContent = '输入关键词，查找学习内容。'; return; }
      status.textContent = '正在查找…';
      try {
        const rows = await getIndex();
        if (current !== requestId) return;
        const terms = termsFor(query);
        const matches = rows.filter(row => terms.every(term => row.textKey.includes(term)))
          .sort((a, b) => terms.filter(t => b.titleKey.includes(t)).length - terms.filter(t => a.titleKey.includes(t)).length);
        status.textContent = matches.length ? `找到 ${matches.length} 篇内容` : '没有找到匹配内容。试试更短的关键词，或浏览学习主题。';
        const fragment = document.createDocumentFragment();
        matches.forEach(row => {
          const url = new URL(row.url, location.origin);
          if (url.origin !== location.origin) return;
          const li = document.createElement('li'); li.className = 'reading-item';
          const a = document.createElement('a'); a.href = url.pathname + url.search + url.hash;
          const title = document.createElement('span'); title.className = 'reading-title'; title.textContent = row.title;
          const excerpt = document.createElement('span'); excerpt.className = 'reading-summary'; excerpt.textContent = `${row.topic} · ${row.excerpt}`;
          a.append(title, excerpt); li.append(a); fragment.append(li);
        });
        results.append(fragment);
      } catch (_) {
        if (current === requestId) status.textContent = '搜索暂时无法加载，请稍后重试。也可以从导航进入「日语学习」按主题查找。';
      }
    }
    form.addEventListener('submit', event => { event.preventDefault(); run(true); });
    window.addEventListener('popstate', () => { input.value = new URLSearchParams(location.search).get('q') || ''; run(false); });
    input.value = (new URLSearchParams(location.search).get('q') || '').slice(0, 160);
    if (input.value) run(false);
  }

  // Uses the site's existing analytics, when present; CTA event properties contain no search text or email.
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-track]');
    if (link && typeof window.gtag === 'function') window.gtag('event', link.dataset.track, {
      item_id: link.dataset.item || '', channel: link.dataset.channel || '', transport_type: 'beacon'
    });
  });
})();
