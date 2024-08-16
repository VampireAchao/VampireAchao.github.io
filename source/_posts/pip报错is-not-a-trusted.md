---
title: pip报错is not a trusted
date: 2022-03-14 19:00:57
tags: python
---

> 总之岁月漫长，然而值得等待。——《如果我们的语言是威士忌》

这个问题出于使用了别的镜像源去安装依赖

只需要在后面加`--trusted-host`即可

```shell
pip install -i http://mirrors.aliyun.com/pypi/simple/ psd-tools --trusted-host mirrors.aliyun.com
```

