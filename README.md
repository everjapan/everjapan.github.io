# 日系生活家 · everjapan.com

面向社交平台访客的日语学习与文化阅读网站。使用 Jekyll / GitHub Pages 与固定版本的 Minimal Mistakes 主题，保留主题的 SEO、响应式导航和基础组件，以本地布局统一内容体验。

AI 助手参与维护时遵循 [AGENTS.md](AGENTS.md)，其中记录内容归类、设计约束、验证和发布约定。

## 本地运行与检查

```sh
bundle install
bundle exec jekyll serve
```

访问 `http://127.0.0.1:4000/`。构建需要联网下载 `_config.yml` 指定的主题版本。

```sh
bundle exec jekyll build --safe
python3 scripts/check_site.py _site
```

检查包括：站内链接和图片、每页主标题、canonical、95 个历史文章地址、搜索索引、collection 入口及博客内容范围。外部平台的可用性和购买流程需在对应平台确认。

已安装 Playwright 时，可在预览服务运行期间执行 `node scripts/check_browser.cjs`；若模块不在本仓库的 Node 搜索路径，第二个参数可传入 Playwright 模块目录。浏览器检查覆盖桌面／手机、全部文章的窄屏溢出、搜索、错误恢复、筛选、购买入口和无脚本访问，截图输出到 `/tmp/everjapan-*.png`。

## 页面结构

| 入口 | 用途 | 来源 |
| --- | --- | --- |
| `/` | 识别学习需求，引导到免费内容与产品 | `index.html` |
| `/language/` | 学习主题、栏目数量、站内搜索 | `_data/learning_collections.json` |
| `/products/` | 产品选择、目录、公开文章与购买入口 | `_data/products.json` |
| `/reading-history-culture/` | 日本文化、料理与文化阅读 | `_data/culture_collections.json` |
| `/blog/` | 产品上线、功能更新、专栏公告 | `_posts/` |
| `/about/#contact` | 邮箱、公众号、社交平台 | `_pages/about.md`、`_config.yml` 的 author |
| `/search/` | 中文／日语标题与全文搜索 | `search-index.json`、`assets/js/site.js` |

## 内容发布

1. **学习文章**：写入相应 collection，不放 `_posts/`。参考 [文章归类说明](docs/content-organization.md)。文件使用 UTF-8 Markdown。
2. **产品公告**：写入 `_posts/YYYY-MM-DD-title.md`。博客、首页动态和 RSS 仅展示此类内容；没有公告时不制造占位文章。
3. **文章元数据**：填写 `title`、`date`、`tags`；建议写一句明确的 `excerpt`。维护已有文章时保留 `permalink`。新的文章链接用固定地址加 `relative_url`，collection 不使用 `post_url`。
4. **语法教程**：基础章节沿用 `00-` 等文件；补充专题填写 `content_group: article`，在目录中单独展示。
5. **新增栏目**：在 `_config.yml` 注册 collection；在对应数据文件中填写 `collection`、`title`、`description`、`url`、`icon`、`start_url`；创建 `layout: collection` 的索引页。学习栏目通过 `group` 分组。

一个学习文章示例：

```yaml
---
title: 文章标题
date: 2026-10-20
excerpt: 一句话说清本文解决什么问题。
tags: [日语, 语法]
permalink: /japanese/example/
---
```

文章布局自动提供目录、同栏阅读、适用产品与联系入口；不显示作者侧栏、面包屑和分享按钮。

## 产品维护

- 产品名称、简介、适合人群、学习目标、公开文章及平台入口统一维护在 `_data/products.json`。
- `_data/product_catalogues.json` 只保存目录标题，不含付费正文。若同级目录有两个原稿仓库，可运行 `python3 scripts/build_product_catalogues.py` 更新目录。
- 助词专栏已配置微信和知乎；系统语法只配置已确认的知乎地址。价格、购买与售后由对应平台处理，不在本站虚构价格或优惠。
- 上架新产品时，先完善产品页与实际入口，再发布产品公告。

## 样式与交互

- `_layouts/hub.html`：首页及栏目入口；`collection.html`：主题目录；`single.html`：正文阅读；`product.html`：产品详情。
- `_sass/site/` 按基础样式、组件、页面和关于页拆分；`assets/css/main.scss` 仅负责导入。
- CSS 变量统一浅色／深色配色；目录与所有内容在无 JavaScript 时可读。
- JavaScript 仅增强目录筛选、站内搜索与 CTA 事件。搜索索引在访问搜索时才下载，使用文本节点输出结果，支持浏览器前进／后退。
- 分享卡片为 `assets/images/site-cover.png`；原图排版生成器在 `scripts/social-card.html`，以 1200 × 630 尺寸截图更新。

## 流量与复访

已有 Google Analytics 配置仅在生产环境加载。按钮事件为 `learning_start`、`product_view`、`article_product`、`purchase_click` 和 `contact_view`，平台以 `channel` 区分，产品以 `item_id` 区分。事件需要发布后在 Analytics 中验证；它们表示入口点击，不等于平台上的购买成交。

关注入口统一指向关于页，方便社媒读者选择公众号、邮箱或其他平台。产品公告 RSS 为 `/feed.xml`。

- [Google Analytics](https://analytics.google.com/analytics/web/?authuser=2#/p486288506/reports/intelligenthome)
- [迁移记录](docs/content-migration.json)：保留最初迁移时的正文摘要哈希及原地址；后续链接修复与编辑以 Git 历史为准。
