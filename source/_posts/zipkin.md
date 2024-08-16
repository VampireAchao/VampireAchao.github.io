---
title: zipkin
date: 2021-03-20 19:16:53
tags: java
---

> 懒惰——它是一种对待劳动态度的特殊作风。它以难以卷入工作而易于离开工作为其特点。 —— 杰普莉茨卡娅

引入依赖

```xml
        <!-- zipkin+sleuth 链路追踪+可视化 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zipkin</artifactId>
            <version>2.2.0.RELEASE</version>
        </dependency>
```

注意要把`spring-boot-starter-data-redis`指定为`jedis`

```xml
        <!-- https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>io.lettuce</groupId>
                    <artifactId>lettuce-core</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <dependency>
            <groupId>redis.clients</groupId>
            <artifactId>jedis</artifactId>
        </dependency>
```

输入命令安装`zipkin`服务器

```shell
docker run -d -p 9411:9411 openzipkin/zipkin
```

![image-20210318215029264](/imgs/oss/picGo/image-20210318215029264.png)

我们查看自己的`ip`

发现未找到命令

```shell
yum -y install net-tools
```

安装好网络工具后看到了`ip`

然后在配置文件中配置

```yaml
spring: 
  zipkin:
    base-url: http://192.168.1.9:9411/
    discovery-client-enabled: false
    sender:
      type: web
  sleuth:
    sampler:
      probability: 1
```

然后启动，访问`http://192.168.1.9:9411/`即可看到我们的服务链路

![image-20210318222210335](/imgs/oss/picGo/image-20210318222210335.png)