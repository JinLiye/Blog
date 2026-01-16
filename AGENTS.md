# Blog 项目 AGENTS（适配本仓库）

本仓库是基于 Astro 的静态博客（Fuwari 模板），使用 `pnpm` 管理依赖，构建产物为 `dist/`，并通过 GitHub Pages 部署。

## 开发与质量原则

- 只改动必要部分，优先复用现有实现，避免引入无必要依赖或重构。
- 保持实现简单直观；边界情况尽量融入主流程，避免“补丁式”分支堆叠。
- 与既有代码风格一致：缩进、命名、文件组织遵循仓库现状（格式化由 Biome 约束）。
- 尽量不要提交与需求无关的格式化/重排；避免改动 lockfile，除非确实新增/升级依赖。
- 终端命令优先使用 UTF-8；涉及中文路径/内容时注意避免 BOM/编码问题。

## 常用命令（本地）

- 开发：`pnpm dev`
- 构建（含站内搜索索引）：`pnpm build`（等价于 `astro build && pagefind --site dist`）
- 预览：`pnpm preview`
- 类型/内容检查：`pnpm check`
- 新建文章：`pnpm new-post <slug>`

## 项目结构速览（常改位置）

- 站点配置：`src/config.ts`（站点标题、导航、个人信息等）
- Astro 配置：`astro.config.mjs`（`site/base`、集成、Markdown 插件等）
- 页面路由：`src/pages/*`（如 `about.astro`、`archive.astro`、自定义页面）
- 文章内容：`src/content/posts/**`（Markdown + frontmatter）
- About 内容：`src/content/spec/about.md`
- UI 文案 i18n：`src/i18n/*`（`i18nKey` + `languages/*`）
- 分类/标签统计：`src/utils/content-utils.ts`

## 项目沉淀：面向 AI 的文档与记忆（保留）

使用文档与记忆沉淀背景信息、约束、决策与可复用模式，减少反复口头对齐与重复遍历代码。

- 统一使用 Markdown，放在 `.agentdocs/` 及其子目录下（仅面向 AI 代理使用，不作为对外文档）。
- 使用 `.agentdocs/index.md` 作为索引，记录各文档用途、读取场景与关键“长期记忆”。

`.agentdocs/index.md` 示例结构（按本博客项目调整）：

```md
## 站点与内容
`site/ia.md` - 信息架构：导航、栏目、分类/标签口径（必读：新增栏目/导航/页面时）
`site/style.md` - 站点风格与写作规范（语气、排版、代码块、图片等）

## 工程与部署
`engineering/deploy.md` - GitHub Pages/Actions 部署约定、ASTRO_BASE 规则、常见故障排查
`engineering/content.md` - content schema/frontmatter 约定、目录组织规范

## 任务文档（仅复杂任务）
`workflow/YYMMDD-task-slug.md` - 复杂改动的现状/方案/阶段 TODO

## 全局重要记忆
- “站内链接禁止写死 /Blog/ base，必须使用 url() 或写 /xxx/ 让 BASE_URL 拼接”
```

文档创建与更新原则：

- 不要创建“工作汇报/流水账”文档；只沉淀可复用信息、长期约束、关键决策与排查手册。
- 优先更新已有文档；更新时按原结构重写整理，避免无序追加。
- 新增文档必须同步更新 `.agentdocs/index.md` 索引。
- 如果 `.agentdocs/index.md` 不存在，先初始化它，再逐步补齐站点/工程关键约定。

任务处理约定（适用于复杂改动）：

- 需求不明确时先提问澄清，再开始改代码。
- 涉及跨页面/跨组件/影响部署的改动：先写任务文档（`.agentdocs/workflow/...`），再分阶段推进并更新 TODO。
- 若同一问题连续 3 次尝试仍未解决，应回退并换方案，不要在同一路径上“堆补丁”。

## 导航与页面新增约定

- 新增导航项需要同时考虑：
  - 路由是否存在：在 `src/pages/` 增加对应页面，避免 404
  - 文案是否需要多语言：新增 `I18nKey` 并补齐 `src/i18n/languages/*`
  - 链接是否要自动拼接 GitHub Pages `base`：站内链接写成 `"/xxx/"`，不要把 `"/Blog/"` 这类 base 写死

## 部署（GitHub Pages）

- GitHub Actions 会在构建时注入 `ASTRO_SITE` / `ASTRO_BASE`（用于 GitHub Pages 的仓库路径部署）。
- 本地开发可以不设置这些变量；线上以 workflow 注入值为准。
- 如果出现“某个 workflow 经常失败”，优先检查是否存在重复/过时的 deploy workflow（例如 legacy 文件）。

## 沟通与输出

- 默认用中文沟通，必要时保留英文专业名词（首次出现可附简短中文释义）。
- 如果需求不明确，先问清楚再动手；对方案取舍给出简洁理由（性能/维护/一致性/成本）。
