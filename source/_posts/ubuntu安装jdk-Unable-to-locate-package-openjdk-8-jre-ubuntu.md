---
title: ubuntu安装jdk Unable to locate package openjdk-8-jre ubuntu
date: 2022-09-05 09:33:21
tags: 运维
---

> 年轻人在科学的进程中要有冲刺力，当你老了，就会越来越胆小——杨振宁

需要首先执行：

```shell
apt-get update
```

然后再次安装：

```shell
apt-get install openjdk-8-jre-headless
```

弹出的提示按`Y`

即可成功安装