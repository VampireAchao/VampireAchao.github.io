---
title: springboot聚合工程部署时遇到的坑
date: 2020-06-18 22:10:25
tags: 运维
---

今天打包springboot聚合项目的时候，遇到了一个问题，一直报ClassNotFoundException

明明打包都打好了，运行的时候报这个错，弄了好久，解压jar包一看，怎么多了个目录？！

这个目录叫BOOT-INF，打开一看，里面是com文件。。。原来罪魁祸首就在这里，把BOOT-INF里的目录挪出来，然后就不报错了。。项目终于发布上线了！开心~

```xml
1.spring-boot maven打包，一般pom.xml文件里会加

<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
这样打的jar里会多一个目录BOOT-INF。

2.引起问题，程序包不存在。

3.解决办法，如果A子模块包依赖了B子模块包，在B子模块的pom文件，加入

<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <configuration>
        <skip>true</skip>
    </configuration>
</plugin>
```

```shell
#如果不加这个配置，聚合工程打包后目录结构为
BOOT-INF META-INF org
```

```shell
#但我们实际需要的是这样
com META-INF application.yml
```