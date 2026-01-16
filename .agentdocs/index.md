# .agentdocs 索引

本目录用于沉淀面向 AI 的长期信息（约束、决策、排查手册、信息架构），避免重复口头对齐与重复翻代码。

## 站点与内容

- `site/ia.md` - 信息架构：导航、栏目、分类/标签口径（新增页面/导航时必读）

## 工程与部署

- `engineering/deploy.md` - GitHub Pages + Actions 部署约定、URL/base 规则、常见失败排查
- `engineering/content.md` - 内容组织与 frontmatter 约定（posts/spec、分类/标签口径）

## 全局重要记忆

- 站内链接不要写死 `"/Blog/"` 这类 base；写 `"/xxx/"` 或使用 `url()` 让 `import.meta.env.BASE_URL` 自动拼接。
- 如 Actions 里出现“某个 deploy workflow 经常失败”，优先检查是否存在重复/过时的 workflow（例如 `deploy.legacy.yml`）。

