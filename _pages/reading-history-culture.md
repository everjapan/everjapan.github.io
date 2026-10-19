---
title: 历史文化
layout: hub
permalink: /reading-history-culture/
eyebrow: 看见语言背后的世界
description: "一场花火、一碗拉面、一个汉字，都有自己的来路。沿着这些线索，走近日本的日常与历史。"
---
<div class="topic-grid">{% for topic in site.data.culture_collections %}{% include hub/collection-card.html topic=topic %}{% endfor %}{% assign topic = site.data.learning_collections | where: 'collection', 'japanese-etymology' | first %}{% include hub/collection-card.html topic=topic %}</div>
<section class="hub-section" aria-labelledby="culture-reading-title"><div class="section-heading"><h2 id="culture-reading-title">文化与餐桌上的故事</h2></div><ul class="reading-list">{% assign stories = site.japanese-culture | concat: site.japanese-food | sort: 'date' | reverse %}{% for doc in stories %}{% include hub/article-link.html doc=doc summary=true %}{% endfor %}</ul></section>
<section class="hub-section"><div class="section-heading"><h2>换一个角度读语言</h2><a class="text-link" href="{{ '/reading/' | relative_url }}">读书笔记 →</a></div><ul class="reading-list">{% for doc in site.reading-japanese-learning %}{% include hub/article-link.html doc=doc summary=true %}{% endfor %}</ul></section>
{% include hub/follow.html %}
