---
title: TinyVue组件库
date: 2024-08-14 09:36:53
tags: 前端
---

> 君子不隐其短，不知则问，不能则学。——董仲舒

文档：

[TinyVue：一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端](https://opentiny.design/tiny-vue/zh-CN/smb-theme/overview)

代码：

https://github.com/opentiny/tiny-vue

在项目的根目录中，打开控制台，执行以下命令，为 `Vue 3.0` 的项目安装 `TinyVue` 组件库 ：

```bash
yarn add @opentiny/vue@3
# 或者
npm install @opentiny/vue@3
```

或者执行以下命令，为 `Vue 2.0` 的项目安装 `TinyVue` 组件库 ：

```bash
yarn add @opentiny/vue@2
# 或者
npm install @opentiny/vue@2
```

如果是`Vite` 工程，安装完依赖后，修改项目的 `vite.config.js` ，添加以下代码突出显示的部分：

```js
// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': { ...process.env }
  }
})
```

`CDN` 方式引入，快速使用：

```html
<head>
  <!-- 引入 vue 和 @opentiny/vue -->
  <script type="importmap">
    {
      "imports": {
        "vue": "https://registry.npmmirror.com/vue/3.4.27/files/dist/vue.runtime.esm-browser.js",
        "echarts": "https://registry.npmmirror.com/echarts/5.4.1/files/dist/echarts.esm.js",
        "@opentiny/vue": "https://registry.npmmirror.com/@opentiny/vue-runtime/3.17/files/dist3/tiny-vue-pc.mjs",
        "@opentiny/vue-icon": "https://registry.npmmirror.com/@opentiny/vue-runtime/3.17/files/dist3/tiny-vue-icon.mjs",
        "@opentiny/vue-locale": "https://registry.npmmirror.com/@opentiny/vue-runtime/3.17/files/dist3/tiny-vue-locale.mjs",
        "@opentiny/vue-common": "https://registry.npmmirror.com/@opentiny/vue-runtime/3.17/files/dist3/tiny-vue-common.mjs"
      }
    }
  </script>
  <!-- 引入 @opentiny/vue 样式 -->
  <link rel="stylesheet" href="https://registry.npmmirror.com/@opentiny/vue-theme/3.17/files/index.css" />
</head>
```

代码部分：

```html
<body>
  <div id="app"></div>
  <script type="module">
    import { createApp } from 'vue'
    // 引入 @opentiny/vue 组件
    import TinyVue from '@opentiny/vue'

    createApp({
      template: `
        <tiny-button>TinyVue</tiny-button>
        <tiny-alert description="TinyVue"></tiny-alert>
      `
    })
      // 注册 @opentiny/vue 组件
      .use(TinyVue)
      .mount('#app')
  </script>
</body>
```
