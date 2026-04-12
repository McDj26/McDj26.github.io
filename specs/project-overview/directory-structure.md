# 目录结构说明

## 项目目录结构

```
myHomePage/
├── app.vue                 # 应用入口组件
├── assets/                 # 静态资源目录
│   ├── css/                # CSS 样式文件
│   ├── scss/               # SCSS 样式文件
│   └── i18n/               # 国际化相关文件
├── components/             # 通用组件目录
├── composables/            # 可复用的组合式函数
├── docs/                   # 项目文档目录
│   ├── zh-CN/              # 中文文档
│   └── en/                 # 英文文档
├── layouts/                # 布局组件
├── middleware/             # 中间件
├── nuxt.config.ts          # Nuxt 配置文件
├── package.json            # 项目配置文件
├── pages/                  # 页面组件
│   ├── home/               # 首页相关组件
│   │   ├── components/     # 首页子组件
│   │   └── index.vue       # 首页入口
│   └── [...404].vue        # 404 页面
├── public/                 # 公共静态资源
│   └── images/             # 图片资源
├── server/                 # 服务器端代码
├── store/                  # Pinia 状态管理
└── tsconfig.json           # TypeScript 配置文件
```

## 目录说明

### app.vue
应用的入口组件，包含全局布局和路由出口。

### assets/
存放静态资源，包括 CSS、SCSS 和国际化文件。

### components/
存放通用组件，可在多个页面中复用。

### composables/
存放可复用的组合式函数，封装业务逻辑。

### docs/
存放项目文档，包括中英文版本。

### layouts/
存放布局组件，定义页面的整体结构。

### middleware/
存放中间件，处理路由导航逻辑。

### nuxt.config.ts
Nuxt 框架的配置文件，包括模块、插件和构建选项。

### pages/
存放页面组件，Nuxt 会根据目录结构自动生成路由。

### public/
存放公共静态资源，如图片、字体等。

### server/
存放服务器端代码，处理 API 请求和服务端逻辑。

### store/
存放 Pinia 状态管理相关代码。

### tsconfig.json
TypeScript 配置文件，定义类型检查和编译选项。