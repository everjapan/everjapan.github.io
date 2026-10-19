---
title: 日语学习
layout: hub
permalink: /language/
eyebrow: 免费学习中心
description: "从五十音到语法体系，从词汇辨析到文化理解。按你眼下的问题，找到下一篇值得读的文章。"
---
<div class="learning-tools"><a class="start-link" href="{{ '/jumpstart/' | relative_url }}"><span aria-hidden="true">🧭</span><div><strong>第一次来？从入门路线开始</strong><span>五个步骤，循序渐进建立基础。</span></div><span aria-hidden="true">→</span></a><form class="inline-search" action="{{ '/search/' | relative_url }}" method="get" role="search"><label for="learning-search">查找一个具体问题</label><div><input id="learning-search" name="q" type="search" placeholder="例如：助词、五十音、敬语" required><button class="btn btn--primary" type="submit">搜索</button></div></form></div>
{% assign groups = '开始学习|建立体系|用好日语|理解语言' | split: '|' %}
<nav class="topic-tabs" aria-label="学习主题分组">{% for group in groups %}<a href="#learning-group-{{ forloop.index }}">{{ group }}</a>{% endfor %}</nav>
{% for group in groups %}
<section class="hub-section" id="learning-group-{{ forloop.index }}" aria-labelledby="learning-heading-{{ forloop.index }}"><div class="section-heading"><h2 id="learning-heading-{{ forloop.index }}">{{ group }}</h2></div><div class="topic-grid">{% assign topics = site.data.learning_collections | where: 'group', group %}{% for topic in topics %}{% include hub/collection-card.html topic=topic %}{% endfor %}</div></section>
{% endfor %}
<aside class="reading-next"><div><p class="eyebrow">想按完整目录系统学习？</p><h2>看看为你整理好的学习专栏。</h2><p>先了解内容，再决定是否适合自己。</p></div><a class="btn btn--primary" href="{{ '/products/' | relative_url }}">查看学习产品 →</a></aside>
<div class="section-end"><a class="text-link" href="{{ '/study-materials/' | relative_url }}">更多学习资源 →</a><a class="text-link" href="{{ '/reading-history-culture/' | relative_url }}">探索历史文化 →</a></div>
