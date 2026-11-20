---
title: 读历史学日语
layout: hub
permalink: /history/
eyebrow: 日本史を読む
description: "一边读历史，一边学日语。结合假名注音、中文对照与日语朗读，在了解日本历史的同时积累词汇和表达。"
excerpt: "汇集日本史阅读与年表，在历史故事中学习日语。"
---

<section class="hub-section" aria-labelledby="history-reading-title">
  <div class="section-heading"><h2 id="history-reading-title">阅读入口</h2></div>
  <ul class="reading-list">
    {% for reading in site.data.history_readings %}{% include hub/article-link.html doc=reading summary=true %}{% endfor %}
  </ul>
</section>
<div class="section-end"><a class="text-link" href="{{ '/reading-history-culture/' | relative_url }}">返回历史文化 →</a></div>
