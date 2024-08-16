---
title: '@JsonIgnore'
date: 2020-12-24 19:59:27
tags: java
---

> 沙漠之所以美丽，是因为在某个不知道的地方藏有一口井。——《小王子》

在项目开发中，有时会遇到一些字段并不需要或者不能返回给前端的时候(例如密码等)

则可以在对应的属性上加`com.fasterxml.jackson.annotation.JsonIgnore`注解

![image-20201224200134261](/imgs/oss/picGo/image-20201224200134261.png)

这样的话，在返回的时候就不会被序列化了

不过注意，如果加了`@JsonIgnore`注解，在接收参数时同样不会被序列化

![image-20201224200356994](/imgs/oss/picGo/image-20201224200356994.png)

