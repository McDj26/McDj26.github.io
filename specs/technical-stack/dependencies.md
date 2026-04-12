# 依赖项说明

## 核心依赖

| 依赖名称 | 版本 | 用途 |
|---------|------|------|
| nuxt | ^3.13.0 | 基于 Vue 3 的全栈框架 |
| vue | latest | 渐进式 JavaScript 框架 |
| vue-router | latest | Vue 官方路由库 |
| @element-plus/nuxt | ^1.0.10 | Element Plus 组件库 Nuxt 集成 |
| @pinia/nuxt | ^0.5.4 | Pinia 状态管理 Nuxt 集成 |
| pinia | ^2.2.2 | Vue 3 状态管理库 |
| pinia-plugin-persistedstate | ^4.0.1 | Pinia 状态持久化插件 |
| @nuxtjs/algolia | ^1.10.2 | Algolia 搜索集成 |
| @docsearch/css | ^3.6.1 | Algolia DocSearch CSS 样式 |
| @docsearch/js | ^3.6.1 | Algolia DocSearch JavaScript 库 |
| @nuxtjs/color-mode | ^3.5.1 | 颜色模式管理（深色/浅色主题） |
| @octokit/core | ^6.1.2 | GitHub API 客户端 |
| nuxt-lodash | ^2.5.3 | Lodash 工具库集成 |

## 开发依赖

| 依赖名称 | 版本 | 用途 |
|---------|------|------|
| sass-embedded | ^1.78.0 | SCSS 预处理器 |
| express | ^4.21.0 | Node.js Web 框架（用于开发服务器） |

## 依赖说明

### 框架和核心库

- **nuxt**: 提供服务端渲染、路由、构建工具等功能，是项目的核心框架
- **vue**: 用于构建用户界面的渐进式 JavaScript 框架
- **vue-router**: 管理应用的路由导航
- **pinia**: 替代 Vuex 的状态管理库，提供更简洁的 API

### UI 和样式

- **@element-plus/nuxt**: 提供丰富的 UI 组件，简化界面开发
- **sass-embedded**: 提供 SCSS 预处理器功能，增强 CSS 的表达能力

### 功能模块

- **@nuxtjs/algolia**: 集成 Algolia 搜索服务，提供高效的搜索功能
- **@nuxtjs/color-mode**: 管理应用的颜色模式，支持深色和浅色主题切换
- **@octokit/core**: 用于与 GitHub API 交互，获取项目和用户信息
- **nuxt-lodash**: 提供 Lodash 工具库的集成，简化常用工具函数的使用

### 开发工具

- **express**: 用于开发服务器，提供本地开发环境

## 依赖管理

项目使用 pnpm 作为包管理器，配置文件为 `package.json`。依赖版本使用语义化版本控制，确保项目的稳定性和可维护性。

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 使用 npm 安装依赖
npm install

# 使用 yarn 安装依赖
yarn install

# 使用 bun 安装依赖
bun install
```

### 更新依赖

```bash
# 更新所有依赖
pnpm update

# 更新特定依赖
pnpm update <package-name>
```