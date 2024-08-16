---
title: springboot单元测试
date: 2020-11-27 17:10:21
tags: java
---

> 每个圣人都有过去，每个罪人都有未来。 ――王尔德

我们在开发中经常会进行测试，如果是需要`springboot`环境，我们就可以使用`spring-boot-starter-test`

引入依赖

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
```

然后编写测试类

![image-20201129171819065](/imgs/oss/picGo/image-20201129171819065.png)

就可以正常进行测试了，例如引用`mapper`

![image-20201129172008749](/imgs/oss/picGo/image-20201129172008749.png)