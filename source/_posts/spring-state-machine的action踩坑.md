---
title: spring-state-machine的action踩坑
date: 2023-12-09 19:01:50
tags: java
---

> 善则称人，过则称己，则民不争。——佚名

今天在状态机的`action`里进行事件触发，发现并没有触发

这是因为在`action`触发后，`state`才会进行更改，而不是在`state`触发后。。。

例如此处我们在`action`的`execute`打断点：

![](/imgs/oss/blog-img/2023-12-09-19-10-06-image.png)

可以看到还没有更改状态

如果需要在`state`触发以后紧接着触发`event`，则可以放到拦截器里[spring-state-machine拦截器](https://VampireAchao.github.io/2023/11/27/spring-state-machine%E6%8B%A6%E6%88%AA%E5%99%A8/)处理
