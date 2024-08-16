---
title: 小程序框架vue-mini
date: 2024-08-13 21:17:46
tags: 前端
---

> 即使对于君主，研究学问的道路也是没有捷径的。——阿基米德

分享一个基于 Vue 3 的小程序框架

https://vuemini.org/

https://github.com/vue-mini/vue-mini

Vue Mini 是一个基于 Vue 3 的小程序框架，它能让你用组合式 API 写小程序。与某些小程序开发方案不同的是 Vue Mini 核心仅仅是一个轻量的运行时库，它既不依赖任何编译步骤，也不涉及任何 Virtual DOM。并且 Vue Mini 从一开始就被设计为能跟小程序原生语法协同工作，你甚至能在同一个页面或组件内混用原生语法与 Vue Mini，这能让你很轻松的将其整合进既有项目中。当然，你也能完全使用 Vue Mini 开发一个小程序。

Vue Mini 仅聚焦于小程序逻辑部分，也就是 JS 部分，它并不影响小程序的模版、样式及配置。

快速创建

```bash
npm create vue-mini@latest
cd <your-project-name>
npm install
npm run dev
```

然后就可以用微信开发者工具打开
