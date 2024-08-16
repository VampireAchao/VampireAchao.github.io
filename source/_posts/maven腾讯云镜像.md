---
title: maven腾讯云镜像
date: 2022-10-22 20:57:23
tags: java
---

> 人们在年轻的时候，谁也不知道自己年轻——切斯特顿

因为阿里云镜像维护，导致暂停同步镜像了

![image-20221022210014834](/imgs/oss/blog/image-20221022210014834.png)

所以更换为腾讯云镜像：

https://mirrors.cloud.tencent.com/help/maven.html

> ## 设置方法
>
> 打开maven的设置文件settings.xml，配置如下repository mirror：
>
> ```xml
> <mirror>
>     <id>nexus-tencentyun</id>
>     <mirrorOf>*</mirrorOf>
>     <name>Nexus tencentyun</name>
>     <url>http://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
> </mirror> 
> ```