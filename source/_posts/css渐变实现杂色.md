---
title: css渐变实现杂色
date: 2023-01-04 13:38:09
tags: 前端
---

> 团结就是力量——毛泽东

思路出处：https://css-tricks.com/making-static-noise-from-a-weird-css-gradient-bug/

这是一个通过`css`渐变产生的锯齿`BUG`实现的噪点效果

例如我们使用径向渐变画两个圆，这里用的径向渐变函数`radial-gradient`，其中第一个参数是距离中心点近的渐变样式，第二个是远一些的，每个参数中第一项是颜色，第二项是区域

这里的：

从中心点进行沿半径进行渐变

```html
<div class="box"></div>
<div class="box"></div>
<style>
    .box {
  display: inline-block;
  width: 300px;
  aspect-ratio: 1;
  margin: 10px;
  border: 2px solid red;
  background: radial-gradient(#000 60%,#0000 0)
}
.box + .box {
  background: radial-gradient(#000 60%,#0000 60.5%)
}
</style>
```

距离近一些的颜色是`#000`黑色，且显示区域占`60%`

距离远一些的也显示黑色，但透明度为`0`(即不显示)，且显示区域为`0`(第二个圆是`60.5%`，比第一个的区域多出了`0.5%`)

<div class="box"></div>
<div class="box"></div>
<style>
    .box {
  display: inline-block;
  width: 300px;
  aspect-ratio: 1;
  margin: 10px;
  border: 2px solid red;
  background: radial-gradient(#000 60%,#0000 0)
}
.box + .box {
  background: radial-gradient(#000 60%,#0000 60.5%)
}
</style>

可以看到第一个圆，包含了一些锯齿，第二个没有是因为第二个的第二项渐变，盖过了锯齿

![image-20230104134454066](/imgs/oss/picGo/image-20230104134454066.png)

我们用这个锯齿的`BUG`，将显示比例的数值改到特别小，再允许其重复渲染

```html
<div class="x-noise"></div>
<style>
.x-noise {
  width: 300px;
  height: 300px;
  background: 
    repeating-conic-gradient(#000 0 0.0001%,#0000 0 0.0002%) 
}
</style>
```

效果：

<div class="x-noise"></div>
<style>
.x-noise {
  width: 300px;
  height: 300px;
  background: 
    repeating-conic-gradient(#000 0 0.0001%,#0000 0 0.0002%) 
}
</style>

但这并不是一个完全版，仔细看中间还有一个圆心，完全版可以在径向渐变的基础上，再加上一个锥形渐变、调整圆心位置实现：

```html
<div class="noise"></div>
<style>
.noise {
  width: 300px;
  height: 300px;
  background: 
    repeating-radial-gradient(#000 0 0.0001%,#fff 0 0.0002%) 
    60% 60%/3000px 3000px,
    repeating-conic-gradient(#000 0 0.0001%,#fff 0 0.0002%) 
    40% 40%/3000px 3000px;
  background-blend-mode: difference;
}
</style>
```

<div class="noise"></div>
<style>
.noise {
  width: 300px;
  height: 300px;
  background: 
    repeating-radial-gradient(#000 0 0.0001%,#fff 0 0.0002%) 
    60% 60%/3000px 3000px,
    repeating-conic-gradient(#000 0 0.0001%,#fff 0 0.0002%) 
    40% 40%/3000px 3000px;
  background-blend-mode: difference;
}
</style>

我们可以将其覆盖到另一张图片上，因为有`background-blend-mode: difference;`

能够实现这种效果

![image-20230104141851940](/imgs/oss/picGo/image-20230104141851940.png)