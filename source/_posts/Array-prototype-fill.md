---
title: Array.prototype.fill()
date: 2022-03-09 18:34:55
tags: 前端
---

> 新的方法和概念，常常比解决问题本身更重要。——华罗庚

我们在前端开发中，可以使用[`fill`函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)来快速构建数组

```javascript
Array(5).fill(1,1,4)
```

得到的是这样一个数组：

```javascript
[, 1, 1, 1, ]
```

这里参数`fill(value,start,end)`也是可以省略的

```javascript
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
// 需要注意如果fill的参数为引用类型，会导致都执行同一个引用类型
// 如 arr[0] === arr[1] 为true
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

