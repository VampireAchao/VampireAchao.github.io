---
title: js window.open
date: 2021-09-12 23:19:29
tags: 前端
---

> 懒惰——它是一种对待劳动态度的特殊作风。它以难以卷入工作而易于离开工作为其特点。 —— 杰普莉茨卡娅

有时我们需要在`js`中触发打开新标签页、或者是在当前页面跳转以及在`iframe`中替换父页面

使用`window.open`即可，关于它的参数，为以下四个：

1. `URL`：需要打开的页面`URL`

   ```javascript
   window.open("https://VampireAchao.github.io/")
   ```

2. `name`：打开页面的方式或名称

   ```javascript
   // 新窗口打开，默认
   window.open("https://VampireAchao.github.io/","_blank")
   // 父窗口打开，ifame中使用
   window.open("https://VampireAchao.github.io/","_parent")
   // 当前窗口中打开
   window.open("https://VampireAchao.github.io/","_self")
   // 顶层窗口打开，iframe中使用
   window.open("https://VampireAchao.github.io/","_top")
   ```

3. `specs`：属性，不同属性用逗号隔开，`key`和`value`之间用等号

   ```javascript
   // 设置宽高
   window.open("https://VampireAchao.github.io/","_blank","width=400,height=750");
   ```

4. `replace`：是否替换历史记录

更多详情可以看：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
