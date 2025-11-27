---
title: 简明日语语法教程
layout: single
permalink: /grammar/
---

<div class="posts-list">
  {% assign sorted_grammar = site.grammar-tutorial | sort: 'name' %}
  {% for grammar_item in sorted_grammar %}
    <div class="post-card">
      <div class="post-card-title">
        <a href="{{ grammar_item.url | relative_url }}">{{ grammar_item.title }}</a>
      </div>
      {% if grammar_item.excerpt %}
        <div class="post-card-excerpt">
          {{ grammar_item.excerpt | strip_html | truncate: 200 }}
        </div>
      {% endif %}
      <div class="post-card-footer">
        <a href="{{ grammar_item.url | relative_url }}" class="read-more">阅读更多 →</a>
      </div>
    </div>
  {% endfor %}
</div>