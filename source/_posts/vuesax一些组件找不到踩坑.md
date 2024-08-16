---
title: vuesax一些组件找不到踩坑
date: 2024-06-08 22:50:32
tags: 前端
---

> 祸生于欲得，福生与自禁。——刘向

今天发现`vuesax`有一些组件用不了了，弄了半天，没办法去`github`上看了看

发现这个人也是相同问题

https://github.com/lusaxweb/vuesax-next/issues/208

然后翻`issue`看到一个不继续开发的`issue`

https://github.com/lusaxweb/vuesax-next/issues/297

这里提到

> A fork of [Vuesax V4](https://github.com/vuesax-alpha/vuesax-alpha) has been created that works with Vue 3 and Nuxt 3. Additionally, the fork includes new components that are not present in V4. I suggest using and contributing to fork instead.
> 
> Vuesax V4 的一个分支已经创建，可与 Vue 3 和 Nuxt 3 配合使用。此外，该分支还包含 V4 中不存在的新组件。我建议改为使用 fork 并为其做出贡献。

这里跳转过来是一个`vuesax-alpha`的仓库，支持`vue3`

https://github.com/vuesax-alpha/vuesax-alpha

它的官方文档为：

https://vuesax-alpha.vercel.app/

我们解决上面问题（`VsCard`组件找不到）：

```html
<!DOCTYPE html>
<html>
<head>
    <link
            href="https://unpkg.com/vuesax-alpha/theme-chalk/index.css"
            rel="stylesheet"
    />
    <meta
            name="viewport"
            content="initial-scale=1, maximum-scale=1, user-scalable=no"
    />
</head>
<body>
<div id="app">
    <vs-button>Hello World</vs-button>
</div>

<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="https://unpkg.com/vuesax-alpha/dist/index.full.min.js"></script>

<script>
    const {createApp} = Vue
    const {VsButton, VsCard} = VuesaxAlpha

    createApp({
        components: {VsButton, VsCard}
    }).mount('#app')
</script>
</body>
</html>
```
