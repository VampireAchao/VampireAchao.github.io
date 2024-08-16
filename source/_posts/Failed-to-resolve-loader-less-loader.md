---
title: 'Failed to resolve loader: less-loader'
date: 2021-08-21 21:43:36
tags: 前端
---

> 但愿苍生俱饱暖，不辞辛苦出山林。一一于谦

本来我今天遇到这个问题了

```shell
Failed to resolve loader: less-loader You may need to install it
```

我一看：你可能需要安装一下`less-loader`，我直接输入命令安装

```shell
cnpm i less-loader
```

执行完毕，再次运行发现报错信息变了：

```shell
TypeError: this.getOptions is not a function
```

原来是版本太高了，于是卸载

```shell
cnpm uni less-loader
```

然后安装低版本的

```shell
cnpm i less-loader@6.0.0
```

再次启动就好了
