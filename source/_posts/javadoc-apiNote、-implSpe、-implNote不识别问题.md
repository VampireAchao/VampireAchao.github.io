---
title: javadoc @apiNote、@implSpe、@implNote不识别问题
date: 2022-07-31 17:19:36
tags: java
---

> 在逆风里把握方向，做暴风雨中的海燕，做不改颜色的孤星。——余光中

我们使用`maven-javadoc-plugin`进行生成`javadoc`时，发现没有识别`jdk8`新标签

![image-20220731172158978](/imgs/oss/picGo/image-20220731172158978.png)

解决方式见：https://github.com/nipafx/demo-javadoc-8-tags/blob/master/pom.xml?ts=4#L110-L133

手动配置`tags`即可

```xml
    <build>
        <plugins>
            <!-- Maven编译插件 -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>${maven.compiler.source}</source>
                    <target>${maven.compiler.target}</target>
                    <compilerArgument>-Xlint:unchecked</compilerArgument>
                </configuration>
            </plugin>

            <!--junit5依赖-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.22.2</version>
                <configuration>
                    <testFailureIgnore>true</testFailureIgnore>
                </configuration>
            </plugin>
            <!-- Javadoc -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <additionalOptions>-Xdoclint:none</additionalOptions>
                    <tags>
                        <tag>
                            <name>apiNote</name>
                            <placement>a</placement>
                            <head>API Note:</head>
                        </tag>
                        <tag>
                            <name>implSpec</name>
                            <placement>a</placement>
                            <head>Implementation Requirements:</head>
                        </tag>
                        <tag>
                            <name>implNote</name>
                            <placement>a</placement>
                            <head>Implementation Note:</head>
                        </tag>
                        <tag>
                            <name>param</name>
                        </tag>
                        <tag>
                            <name>return</name>
                        </tag>
                        <tag>
                            <name>throws</name>
                        </tag>
                        <tag>
                            <name>since</name>
                        </tag>
                        <tag>
                            <name>version</name>
                        </tag>
                        <tag>
                            <name>serialData</name>
                        </tag>
                        <tag>
                            <name>see</name>
                        </tag>
                    </tags>
                </configuration>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

