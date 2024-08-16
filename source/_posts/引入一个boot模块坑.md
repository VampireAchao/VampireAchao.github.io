---
title: 引入一个boot模块坑
date: 2022-05-15 10:31:27
tags: java
---

> “所有你乐于挥霍的时间都不能算作是浪费。”——约翰·列侬

这个坑蛮棘手的

事发场景：`main-boot`引入`common-boot`模块，`common-boot`模块是一个`spring-boot`模块

![image-20220515110336277](/imgs/oss/picGo/image-20220515110336277.png)

关键`GAV`构成如下：

`common-boot`

```xml
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.6.7</version>
        <relativePath/>
    </parent>

    <groupId>com.ruben</groupId>
    <artifactId>common-boot</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

其中`common-boot`我们编写一个`IService`

```java
package com.ruben.service;

/**
 * 接口
 *
 * @author VampireAchao
 * @since 2022/5/15 10:23
 */
public interface IService {
}
```

然后拿到`main-boot`中引用

`main-boot`的`pom.xml`

```xml
<dependencies>
    <dependency>
        <groupId>com.ruben</groupId>
        <artifactId>common-boot</artifactId>
        <version>0.0.1-SNAPSHOT</version>
    </dependency>
</dependencies>
```

写个实现类继承

```java
package com.ruben.service.impl;

import com.ruben.service.IService;

/**
 * 服务实现类
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/5/15 10:24
 */
public class ServiceImpl implements IService {
}
```

![image-20220515110548896](/imgs/oss/picGo/image-20220515110548896.png)

然后我们首先`mvn install`一下`common-boot`

我们尝试在`main-boot`进行`mvn compile`却发现编译报错

![image-20220515111036418](/imgs/oss/picGo/image-20220515111036418.png)

说是找不到符号

此时我们其实可以根据`common-boot`的`jar`拆包查看

发现其目录结构不太对劲

![image-20220515111209505](/imgs/oss/picGo/image-20220515111209505.png)

我们的包变成了`BOOT-INF`

这时候我们可以在`common-boot`的`pom.xml`配置一下`spring-boot-maven-plugin`

在`configuration`下设置`skip`为`true`

```xml
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <skip>true</skip>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

或者干脆直接去掉这个`plugin`配置

再次`mvn install`打包、解包，发现正常了

![image-20220515111751776](/imgs/oss/picGo/image-20220515111751776.png)

然后我们在`main-boot`再次进行编译，发现成功

![image-20220515111851453](/imgs/oss/picGo/image-20220515111851453.png)

注意如果还是不成功，我们可以清除一下`idea`缓存，或者执行[这里的命令](https://VampireAchao.github.io/2020/12/08/重新生成-idea以及-iml文件/)进行刷新依赖、重新生成`idea`项目模块配置文件
