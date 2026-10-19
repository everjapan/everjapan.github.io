---
title: 读书笔记
layout: hub
permalink: /reading/
eyebrow: 读一本书，多一种理解
description: "记录语言与文化阅读中的发现，把书里的线索带回日常学习。"
---
{% assign topic = site.data.learning_collections | where: 'collection', 'reading-japanese-learning' | first %}
{% include hub/collection-card.html topic=topic %}
<section class="hub-section"><h2>阅读笔记</h2><ul class="reading-list">{% for doc in site.reading-japanese-learning %}{% include hub/article-link.html doc=doc summary=true %}{% endfor %}{% for doc in site.reading-history-culture %}{% include hub/article-link.html doc=doc summary=true %}{% endfor %}{% for doc in site.reading-politics-economy %}{% include hub/article-link.html doc=doc summary=true %}{% endfor %}</ul></section>
<div class="section-end"><a class="text-link" href="{{ '/reading-history-culture/' | relative_url }}">探索更多历史文化 →</a></div>
