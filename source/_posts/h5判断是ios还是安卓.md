---
title: h5判断是ios还是安卓
date: 2024-07-01 23:03:51
tags: 前端
---

> 理想主义者是不可救药的：如果他被扔出了他的天堂，他会再制造出一个理想的地狱。——尼采

主要就是这个代码

```javascript
var u = navigator.userAgent;
window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
```

这边用用户的`agent`和正则判断
