---
title: CSSStyleSheet
date: 2022-08-14 14:06:47
tags: 前端
---

> 只要能培育出艳丽的花朵，做一颗会朽的草又有何妨？ ——鲁迅

惯例，先上`MDN`：https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet

然后是例子：

新增规则：https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/insertRule

```javascript
// 新增一条规则，将所有元素的hover字体颜色设为蓝色
document.styleSheets[0].insertRule("*:hover {  color:blue }")
```

![image-20220814141208884](/imgs/oss/blog/image-20220814141208884.png)

移除规则：https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleSheet/deleteRule

```javascript
document.styleSheets[0].deleteRule(0)
```

