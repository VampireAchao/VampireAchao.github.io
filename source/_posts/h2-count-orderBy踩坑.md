---
title: h2 count+orderBy踩坑
date: 2022-10-11 12:49:48
tags: 数据库
---

> 过度的爱情追求，必定会降低人本身的价值——培根

`mysql`里两个都可执行

![image-20221011125113492](/imgs/oss/picGo/image-20221011125113492.png)

`h2`执行第二条会报错

![image-20221011125203722](/imgs/oss/picGo/image-20221011125203722.png)

因此不要在`h2`写`count`时使用`orderBy`