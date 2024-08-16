---
title: redux-saga
date: 2022-03-06 10:24:27
tags: 前端
---

> 活着就意味着必须做点什么，请好好努力。——《地下》

我们知道`React`等单页应用在开发时，页面变化依赖于`state`

> 随着 JavaScript 单页应用开发日趋复杂，**JavaScript 需要管理比任何时候都要多的 state（状态）**。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。
>
> 管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。**state 在什么时候，由于什么原因，如何变化已然不受控制。** 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。
>
> 如果这还不够糟糕，考虑一些**来自前端开发领域的新需求**，如更新调优、服务端渲染、路由跳转前请求数据等等。前端开发者正在经受前所未有的复杂性，[难道就这么放弃了吗？](http://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html)当然不是。
>
> 这里的复杂性很大程度上来自于：**我们总是将两个难以理清的概念混淆在一起：变化和异步**。 我称它们为[曼妥思和可乐](https://en.wikipedia.org/wiki/Diet_Coke_and_Mentos_eruption)。如果把二者分开，能做的很好，但混到一起，就变得一团糟。一些库如 [React](http://facebook.github.io/react) 试图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux 就是为了帮你解决这个问题。

因此我们首先得学习`Redux`，中文官网地址：http://cn.redux.js.org/

此时我们可以很好的在大型项目中管理我们的`state`了，但如果我们要异步获取数据、访问浏览器缓存等操作，就需要用到`Redux-Saga`

官网地址(英文)：https://redux-saga.js.org/

中文文档地址：https://redux-saga-in-chinese.js.org/

我简单进行入门了一下，编写了一个`redux-saga`的`getting start demo`

https://gitee.com/VampireAchao/simple-redux-saga.git

注释都写得比较完善

![image-20220306104843758](/imgs/oss/picGo/image-20220306104843758.png)

运行方式：

Setup

```shell
cnpm install
```

Run the demo

```shell
npm start
```