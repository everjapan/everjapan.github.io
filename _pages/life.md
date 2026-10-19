---
title: 日本生活
layout: hub
permalink: /life/
eyebrow: 让语言回到生活
description: "从餐桌、风俗与日常表达出发，认识具体而真实的日本。"
---
<div class="topic-grid">{% for topic in site.data.culture_collections %}{% include hub/collection-card.html topic=topic %}{% endfor %}{% assign topic = site.data.learning_collections | where: 'collection', 'daily' | first %}{% include hub/collection-card.html topic=topic %}</div>
<section class="hub-section"><h2>出发之前，学几句实用日语</h2><ul class="reading-list"><li class="reading-item"><a href="{{ '/japanese/travelling-japanese/' | relative_url }}"><span class="reading-title">游玩日本必备的实用日语</span><span class="reading-arrow" aria-hidden="true">↗</span></a></li><li class="reading-item"><a href="{{ '/japanese/hotel-japanese/' | relative_url }}"><span class="reading-title">在日本住酒店时的常用表达</span><span class="reading-arrow" aria-hidden="true">↗</span></a></li></ul></section>
