---
title: css is选择器
date: 2022-12-22 14:13:15
tags: 前端
---

> 良药苦口利于病，忠言逆耳利于行——佚名

MDN：https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is

`is`选择器可以同时包含多个，例如

```css
/* 选择 header、main、footer 里的任意一个悬浮状态的段落 */
:is(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}

/* 以上内容相当于以下内容 */
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```

非常实用