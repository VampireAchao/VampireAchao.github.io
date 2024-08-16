---
title: Jpom部署时遇到的坑
date: 2022-11-29 13:03:29
tags: 运维
---

> 跟女人讲话，要像你爱过她似的；跟男人讲话，要像你恨过他似的——王尔德

直接构建，构建失败

![image-20221123114519404](/imgs/oss/picGo/image-20221123114519404.png)

下载日志排查：

![image-20221123114635920](/imgs/oss/picGo/image-20221123114635920.png)

日志：

貌似拉取代码失败，可能是账密配置错误，检查一下重新构建

![image-20221123114815291](/imgs/oss/picGo/image-20221123114815291.png)

这次代码拉取成功，但是构建仍然失败，原因包括`maven`没安装(`mvn`命令不识别)、目录路径未识别

![image-20221123115402956](/imgs/oss/picGo/image-20221123115402956.png)

先安装`maven`

```shell
# 安装
sudo apt-get install maven
# 查看版本
root@iZuf6afyp0j8anyom0ro8zZ:~# mvn -v
Apache Maven 3.6.3
Maven home: /usr/share/maven
Java version: 1.8.0_352, vendor: Private Build, runtime: /usr/lib/jvm/java-8-openjdk-amd64/jre
Default locale: en_US, platform encoding: UTF-8
OS name: "linux", version: "5.15.0-43-generic", arch: "amd64", family: "unix"
```

进到`Jpom`拉取代码的目录

```shell
# 查找目录
find / -name management
# 进入
cd /usr/local/jpom-server/data/build/[仓库uid]/source/
```

手动执行脚本中的命令进行尝试

```shell
mvn -e -U -DskipTests=true -Ptest clean kotlin:compile package
```

报错

```shell
[ERROR] Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.8.1:compile (default-compile) on project management: Compilation failure
[ERROR] No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?
[ERROR] 
[ERROR] -> [Help 1]
org.apache.maven.lifecycle.LifecycleExecutionException: Failed to execute goal org.apache.maven.plugins:maven-compiler-plugin:3.8.1:compile (default-compile) on project jeecg-boot-base-tools: Compilation failure
No compiler is provided in this environment. Perhaps you are running on a JRE rather than a JDK?
```

怀疑是`JDK`环境变量问题

```shell
root@iZuf6afyp0j8anyom0ro8zZ:/etc# echo $JAVA_HOME
# 空的
```

配置一下`JDK`环境变量，修改`/etc/profile`

添加如下

```shell
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export JRE_HOME=/usr/lib/jvm/java-8-openjdk-amd64/jre
export CLASSPATH=$CLASSPATH:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
export PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH:$HOME/bin
```

刷新生效

```shell
root@iZuf6afyp0j8anyom0ro8zZ:/etc# source /etc/profile
root@iZuf6afyp0j8anyom0ro8zZ:/etc# echo $JAVA_HOME
/usr/lib/jvm/java-8-openjdk-amd64
```

重新执行`mvn install`命令

仍然报错，打开`jdk`的`bin`目录，发现没有`javac`。。。

```shell
root@iZuf6afyp0j8anyom0ro8zZ:~# $JAVA_HOME/bin/javac -version
-bash: /usr/lib/jvm/java-8-openjdk-amd64/bin/javac: No such file or directory
```

执行命令重新安装`jdk`，期间都录入`Y`和回车确认

```shell
add-apt-repository ppa:openjdk-r/ppa
apt-get update
apt-get install openjdk-8-jdk
```

直到再次执行

```shell
root@iZuf6afyp0j8anyom0ro8zZ:~# $JAVA_HOME/bin/javac -version
javac 1.8.0_352
```

然后回去执行`maven`命令，发现正常打包、编译