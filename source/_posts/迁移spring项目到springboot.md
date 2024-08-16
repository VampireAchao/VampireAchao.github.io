---
title: 迁移spring项目到springboot
date: 2020-08-08 10:09:50
tags: java
---

嗨呀！今天是周六没上班，来把我们的`spring`+`springmvc`项目迁移到`springboot`吧！

首先创建`springboot`项目

![image-20200808131926460](/imgs/oss/picGo/image-20200808131926460.png)

![image-20200808132005498](/imgs/oss/picGo/image-20200808132005498.png)

然后一直下一步，复制我的`pom`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.2.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.ruben</groupId>
    <artifactId>simple-springboot</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>simple-springboot</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!--引入AOP依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
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
        <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.73</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

然后把代码复制过来

![image-20200808142118060](/imgs/oss/picGo/image-20200808142118060.png)

这里记得把我们在`AOP`里的`@Log4j`改成`@Slf4j`

![image-20200808134554355](/imgs/oss/picGo/image-20200808134554355.png)

然后运行，成功！所以`springboot`真香，之前要配置一大堆东西，现在`springboot`帮我们都配置好了

![image-20200808142247459](/imgs/oss/picGo/image-20200808142247459.png)

![image-20200808144339721](/imgs/oss/picGo/image-20200808144339721.png)

然后我们上传到`git`仓库吧

![image-20200808144433987](/imgs/oss/picGo/image-20200808144433987.png)

![image-20200808144612295](/imgs/oss/picGo/image-20200808144612295.png)

[完整代码](https://gitee.com/VampireAchao/simple-springboot.git)