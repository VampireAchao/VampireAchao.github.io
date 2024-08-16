---
title: jquery在iframe中选中父元素节点
date: 2021-09-24 00:59:28
tags: 前端
---

> 忧劳可以兴国，逸豫可以亡身。——《新五代史·伶官传序》

我们在使用如`layui`的`layer`弹窗或者在页面上用别的方式打开的`iframe`中可能会要获取到父页面的某个元素

可以使用：

```javascript
window.parent.$(".layui-laypage-btn")
```

这里`.layui-laypage-btn`是父元素的节点

主要是

`window.parent`这个属性，能返回当前窗口的父窗口

