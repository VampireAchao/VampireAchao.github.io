---
title: maven依赖的小坑
date: 2021-01-15 20:48:50
tags: java
---

> 说谎话的人所得到的，就只即使觉说直话也没有人相信。——伊索

今天引入`spire.doc`依赖时遇到一个小坑

![image-20210115205031651](/imgs/oss/picGo/image-20210115205031651.png)

提示`Could not find artifact e-iceblue:spire.doc.free:pom:3.9.0 in aliyunmaven (https://maven.aliyun.com/repository/public)`

可是我明明已经配置了

```xml
        <repository>
            <id>com.e-iceblue</id>
            <url>http://repo.e-iceblue.cn/repository/maven-public/</url>
        </repository>
```

![image-20210115205130816](/imgs/oss/picGo/image-20210115205130816.png)

后来发现原来是我`maven`的配置文件`settings.xml`是这么写的

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

    <mirrors>
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

因为配了阿里云镜像加速。。。这里暂时把我们的`settings.xml`给剪切掉

这样使用的就是默认的镜像地址了

![image-20210115205312570](/imgs/oss/picGo/image-20210115205312570.png)

![image-20210115205317623](/imgs/oss/picGo/image-20210115205317623.png)

然后再刷新`maven`

可以看到正常下载

![image-20210115205350796](/imgs/oss/picGo/image-20210115205350796.png)

之前在`bukkit`开发的时候也遇到这个坑，所以在此留个记录，以防万一

![image-20210115205434243](/imgs/oss/picGo/image-20210115205434243.png)