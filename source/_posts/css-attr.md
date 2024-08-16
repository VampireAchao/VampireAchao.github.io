---
title: css attr
date: 2022-12-19 13:30:44
tags: 前端
---

> 过于大方的施舍会导致盗窃——西塞罗

分享一个`css`函数`attr`

`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr

`attr`可以获取我们标签内的属性作为值

例如：

```html
<p data-foo="hello">world</p>
```

`css`：

```css
[data-foo]::before {
  content: attr(data-foo) " ";
}
```

效果：

<style>
[data-foo]::before {
  content: attr(data-foo) " ";
}
</style>
<p data-foo="hello">world</p>

除了`data-*`的自定义属性，也可以获取其他的，例如`custom-prefix`

```html
<style>
[custom-prefix]::before {
  content: attr(custom-prefix);
}
</style>
<p custom-prefix="hello">world</p>
```

<style>
[custom-prefix]::before {
  content: attr(custom-prefix);
}
</style>
<p custom-prefix="hello">world</p>

或者是`class`类名等

```html
<style>
.hello::before {
  content: attr(class) " ";
}
</style>
<p class="hello">world</p>
```

<style>
.hello::before {
  content: attr(class) " ";
}
</style>
<p class="hello">world</p>