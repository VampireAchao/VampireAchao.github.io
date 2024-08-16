---
title: flink快速开始
date: 2021-11-05 18:51:59
tags: flink
---

> 仿佛前世的密约，注定我们要在今生抵掌，然后一起创世，或者再次站成一排，慷慨赴死。——野夫

官网：https://flink.apache.org/zh/

安装`jdk`

```shell
yum list java*
```

![](/imgs/oss/picGo/kuangstudy36dc5ee1-0cea-40ba-981d-99b3f5cef8cd.png)

然后安装

```shell
yum install java-1.8.0-openjdk* -y
```

查看版本

```shell
java -version
```

![](/imgs/oss/picGo/kuangstudy82fc2338-d304-497a-b83b-3221ba894460.png)

前往[官网](https://flink.apache.org/downloads.html)下载最新版，放进`Centos`，然后进入目录

```shell
cd /server/flink/
```

解压

```shell
tar -xzf flink-*.tgz
```

![](/imgs/oss/picGo/kuangstudy9f9acaf9-aec5-4196-ac8f-12a4bf10afa2.png)

进入解压后的路径列出目录

```shell
cd flink-1.14.0
ls -l
```

![](/imgs/oss/picGo/kuangstudy9fcd8228-db7b-4e02-b68b-4dd77edfdccf.png)

这里`bin`目录包含了`flink`的二进制文件以及几个管理各种工作和任务的脚本

`conf`目录就是放配置文件的，包含了`flink-conf.yaml`

`examples`目录包含了一个包含使用`Flink`的简单的`Demo`

我们启动:

```shell
./bin/start-cluster.sh
```

顺便一提关闭命令为：

```shell
./bin/stop-cluster.sh
```

![](/imgs/oss/picGo/kuangstudyfd9b7df8-b5d1-4135-89df-eba454fd8d7d.png)

简单看一下进程

```shell
 ps aux | grep flink
```

![](/imgs/oss/picGo/kuangstudy86299554-7762-4db3-bf6b-8f65d045cf63.png)

我们本地访问一下

```shell
curl localhost:8081
```

![](/imgs/oss/picGo/kuangstudy26409a72-83e1-457c-b73d-e2ee9965c46e.png)

看来是防火墙问题

我们开放端口

```shell
firewall-cmd --zone=public --add-port=8080/tcp --permanent
systemctl restart firewalld
```

成功进入控制台

![](/imgs/oss/picGo/kuangstudyf05b6fbf-459d-4690-a3cf-84830d3cf452.png)

然后启动例子，这个例子是用来统计单词数的

```shell
./bin/flink run examples/streaming/WordCount.jar
```

查看运行输出的日志

```shell
tail log/flink-*-taskexecutor-*.out
```

![](/imgs/oss/picGo/kuangstudy34766fa5-e074-4544-aff0-98c0eaa83397.png)

来到控制台，可以看到我们刚刚执行完毕的这个任务

![](/imgs/oss/picGo/kuangstudycd33916a-2140-4a0d-8284-cda840d9c688.png)

点进去可以查看详情：

![](/imgs/oss/picGo/kuangstudyfead1770-5868-471b-b325-250136bb1486.png)

对于这个任务，`flink`有两个操作，一个是(`source operator`)，也就是源操作，用来从收集源读取数据

另一个是运算操作(`transformation operator`)，它统计单词个数

你可以点击`TimeLine`查看时间线

![](/imgs/oss/picGo/kuangstudy2c3247e0-5800-4d57-9b6e-a0485fe7ba55.png)

可以看到它们几乎并行，这就是实时计算的最大特点，就是实时性！

其他的例子就不一一介绍了

![](/imgs/oss/picGo/kuangstudy720071e5-9d5b-445e-9a1c-876e6162664a.png)

```shell
ls examples/streaming -l
./bin/flink run examples/streaming/Iteration.jar
tail log/flink-*-taskexecutor-*.out
```

