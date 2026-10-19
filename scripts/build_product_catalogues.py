"""Regenerate public titles only; paid manuscript bodies are never copied."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
particles = root.parent / 'mastering-japanese-particles'
grammar = root.parent / 'mastering-japanese-grammar'
groups = []
for folder, label in [('基本知識', '基础知识'), ('動詞', '动词'), ('助詞', '助词'), ('', '其他品词')]:
    files = sorted((grammar / folder).glob('*.md'))
    groups.append({'title': label, 'chapters': [p.stem for p in files if p.name != 'README.md']})
data = {
    'particles': [{'title': '助词用法与辨析', 'chapters': [p.stem[3:] for p in sorted(particles.glob('[0-9][0-9] *.md'))]}],
    'grammar': groups,
}
if not data['particles'][0]['chapters'] or any(not g['chapters'] for g in groups):
    raise SystemExit('Missing manuscript directories; catalogue was not changed.')
(root / '_data/product_catalogues.json').write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
