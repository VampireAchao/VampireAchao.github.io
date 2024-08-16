---
title: psd.js
date: 2023-06-09 21:39:52
tags: 前端
---

> 唯有在回敬污蔑和诽谤的时候，沉默才显得如此有力——艾迪生

分享一个`js`库，能操作`psd`文件

https://github.com/meltingice/psd.js

![image-20230609214118048](/imgs/oss/blog/vampireachao/image-20230609214118048.png)

代码例子：

> ### NodeJS Example
>
> ```
> var PSD = require('psd');
> var psd = PSD.fromFile("path/to/file.psd");
> psd.parse();
> 
> console.log(psd.tree().export());
> console.log(psd.tree().childrenAtPath('A/B/C')[0].export());
> 
> // You can also use promises syntax for opening and parsing
> PSD.open("path/to/file.psd").then(function (psd) {
>   return psd.image.saveAsPng('./output.png');
> }).then(function () {
>   console.log("Finished!");
> });
> ```
>
> ### Browser Example
>
> ```
> var PSD = require('psd');
> 
> // Load from URL
> PSD.fromURL("/path/to/file.psd").then(function(psd) {
>   document.getElementById('ImageContainer').appendChild(psd.image.toPng());
> });
> 
> // Load from event, e.g. drag & drop
> function onDrop(evt) {
>   PSD.fromEvent(evt).then(function (psd) {
>     console.log(psd.tree().export());
>   }); 
> }
> ```

一个用Coffeescript编写的通用PSD解析器。它基于PSD.rb，可以让用户以可管理的树形结构处理Photoshop文档，并找出重要的数据，例如文档结构、文档大小、图层/文件夹大小和定位、图层/文件夹名称、图层/文件夹可见性和不透明度、字体数据（通过psd-enginedata）、文本区域内容、字体名称、大小和颜色、颜色模式和位深度、矢量掩模数据、扁平化图像数据和图层组合。它可以在NodeJS和浏览器（使用browserify）中运行。目前还有一些缺失的功能，例如图层组合过滤、内置渲染器和许多图层信息块，但最终目标是与PSD.rb具有完全的功能平衡。其中使用的技术术语包括Coffeescript、PSD、NodeJS、浏览器ify和图层组合。