---
title: uni-app-x
date: 2024-01-20 15:39:13
tags: 前端
---

> 做一个世界的水手，游遍每一个港口。——惠特曼

分享一个跨端框架`uni-app-x`

[uni-app x 是什么？ | uni-app-x](https://doc.dcloud.net.cn/uni-app-x/)

uni-app x，是下一代 uni-app，是一个跨平台应用开发引擎。

uni-app x 没有使用js和webview，它基于 uts 语言。在App端，uts在iOS编译为swift、在Android编译为kotlin，完全达到了原生应用的功能、性能。

可以下载打包后的[hello uni-app x](https://web-assets.dcloud.net.cn/unidoc/zh/uni-app-x/hello-uniappx.apk)的apk来体验。（通过显示界面元素边界可知界面都是原生UI，解包后也不会看到js引擎，里面的html文件是示例中演示web-view组件所用）

这是`demo`源码：[DCloud / hello uni-app x · GitCode](https://gitcode.net/dcloud/hello-uni-app-x)

开发者在 uni-app x 中，不能编写js，因为 uni-app x 中不自带js引擎。需使用uts，实现跨端的同时保证最佳性能。

uts 全称 uni type script，是一门跨平台的、高性能的、强类型的现代编程语言。它在不同平台，会被编译为不同平台的native语言，如：

> - web/小程序平台，编译为JavaScript
> - Android平台，编译为Kotlin
> - iOS平台，编译Swift

uts和ts很相似，但为了跨端，uts进行了一些约束和特定平台的增补。详见 [uts语言介绍](https://doc.dcloud.net.cn/uni-app-x/uts/)

该语言在2022年9月推出，起初用于原生插件扩展开发。
