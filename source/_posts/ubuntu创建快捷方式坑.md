---
title: ubuntu创建快捷方式坑
date: 2023-05-19 21:57:29
tags: 小技巧
---

> 通向谬误的道路有千百条，通向真理的道路只有一条。——卢俊

使用命令：

```shell
ln -s /path/to/original /path/to/link
```

这里如果是目录，会导致出现在`/path/to/link`下有`/path/to/original`的快捷方式`original`

![image-20230519224149530](/imgs/oss/blog/vampireachao/image-20230519224149530.png)

因此，如果想让在`/path/to`目录下创建该目录的快捷方式，应该使用：

```shell
ln -s /path/to/original /path/to
```

