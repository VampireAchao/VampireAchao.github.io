---
title: 使用Console Importer安装lodash并使用
date: 2024-07-26 16:33:10
tags: 前端
---

> 健康和才智是人生两大幸事。——米南德

我今天在逛`lodash`官方文档，用`Console Importer`仅需安装时

除了我们一般的使用方式也就是`$i("lodash")`

```bash
$i("lodash")
importer.js:2 [$i]: Searching for lodash, please be patient...
undefined
importer.js:2 [$i]: lodash not found, import lodash.js instead.
importer.js:2 [$i]: lodash.js is loading, please be patient...
importer.js:2 [$i]: lodash.js(https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js) is loaded.
_.camelCase('Foo Bar');
'fooBar'
```

还可以直接`Vue = await $i.esm('vue')`

```bash
Vue = await $i.esm('vue');
Vue.createApp("#id")
importer.js:2 [$i]: vue(esm) is loading, please be patient...
{_uid: 1, _component: {…}, _props: null, _container: null, _context: {…}, …}
```
