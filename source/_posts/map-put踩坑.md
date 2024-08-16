---
title: map.put踩坑
date: 2023-04-25 22:26:43
tags: java
---

> 辱骂与恐吓绝不是战斗。——鲁迅

今天发现一个坑，原来`HashMap`的`put`方法返回值并不是`put`进去的`value`，而是被覆盖的`value`或`null`

其注释也告诉我们

![image-20230425223559155](/imgs/oss/blog/vampireachao/image-20230425223559155.png)

源码也表示

![image-20230425223648778](/imgs/oss/blog/vampireachao/image-20230425223648778.png)

希望大伙不要跟我一样用错了。。。