---
title: idea下载不下来maven三方库源码处理
date: 2023-10-31 08:55:14
tags: 小技巧
---

> 没有信仰，则没有名副其实的品行和生命；没有信仰，则没有名副其实的国土。——惠特曼

只需要执行：

```shell
mvn dependency:resolve -Dclassifier=sources
```

即可下载源码

![](/imgs/oss/blog-img/2023-10-31-08-59-05-image.png)
