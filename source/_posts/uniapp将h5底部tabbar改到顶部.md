---
title: uniapp将h5底部tabbar改到顶部
date: 2024-06-28 20:37:47
tags: 前端
---

> 家贫僮仆慢，官罢友朋疏远。——佚名

样式：

```css
.uni-tabbar{
 top: 0;
 height: 50px;
}
.uni-app--showtabbar {
 padding-top: 50px;
}
```

当然大家也有大家的方式，不能说谁的好谁的坏

我这个的主要特点是能够适配没有tabbar的子页面
