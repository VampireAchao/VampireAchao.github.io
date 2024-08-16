---
title: js函数去重
date: 2020-08-23 22:38:46
tags: 前端
---

记一个去重函数

```javascript
        var array = ["ruben", "ruben", "快乐", "阿超", "快乐"]
        console.log(array)
        array = Array.from(new Set(array))
        console.log(array)
```

输出结果

![image-20200826223142428](/imgs/oss/picGo/image-20200826223142428.png)

