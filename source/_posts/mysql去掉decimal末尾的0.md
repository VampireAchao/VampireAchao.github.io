---
title: mysql去掉decimal末尾的0
date: 2023-02-28 21:30:51
tags: 数据库
---

> 我思故我在——笛卡尔

我们可以使用`0+CAST(字段 AS CHAR)`来去除`decimal`末尾的`0`

![image-20230228213900205](/imgs/oss/blog/vampireachao/image-20230228213900205.png)

如果已经是`CHAR`类型，那就直接使用`0+字段`即可

![image-20230228213929809](/imgs/oss/blog/vampireachao/image-20230228213929809.png)