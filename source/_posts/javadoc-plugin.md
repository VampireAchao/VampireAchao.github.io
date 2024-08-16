---
title: javadoc-plugin
date: 2022-06-05 00:17:07
tags: java
---

> 掉头一去是风吹黑发，回首再来已雪满白头。——余光中

我们可以使用`maven-javadoc-plugin`生成`javadoc`

```xml
            <!-- Javadoc -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.4.0</version>
                <executions>
                    <execution>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>

```

但如果我们有自定义标签或者新版标签，我们需要配置一个`additionalOptions`为`-Xdoclint:none`

```xml
            <!-- Javadoc -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-javadoc-plugin</artifactId>
                <version>3.4.0</version>
                <configuration>
                    <additionalOptions>-Xdoclint:none</additionalOptions>
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

```

否则会因为`MavenReportException: Error while generating Javadoc`而中断生成