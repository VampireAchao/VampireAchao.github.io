---
title: js当前函数获取调用它的函数
date: 2020-11-13 21:40:01
tags: 前端
---

> 

> 教育本质是一棵树摇动另一棵树，一朵云推动另一朵云，一个灵魂唤醒另一个灵魂。——雅斯贝尔斯

[转载，原文](https://www.cnblogs.com/tony-stark/p/13083407.html)

当我们在调试的时候，想获取这个函数被哪个函数调用，以方便调试，但是 caller属性被严格模式下被禁用了

我们可以通过 (new Error()).stack.split("\n")[2].trim().split(" ")[1]方法来获取调用当前函数的那个函数名

解释：new Error().stack 表示程序出错位置的栈，[0]表示当前函数，[1]表示上一级函数调用的函数 [2]上上级....

例子：

```
 function bb(){cc()}
  function cc(){console.log((new Error()).stack.split("\n")[2].trim().split(" ")[1])}
  bb() //打印出bb
```

