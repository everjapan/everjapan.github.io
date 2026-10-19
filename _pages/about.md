---
title: 关于
permalink: /about/
layout: splash
classes: about-landing
author_profile: false
toc: false
excerpt: "语言、生活、读书。分享日语学习经验，也探索语言背后的历史与文化。"
---

<section class="about-intro" aria-labelledby="about-title">
  <div>
    <p class="about-eyebrow">日系生活家 · 语言、生活、读书</p>
    <h1 id="about-title">你好，<br>很高兴在这里遇见你 <span class="about-wave" aria-hidden="true">👋</span></h1>
    <p class="about-lead">我是一名语言和历史文化爱好者，分享日语学习经验，也探索语言背后的生活与文化。</p>
    <p>从一个助词的细微差别，到一本书里的历史线索，希望这里能陪你把日语学得更明白，也把世界看得更丰富。</p>
    <div class="about-actions">
      <a class="btn btn--primary" href="#contact">聊聊学习与合作</a>
      <a class="about-text-link" href="{{ '/language/' | relative_url }}">探索学习内容 →</a>
    </div>
  </div>
  <div class="about-note" aria-hidden="true">
    <span class="about-note-icon">📖</span>
    <p class="about-note-japanese" lang="ja">ことばから、<br>世界をひらく。</p>
    <p>从语言出发，打开更大的世界。</p>
    <div class="about-note-tags"><span>语言</span><span>生活</span><span>读书</span></div>
  </div>
</section>

<section class="about-section" aria-labelledby="about-experience-title">
  <p class="about-eyebrow">我的经历</p>
  <h2 id="about-experience-title">在学习与生活之间，积累真实的理解</h2>
  <div class="about-experience-grid">
    <article class="about-card">
      <span class="about-card-icon" aria-hidden="true">🗣️</span>
      <h3>一直在学习语言</h3>
      <p>日语能力考试 N1 合格，系统学习日语语法体系，持续研究语言学与日语教学法。</p>
    </article>
    <article class="about-card">
      <span class="about-card-icon" aria-hidden="true">💼</span>
      <h3>在工作中理解表达</h3>
      <p>多年日企工作经历，熟悉日本商务文化与职场礼仪，参与过多个中日跨文化项目。</p>
    </article>
    <article class="about-card">
      <span class="about-card-icon" aria-hidden="true">🏯</span>
      <h3>在日常里感受文化</h3>
      <p>曾在日本生活和工作，体验当地社会与文化，探索各地的风土人情。</p>
    </article>
  </div>
</section>

<section class="about-section" aria-labelledby="about-topics-title">
  <p class="about-eyebrow">这里有什么</p>
  <h2 id="about-topics-title">不止学会一种语言</h2>
  <div class="about-topics">
    <a href="{{ '/language/' | relative_url }}"><span aria-hidden="true">📚</span><div><h3>语言学习</h3><p>语法、词汇与学习方法</p></div><span aria-hidden="true">↗</span></a>
    <a href="{{ '/reading-history-culture/' | relative_url }}"><span aria-hidden="true">⛩️</span><div><h3>文化探索</h3><p>传统文化与现代社会</p></div><span aria-hidden="true">↗</span></a>
    <a href="{{ '/life/' | relative_url }}"><span aria-hidden="true">🍵</span><div><h3>生活分享</h3><p>美食、旅行与日常生活</p></div><span aria-hidden="true">↗</span></a>
    <a href="{{ '/reading/' | relative_url }}"><span aria-hidden="true">📖</span><div><h3>读书笔记</h3><p>语言、历史与文化阅读</p></div><span aria-hidden="true">↗</span></a>
  </div>
</section>

<section id="contact" class="about-contact" aria-labelledby="about-contact-title">
  <div>
    <p class="about-eyebrow">保持联系</p>
    <h2 id="about-contact-title">有想聊的话题？写信给我吧。</h2>
    <p>专栏购买、日语学习，或是一个有趣的合作想法，都欢迎来聊聊。</p>
    <a class="btn btn--primary" href="mailto:everjapan@163.com">✉️ everjapan@163.com</a>
    <p class="about-social-label">也可以在这些地方找到我</p>
    <div class="about-social-links">
      {% for link in site.author.links %}
        <a href="{{ link.url | escape }}">{{ link.label | escape }} <span aria-hidden="true">↗</span></a>
      {% endfor %}
    </div>
  </div>
  <figure class="about-qr">
    <img src="{{ '/assets/images/qrcode_for_gh.jpg' | relative_url }}" width="180" height="180" alt="日系生活家微信公众号二维码" loading="lazy">
    <figcaption><strong>微信公众号 · 日系生活家</strong><br>扫一扫，一起学习与阅读</figcaption>
  </figure>
</section>
