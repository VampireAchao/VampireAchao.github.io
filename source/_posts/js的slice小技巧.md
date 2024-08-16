---
title: js的slice小技巧
date: 2023-08-26 13:48:15
tags: 前端
---

> 寻求报复的人使创痕常新，如果不是这样，那么创痕早就痊愈了。——培根

非常简单，在没有浅拷贝直接赋值时，效果是这样：

```javascript
let arr = [1,2,3]
let arrCopy = arr
arrCopy[1] = 4
console.log({arr, arrCopy})
// 输出
// {arr: Array(3), arrCopy: Array(3)}
//  > arr: (3) [1, 4, 3]
//  > arrCopy: (3) [1, 4, 3]
//  > [[Prototype]]: Object
```

但如果我们使用`slice`且不传入参数，则是进行浅拷贝

```javascript
let arr = [1,2,3]
let arrCopy = arr.slice()
arrCopy[1] = 4
console.log({arr, arrCopy})
// 输出
// {arr: Array(3), arrCopy: Array(3)}
//  > arr: (3) [1, 2, 3]
//  > arrCopy: (3) [1, 4, 3]
//  > [[Prototype]]: Object
```
