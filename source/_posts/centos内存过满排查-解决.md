---
title: centos内存过满排查+解决
date: 2021-05-24 19:09:59
tags: 运维
---

> 请君莫奏前朝曲，听唱新翻杨柳枝。——刘禹锡《杨柳枝词》

今天突然发现程序执行`insert`的`sql`语句执行不了，查询正常，根据数据库死锁排查步骤排查了下无果

后来登上宝塔面板发现磁盘爆满。。。

![image-20210524150317680](/imgs/oss/picGo/image-20210524150317680.png)

首先看看磁盘使用情况

```shell
# 查看磁盘使用情况统计(disk free)，这里-h表示以M/G等单位显示
df -h
```

可以看到我这里最大的是`/dev/vda1`这个磁盘，也就是我现在使用的这个盘占用了几乎爆满

![image-20210524150412390](/imgs/oss/picGo/image-20210524150412390.png)

然后我们列出该磁盘下文件大小

```shell
# 显示目录或文件大小(disk usage)，-s表示仅显示总计 -h同上
du -sh /*
```

看到最大的是这个`28G`的`/var`

![image-20210524151122778](/imgs/oss/picGo/image-20210524151122778.png)

再进一步查看该目录下的

```shell
du -sh /var/*
```

![image-20210524151153772](/imgs/oss/picGo/image-20210524151153772.png)

这样一步一步到最后发现是`/var/log`下的一个叫`messages`的文件占用`23G`

![image-20210524151704143](/imgs/oss/picGo/image-20210524151704143.png)

这个文件是存放我们系统日志的文件，例如一些服务日志之类的会往里写

我们清理一下

先列出打开这个文件的进程

```shell
# 列出当前系统打开文件(list open files)，使用“|”管道符将左边lsof的输出作为右边命令grep message的输入
# grep 命令是用于查找文件里符合条件的字符串
# 这里 lsof 还可以这样使用： lsof -i:80 （查看端口占用情况）
lsof | grep messages
```

![image-20210524153309983](/imgs/oss/picGo/image-20210524153309983.png)

我们杀掉进程试试？

```shell
# 终止进程号为1002的进程(-9表示强制终止)
kill -9 1002
```

然后发现进程还在。。。

![image-20210524153903645](/imgs/oss/picGo/image-20210524153903645.png)

那就关一下这个叫`rsyslogd`的服务好了

```shell
# 系统服务 关闭 [服务名]
systemctl stop rsyslog
```

![image-20210524154136398](/imgs/oss/picGo/image-20210524154136398.png)

然后再次`lsof`发现没有了

我们再清空日志

```shell
# 输出 /dev/null 这个文件中的内容 覆盖 /var/log/messages
cat /dev/null > /var/log/messages
```

然后再次查看文件大小

```shell
du -sh /var/log/*
```

发现已被清空

![image-20210524154718736](/imgs/oss/picGo/image-20210524154718736.png)

然后重启

```shell
reboot
```

成功瘦身！`Yes`！！！

![image-20210524154815500](/imgs/oss/picGo/image-20210524154815500.png)

