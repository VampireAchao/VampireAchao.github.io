---
title: js获取当前浏览器是否采用深色主题
date: 2023-06-05 20:42:49
tags: 前端
---

> 荣誉在于劳动的双手。——达芬奇

代码如下：

```javascript
window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

![image-20230605204851173](/imgs/oss/blog/vampireachao/image-20230605204851173.png)

对应的mdn：

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia