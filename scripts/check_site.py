"""Validate a built Jekyll site: local links/assets, legacy URLs, SEO and indexes.

Usage: python3 scripts/check_site.py /path/to/_site
"""
import json
import sys
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else '_site').resolve()
REPO = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.links, self.ids, self.h1 = [], set(), 0
        self.canonical = False
        self.feed(text)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if tag == 'h1':
            self.h1 += 1
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.canonical = True
        for field in ('href', 'src'):
            if field in attrs:
                self.links.append(attrs[field])

errors = defaultdict(set)
html_files = list(ROOT.rglob('*.html'))
for path in html_files:
    relative = str(path.relative_to(ROOT))
    text = path.read_text()
    page = Page(text)
    if page.h1 != 1:
        errors[f'Expected one h1, got {page.h1}'].add(relative)
    if not page.canonical:
        errors['Missing canonical URL'].add(relative)
    if any(token in text for token in ('class="breadcrumbs"', 'class="author__avatar"', 'class="page__share"')):
        errors['Removed UI rendered again'].add(relative)
    for link in page.links:
        try:
            url = urlsplit(urljoin('https://everjapan.com/' + relative, link))
        except ValueError:
            errors['Invalid URL: ' + link].add(relative)
            continue
        if url.scheme not in ('http', 'https') or url.netloc != 'everjapan.com':
            continue
        target = ROOT / unquote(url.path).lstrip('/')
        candidates = (target, target / 'index.html', Path(str(target) + '.html'))
        if not any(candidate.is_file() for candidate in candidates):
            errors['Missing local target: ' + url.path].add(relative)

migration = json.loads((REPO / 'docs/content-migration.json').read_text())
index = json.loads((ROOT / 'search-index.json').read_text())
indexed = {entry['url'] for entry in index}
for row in migration:
    if not (ROOT / row['url'].lstrip('/') / 'index.html').is_file():
        errors['Legacy URL missing'].add(row['url'])
    if row['url'] not in indexed:
        errors['Article missing from search'].add(row['url'])
if len(indexed) != len(index):
    errors['Duplicate search entries'].add('search-index.json')
for name in ('blog/index.html', 'feed.xml'):
    text = (ROOT / name).read_text()
    for row in migration:
        if row['url'] in text:
            errors['Learning article in product announcements'].add(name)
for topic in json.loads((REPO / '_data/learning_collections.json').read_text()):
    if topic['url'] not in (ROOT / 'language/index.html').read_text():
        errors['Missing learning collection entrance'].add(topic['url'])
if errors:
    for error, paths in sorted(errors.items()):
        print(error, '\n ', ', '.join(sorted(paths)))
    raise SystemExit(1)
print(f'PASS: {len(html_files)} pages; local links/assets; {len(migration)} legacy URLs; '
      f'{len(index)} search entries; collection entrances; product-only blog/feed.')
