---
title: sessionStorage
date: 2021-09-23 19:36:28
tags: 前端
---

> 勤奋是一种可以吸引一切美好事物的天然磁石。 ——罗•伯顿

前端除了[`localStorage`](https://VampireAchao.github.io/2021/04/05/localStorage/)还有`sessionStorage`

`localStorage`即便关闭了浏览器，再次打开该页面仍然存在

但`sessionStorage`的作用于仅仅局限于当前标签页或通过当前标签页中的点击事件打开的新页面

`localStorage`一般用于用户`token`储存、主题设置等需要稍微长期持久化的场景

`sessionStorage`一般用于刷新页面记住分页页码、记住检索条件等关闭标签页即销毁的场景

`sessionStorage`的`api`和`localStorage`的`api`非常相似：

```javascript
// 存
sessionStorage.setItem("ruben","ruben")
```

取出来：

```javascript
// 取
sessionStorage.getItem("ruben")
```

![image-20210923194811796](/imgs/oss/picGo/image-20210923194811796.png)
