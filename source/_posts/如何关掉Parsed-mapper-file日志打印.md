---
title: 如何关掉Parsed mapper file日志打印
date: 2022-12-13 18:55:37
tags: java
---

> 时间一直走，没有尽头，只有路口。——《摆渡人》

先说结论：

1. 将`yml`配置里的`mybatis-plus`配置

   ```yaml
   log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
   ```

   改为

   ```yaml
   log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
   ```

2. 在`yml`配置里新增一条

   ```yaml
   logging:
     level:
       root: DEBUG
       com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean: INFO
   ```

完整配置放在最后结尾处

**为什么这样配？你是如何找到的？**

首先我们搜索`Parsed mapper file`(因为这个日志大概率是硬编码存在于源码之中的，除非是做了日志本地化，会在配置文件里)

![image-20221213185712198](/imgs/oss/picGo/image-20221213185712198.png)

这里排除掉一个纯依赖模块，一个注解模块，挨个到`com`包搜索，在最后一个`extension`模块搜到了

![image-20221213190035505](/imgs/oss/picGo/image-20221213190035505.png)

那我们将这个类的日志级别设为`INFO`应该就搞定了，但是没有生效

![image-20221213191316292](/imgs/oss/picGo/image-20221213191316292.png)

我们打个断点，看看什么情况，等断点停到日志这里，我们按下`F7`

![image-20221213191458202](/imgs/oss/picGo/image-20221213191458202.png)

点这个亮着的`debug`

![image-20221213191558580](/imgs/oss/picGo/image-20221213191558580.png)

可以看到这里逻辑：

如果是`debug`等级，就进行日志打印

![image-20221213191657146](/imgs/oss/picGo/image-20221213191657146.png)

我们继续按下`F7`深入，发现问题了。。此处使用的`StdOutImpl`是没有进行日志等级管理的

![image-20221213191727576](/imgs/oss/picGo/image-20221213191727576.png)

那找到问题了，我们可以换一个日志框架打印

将原来的

```yaml
log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

改为

```yaml
log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
```

这样我们上面配置的

```yaml
com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean: INFO
```

即刻生效

最终测试效果如下：

![image-20221213192206464](/imgs/oss/picGo/image-20221213192206464.png)

完整配置如下：

```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    schema: classpath:schema.sql
    data: classpath:data.sql
    url: jdbc:h2:mem:test

logging:
  level:
    root: DEBUG
    com.baomidou.mybatisplus.extension.spring.MybatisSqlSessionFactoryBean: INFO
mybatis-plus:
  mapper-locations:
    - classpath:mapper/*.xml
  configuration:
    log-impl: org.apache.ibatis.logging.slf4j.Slf4jImpl
```

示例代码仓库地址(可以的话点个`star`)：https://gitee.com/VampireAchao/stream-query.git

