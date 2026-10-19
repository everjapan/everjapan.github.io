---
layout: hub
title: 日本料理图鉴
permalink: /food.html
eyebrow: 从菜单认识日本料理
description: "看看常见料理的样子，记住它们的日语名称。"
---
<div class="food-gallery">
{% for food in site.data.food_guide %}
<figure><img src="{{ food.image | relative_url }}" alt="{{ food.name }}" loading="lazy" width="320" height="220"><figcaption><strong lang="ja">{{ food.name }}</strong><span>{{ food.reading }}</span></figcaption></figure>
{% endfor %}
</div>
<div class="section-end"><a class="text-link" href="{{ '/japanese-food/' | relative_url }}">继续了解料理背后的历史 →</a></div>
