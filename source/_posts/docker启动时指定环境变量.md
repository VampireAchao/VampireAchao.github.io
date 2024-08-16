---
title: docker启动时指定环境变量
date: 2020-09-30 20:43:23
tags: 运维
---

> 青春是惟一值得拥有的东西。——王尔德

`docker`启动时指定环境变量可以使用`--env`参数

```shell
docker run --env LANG=C.UTF-8 -it --name  qhd-beta63 -p 8080:8080 -d [imageId] /bin/bash
```

这里`--env LANG=C.UTF-8`指定编码格式

