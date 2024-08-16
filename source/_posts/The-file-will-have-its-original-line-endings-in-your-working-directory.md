---
title: The file will have its original line endings in your working directory
date: 2023-03-16 21:07:41
tags: 软件及插件
---

> 气忌盛，心忌满，才忌露。——吕坤

我每次部署博客的时候都会有很多的

```shell
The file will have its original line endings in your working directory
```

被输出

![image-20230316210839188](/imgs/oss/blog/vampireachao/image-20230316210839188.png)

如何去掉？

执行：

```shell
git config --global core.autocrlf false
```

