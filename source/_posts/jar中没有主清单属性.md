---
title: jar中没有主清单属性
date: 2021-12-31 21:48:44
tags: java
---

> 新闻要适合直接感兴趣的人口味。——马克思

我今天遇到了一个报错...

![image-20211231215810236](/imgs/oss/picGo/image-20211231215810236.png)

我仔细一看发现`jar`包才`893KB`大小

![image-20211231220029174](/imgs/oss/picGo/image-20211231220029174.png)

检查了一下打包配置，发现：

![image-20211231220900705](/imgs/oss/picGo/image-20211231220900705.png)

这块少了个`repackage`配置...

```xml
                <executions>
                    <execution>
                        <id>repackage</id>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
```

加上就可以了

![image-20211231220947459](/imgs/oss/picGo/image-20211231220947459.png)

再次打包就好了