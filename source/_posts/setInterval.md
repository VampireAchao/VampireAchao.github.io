---
title: setInterval
date: 2020-11-28 17:21:43
tags: 前端
---

> 坍圮的殿堂总还是庙，冷落的圣像依然是神。

在前端开发中我们或许想定时做一些操作

可以使用一个`setInterval`函数去做

![image-20201129173039686](/imgs/oss/picGo/image-20201129173039686.png)

```javascript
    // 定时控制台打印ruben
    setInterval(function () {
        console.log("ruben");
    }, 1000);
    // 定时控制台打印achao，注意这里是使用字符串形式写法
    setInterval('console.log("achao");', 1000);
```

可以打开控制台看到效果

![image-20201129173126907](/imgs/oss/picGo/image-20201129173126907.png)