---
title: browserify
date: 2022-06-10 13:10:58
tags: 前端
---

> 很奇怪，我们不屑与他人为伍，却害怕自己与众不同。——保罗·科埃略的《韦罗妮卡决定去死》

今天又来分享个好东西：https://browserify.org/

这个玩意儿可以帮我们把`npm`下载的依赖，使用`script`标签引入：

先安装：

```shell
pnpm install -g browserify
```

比如我们引入一个`outils`

```shell
pnpm i outils
```

然后编写一个`main.js`

```javascript
const outils = require('模块名')
window.模块名 = 模块名
// 例如
const outils = require('outils')
window.outils = outils
```

![image-20220610133256938](/imgs/oss/picGo/image-20220610133256938.png)

生成

```shell
browserify main.js -o [文件名]
# 例如
browserify main.js -o bundle.js
```

然后我们引入这个`js`试试

```html
<script src="bundle.js"></script>
```

![image-20220610133318153](/imgs/oss/picGo/image-20220610133318153.png)

运行一下，可以看到我们能在控制台拿到，说明引入成功

![image-20220610133407816](/imgs/oss/picGo/image-20220610133407816.png)

有朋友说，`outils`官方有`min.js`：https://www.npmjs.com/package/outils

> ## 🏗 安装使用
>
> 1. 直接下载`min`目录下的[outils.min.js](https://github.com/proYang/outils/blob/master/min/outils.min.js)使用，支持UMD通用模块规范
> 2. 使用npm安装
>
> ### 浏览器:
>
> ```
>   <script src="outils.min.js"></script> 
>   <script>
>       var OS = outils.getOS()
>   </script> 
> ```

哪还要你这么费劲

我只想说有些依赖只提供了`npm`下载方式的话，可以用这个，你可以不用 :smile: