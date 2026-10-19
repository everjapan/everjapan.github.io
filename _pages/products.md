---
title: 学习产品
permalink: /products/
layout: hub
eyebrow: 给学习一个清晰的框架
description: "把反复遇到的问题整理成体系。先看目录、读公开文章，再选择适合自己的学习方式。"
---
<div class="product-grid">{% for product in site.data.products %}{% include hub/product-card.html product=product %}{% endfor %}</div>
<section class="hub-section" aria-labelledby="choose-title"><div class="section-heading"><h2 id="choose-title">怎样选择适合自己的专栏？</h2></div><div class="choice-grid"><div><h3>经常分不清相近助词</h3><p>先看「助词通关攻略」，从具体问题切入，比较用法、语义与语气。</p><a class="text-link" href="{{ '/products/particles/' | relative_url }}">查看助词目录 →</a></div><div><h3>知识点很多，但串不起来</h3><p>先看「日语系统语法」，从语言单位与句子结构入手，梳理整体框架。</p><a class="text-link" href="{{ '/products/systematic-grammar/' | relative_url }}">了解系统语法 →</a></div></div></section>
<aside class="reading-next"><h2>还没确定学习方向？</h2><p>先从<a href="{{ '/jumpstart/' | relative_url }}">日语入门路线</a>或<a href="{{ '/language/' | relative_url }}">免费学习专栏</a>开始。有学习或购买问题，也可以<a href="{{ '/about/#contact' | relative_url }}">直接联系作者</a>。</p></aside>
