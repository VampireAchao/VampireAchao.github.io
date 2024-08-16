---
title: css继承
date: 2022-05-24 13:44:56
tags: 前端
---

> 浅水是喧哗的，深水是沉默的。——雪莱

我们知道`CSS`中一些属性会被继承：给父节点设置样式，子节点也会生效例如`color`、`font-size`之类的

但像`widths`,` margins`, `padding`, 和 `borders `不会被继承，如果被继承，设想一下，给父节点加了一个`border`，里面的每个子孙元素都有一个`border`，这不是我们通常想要的效果

如何来控制这些属性呢？

> CSS 为控制继承提供了四个特殊的通用属性值。每个css属性都接收这些值。
>
> - [`inherit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)
>
>   设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".
>
> - [`initial`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)
>
>   设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 `inherit` 。
>
> - [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)
>
>   将属性重置为自然值，也就是如果属性是自然继承那么就是 `inherit`，否则和 `initial`一样

这里有一个简单的`demo`：

```html
    <div>
        <h2>
            我是普通的h2
        </h2>
    </div>
    <div id="sidebar">
        <h2>
            我是color: inherit;我继承了父元素sidebar的颜色<br />
            设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".
        </h2>
    </div>
    <div id="sidebar">
        <h2 style="color: initial">
            我是color: initial;我使用了默认的颜色<br />
            设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 inherit 。
        </h2>
    </div>
    <div id="sidebar">
        <h2 style="color: unset">
            我是color: unset;我继承了父元素sidebar的颜色<br />
            将属性重置为自然值，也就是如果属性是自然继承那么就是 inherit，否则和 initial一样
        </h2>
    </div>


    <div id="sidebar">
        <h2 style="color: revert;">
            我是color: revert;我还原了当前继承状态,和unset区别在于unset的实际值只能由浏览器(或者浏览器控制台中用户手动)设置<br />
            新的属性, revert (en-US)， 只有很少的浏览器支持。
        </h2>
    </div>
```

对应的样式

```html
    <style>
        /* 设置二级标题的颜色为绿色 */
        h2 {
            color: green;
        }

        /* ...but leave those in the sidebar alone so they use their parent's color */
        #sidebar h2 {
            color: inherit;
        }

        div#sidebar {
            color: blue;
        }
    </style>
```

实际的效果：

![image-20220524135118712](/imgs/oss/picGo/image-20220524135118712.png)

参考：

1. [层叠与继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)

2. [继承](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inheritance)