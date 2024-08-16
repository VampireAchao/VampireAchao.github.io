---
title: hutool-bom
date: 2022-01-19 20:22:17
tags: java
---

>一个能思想的人，才真是一个力量无边的人。——巴尔扎克

[官方文档](https://www.hutool.cn/docs/#/bom/%E6%A6%82%E8%BF%B0)

我们在使用`hutool`时可以像如下方式引入单独引入所需模块：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    
    <properties>
        <hutool.version>5.7.19</hutool.version>
    </properties>
    
    <dependencies>
        <!-- hutool -->
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-core</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-http</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-extra</artifactId>
        </dependency>
        <!-- hutool-end -->
    </dependencies>

	<dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-bom</artifactId>
                <version>${hutool.version}</version>
                <type>pom</type>
                <!-- 注意这里是import -->
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
    
</project>
```

非常方便