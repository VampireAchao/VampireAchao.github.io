---
title: druid监控配置
date: 2022-01-14 18:57:31
tags: java
---

> 你的道路是什么，老兄？乖孩子的路，疯子的路，五彩的路，浪荡子的路，任何的路。到底在什么地方，给什么人，怎么走呢？——杰克·凯鲁亚克《在路上》

项目地址：https://github.com/alibaba/druid/wiki

这和`fastjson`一样也是温绍写的

首先引入`gav`

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid-spring-boot-starter</artifactId>
            <version>${druid-version}</version>
        </dependency>
```

我当前引入的版本是`1.2.8`

![image-20220114110631373](/imgs/oss/picGo/image-20220114110631373.png)

在配置文件中开启统计监控和可视化面板

```properties
# 应用名称
spring.application.name=simple-druid
# 应用服务 WEB 访问端口
server.port=8787
# 数据库驱动：
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# 数据源名称
spring.datasource.name=defaultDataSource
# 数据库连接地址
spring.datasource.url=jdbc:mysql://192.168.0.1:3306/ruben?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true&allowPublicKeyRetrieval=true
# 数据库用户名&密码：
spring.datasource.username=用户名
spring.datasource.password=密码
# druid配置
# Druid内置提供一个StatFilter，用于统计监控信息
spring.datasource.druid.web-stat-filter.enabled=true
# Druid内置提供了一个StatViewServlet用于展示Druid的统计信息
spring.datasource.druid.stat-view-servlet.enabled=true
```

我们配置好了，启动项目，访问：http://localhost:8787/druid/datasource.html

我们可以看到对我们数据库的监控

![image-20220114112814398](/imgs/oss/picGo/image-20220114112814398.png)

包括能看到连接池的信息等

![image-20220114112859140](/imgs/oss/picGo/image-20220114112859140.png)

非常好用

我们访问测试一下

![image-20220114115847748](/imgs/oss/picGo/image-20220114115847748.png)

可以看到连接数确实有监控到

我们也可以限制一下线程数

```properties
# 最大线程数
spring.datasource.druid.max-active=5
# 最大等待时间
spring.datasource.druid.max-wait=5000
```

然后我们再次请求，当超过这个连接数时，如果其他连接没释放，则会抛出异常

![image-20220114135355403](/imgs/oss/picGo/image-20220114135355403.png)