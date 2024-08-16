---
title: spotless
date: 2023-04-10 21:40:37
tags: 软件及插件
---

> 享受你自己的生活乐趣，不要与别人比较。——康多赛特

分享一个`maven`插件`spotless`

https://github.com/diffplug/spotless

它可以让你的代码保持整洁

例如添加插件：

```xml
            <plugin>
                <groupId>com.diffplug.spotless</groupId>
                <artifactId>spotless-maven-plugin</artifactId>
                <version>2.27.2</version>
                <configuration>
                    <java>
                        <includes>
                            <include>src/main/java/**/*.java</include>
                            <include>src/test/java/**/*.java</include>
                        </includes>
                        <googleJavaFormat>
                            <version>1.7</version>
                            <style>GOOGLE</style>
                        </googleJavaFormat>
                        <importOrder>
                            <order>javax,java,\#</order>
                        </importOrder>
                        <replaceRegex>
                            <name>Remove wildcard imports</name>
                            <searchRegex>import\s+(static)*\s*[^\*\s]+\*;(\r\n|\r|\n)</searchRegex>
                            <replacement>$1</replacement>
                        </replaceRegex>
                        <replaceRegex>
                            <name>Block powermock</name>
                            <searchRegex>import\s+org\.powermock\.[^\*\s]*(|\*);(\r\n|\r|\n)</searchRegex>
                            <replacement>$1</replacement>
                        </replaceRegex>
                        <replaceRegex>
                            <name>Block jUnit4 imports</name>
                            <searchRegex>import\s+org\.junit\.[^jupiter][^\*\s]*(|\*);(\r\n|\r|\n)</searchRegex>
                            <replacement>$1</replacement>
                        </replaceRegex>
                        <removeUnusedImports/>
                    </java>
                </configuration>
                <executions>
                    <execution>
                        <id>spotless-check</id>
                        <phase>validate</phase>
                        <goals>
                            <goal>check</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
```

然后即可使用：

```shell
user@machine repo % mvn spotless:check
[ERROR]  > The following files had format violations:
[ERROR]  src\main\java\com\diffplug\gradle\spotless\FormatExtension.java
[ERROR]    -\t\t····if·(targets.length·==·0)·{
[ERROR]    +\t\tif·(targets.length·==·0)·{
[ERROR]  Run 'mvn spotless:apply' to fix these violations.
user@machine repo % mvn spotless:apply
[INFO] BUILD SUCCESS
user@machine repo % mvn spotless:check
[INFO] BUILD SUCCESS
```

