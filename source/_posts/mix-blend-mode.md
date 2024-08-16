---
title: mix-blend-mode
date: 2022-11-16 13:42:01
tags: 前端
---

> 为爱情赌气，就丧心病狂了！——塞万提斯

分享一个好玩的`css`属性：

`mix-blend-mode`，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode)

该属性可以将元素和后面的背景进行混合

什么叫混合呢？例如我看到的一个网站：

![image-20221116140214442](/imgs/oss/picGo/image-20221116140214442.png)

红框框出来的部分，是鼠标移动上去的一个效果

这个小圈，与后面的图片进行了反色，而且对于不少图片都有类似效果，我一开始以为是用了两张图片做的处理

后来发现并不是，是用的这个`css`

```css
mix-blend-mode: exclusion;
```

其提供的不只是反色一个选项，还有很多的值，都可以使用