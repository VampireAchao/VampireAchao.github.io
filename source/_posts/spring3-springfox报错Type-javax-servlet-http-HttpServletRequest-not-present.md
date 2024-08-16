---
title: spring3 springfox报错Type javax.servlet.http.HttpServletRequest not present
date: 2023-10-20 08:51:02
tags: java
---

> 相信一切，失望有日；怀疑一切，收获天明。——乔·赫伯特

就像这个issue里描述的一样：

https://github.com/springfox/springfox/issues/4061

在`springboot3.0`引入：

```xml
            <dependency>
                <groupId>io.springfox</groupId>
                <artifactId>springfox-boot-starter</artifactId>
                <version>3.0.0</version>
            </dependency>
```

引入完毕后发现启动报错。。。于是查询了下

![](/imgs/oss/blog-img/2023-10-20-08-54-45-image.png)

最后一次更新是三年前。。。

https://central.sonatype.com/artifact/io.springfox/springfox-boot-starter/versions

![](/imgs/oss/blog-img/2023-10-20-08-56-54-image.png)

相对的`springboot3`是去年出的

https://central.sonatype.com/artifact/org.springframework.boot/spring-boot/versions

![](/imgs/oss/blog-img/2023-10-20-08-58-10-image.png)

那咱们应该怎么集成`swagger`呢？用：

https://springdoc.org/

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.2.0</version>
</dependency>
```

![](/imgs/oss/blog-img/2023-10-20-09-01-51-image.png)
