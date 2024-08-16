---
title: springbootのmybatis-plus日志打印
date: 2020-11-11 20:31:12
tags: java
---

> 

只需要在`yml`中配置

![image-20201111203228109](/imgs/oss/picGo/image-20201111203228109.png)

```yaml
spring:
  cloud:
    alicloud:
      access-key:
      secret-key:
      oss:
        endpoint:
        bucket:
  redis:
    host: localhost
    port: 6379
  datasource:
    url: jdbc:sqlite:data.db
    driver-class-name: org.sqlite.JDBC
# mybatis的配置
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```
配置完成后重启即可

![image-20201111203311525](/imgs/oss/picGo/image-20201111203311525.png)