---
title: sentinel监控不到2级接口?加上@SentinelResource就可以？
date: 2021-03-17 23:30:11
tags: java
---

> 真正的快乐是内在的，它只有在人类的心灵里才能发现。——布雷默

如果出现这种问题啊

可以看你的项目启动日志

发现输出如下一句话

> 2021-03-16 23:24:49.986  INFO 18604 --- [           main] c.a.c.s.SentinelWebAutoConfiguration     : [Sentinel Starter] register SentinelWebInterceptor with urlPatterns: [/*].

看到这句话差不多懂了吧？

`Sentinel`提供的`SentinelWebInterceptor`的`urlPatterns`默认为`/*`

我们跟踪配置文件`com.alibaba.cloud.sentinel.SentinelProperties`

找到这个配置

```yaml
spring:
  cloud: 
    sentinel:
      filter:
        url-patterns: /**
```

我们设置为`/**`后，所有接口都会被监控到啦~

![image-20210316233658762](/imgs/oss/picGo/image-20210316233658762.png)

![happy](/imgs/oss/picGo/happy.gif)