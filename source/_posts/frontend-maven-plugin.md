---
title: frontend-maven-plugin
date: 2023-05-13 01:11:14
tags: java
---

> 没有目标而生活，恰如没有罗盘而航行。——康德

分享一个前端`maven`打包插件：frontend-maven-plugin

https://github.com/eirslett/frontend-maven-plugin

![image-20230513011302966](/imgs/oss/blog/vampireachao/image-20230513011302966.png)

例如`streampark`中使用的：

```xml
                    <plugin>
                        <groupId>com.github.eirslett</groupId>
                        <artifactId>frontend-maven-plugin</artifactId>
                        <version>1.12.1</version>
                        <configuration>
                            <workingDirectory>${project.basedir}/../${frontend.project.name}</workingDirectory>
                        </configuration>
                        <executions>
                            <execution>
                                <id>install node and pnpm</id>
                                <goals>
                                    <goal>install-node-and-pnpm</goal>
                                </goals>
                                <configuration>
                                    <nodeVersion>v16.16.0</nodeVersion>
                                    <pnpmVersion>7.3.0</pnpmVersion>
                                </configuration>
                            </execution>
                            <execution>
                                <id>install</id>
                                <goals>
                                    <goal>pnpm</goal>
                                </goals>
                                <phase>generate-resources</phase>
                                <configuration>
                                    <arguments>install --ignore-scripts</arguments>
                                </configuration>
                            </execution>
                            <execution>
                                <id>build</id>
                                <goals>
                                    <goal>pnpm</goal>
                                </goals>
                                <configuration>
                                    <arguments>run build:no-cache</arguments>
                                </configuration>
                            </execution>
                        </executions>
                    </plugin>
```

