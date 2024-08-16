---
title: jenkins升级坑
date: 2022-11-04 14:06:07
tags: 运维
---

> 过度的严厉会造成恐惧，过分的温和会有失威严。不要严厉得使人憎恶，也不要温和得使人胆大妄为——萨迪

今天看到`ubuntu`上的`jenkins`这里有提示

![image-20221104140714470](/imgs/oss/picGo/1.png)

点了一下，提示有新版本更新

又手贱点了一下，然后完蛋，过了一会儿，`jenkins`挂掉了

我打开`finalShell`（`sh`连接客户端）尝试重启

```shell
systemctl start jenkins
```

提示启动失败，使用

```shell
systemctl status jenkins
# 或者
journalctl -xe
```

查看详情，但是我没看明白报错

又试了试

```shell
jenkins start
```

![image-20221104143319037](/imgs/oss/picGo/2.png)

这次看懂了，提示`java`版本不对，需要`java 11 or 17`

```shell
Jenkins requires Java versions [17, 11] but you are running with Java 1.8 from /jdk路径/java
```

原来升级了需要新`jdk`，那就去下一个，然后指定一下`jenkins`启动使用`jdk11`嘛

总不能升级当前所有`jdk`环境为`java11`吧，迁移成本太大了

于是下载`jdk11`

```shell
wget https://repo.huaweicloud.com/java/jdk/11+28/jdk-11_linux-x64_bin.tar.gz
```

然后解压

```shell
tar -zxvf jdk-11_linux-x64_bin.tar.gz
```

移动目录

```shell
mv ./jdk-11 /usr/local/
```

接下来就是指定`jenkins`环境了

```shell
systemctl status jenkins.service
```

里面包含一个路径

```shell
jenkins.service - Jenkins Continuous Integration Server
  Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
```

然后`cat`(或者打开)这个路径的文件

```shell
cat /lib/systemd/system/jenkins.service
```

发现其中配置了一项

![image-20221104142818734](/imgs/oss/picGo/3.png)

进入这个文件

```shell
vim /usr/bin/jenkins
```

这是一个`sh`脚本，其中包含一个`main`函数

而且还有很多`JAVA_HOME`

![image-20221104143032093](/imgs/oss/picGo/4.png)

我们`echo`打印一下

![image-20221104143052327](/imgs/oss/picGo/5.png)

再次执行

```shell
jenkins start
```

可以看到的确输出，那我们就在这里指定`jdk`环境

```shell
JAVA_HOME=/usr/local/jdk-11
```

![image-20221104143146815](/imgs/oss/picGo/6.png)

然后再次运行，发现提示

![image-20221104143358680](/imgs/oss/picGo/7.png)

我们发现这个提示是在`sh`脚本的`main`函数里输出的

![image-20221104143437868](/imgs/oss/picGo/8.png)

这里有一个`check_java_version`的函数

我们找一下

然后发现到这里原来写的获取`java`版本号的逻辑有问题，`echo`到`java_version`的变量为空的

![image-20221104143554665](/imgs/oss/picGo/9.png)

于是手动在下面加了个`java_version="11"`

再次重启`jenkins`

```shell
jenkins start
```

提示端口占用，重启服务

```shell
systemctl restart jenkins
```

无报错信息，访问地址，升级成功

![image-20221104143748913](/imgs/oss/picGo/10.png)