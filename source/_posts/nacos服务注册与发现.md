---
title: nacos服务注册与发现
date: 2021-03-08 22:14:15
tags: java
---

> 人生就象弈棋， 一步失误， 全盘皆输，这是令人悲哀之事；而且人生还不如弈棋，不可能再来一局，也不能悔棋。—— 弗洛伊德

[下载](https://github.com/alibaba/nacos/releases/tag/1.4.1)

![image-20210303220929574](/imgs/oss/picGo/image-20210303220929574.png)

找到`zip`下载解压即可

进入`bin`目录

```shell
# 单机启动
startup.cmd -m standalone
```

![image-20210303221053991](/imgs/oss/picGo/image-20210303221053991.png)

然后我们可以引入`java`的`SDK`

使用`maven`的`GAV`

```xml
	<dependencies>
		<!--    alibaba cloud    -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.5.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
        <!--    nacos    -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
	</dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-alibaba-dependencies</artifactId>
                <version>2.2.0.RELEASE</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

然后是`bootstrap.yml`

```yml
spring:
  cloud:
    nacos:
      config:
        server-addr: 127.0.0.1:8848
  application:
    name: ruben-provider
```

启动项目可以看到日志输出

![image-20210303222515963](/imgs/oss/picGo/image-20210303222515963.png)

然后访问[`nacos`控制台](http://127.0.0.1:8848/nacos/index.html#/login)

![image-20210303222855121](/imgs/oss/picGo/image-20210303222855121.png)

输入默认用户名`nacos`密码`nacos`

也能看到我们的`nacos`单机节点正常运行

![image-20210303223003484](/imgs/oss/picGo/image-20210303223003484.png)

在主启动类中配置`@EnableDiscoveryClient`

```java
package com.ruben;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableDiscoveryClient
@SpringBootApplication
@MapperScan({"com.ruben.dao.xml"})
public class SimpleSpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(SimpleSpringbootApplication.class, args);
    }

}
```

启动后可以看到服务已经注册成功

![image-20210304212612855](/imgs/oss/picGo/image-20210304212612855.png)

