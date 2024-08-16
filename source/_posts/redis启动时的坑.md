---
title: redis启动时的坑
date: 2020-06-27 21:38:48
tags: redis
---

今天发现redis怎么修改配置文件也不生效，翻来覆去搞了好久。。。

最后发现，启动命令时候忘记指定配置文件了

正确的应该是

```shell
redis-server.exe redis.windows-service.conf
```

我写掉了后面的配置文件。。。