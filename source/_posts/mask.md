---
title: mask
date: 2022-12-25 19:44:19
tags: 前端

---

> 任凭人群来往，任凭钟声响起，小孩啼哭——决心好好过上一天。——梭罗《瓦尔登湖》

分享一个`css`属性`mask`：

https://developer.mozilla.org/zh-CN/docs/Web/CSS/mask

https://css-tricks.com/almanac/properties/m/mask/

>[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) 属性 **`mask`** 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

这个属性很类似于`background`属性，但不同的是，background是背景在元素下层，mask是遮罩在元素上层，且`mask`不支持直接指定`color`，只支持`image`对象如图片、`svg`等

同样两者都是组合属性，意味着可以用简写，而不是一个一个去指定

```css
mask-image: url(/imgs/oss/blog/vampireachao/bilibili-line.svg);
mask-repeat: no-repeat;
```

可以简写为

```css
mask: url(/imgs/oss/blog/vampireachao/bilibili-line.svg) no-repeat;
```

但我们在`chrome`里尝试直接指定该属性发现并没有生效，这是因为需要添加浏览器供应商前缀`-webkit-`

```css
-webkit-mask: url(/imgs/oss/blog/vampireachao/bilibili-line.svg) no-repeat;
```

后续所有`mask-*`属性在`chrome`里都需要该前缀，上述代码我们编写一串代码看看效果

```html
<div class="el">
关于mask的8个真相，你知道多少？
mask是什么意思？mask最近为什么这么火呢？看完mask后我都惊呆了！
大家都知道，mask最近很火，究竟是为什么很火呢？mask到底是什么梗？相信大家对mask都很熟悉，mask就是我们每天都会经常遇到的，但是mask是怎么回事呢？下面就让小编带大家一起了解一下mask是怎么回事吧。
mask最近能火，其实就是mask受到了大家的关注。大家可能会感到很惊讶，mask为什么是这样的？mask究竟为什么火起来了呢？但事实就是这样，小编也感到非常惊讶。
以上就是小编为大家带来的的关于mask是什么意思，mask是什么梗的内容。
欢迎大家在评论区和小编一起讨论，畅所欲言。
</div>
```

对应的`css`

```css
body {
  background: orange;
  margin: 0;
}
.el {
  width: 100vw;
  height: 100vh;
  background: white;
  mask: url(/imgs/oss/blog/vampireachao/bilibili-line.svg);
}
```

这里我给`body`加了个背景橙色，给其中的元素`.el`加了个背景白色，然后再加了个`mask`指向我图床上的一个`svg`

这个`svg`是一个`bilibili`的小图标

![bilibili](/imgs/oss/blog/vampireachao/bilibili-line.svg)

注意红框框出来的部分，我们可以看到我们由于给`.el`元素指定了背景白色、遮罩为`svg`、导致我们的内容只在这个白色的`svg`中显示

![image-20221225200757680](/imgs/oss/blog/vampireachao/image-20221225200757680.png)

其他的属性、如

`mask-repeat`指定为`no-repeat`就能让其不重复显示

`mask-position`指定为`center`就能让其居中等就不一一赘述了

这里主要讲一个好玩的，由于`mask`属性内可以定义多个，这意味着我们可以用其对元素进行一些自定义的裁切(遮盖)

因为其只支持`image`对象，我们可以使用渐变属性得到

废话不多说，先写个图片

```html
<img src="/imgs/oss/2020-06-01/head.jpg" class="el" />
```

`css`

```css
body {
  background: orange;
  margin: 0;
  display: flex;
  justify-content: center;
}
.el {
  height: 100vh;
}
```

![image-20221225204054997](/imgs/oss/blog/vampireachao/image-20221225204054997.png)

我们使用`mask`+渐变将其从中间裁切，这里的构成是`位置left 位置省略 / 宽度45% 不重复 渐变`

渐变我随便写的`linear-gradient(0, red ,red)`，`0`是指角度、`red`是红色，主要是字母短，就用`red`占位了

```css
mask: top left 0/45% no-repeat linear-gradient(0, red, red);
```

![image-20221225205313656](/imgs/oss/blog/vampireachao/image-20221225205313656.png)

这是第一个，我们接着做第二个

```css
  mask: top left 0/45% no-repeat linear-gradient(0, red, red),
    top right 0/45% no-repeat linear-gradient(0, red, red);
```

![image-20221225205405128](/imgs/oss/blog/vampireachao/image-20221225205405128.png)

但是由于这里有点累赘，我们抽一个变量

```css
.el {
  height: 100vh;
  --mask-part: 0/45% no-repeat linear-gradient(0, red, red);
  mask: top left var(--mask-part), top right var(--mask-part);
}
```

由于我们都是`45%`，这里等于两个加起来空出了`10%`的距离，此时我们可以加一个`hover`属性，让两个遮罩的位置合拢

因为我们只有位置变化，我们把位置也抽成变量，再加一个过渡效果

```css
body {
  background: orange;
  margin: 0;
  display: flex;
  justify-content: center;
}
.el {
  height: 100vh;
  --mask-part-offset: 0;
  --mask-part: var(--mask-part-offset) / 45% no-repeat
    linear-gradient(0, red, red);
  mask: top left var(--mask-part), top right var(--mask-part);
  transition: 0.3s;
}
.el:hover {
  --mask-part-offset: 10%;
}
```

效果：

![mask](/imgs/oss/blog/vampireachao/mask.gif)

我们再做两个遮罩，调整下位置，设置下缩放

```css
.el {
  height: 100vh;
  --mask-part: var(--mask-part-offset, 10%) / 45% 45% no-repeat
    linear-gradient(0, red, red);
  mask: left var(--mask-part-offset, 0%) top var(--mask-part),
    top var(--mask-part-offset, 0%) right var(--mask-part),
    bottom var(--mask-part-offset, 0%) left var(--mask-part),
    right var(--mask-part-offset, 0%) bottom var(--mask-part);
  transition: 0.3s linear;
}
.el:hover {
  --mask-part-offset: 10%;
  transform: scale(1.2);
}
```

![mask-plus](/imgs/oss/blog/vampireachao/mask-plus.gif)

