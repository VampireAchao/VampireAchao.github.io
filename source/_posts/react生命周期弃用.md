---
title: react生命周期弃用
date: 2023-09-26 08:28:52
tags: 前端
---

> 强本而节用，则天不能贫；养备而动时，则天不能病；修道而不贰，则天不能祸。——荀子

在运行`apache-shenyu`发现很多警告

![](/imgs/oss/picGo/20230926083111.png)

大致说是生命周期弃用了，并且提供了一个指南链接

https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html

指南中大致提到了几点，以及相关的例子

https://legacy.reactjs.org/blog/2018/03/27/update-on-async-rendering.html#examples

例如请求数据渲染时使用`componentDidMount`代替`componentWillMount`之类的场景

我也针对新建了一个`issue`，去处理优化掉这些弃用的生命周期

https://github.com/apache/shenyu-dashboard/issues/341
