---
title: 小程序 define is not defined
date: 2022-01-26 19:41:23
tags: bug
---

> 你如果认识从前的我，也许你会原谅现在的我。——《倾城之恋》

今天小程序报错`define is not defined`

![image-20220126194520707](/imgs/oss/picGo/image-20220126194520707.png)

结果是因为新项目默认用的最新的基础调试库。。。

改回调试库就好了

![image-20220126194642969](/imgs/oss/picGo/image-20220126194642969.png)

