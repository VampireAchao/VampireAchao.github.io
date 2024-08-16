---
title: Springboot使用maven打包指定mainClass
date: 2020-12-17 20:37:30
tags: java
---

> "音乐是天使的演讲"，这句话形容得妙极。——(英国作家)卡莱尔

 今天`springboot`项目`install`报错出现多个主类的问题，最后看[这篇博客](http://jvm123.com/2019/12/springboot-repackage.html)在`pom.xml`中指定了主类解决了

```xml
<build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <mainClass>com.xxx.XxxApplication</mainClass>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

