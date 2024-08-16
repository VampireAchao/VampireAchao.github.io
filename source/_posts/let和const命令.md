---
title: let和const命令
date: 2020-12-06 11:10:40
tags: 前端
---

> 一个人在学校里表面上的成绩，以及较高的名次，都是靠不住的，唯一的要点是你对于你所学的是否心里真正觉得很喜欢，是否真有浓厚的兴趣……——邹韬奋

`es6`出来这么久了，是时候系统学习一下了

> ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在 2015 年 6 月正式发布了。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。——[ECMAScript 6.0入门网站](https://es6.ruanyifeng.com/#docs/intro)

```javascript
    <!--  es6学习笔记  -->
    // let必须先声明再使用
    // console.log(a)      // Uncaught ReferenceError: Cannot access 'a' before initialization
    let a = "a";
    console.log(a);     // a
    // var可以先使用再声明
    b = "ib"
    console.log(b);     // ib
    var b = "b";

    // 作用域 let只在当前代码块有效 var 则在代码块外面也有效
    {
        let c = "c";
        var d = "d";
    }
    // console.log(c);     // Uncaught ReferenceError: c is not defined
    console.log(d);         // d

    // let定义的变量只能声明一次
    // let a = "a";            // Uncaught SyntaxError: Identifier 'a' has already been declared
    // var定义的变量可以被重复声明
    var b = "b";

    // const 类比于java的常量，声明后无法修改
    const time = 1000;
    // time = 3000;            // Uncaught TypeError: Assignment to constant variable.
    // 并且声明后必须初始化
    // const money;                // Uncaught SyntaxError: Missing initializer in const declaration

    {
        // 如果已经使用const声明过的变量(之后可能会简称“常量”) 在代码块中重复声明，则不能在代码块中声明之前使用
        // 官方学名：存在暂时性死区，只能在声明的位置后面使用
        console.log(time);
        // const time = 3000;          // Uncaught ReferenceError: Cannot access 'time' before initialization
    }
```

