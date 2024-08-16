---
title: h2-console
date: 2023-04-02 15:06:40
tags: java
---

> 名枪好躲，暗箭难防。——无名氏

分享一个`h2-console`的使用方式：

首先配置：

```yaml
spring:
  h2:
    console:
      enabled: true
```

然后可以看到日志：

![image-20230402151521017](/imgs/oss/blog/vampireachao/image-20230402151521017.png)

我们访问`localhost:8080/h2-console`，复制`jdbc:h2:mem:2e01066c-fbfb-40a5-8ba9-3ff049d753f8`到`connection url`

![image-20230402151616478](/imgs/oss/blog/vampireachao/image-20230402151616478.png)

进到控制台，并成功连接

这里可以看到我们的库表信息以及进行查询

![image-20230402151718907](/imgs/oss/blog/vampireachao/image-20230402151718907.png)

非常的好用