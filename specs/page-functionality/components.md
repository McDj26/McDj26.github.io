# 组件文档

## 核心组件

### BgImage 组件

**功能**：展示自适应屏幕大小的背景图片，支持白天和黑夜模式

**实现**：
- 使用 `@nuxtjs/color-mode` 检测当前颜色模式
- 根据颜色模式动态加载不同的背景图片
- 使用 CSS 媒体查询适配不同屏幕尺寸
- 实现平滑的背景切换效果

**使用**：
```vue
<ClientOnly>
  <BgImage></BgImage>
</ClientOnly>
```

### Board 组件

**功能**：展示个人基本信息、头像和简介

**实现**：
- 显示个人头像、姓名、职位和简介
- 提供社交媒体链接
- 支持响应式布局

**使用**：
```vue
<Board></Board>
```

### About 组件

**功能**：详细介绍个人背景、技能和经验

**实现**：
- 分章节展示个人信息
- 使用卡片式布局
- 支持响应式设计

**使用**：
```vue
<About></About>
```

### Projects 组件

**功能**：展示个人参与的项目，包括项目描述和链接

**实现**：
- 使用网格布局展示项目卡片
- 每个卡片包含项目名称、描述、技术栈和链接
- 支持响应式布局

**使用**：
```vue
<Projects></Projects>
```

### Blogs 组件

**功能**：展示个人博客文章，分享技术心得

**实现**：
- 列表形式展示博客文章
- 每个条目包含标题、摘要、日期和链接
- 支持响应式布局

**使用**：
```vue
<Blogs></Blogs>
```

### Skills 组件

**功能**：以可视化方式展示个人技能水平

**实现**：
- 使用进度条或雷达图展示技能水平
- 按类别组织技能
- 支持响应式布局

**使用**：
```vue
<Skills></Skills>
```

## 通用组件

### 按钮组件

**功能**：提供统一的按钮样式和交互效果

**属性**：
- `type`：按钮类型（primary, success, warning, danger, info）
- `size`：按钮大小（large, medium, small, mini）
- `disabled`：是否禁用

**使用**：
```vue
<el-button type="primary" size="medium">点击按钮</el-button>
```

### 卡片组件

**功能**：提供统一的卡片样式

**属性**：
- `title`：卡片标题
- `shadow`：卡片阴影（always, hover, never）
- `border`：是否显示边框

**使用**：
```vue
<el-card title="卡片标题" shadow="hover">
  卡片内容
</el-card>
```

### 图标组件

**功能**：提供统一的图标使用方式

**使用**：
```vue
<el-icon>
  <Search />
</el-icon>
```

## 组合式函数

### useSection

**功能**：实现段落式滚动效果

**参数**：
- `pages`：页面部分数组，每个部分包含元素、进入回调和首次进入回调

**返回值**：
- 取消滚动监听的函数

**使用**：
```typescript
const pages = [
  {
    el: boardRef,
    enterCallback: (el) => GlobalBus.emit('onEnter', el.id),
    firstEnterCallback: (el) => GlobalBus.emit('firstEnter', el.id)
  }
];
const cancelToken = useSection(pages);
```

### useTypeWritterEffect

**功能**：实现打字机效果

**参数**：
- `text`：要显示的文本
- `speed`：打字速度（毫秒）

**返回值**：
- 响应式的当前显示文本

**使用**：
```typescript
const typedText = useTypeWritterEffect('Hello World', 100);
```

### useBus

**功能**：提供全局事件总线

**方法**：
- `emit`：触发事件
- `on`：监听事件
- `off`：移除事件监听

**使用**：
```typescript
import { GlobalBus } from '~/composables/useBus';

// 触发事件
GlobalBus.emit('eventName', data);

// 监听事件
GlobalBus.on('eventName', (data) => {
  console.log(data);
});
```

### useBackgroundTrace

**功能**：实现背景轨迹效果

**参数**：
- `options`：配置选项

**使用**：
```typescript
useBackgroundTrace({
  color: '#409eff',
  speed: 2
});
```

## 组件开发规范

1. **命名规范**：组件名使用大驼峰命名法（PascalCase）
2. **文件结构**：每个组件单独放在一个文件中，相关组件放在同一个目录
3. **样式规范**：使用 scoped 样式，避免样式冲突
4. **Props 定义**：使用 TypeScript 类型定义 Props
5. **事件定义**：明确定义组件触发的事件
6. **文档**：为每个组件添加详细的文档说明