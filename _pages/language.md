---
title: 日语学习
layout: single
permalink: /language/
toc: false
author_profile: false
---

按主题查阅日语学习文章，循序渐进建立自己的知识体系。刚开始学习，可以先阅读[日语快速入门]({{ '/jumpstart/' | relative_url }})。

## 学习专栏

<div class="feature-grid">
{% for item in site.data.learning_collections %}
  {% assign collection = site.collections | where: 'label', item.collection | first %}
  <div class="feature-item">
    <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
    <p>{{ item.description }}</p>
    <p>{{ collection.docs.size }} 篇内容</p>
  </div>
{% endfor %}
</div>

## 完整学习产品

- [助词通关攻略]({{ '/products/particles/' | relative_url }})：查看专栏目录、免费试读与购买入口。
- [日语系统语法]({{ '/products/systematic-grammar/' | relative_url }})：了解完整语法课程的内容安排。

## 更多资源

- [日语学习资源]({{ '/study-materials/' | relative_url }})：网站、视频、工具与学习资料。
- [历史文化]({{ '/reading-history-culture/' | relative_url }})：探索语言之外的日本文化。
- [产品动态]({{ '/blog/' | relative_url }})：产品上线、功能更新与专栏公告。
