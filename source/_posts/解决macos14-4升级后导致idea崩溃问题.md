---
title: 解决macos14.4升级后导致idea崩溃问题
date: 2024-03-25 14:09:55
tags: 运维
---

> 不为有功之功，故功莫大；不为有名之名，故名莫厚。——佚名

博客：

[Java users on macOS 14 running on Apple silicon systems should consider delaying the macOS 14.4 update](https://blogs.oracle.com/java/post/java-on-macos-14-4)

前两天试的# [macos升级14.4后idea运行java程序崩溃](https://VampireAchao.github.io/2024/03/20/macos%E5%8D%87%E7%BA%A714-4%E5%90%8Eidea%E8%BF%90%E8%A1%8Cjava%E7%A8%8B%E5%BA%8F%E5%B4%A9%E6%BA%83/) 没啥用

今天试试这个：

https://youtrack.jetbrains.com/issue/JBR-6802/Crash-EXCBADINSTRUCTION-from-ObjectMonitorTrySpin-on-macOS-14.4#focus=Change-27-9471539.0-0.pinned

比如我是`m2`芯片的，就下载`aarch64`：

https://cache-redirector.jetbrains.com/intellij-jbr/jbr_jcef-17.0.10-osx-aarch64-b1247.pkg

下载完打开

![](/imgs/oss/blog-img/2024-03-25-14-11-59-image.png)

一路点过去就行
