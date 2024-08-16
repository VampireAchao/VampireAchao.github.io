---
title: jvisualvm安装并查看GC过程
date: 2020-12-20 19:26:59
tags: java
---

> 非知之艰，行之惟艰。——《尚书》

首先`WIN+R`输入`cmd`打开控制台

![image-20201220165109269](/imgs/oss/picGo/image-20201220165109269.png)

输入`jvisualvm`启动

如果报`jvisualvm`不是内部或外部命令，也不是可运行的程序，说明我们没有安装

![image-20201220165730517](/imgs/oss/picGo/image-20201220165730517.png)

那我们去安装一个

[官网](https://visualvm.github.io/)下载

![image-20201220165837746](/imgs/oss/picGo/image-20201220165837746.png)

![image-20201220165847858](/imgs/oss/picGo/image-20201220165847858.png)

然后解压

双击运行

![image-20201220182540847](/imgs/oss/picGo/image-20201220182540847.png)

如果弹框

![image-20201220182559424](/imgs/oss/picGo/image-20201220182559424.png)

我们就可以指定一下`jdk`路径

编辑`visualvm.conf`

![image-20201220182637252](/imgs/oss/picGo/image-20201220182637252.png)

修改`jdk`路径

![image-20201220182719612](/imgs/oss/picGo/image-20201220182719612.png)

保存，再次运行就可以打开了

打开后点击我接受

![image-20201220182801721](/imgs/oss/picGo/image-20201220182801721.png)

然后找到我们当前项目就可以查看信息啦

![image-20201220190649471](/imgs/oss/picGo/image-20201220190649471.png)

我们还可以安装插件

![image-20201220191409934](/imgs/oss/picGo/image-20201220191409934.png)

安装一个`Visual GC`

![image-20201220191830844](/imgs/oss/picGo/image-20201220191830844.png)

![image-20201220192007843](/imgs/oss/picGo/image-20201220192007843.png)

完成后重启一下

重启好了后就可以看到我们的`GC`过程了

![image-20201220192305644](/imgs/oss/picGo/image-20201220192305644.png)