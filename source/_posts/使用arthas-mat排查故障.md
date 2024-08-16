---
title: 使用arthas+mat排查故障
date: 2023-05-16 19:44:22
tags: java
---

> 情操要高尚！成为我们真正荣誉的，是我们自己的心，而不是他人的议论。——席勒

今天发现线上`CPU`又百分百了。。。

于是开始使用`arthas`排查

```shell
curl -O https://arthas.aliyun.com/arthas-boot.jar
java -jar arthas-boot.jar
```

然后选择对应的`web`项目

首先我执行了`dashboard`命令

发现`heap`为百分之九十几的占用，那我直接执行

```shell
heapdump --live /tmp/dump.hprof
```

然后下载到本地，再下载一个`MAT(Memory Analyzer Tool)`进行分析

![image-20230516191621888](/imgs/oss/picGo/image-20230516191621888.png)

下载地址：https://www.eclipse.org/mat/downloads.php

我们解压，打开(需要配置`java17`环境变量)后点击`Open Heap Dump`

![image-20230516191848848](/imgs/oss/picGo/image-20230516191848848.png)

然后选择我们的`hprof`文件

然后报错

![image-20230516192244421](/imgs/oss/picGo/image-20230516192244421.png)

点击`Details >>`才发现原来是内存不足，我们设置下内存大小

打开`MemoryAnalyzer.ini`，修改`-Xmx1024m`为合适的大小

![image-20230516192357448](/imgs/oss/picGo/image-20230516192357448.png)

这里点击`Histogram`查看对象占用

![image-20230516192153243](/imgs/oss/picGo/image-20230516192153243.png)

发现`fastjson`的`JSONArray`占用挺高

![image-20230516192542168](/imgs/oss/picGo/image-20230516192542168.png)

以及有个定时任务

![image-20230516192623117](/imgs/oss/picGo/image-20230516192623117.png)

于是进行了相关的代码处理，调整了定时任务，更换了`fastjson`为`hutool-json`之后就好了