# 仓库协作约定

本文件适用于整个仓库。用户在当前会话中的明确要求优先；已有授权与偏好应延续，不要反复确认已经授权的事项。

## 网站目标

日系生活家是承接社交平台与搜索流量的日语学习网站。优化应服务于这条路径：找到有用内容 → 继续阅读 → 了解合适的学习产品 → 关注或联系作者。

- 免费内容解决具体问题，完整专栏提供系统学习。
- 博客只发布产品动态；学习内容按主题组织为 collection。
- 不制造占位公告、虚构产品、销量、评价、价格、优惠或个人履历。
- 不用弹窗或无效表单制造转化入口；联系信息与购买地址只使用已确认的数据。

开始工作时先检查 `git status`，保留用户已有修改。结构说明见 `README.md`、`docs/site-architecture.md`；逐篇归类依据见 `docs/content-organization.md`。

## 内容归属

根据正文主题分类，不只依据标题、原分类或文件名。优先使用现有 collection：

| 内容 | 目录 |
| --- | --- |
| 学习方法与自学经验 | `_learning-methods/` |
| 五十音、节拍、词调与发音 | `_pronunciation/` |
| 语法体系、品词、动词与敬语 | `_grammar-tutorial/` |
| 助词用法与辨析 | `_japanese-particles/` |
| 常见句型与语法表达辨析 | `_jlpt-grammars/` |
| 词汇与相近词辨析 | `_vocabulary/` |
| 寒暄、旅行、住宿等日常表达 | `_daily/` |
| 文字起源、汉字读音与词源 | `_japanese-etymology/` |
| 语言类型、语素等基础概念 | `_linguistics/` |
| 谚语与惯用语 | `_proverbs/` |
| 日语学习类读书笔记 | `_reading-japanese-learning/` |
| 日本文化与风俗 | `_japanese-culture/` |
| 日本料理及其历史 | `_japanese-food/` |
| 产品上线、功能更新、专栏公告 | `_posts/` |

- 不把学习文章放入 `_posts/`，不根据标题擅自标注 JLPT 等级。
- 新文章填写 `title`、实际发布日期 `date`、准确的 `excerpt`、`tags`，并选择稳定的 `permalink`。不要为普通编辑重写原发布日期。
- 新建博客公告使用 `YYYY-MM-DD-slug.md`；collection 文件名不强制日期前缀。
- `_grammar-tutorial/` 的基础章节沿用现有顺序；补充专题填写 `content_group: article`。
- 保留原有文章地址。必须调整地址时，同时维护跳转和 canonical；不要删除历史链接而只修改站内入口。
- collection 交叉链接使用地址加 `relative_url`，不用 `post_url`。引用外部 URL 时使用半角标点。
- 不把付费稿件正文复制到公开网站。原稿仓库用于提取目录时，只读取必要信息。
- 内部 TODO 放在 `docs/editorial-backlog.md`，不要留在公开文章里。

## 数据与模板

修改共享资料时更新数据源，不在多个页面复制同一份内容：

- 学习栏目：`_data/learning_collections.json`。
- 文化栏目：`_data/culture_collections.json`。
- 产品介绍、适合人群、公开阅读与购买入口：`_data/products.json`。
- 产品目录：`_data/product_catalogues.json`。更新脚本为 `scripts/build_product_catalogues.py`，依赖同级原稿仓库；没有原稿时不要覆盖现有目录。
- 社交平台与邮箱：`_config.yml` 的 `author`；联系区保留 `/about/#contact`。

新增栏目需要同时注册 `_config.yml`、维护栏目数据、创建索引页。确认 `/language/` 出现入口与正确数量。栏目列表、搜索和数量自动生成；首页精选文章需要人工选择。

主要布局为 `_layouts/hub.html`、`collection.html`、`single.html`、`product.html`、`redirect.html`。优先复用布局、`_includes/hub/` 与数据。继续使用 GitHub Pages 支持的 Jekyll/Liquid/SCSS，不随意加入自定义插件或新的前端框架。

## 已确认的设计约束

- 全站不显示作者侧栏、面包屑和文章分享按钮。
- 没有左侧栏时不预留空白；长文章在桌面保留右侧目录，手机目录置顶。
- 主色为沉稳靛蓝，搭配暖白底色；兼顾系统深色模式。
- 首页、产品与关于页可以有卡片和少量 emoji；`/jumpstart/` 和学习正文保持朴素易读。
- 样式维护在 `_sass/site/`；`assets/css/main.scss` 只负责导入，避免叠加大量临时覆盖规则。
- 保持语义标题、可见键盘焦点、表单标签和图片替代文本。检查手机宽度下的长网址、表格、代码块、注音与音频。
- 正文与栏目目录在无 JavaScript 时仍可读。JavaScript 用于增强搜索、筛选和入口事件，不承担基本内容渲染。
- 不撤回中文／日语搜索支持。搜索结果使用安全文本节点，保留无结果、加载失败重试及浏览器前进／后退行为。
- 保留图片延迟加载与音频按需加载；不要让所有页面预先下载全文搜索索引。

## 验证与预览

按改动范围验证，避免为纯文档修改反复执行浏览器全量检查。

内容、数据、模板或样式修改完成后：

```sh
bundle exec jekyll build --safe
python3 scripts/check_site.py _site
git diff --check
```

页面布局或交互修改还应验证桌面与手机效果。已有 Playwright 时，在本地服务运行期间执行：

```sh
node scripts/check_browser.cjs
# 若模块不在 Node 搜索路径：
node scripts/check_browser.cjs /path/to/playwright
```

- 浏览器脚本覆盖搜索、筛选、导航、购买入口、暗色模式、无脚本访问及文章窄屏溢出。内容数量变化时同步检查相关断言，不用修改预期来掩盖功能错误。
- 生产 SEO 或分析配置修改，使用 `JEKYLL_ENV=production bundle exec jekyll build --safe` 检查 canonical、分享图、sitemap 与分析脚本。
- 博客模板或分页修改，使用隔离构建验证多页公告；不要把测试公告写进用户正在访问的预览或正式内容。
- 普通预览命令是 `bundle exec jekyll serve`。修改 `_config.yml` 后重启服务。
- 远程主题下载失败时，可使用配置指定版本的本地主题文件在临时目录构建；不要悄悄降低主题版本。若预览使用临时副本，编辑后同步副本，并准确说明实际验证的版本。
- 不修改 `_site/` 来实现功能，不提交缓存、临时截图或测试内容。测试结果只报告实际执行过的检查。

## 提交与发布

- 提交前检查 diff、文件范围与验证结果。不要覆盖、丢弃或擅自回滚用户修改。
- 沿用会话中明确的提交、推送或上线授权；不要因本文件额外要求用户重复确认。
- 没有推送／上线授权时，完成本地修改、验证与可预览结果即可；“修改内容”或“提交代码”不自动意味着推送到线上。
- 明确区分本地预览、Git 提交、推送和线上发布状态。只有取得对应证据，才报告部署成功或分析事件已在线上生效。
- CTA 点击不是购买成交。不要把本地测试通过描述为流量或销售增长已经得到验证。
