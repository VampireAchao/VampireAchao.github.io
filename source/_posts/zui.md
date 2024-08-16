---
title: zui
date: 2024-05-12 18:32:26
tags: 前端
---

> 读书须求大义，不可缠绕于琐碎传注之间。——贺钦

分享一个禅道开源的 `UI` 库 `ZUI`

https://github.com/easysoft/zui

官方文档：

https://openzui.com/

ZUI 3 是一个全新的开源 UI 组件库，提供了丰富的实用组件，并提供自由的定制使用方式，不依赖任何 JavaScript 框架，可以在任何 Web 应用中通过原生的方式使用。

访问 [ZUI 3 | ZUI 3](https://easysoft.github.io/zui/3/) 来提前预览组件库。

👉 如果你需要访问 ZUI 1，请访问 [https://openzui.com/](https://openzui.com/) ，ZUI 1 源码已经转移到 `zui1` 分支。

## 特性

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E7%89%B9%E6%80%A7)

- 🌸 **丰富的 CSS 工具类**：基于 [Tailwind CSS](https://tailwindcss.com/) 提供了丰富的 CSS 工具类，包括特别的语义化外观类名；
- 💠 **强大的 JS 组件**：基于 [Preact](https://preactjs.com/) 提供了大量 JavaScript 组件，每个组件提供了大量实用的功能选项；
- 💖 **友好现代的界面**：提供了经过精心设计的界面风格，所有组件交互经过反复优化和验证以提供最佳方式；
- 🌗 **主题和深色模式**：基于 CSS 变量的主题模式，快速生成主题，内置支持深色模式
- 📦 **自由使用**：不依赖具体的框架，所有 CSS 工具类开箱即用，所有 JS 组件支持原生调用，丰富的引入方式，支持通过 ESM 导入，或者直接在浏览器中引用整个 JS 和 CSS，支持打包定制自己的组合版本；
- ⚙️ **高度定制**：除了按需引入，还支持打包定制自己的组合版本，避免多余

一些激动人心的新特性正在开发，包括：

- [ ]  交互式的文档示例；
- [ ]  在线演练场；
- [ ]  主题设计器；
- [ ]  设计规范指导文档；
- [ ]  可配置的定制打包机制，支持在线生成打包配置；
- [ ]  适用于 React 和 Preact 的组件库；
- [ ]  通用组件插件机制，允许对所有组件进行扩展。

## 快速预览

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E5%BF%AB%E9%80%9F%E9%A2%84%E8%A7%88)

### 使用 CSS 工具类

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E4%BD%BF%E7%94%A8-css-%E5%B7%A5%E5%85%B7%E7%B1%BB)

```html
<button class="btn primary">ZUI 3</button>
<button class="btn primary-outline">Read more</button>
```

### 使用 JS 组件

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E4%BD%BF%E7%94%A8-js-%E7%BB%84%E4%BB%B6)

```html
<menu id="colorPicker"></menu>

<script>
const colorPicker = new ColorPicker('#colorPicker', {
    heading: '选择颜色',
    defaultValue: '#0ea5e9',
});
</script>
```

## 开发

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E5%BC%80%E5%8F%91)

### 安装

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E5%AE%89%E8%A3%85)

```shell
$ pnpm install
```

### 启动开发服务器

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E5%90%AF%E5%8A%A8%E5%BC%80%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8)

```shell
$ pnpm dev
```

### 构建

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E6%9E%84%E5%BB%BA)

```shell
$ pnpm build
```

### 文档开发预览

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E6%96%87%E6%A1%A3%E5%BC%80%E5%8F%91%E9%A2%84%E8%A7%88)

```shell
$ pnpm docs:dev
```

### 文档构建

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E6%96%87%E6%A1%A3%E6%9E%84%E5%BB%BA)

```shell
$ pnpm docs:build
```

## 技术栈

[](https://github.com/easysoft/zui?tab=readme-ov-file#%E6%8A%80%E6%9C%AF%E6%A0%88)

- Node.js 18+
- 包管理器：[pnpm](https://pnpm.io/zh/)
- 构建工具：[Vite](https://cn.vitejs.dev/)
- CSS 工具库：[TailwindCSS](https://tailwindcss.com/)
- 静态文档网站生成：[VitePress](https://vitepress.dev/)
- TypeScript 4.5+
- 字体图标生成：[Fantasticon](https://github.com/tancredi/fantasticon)
- JS 组件开发 [preact.js](https://preactjs.com/)
