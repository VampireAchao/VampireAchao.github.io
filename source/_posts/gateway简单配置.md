---
title: gateway简单配置
date: 2021-03-12 19:45:19
tags: java
---

> 生命不等于是呼吸，生命是活动。——卢梭

`GAV`

```xml
        <!--    gateway 网关    -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
            <version>2.2.0.RELEASE</version>
        </dependency>
```

记得要注释掉我们之前引入的`web`

```xml
<!--        <dependency>-->
<!--            <groupId>org.springframework.boot</groupId>-->
<!--            <artifactId>spring-boot-starter-web</artifactId>-->
<!--        </dependency>-->
```

配置断言

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
        namespace: ruben-dev
        file-extension: yml
    gateway:
      routes:
        - id: query_route
          uri: https://www.baidu.com
          predicates:
            - Query=url,baidu
        - id: qq_route
          uri: https://www.qq.com
          predicates:
            - Query=url,qq
  application:
    name: ruben-gateway
server:
  port: 8083
```

然后访问`http://localhost:8083/?url=qq`就会跳转到`https://www.qq.com`

访问`http://localhost:8083/?url=baidu`就会跳转到`https://www.baidu.com`

