# everjapan.com

- [Google Analytics](https://analytics.google.com/analytics/web/?authuser=2#/p486288506/reports/intelligenthome)

## 网站结构与维护

- 首页：`index.html`，复用 Minimal Mistakes 的 splash、feature_row 与文章列表。
- 最新：`blog/index.html`，分页路径为 `/blog/page:num/`。
- 产品页：`_pages/product-*.md`；目录来自 `_data/product_catalogues.json`。
- 免费专栏：`_data/learning_collections.json` 中列出的各个 collection；新增 Markdown 文件即可进入对应目录。

同级目录存在 `mastering-japanese-particles` 和 `mastering-japanese-grammar` 原稿仓库时，运行 `python3 scripts/build_product_catalogues.py` 更新产品目录。脚本仅提取文件标题，不复制付费正文；网站构建直接读取已提交的 JSON，不依赖原稿仓库。

助词产品页已接入微信和知乎专栏地址，系统语法产品页已接入知乎专栏地址。尚缺系统语法的微信购买地址，当前通过「联系作者」承接，取得正式地址后替换对应入口。

本地预览：`bundle exec jekyll serve`。构建：`bundle exec jekyll build`（需要联网获取配置指定版本的远程主题）。

## 内容发布约定

- `_posts/` 仅发布产品上线、功能更新、专栏公告，文件名仍为 `YYYY-MM-DD-title.md`。
- 日语学习文章按主题写入 collection，通过 `/language/` 进入；栏目名称、说明和入口统一维护在 `_data/learning_collections.json`。
- 新的 collection 文章建议填写 `title`、`date` 和 `tags`，需要保留已有地址时填写 `permalink`。语法专题文章填写 `content_group: article`，与基础教程区分。
- 文化与料理内容分别进入 `_japanese-culture/`、`_japanese-food/`。
- 迁移记录见 [文章归类说明](docs/content-organization.md)；95 篇旧文章保留了原地址、发布日期及正文。
- 跨文章链接使用固定地址加 `relative_url`，不要对 collection 使用 `post_url`。分类归档、标签归档和站内搜索均包含 collection 内容；默认 RSS feed 只提供产品公告。
