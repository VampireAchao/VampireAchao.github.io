---
title: elementUI字体文件丢失问题
date: 2021-12-16 20:18:44
tags: 前端
---

> 见贤思齐焉，见不贤而内自省也。——《论语》

今天引入`elementUI`时

官方文档说的`CDN`引入方式为：

> ### CDN
>
> 目前可以通过 [unpkg.com/element-ui](https://unpkg.com/element-ui/) 获取到最新版本的资源，在页面上引入 js 和 css 文件即可开始使用。
>
> ```html
> <!-- 引入样式 -->
> <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
> <!-- 引入组件库 -->
> <script src="https://unpkg.com/element-ui/lib/index.js"></script>
> ```

我想下载到本地嘛，就直接打开这两个链接，另存为到本地了

然后发现字体文件丢失...最后解决方式是打开

https://unpkg.com/browse/element-ui@2.15.6/lib/theme-chalk/fonts/

然后下载其中的字体文件，将`fonts`文件夹与`css`平级即可

![image-20211216213353889](/imgs/oss/picGo/image-20211216213353889.png)