# 部署：GitHub Pages + GitHub Actions

## 线上访问地址规则

- 仓库为普通 repo：`https://<owner>.github.io/<repo>/`
- 仓库名为 `<owner>.github.io`：`https://<owner>.github.io/`

当前示例：`https://jinliye.github.io/Blog/`

## Actions 构建要点

- `astro.config.mjs` 需要正确的 `site/base` 才能在 Pages 子路径下工作。
- Actions workflow 会注入 `ASTRO_SITE` / `ASTRO_BASE`（优先级高于本地默认值）。

## 常见失败排查

- 同仓库存在两套 deploy workflow（例如 `deploy.yml` + `deploy.legacy.yml`）会导致“一个成功一个失败”的体验：建议只保留一套。
- legacy workflow 里若引用不存在的 action 版本（例如 `actions/checkout@v5`），会直接失败。

