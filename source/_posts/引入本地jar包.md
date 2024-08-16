---
title: 引入本地jar包
date: 2021-03-02 21:16:56
tags: java
---

> 不管努力的目标是什么，不管他干什么，他单枪匹马总是没有力量的。合群永远是一切善良的人的最高需要。——歌德

对于本地`jar`包，如何让它加入我们的项目并使用`maven`的`GAV`管理起来呢

其实很简单

需要在当前项目根路径(在`pom.xml`的那层)使用

```shell
mvn install:install-file -Dfile=[本地jar包路径] -DgroupId=[自定义groupId] -DartifactId=[自定义artifactId] -Dversion=[自定义version] -Dpackaging=jar
```

例如

```shell
mvn install:install-file -Dfile=D:\file\files\Onest-S3-java-SDK.jar -DgroupId=com.move -DartifactId=moveOss -Dversion=1.0 -Dpackaging=jar
```

![image-20210302213354000](/imgs/oss/picGo/image-20210302213354000.png)

再使用我们定义的`GAV`引入，这样就可以使用我们本地`jar`了

```xml
        <!--    移动云对象存储    -->
        <dependency>
            <groupId>com.move</groupId>
            <artifactId>moveOss</artifactId>
            <version>1.0</version>
        </dependency>
```

![image-20210302213622341](/imgs/oss/picGo/image-20210302213622341.png)

![image-20210302214233672](/imgs/oss/picGo/image-20210302214233672.png)