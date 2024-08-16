---
title: Service注入失败，报空指针
date: 2020-06-29 00:03:11
tags: bug
---

今天突然遇到一个bug，找了2小时。。。

是service注入后，在controller调用时，报service空指针

最后找了两小时发现，controller的方法是private而不是public。。。

改成public解决了