---
title: ubuntu寻找jdk目录
date: 2022-05-25 12:42:18
tags: 运维
---

> 在读书上，数量并不列于首要，重要的是书的品质与所引起的思索的程度。——富兰克林

今天设置`JDK`环境变量

我们首先使用

```shell
echo $JAVA_HOME
```

发现没有设置，接下来寻找`JDK`安装环境

```shell
which java
whereis java
```

但发现列出的目录`/usr/bin/java`，其只是个快捷方式

我们使用

```shell
ls -lrt /usr/bin/java
# /usr/bin/java -> /etc/alternatives/java
```

看到打印出了路径：`/usr/bin/java -> /etc/alternatives/java`，继续

```shell
ls -lrt /etc/alternatives/java
# /etc/alternatives/java -> /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

接着来，直到出现的路径和列出的路径一致为止

```shell
ls -lrt /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
#  /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java
```

然后我们开始设置

首先是编辑环境变量

```shell
vim /etc/profile
```

在下面加四行

```shell
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```

然后保存，输入

```shell
source /etc/profile
```

再次`cat $JAVA_HOME`

发现成功

```shell
cat $JAVA_HOME
# cat: /usr/lib/jvm/java-8-openjdk-amd64: Is a directory
```

