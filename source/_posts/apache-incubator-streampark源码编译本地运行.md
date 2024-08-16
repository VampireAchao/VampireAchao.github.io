---
title: apache-incubator-streampark源码编译本地运行
date: 2023-04-09 19:03:45
tags: java
---

> 吾日三省吾身。——《论语》

```shell
git clone https://github.com/apache/incubator-streampark.git
```

拉取代码时候如果提示`filename-too-long`则可以：

[git拉取代码提示filename too long](https://VampireAchao.github.io/2022/11/26/git拉取代码提示filename-too-long/)

然后拉取完成后编译，执行根目录下`build.sh`

![image-20230409182406802](/imgs/oss/picGo/image-20230409182406802.png)

如果执行不了`build.sh`，则直接使用命令：

```shell
mvn -Pscala-2.12,dist -DskipTests clean package
```

![image-20230409183451818](/imgs/oss/picGo/image-20230409183451818.png)

上面无论是`build.sh`还是命令执行成功后，都会生成`dist`目录

![image-20230409182557787](/imgs/oss/picGo/image-20230409182557787.png)

我们解压下面的`tar.gz`到`incubator-streampark\streampark-console\streampark-console-service\target`

重命名为`streampark-console-service-2.1.0`

![image-20230409182751737](/imgs/oss/picGo/image-20230409182751737.png)

然后配置`streampark-console`的运行，添加参数

```shell
-Djdk.io.File.enableADS=true -Dapp.home=streampark-console/streampark-console-service/target/streampark-console-service-2.1.0
```

见：[xnio坑](https://VampireAchao.github.io/2022/08/28/xnio坑/)

![image-20230409182843946](/imgs/oss/picGo/image-20230409182843946.png)

即可启动后端项目，前端项目则在`webapp`中使用`yarn dev`启动

![image-20230409183032826](/imgs/oss/picGo/image-20230409183032826.png)
