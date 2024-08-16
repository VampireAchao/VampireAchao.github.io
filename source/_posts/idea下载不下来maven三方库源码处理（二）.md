---
title: idea下载不下来maven三方库源码处理（二）
date: 2024-03-26 20:28:53
tags: java
---

> 把每一个黎明看作是生命的开始，把每一个黄昏看作你生命的小结。——罗斯金

实际上我这里就是因为配置`maven`镜像不正确导致的：

原先我的配置：

```xml
<mirror>
    <id>nexus-tencentyun</id>
    <mirrorOf>central</mirrorOf>
    <name>Nexus tencentyun</name>
    <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
</mirror>
```

现在：

```xml
        <mirror>
            <id>nexus-tencentyun</id>
            <mirrorOf>*</mirrorOf>
            <name>Nexus tencentyun</name>
            <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
        </mirror>
```

需要注意的是这里`mirrorOf`需要改成`*`

这样一来，就能下载下来了
