# 测试指南

## 测试类型

### 单元测试
- **测试对象**：单个组件、函数或模块
- **测试工具**：Vitest
- **测试范围**：验证单个单元的功能正确性

### 集成测试
- **测试对象**：多个组件或模块的交互
- **测试工具**：Vitest + Testing Library
- **测试范围**：验证组件之间的交互是否正常

### 端到端测试
- **测试对象**：整个应用流程
- **测试工具**：Cypress
- **测试范围**：验证完整的用户流程

## 测试策略

### 测试覆盖率目标
- **代码覆盖率**：≥ 80%
- **分支覆盖率**：≥ 70%
- **函数覆盖率**：≥ 85%

### 测试文件结构
- 测试文件与被测试文件放在同一目录
- 测试文件命名格式：`文件名.test.ts` 或 `文件名.spec.ts`

### 测试编写原则
- **独立性**：每个测试用例独立运行
- **可重复性**：测试结果应该是可重复的
- **明确性**：测试用例描述清晰，易于理解
- **全面性**：覆盖正常和异常场景

## 单元测试

### 组件测试

```typescript
import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hello Vitest'
      }
    });
    expect(wrapper.text()).toContain('Hello Vitest');
  });
});
```

### 函数测试

```typescript
import { sum } from '../utils';

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
  
  it('adds negative numbers', () => {
    expect(sum(-1, -2)).toBe(-3);
  });
  
  it('adds zero', () => {
    expect(sum(0, 5)).toBe(5);
  });
});
```

## 集成测试

### 页面集成测试

```typescript
import { mount } from '@vue/test-utils';
import HomePage from '../pages/home/index.vue';
import Board from '../pages/home/components/board.vue';

describe('HomePage', () => {
  it('renders all components', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.findComponent(Board).exists()).toBe(true);
  });
});
```

## 端到端测试

### 基本流程测试

```typescript
// cypress/e2e/home.cy.ts
describe('Home Page', () => {
  it('visits the home page', () => {
    cy.visit('/');
    cy.contains('Welcome to my home page');
  });
  
  it('navigates to about section', () => {
    cy.visit('/');
    cy.get('a[href="#about"]').click();
    cy.contains('About Me');
  });
});
```

## 测试运行

### 运行单元测试

```bash
# 运行所有单元测试
pnpm test

# 运行特定测试文件
pnpm test HelloWorld.test.ts

# 运行测试并生成覆盖率报告
pnpm test --coverage
```

### 运行端到端测试

```bash
# 打开 Cypress 测试 runner
pnpm run cypress:open

# 运行所有端到端测试
pnpm run cypress:run
```

## 测试最佳实践

### 测试用例设计
- **边界条件**：测试输入的边界值
- **错误处理**：测试异常情况
- **状态管理**：测试状态变化
- **事件处理**：测试用户交互

### 测试代码质量
- 测试代码与生产代码保持一致的风格
- 测试用例描述清晰，便于理解
- 避免测试实现细节，测试行为

### 测试维护
- 当代码变更时，更新相关测试
- 定期运行测试，确保代码质量
- 移除过时的测试用例

## 测试工具配置

### Vitest 配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Cypress 配置

```typescript
// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
```