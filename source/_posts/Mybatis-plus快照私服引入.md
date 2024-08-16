---
title: Mybatis-plus快照私服引入
date: 2021-12-30 20:42:19
tags: java
---

> 自信与骄傲有异；自信者常沉着，而骄傲者常浮扬。——梁启超

`Mybatis-Plus`的`3.4.5`快照版出了

官方文档：https://baomidou.com/pages/bab2db/#snapshot

我们到项目中试试吧！

首先配置`settings.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <mirrors>
        <!-- mybatis-plus快照版私服 -->
        <mirror>
            <id>snapshots</id>
            <mirrorOf>*</mirrorOf>
            <name>mybatis-plus snapshots</name>
            <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云公共仓库</name>
            <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云谷歌仓库</name>
            <url>https://maven.aliyun.com/repository/google</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云阿帕奇仓库</name>
            <url>https://maven.aliyun.com/repository/apache-snapshots</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云spring仓库</name>
            <url>https://maven.aliyun.com/repository/spring</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云spring插件仓库</name>
            <url>https://maven.aliyun.com/repository/spring-plugin</url>
        </mirror>
        <mirror>
            <id>aliyunmaven</id>
            <mirrorOf>*</mirrorOf>
            <name>阿里云docker仓库</name>
            <url>https://khec465u.mirror.aliyuncs.com</url>
        </mirror>
        <mirror>
            <id>alimaven</id>
            <mirrorOf>central</mirrorOf>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
        </mirror>
        <mirror>
            <id>alimaven</id>
            <name>aliyun maven</name>
            <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
        <mirror>
            <id>central</id>
            <name>Maven Repository Switchboard</name>
            <url>http://repo1.maven.org/maven2/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
        <mirror>
            <id>repo2</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://repo2.maven.org/maven2/</url>
        </mirror>
        <mirror>
            <id>ibiblio</id>
            <mirrorOf>central</mirrorOf>
            <name>Human Readable Name for this Mirror.</name>
            <url>http://mirrors.ibiblio.org/pub/mirrors/maven2/</url>
        </mirror>
        <mirror>
            <id>jboss-public-repository-group</id>
            <mirrorOf>central</mirrorOf>
            <name>JBoss Public Repository Group</name>
            <url>http://repository.jboss.org/nexus/content/groups/public</url>
        </mirror>
        <mirror>
            <id>google-maven-central</id>
            <name>Google Maven Central</name>
            <url>https://maven-central.storage.googleapis.com
            </url>
            <mirrorOf>central</mirrorOf>
        </mirror>
        <!-- 中央仓库在中国的镜像 -->
        <mirror>
            <id>maven.net.cn</id>
            <name>oneof the central mirrors in china</name>
            <url>http://maven.net.cn/content/groups/public/</url>
            <mirrorOf>central</mirrorOf>
        </mirror>
    </mirrors>
</settings>
```

然后在`pom.xml`里配置

```xml
<repositories>
    <repository>
        <id>snapshots</id>
        <url>https://oss.sonatype.org/content/repositories/snapshots/</url>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>
```

再修改`mybatis-plus`的版本号即可

```xml
<dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>3.5.0-SNAPSHOT</version>
</dependency>
```

可以看到成功引入

![image-20211230210347479](/imgs/oss/picGo/image-20211230210347479.png)