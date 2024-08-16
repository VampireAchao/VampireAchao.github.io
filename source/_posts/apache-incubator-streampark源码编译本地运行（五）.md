---
title: apache-incubator-streampark源码编译本地运行（五）
date: 2023-07-25 21:18:17
tags: java
---

> 相信谎言的人必将在真理之前毁灭。——赫尔巴特

今天是这个报错

![](/imgs/oss/picGo/20230725213108.png)

是`install`完成后，`console`提示`shaded`包下面类找不到

此时我们需要`mvn clean`下项目，然后取消勾选右侧的`shaded`模块

![](/imgs/oss/picGo/20230725213411.png)

最后关闭项目，删除目录下的`.idea`文件夹，重新打开，`install`

再次运行即可

![](/imgs/oss/picGo/20230725213530.png)
