---
title: quartz指定时间点触发
date: 2021-02-28 23:17:49
tags: java
---

> 国家用人，当以德为本，才艺为末。——康熙

之前写过一篇[`Quartz`的博客](https://VampireAchao.github.io/2021/01/24/quartz/)

今天做一点补充

如果我们需要指定时间点触发任务，则可以使用

```java
        // 指定时间点触发
        Date executeDate = new Date(System.currentTimeMillis() + 5000);
        TriggerBuilder.newTrigger().startAt(executeDate).withIdentity("achao", "ruben").build();
```

这样去构建

这样，我们的任务就会在指定的时间点触发
