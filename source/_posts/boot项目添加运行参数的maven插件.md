---
title: boot项目添加运行参数的maven插件
date: 2023-12-13 20:51:45
tags: java
---

> 不存在十全十美的文章，如同不存在彻头彻尾的绝望。——村上春树

之前说了 [单元测试添加运行参数的maven插件](http://localhost:4000/2023/12/12/%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%B7%BB%E5%8A%A0%E8%BF%90%E8%A1%8C%E5%8F%82%E6%95%B0%E7%9A%84maven%E6%8F%92%E4%BB%B6/)

难道对于非单元测试就只能手动写命令了吗？当然不是！我们只需要使用：

```xml
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                 <jvmArguments>
                    -Dfile.encoding=UTF-8
                    -Dsun.jnu.encoding=UTF-8
                    --add-opens=java.base/java.util=ALL-UNNAMED
                    --add-opens=java.base/java.lang=ALL-UNNAMED
                    --add-opens=java.base/java.lang.invoke=ALL-UNNAMED
                    --add-opens=java.base/java.lang.reflect=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.annotation=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.generics.visitor=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.generics.tree=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.generics.scope=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.generics.parser=ALL-UNNAMED
                    --add-opens=java.base/sun.reflect.generics.factory=ALL-UNNAMED
                </jvmArguments>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
```

配置以后即可来到对应目录使用：

```bash
spring-boot:run -f pom.xml
```

如果有目录也可以：

```bash
mvn spring-boot:run -f yourpackage/pom.xml
```

即可在运行`boot`项目时自动添加上述参数
