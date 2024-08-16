---
title: kotlin获取属性注解
date: 2023-01-05 13:31:54
tags: kotlin
---

> 微笑具有一种挽救力，它可以点亮天空，可以振作精神，可以改变你周围的气氛，更可以改变你——乔·吉拉德

`kotlin`里获取属性注解首先引入反射依赖：

```xml
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-reflect</artifactId>
        </dependency>
```

完整：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ruben</groupId>
    <artifactId>simple-kotlin</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-kotlin</name>
    <description>simple-kotlin</description>
    <properties>
        <java.version>1.8</java.version>
        <kotlin.version>1.7.21</kotlin.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-reflect</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib-jdk8</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
        <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.jetbrains.kotlin</groupId>
                <artifactId>kotlin-maven-plugin</artifactId>
                <configuration>
                    <args>
                        <arg>-Xjsr305=strict</arg>
                    </args>
                    <compilerPlugins>
                        <plugin>spring</plugin>
                    </compilerPlugins>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.jetbrains.kotlin</groupId>
                        <artifactId>kotlin-maven-allopen</artifactId>
                        <version>${kotlin.version}</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>

</project>
```

然后定义注解、`data`对象

```kotlin
package com.ruben.simplekotlin

@Target(AnnotationTarget.PROPERTY)
annotation class TestAnnotation(val value: String)
```

```kotlin
package com.ruben.simplekotlin

data class TestEntity(
    @TestAnnotation("主键") val id: Long,
    @TestAnnotation("名称") val name: String
)
```

最后是代码：

```kotlin
package com.ruben.simplekotlin

import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.springframework.boot.test.context.SpringBootTest
import kotlin.reflect.full.findAnnotation
import kotlin.reflect.full.memberProperties

@SpringBootTest
class SimpleKotlinApplicationTests {

    @Test
    fun contextLoads() {
        val annotations = TestEntity::class.memberProperties.mapNotNull { it.findAnnotation<TestAnnotation>()?.value }
        Assertions.assertFalse(annotations.isEmpty())
    }

}
```

