---
title: python部分依赖踩坑
date: 2022-04-27 12:48:37
tags: python
---

> 今天所做之事勿候明天，自己所做之事勿候他人。——歌德

今天运行脚本时警告：

```shell
DependencyWarning: SOCKS support in urllib3 requires the installation of optional dependencies: specifically, PySocks.

For more information, see https://urllib3.readthedocs.io/en/latest/contrib.html#socks-proxies
```

我的`python`版本为`2.7.17`

于是安装对应的模块

```shell
pip install win-inet-pton
```

发现还有一个警告：

```shell
CryptographyDeprecationWarningPython 2 is no longer supported by the Python core team
```

于是我先卸载

```shell
pip uninstall cryptography
```

然后安装适配的版本

```shell
pip install cryptography==2.6
```

再次运行即可