---
title: unocss
date: 2022-12-31 21:55:07
tags: 前端
---

> 忍把浮名，换了浅斟低唱。——柳永《鹤冲天》

分享一个`css`框架[unocss](https://github.com/unocss/unocss)

可以通过`class`规则，生成对应样式，例如通过`m-1`生成`margin: 0.25rem`

而且规则可以通过

https://uno.antfu.me/

进行查询

![image-20221231213852038](/imgs/oss/picGo/image-20221231213852038.png)

除了预制规则，还可以自定义规则：

```javascript
rules: [
  ['m-1', { margin: '0.25rem' }],
]
```

即可生成

```css
.m-1 { margin: 0.25rem; }
```

还可以通过正则的方式

```javascript
rules: [
  [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
  [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
]
```

使用起来

```html
<div class="m-100">
  <button class="m-3">
    <icon class="p-5" />
    My Button
  </button>
</div>
```

`css`就会被生成

```css
.m-100 { margin: 25rem; }
.m-3 { margin: 0.75rem; }
.p-5 { padding: 1.25rem; }
```

