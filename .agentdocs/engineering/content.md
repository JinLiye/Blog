# 内容组织与 frontmatter 约定

## 内容目录

- 文章：`src/content/posts/**`
- About 页面内容：`src/content/spec/about.md`

## frontmatter（posts）

常用字段（由 `src/content/config.ts` 约束）：

- `title`：标题
- `published`：发布日期
- `updated`：可选
- `description`：摘要（可选；为空时会用自动 excerpt）
- `image`：封面（可选）
- `tags`：标签数组
- `category`：分类（单选字符串；为空视为未分类）
- `draft`：草稿（生产环境默认不显示）
- `lang`：内容语言（当前站点 UI 语言是单选；文章多语言暂不做交互切换）

## 分类/标签的口径建议

- 分类（`category`）尽量少而稳定：用于“栏目级”聚合。
- 标签（`tags`）用于细分主题，支持多选，适合检索与归档筛选。

