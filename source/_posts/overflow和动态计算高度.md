---
title: overflow和动态计算高度
date: 2022-06-23 13:14:54
tags: 前端
---

> 人们总会找到某种带头人,把他供奉起来,培养成伟人……暴君就是这么来的;暴君最初都是以保护者的形象出现的。——柏拉图,《理想国》

首先是`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow

其中对`overflow`进行了描述：

> CSS 属性 **overflow** 定义当一个元素的内容太大而无法适应 [块级格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context) 时候该做什么。它是 [`overflow-x`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-x) 和[`overflow-y`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow-y)的 [简写属性 ](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)。

重点在这里：

> 为使 `overflow `有效果，块级容器必须有一个指定的高度（`height`或者`max-height`）或者将`white-space`设置为`nowrap`。

那问题来了，我这里有一个折叠面板

![image-20220623133429335](/imgs/oss/picGo/image-20220623133429335.png)

我希望这里多个折叠面板每一项的头部都能显示在页面中，并且其子项能够适应屏幕高度和折叠情况变化

![1655963038375](/imgs/oss/picGo/1655963038375.gif)

为了实现上面的效果，我们需要在每一个折叠面板子项中设置`overflow-y:auto`，然后给其设置`height`或者`max-height`

我们知道`css`中有个计算函数`calc`可以计算我们的高度，这里的卡片为了保证屏幕自适应，可以用其计算出我们这里所需的高度为`100vh`(屏幕可视区域高度)-其余占位高度(比如卡片上下的留白，卡片头部的高度等)，最后需要除以这里的折叠面板数量`3`，但有个问题，这里不一定是`3`个，有可能是多个，使用`vue`动态渲染的，这样的话我们就只能在`vue`标签上指定高度

例如：

![image-20220623135829371](/imgs/oss/picGo/image-20220623135829371.png)

