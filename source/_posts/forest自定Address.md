---
title: forest自定Address
date: 2023-07-18 21:07:17
tags: java
---

> 你若伤过一个人的心，给他一百样好处，也别以为自己不会吃亏。因为羽箭虽然已经从伤口拔出，疼痛依旧留在心上。——萨迪

咱们按照文档里配置：

[🚚 请求地址 | Forest](https://forest.dtflyx.com/pages/1.5.30/http_url/#%E5%8A%A8%E6%80%81%E6%A0%B9%E5%9C%B0%E5%9D%80)

![](/imgs/oss/picGo/20230718210756.png)

然后使用

```java
// 也是通过 @Address 注解来绑定动态地址来源
// 每次调用该方法，都可能是不同的根地址
@Post("/data")
@Address(source = MyAddressSource.class)
ForestRequest<String> sendData();
```

非常的方便
