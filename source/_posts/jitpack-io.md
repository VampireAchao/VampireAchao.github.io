---
title: jitpack.io
date: 2023-04-06 22:36:43
tags: 软件及插件
---

> 如果你考虑两遍以后再说，那你说得一定比原来好一倍。——佩思

分享一个简单的`Git`依赖包存储库：https://jitpack.io/

例如：https://jitpack.io/#dromara/stream-query

![image-20230406224316482](/imgs/oss/blog/vampireachao/image-20230406224316482.png)

只需要配置`repository`

```xml
<repositories>
    <repository>
        <id>jitpack.io</id>
        <url>https://jitpack.io</url>
    </repository>
</repositories>
```

就可以直接使用下面的依赖，但需要先打一个`Release`：

https://github.com/blog/1547-release-your-software

```xml
<dependency>
    <groupId>com.github.dromara</groupId>
    <artifactId>stream-query</artifactId>
    <version>1.4.4</version>
</dependency>
```

非常地方便