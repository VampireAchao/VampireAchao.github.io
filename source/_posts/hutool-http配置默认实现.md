---
title: hutool-http配置默认实现
date: 2023-05-31 21:14:25
tags: java
---

> 谨慎有时伸展太远了，以致堵塞了前进的道路。——佚名

在`hutool`中默认是通过`spi`扫描获取默认实现客户端

如果我们需要手动指定，只需要配置

```java
Singleton.put(ClientEngine.class.getName(), new JdkClientEngine());
```

即可

