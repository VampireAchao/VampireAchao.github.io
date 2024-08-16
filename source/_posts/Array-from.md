---
title: Array.from
date: 2022-03-11 18:45:35
tags: 前端
---

> 世界在音乐中得到了完整的再现和表达。它是各种艺术当中第一位的，帝王式的艺术，能够成为音乐那样，则是一切艺术的目的。——叔本华

继续还是`js`中`Array`的方法

这次说的方法是`from`：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from

这个方法简单应用如下：

```javascript
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```

我这里写个稍微复杂点的例子，随机生成文件名并排序

```javascript
[...new Set(Array.from(Array(200).fill('文件'),x=>x+String(parseInt(Math.random()*200)).padStart(3,"0")))].sort()
```

生成结果：

![image-20220311185618142](/imgs/oss/picGo/image-20220311185618142.png)