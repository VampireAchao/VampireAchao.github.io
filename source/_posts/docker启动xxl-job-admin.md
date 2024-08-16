---
title: docker启动xxl-job-admin
date: 2023-11-24 08:44:52
tags: 运维
---

> 行路多者见识多。——托·富勒

`xxl-job`官网：

[分布式任务调度平台XXL-JOB](https://www.xuxueli.com/xxl-job/)

这里首先如果直接按照文档里写的

```bash
docker pull xuxueli/xxl-job-admin
```

很容易拉取失败

我们找到最新版

https://hub.docker.com/r/xuxueli/xxl-job-admin/tags

然后带参数执行：

```bash
docker run \
  -e PARAMS="--spring.datasource.url=jdbc:mysql://localhost:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai --spring.datasource.username=root --spring.datasource.password=root" \
  -p 18080:8080 \
  --name xxl-job-admin \
  -d xuxueli/xxl-job-admin:2.4.0
```

打开

http://localhost:18080/xxl-job-admin/

默认账号`admin`密码`123456`
