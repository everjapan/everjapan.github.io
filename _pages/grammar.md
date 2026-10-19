---
title: 日语系统语法与教程
layout: single
permalink: /grammar/
toc: false
---

先按教程学习基础概念，再通过专题文章补充理解。

[返回日语学习]({{ '/language/' | relative_url }})

## 基础教程

{% assign chapters = site.grammar-tutorial | sort: 'path' %}
<ul>
{% for chapter in chapters %}
  {% unless chapter.content_group == 'article' %}
  <li><a href="{{ chapter.url | relative_url }}">{{ chapter.title }}</a></li>
  {% endunless %}
{% endfor %}
</ul>

## 语法专题与补充阅读

{% assign articles = site.grammar-tutorial | where: 'content_group', 'article' | sort: 'date' | reverse %}
<ul>
{% for article in articles %}
  <li><a href="{{ article.url | relative_url }}">{{ article.title }}</a></li>
{% endfor %}
</ul>
