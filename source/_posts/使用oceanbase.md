---
title: 使用oceanbase
date: 2024-04-03 13:55:36
tags: java
---

> 不息的劳作，是人生的胜利，也是艺术的法则。——巴尔扎克

介绍：

> **OceanBase Database** 是一个分布式关系型数据库。完全由蚂蚁集团自主研发。 OceanBase 基于 [Paxos](https://lamport.azurewebsites.net/pubs/lamport-paxos.pdf) 协议以及分布式架构，实现了高可用和线性扩展。OceanBase 数据库运行在常见的服务器集群上，不依赖特殊的硬件架构。

https://github.com/oceanbase/oceanbase/blob/develop/README_CN.md

运行

```bash
Github-Id-VampireAchao:wine achao$ # 部署一个mini模式实例
Github-Id-VampireAchao:wine achao$ docker run -p 2881:2881 --name oceanbase-ce -e MODE=mini -d oceanbase/oceanbase-ce
Unable to find image 'oceanbase/oceanbase-ce:latest' locally
latest: Pulling from oceanbase/oceanbase-ce
latest: Pulling from oceanbase/oceanbase-ce
bcb402bc9e64: Pull complete 
a175defe828e: Pull complete 
4f4fb700ef54: Pull complete 
508aec11127e: Pull complete 
1e8c88e512f4: Pull complete 
78950c47c2d8: Pull complete 
Digest: sha256:e0451ccf8b602d90119cfc85e3084a7978f46e202da8fe957a58d1f46a61de1a
Status: Downloaded newer image for oceanbase/oceanbase-ce:latest
597e46b45d39fdda6b935ea2bff807cadae2cdbc8dc62ed40b9ad10c6cd4ee93
```

可以看到和`mysql`驱动、语法是完全兼容的，只需要修改连接信息即可使用，非常方便

![](/imgs/oss/blog-img/2024-04-03-14-51-23-image.png)
