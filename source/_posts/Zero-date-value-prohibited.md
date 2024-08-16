---
title: Zero date value prohibited
date: 2021-01-12 19:36:20
tags: java
---

> 世界上最大的谎言就是你不行。——《垫底辣妹》

报`Zero date value prohibited`错的时候

在连接`mysql`的`URL`上加入`&zeroDateTimeBehavior=convertToNull`即可

原因是因为我们存入数据库中的`date`类型字段有为`0`的数据

加了此参数，即可让`mysql`处理的时候，把为`0`的日期当作`null`处理