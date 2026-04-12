# 代码风格指南

## 通用规则

### 缩进和空格
- 使用 2 个空格进行缩进
- 代码块之间使用空行分隔
- 行尾不使用空格

### 命名规范
- **变量名**：使用小驼峰命名法（camelCase）
- **常量名**：使用大驼峰命名法（PascalCase）或全大写加下划线（SNAKE_CASE）
- **函数名**：使用小驼峰命名法（camelCase）
- **组件名**：使用大驼峰命名法（PascalCase）
- **文件名**：组件文件使用大驼峰命名法（PascalCase），其他文件使用小驼峰命名法（camelCase）

### 注释
- 使用 JSDoc 风格的注释
- 复杂逻辑添加注释说明
- 组件和函数添加参数和返回值说明

## Vue 组件规范

### 组件结构
- 使用 `<template>`、`<script setup>`、`<style>` 结构
- 组件逻辑按功能分组
- 导入语句按类型排序（Vue 内置、第三方、本地）

### 模板规范
- 使用短横线分隔的属性名（kebab-case）
- 组件标签使用大驼峰命名法（PascalCase）
- 指令缩写：`v-bind` 缩写为 `:`，`v-on` 缩写为 `@`
- 条件渲染使用 `v-if`/`v-else-if`/`v-else`，列表渲染使用 `v-for`

### 脚本规范
- 使用 `<script setup lang="ts">` 语法
- 响应式数据使用 `ref` 或 `reactive`
- 计算属性使用 `computed`
- 生命周期钩子按执行顺序排列

## TypeScript 规范

### 类型定义
- 使用接口（interface）定义对象类型
- 使用类型别名（type）定义复杂类型
- 函数参数和返回值添加类型注解
- 避免使用 `any` 类型

### 类型导入
- 使用 `import type` 导入类型
- 类型定义放在单独的文件中

## SCSS 规范

### 命名规范
- 类名使用 BEM 命名法（Block__Element--Modifier）
- 变量名使用短横线分隔（kebab-case）
- 混合器和函数名使用小驼峰命名法（camelCase）

### 结构规范
- 使用嵌套语法组织样式
- 按功能分组样式
- 使用变量管理颜色、字体等

## 代码示例

### Vue 组件示例

```vue
<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button @click="handleClick">Click me</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const title = ref('Home Page');
const description = ref('Welcome to my home page');

const handleClick = () => {
  console.log('Button clicked');
};
</script>

<style scoped>
.home {
  padding: 20px;
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  button {
    padding: 8px 16px;
    background-color: #409eff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
```

### TypeScript 示例

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const getUser = (id: number): User => {
  return {
    id,
    name: 'John Doe',
    email: 'john@example.com'
  };
};

const user: User = getUser(1);
console.log(user.name);
```

### SCSS 示例

```scss
// 变量定义
$primary-color: #409eff;
$font-size-base: 16px;

// 混合器
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

// 样式
.header {
  padding: 20px;
  background-color: #f5f7fa;
  
  &__title {
    font-size: 24px;
    color: #303133;
  }
  
  &__nav {
    @include flex-center;
    margin-top: 10px;
    
    &-item {
      margin-right: 20px;
      color: #606266;
      
      &--active {
        color: $primary-color;
      }
    }
  }
}
```