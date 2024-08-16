---
title: css实现毛玻璃效果
date: 2024-07-19 22:42:35
tags: 前端
---

> 醉过才知酒浓，爱过才知情重。你不能做我的诗，正如我不能做你的梦。——胡适

从这里学过来的

[Backdrop Filter Effect With CSS | CSS-Tricks](https://css-tricks.com/backdrop-filter-effect-with-css/)

核心代码如下：

```css
.container {
  backdrop-filter: blur(10px);
}
```

效果

<iframe height="300" style="width: 100%;" scrolling="no" title="Untitled" src="https://codepen.io/gesteves/embed/PwRPZa?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/gesteves/pen/PwRPZa">
  Untitled</a> by Guillermo Esteves (<a href="https://codepen.io/gesteves">@gesteves</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

进阶学习`backdrop`：

[Backdrop-filter | CSS-Tricks](https://css-tricks.com/almanac/properties/b/backdrop-filter/)
