---
title: 旅行前的日语准备
layout: hub
permalink: /travel/
eyebrow: 带着几句日语出发
description: "从游玩、住宿与日常交流的表达入手，为日本旅行做一点语言准备。"
---
<ul class="reading-list">
{% assign routes = '/japanese/travelling-japanese/|/japanese/hotel-japanese/|/japanese/thanks-japanese/' | split: '|' %}
{% for url in routes %}{% assign doc = site.documents | where: 'url', url | first %}{% if doc %}{% include hub/article-link.html doc=doc summary=true %}{% endif %}{% endfor %}
</ul>
<div class="section-end"><a class="text-link" href="{{ '/daily/' | relative_url }}">更多日常表达 →</a><a class="text-link" href="{{ '/reading-history-culture/' | relative_url }}">探索历史文化 →</a></div>
