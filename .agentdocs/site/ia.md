# 信息架构（IA）

## 导航栏（当前约定）

- `Home`：`/`
- `Projects`：`/projects/`
- `Archive`：`/archive/`
- `Life`：`/life/`
- `About`：`/about/`

说明：

- 导航文案通过 i18n 生成（`I18nKey` + `src/i18n/languages/*`），而不是写死字符串。
- 新增导航项时需要同时新增对应页面路由（`src/pages/*.astro`），避免线上 404。

## Life 页面内容组织（口径）

Life 页面只作为入口，页面内部再区分：

- 运动：马拉松 / 游泳 / 自由潜
- 音乐：唱歌 / 吉他

建议做法（不强制）：

- `category` 保持少而稳定（例如统一用 `Life` 或 `生活`），避免分类栏被细项撑爆。
- 用 `tags` 区分细分方向（如 `running/swimming/freediving/guitar/singing` 等），便于归档筛选。

