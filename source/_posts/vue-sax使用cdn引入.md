---
title: vue-sax使用cdn引入
date: 2024-06-06 19:54:13
tags: 前端
---

> 等待走运无异于等待死亡。——福特

代码如下：

```html
<!DOCTYPE html>
<html>
<head>
    <link href="https://unpkg.com/vuesax@4.0.1-alpha.16/dist/vuesax.min.css" rel="stylesheet">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
</head>
<body>
<div id="app">
    <vs-button>Hello World</vs-button>
</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/vuesax@4.0.1-alpha.16/dist/vuesax.min.js"></script>
<script>
    new Vue({
        el: '#app'
    })
</script>
</body>
</html>
```

主要是官方文档用的`vue`的`cdn`路径不对

[Getting Started | Vue.js Framework Components - Vuesax](https://vuesax.com/docs/guide/gettingStarted.html)
