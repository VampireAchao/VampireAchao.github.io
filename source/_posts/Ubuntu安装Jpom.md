---
title: Ubuntu安装Jpom
date: 2022-11-24 12:48:58
tags: 运维
---

> 沉默并非总是智慧的表现，但唠叨却永远是一项愚行——富兰克林

本机环境：

```shell
root@VampireAchao:~# lsb_release -d
Description:    Ubuntu 22.04.1 LTS
root@VampireAchao:~# java -version
openjdk version "1.8.0_352"
OpenJDK Runtime Environment (build 1.8.0_352-8u352-ga-1~22.04-b08)
OpenJDK 64-Bit Server VM (build 25.352-b08, mixed mode)
```

安装服务端：

```shell
# 提前创建好文件夹 并且切换到对应到文件夹执行命令
mkdir -p /home/jpom/server/
apt install -y wget && wget -O install.sh https://jpom.top/docs/install.sh && bash install.sh Server jdk
```

输入`y`确定

报错了

```shell
root@VampireAchao:~# mkdir -p /home/jpom/server/
root@VampireAchao:~# apt install -y wget && wget -O install.sh https://jpom.top/docs/install.sh && bash install.sh Server jdk
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
wget is already the newest version (1.21.2-2ubuntu1).
0 upgraded, 0 newly installed, 0 to remove and 47 not upgraded.
--2022-11-23 10:19:58--  https://jpom.top/docs/install.sh
Resolving jpom.top (jpom.top)... 106.227.20.214, 106.227.20.215, 106.227.20.216, ...
Connecting to jpom.top (jpom.top)|106.227.20.214|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 6176 (6.0K) [text/x-sh]
Saving to: ‘install.sh’

install.sh             100%[============================>]   6.03K  --.-KB/s    in 0s      

2022-11-23 10:19:59 (6.57 GB/s) - ‘install.sh’ saved [6176/6176]

install.sh: line 113: yum: command not found
开始检查 jdk
已经存在java环境/bin/java
默认安装目录 /usr/local/jpom-server, 是否使用此目录作为安装目录? 输入 y 确定, 否则请输入安装目录, 需要使用绝对路径 (注意: agent 和 server 不能装到同一个目录!)：y
开始安装：Server  , 安装目录 /usr/local/jpom-server
--2022-11-23 10:20:03--  https://download.jpom.top/release/2.9.15/server-2.9.15-release.zip
Resolving download.jpom.top (download.jpom.top)... 106.227.20.215, 106.227.20.212, 106.227.20.217, ...
Connecting to download.jpom.top (download.jpom.top)|106.227.20.215|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 81243430 (77M) [application/zip]
Saving to: ‘Server.zip’

Server.zip             100%[============================>]  77.48M  12.8MB/s    in 5.8s    

2022-11-23 10:20:09 (13.5 MB/s) - ‘Server.zip’ saved [81243430/81243430]

install.sh: line 175: unzip: command not found
chmod: cannot access 'Server.sh': No such file or directory
bash: Server.sh: No such file or directory
```

删除目录

```shell
rm -r /home/jpom/
```

安装解压命令

```shell
apt install unzip
```

一直按回车

重新安装

```shell
# 提前创建好文件夹 并且切换到对应到文件夹执行命令
mkdir -p /home/jpom/server/
apt install -y wget && wget -O install.sh https://jpom.top/docs/install.sh && bash install.sh Server jdk
```

执行(我这里忘记`cd /home/jpom/server/`了，所以默认安装到`/usr/local/jpom-server`)了

```shell
root@VampireAchao:~# mkdir -p /home/jpom/server/
root@VampireAchao:~# apt install -y wget && wget -O install.sh https://jpom.top/docs/install.sh && bash install.sh Server jdk
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
wget is already the newest version (1.21.2-2ubuntu1).
0 upgraded, 0 newly installed, 0 to remove and 47 not upgraded.
--2022-11-23 11:01:45--  https://jpom.top/docs/install.sh
Resolving jpom.top (jpom.top)... 106.227.20.212, 106.227.20.215, 106.227.20.214, ...
Connecting to jpom.top (jpom.top)|106.227.20.212|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 6176 (6.0K) [text/x-sh]
Saving to: ‘install.sh’

install.sh             100%[============================>]   6.03K  --.-KB/s    in 0s      

2022-11-23 11:01:45 (7.30 GB/s) - ‘install.sh’ saved [6176/6176]

开始检查 jdk
已经存在java环境/bin/java
默认安装目录 /usr/local/jpom-server, 是否使用此目录作为安装目录? 输入 y 确定, 否则请输入安装目录, 需要使用绝对路径 (注意: agent 和 server 不能装到同一个目录!)：y
开始安装：Server  , 安装目录 /usr/local/jpom-server
--2022-11-23 11:01:48--  https://download.jpom.top/release/2.9.15/server-2.9.15-release.zip
Resolving download.jpom.top (download.jpom.top)... 106.227.20.212, 106.227.20.211, 106.227.20.216, ...
Connecting to download.jpom.top (download.jpom.top)|106.227.20.212|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 81243430 (77M) [application/zip]
Saving to: ‘Server.zip’

Server.zip             100%[============================>]  77.48M  7.03MB/s    in 7.5s    

2022-11-23 11:01:56 (10.3 MB/s) - ‘Server.zip’ saved [81243430/81243430]

Archive:  Server.zip
   creating: lib/
  inflating: Server.sh               
  inflating: Server.bat              
  inflating: extConfig.yml           
  inflating: LICENSE                 
  inflating: lib/server-2.9.15.jar   
KeepBx-System-JpomServerApplication
/usr/local/jpom-server/
/usr/local/jpom-server/server.log
automatic running：server-2.9.15.jar
Jpom-Server Starting
       _
      | |
      | |_ __   ___  _ __ ___
  _   | | '_ \ / _ \| '_ ` _ \
 | |__| | |_) | (_) | | | | | |
  \____/| .__/ \___/|_| |_| |_|
        | |
        |_|

 ➜ Jpom \﻿ (•◡•) / (v2.9.15)
Jpom[2.9.15] Current data path：/usr/local/jpom-server External configuration file path：file:/usr/local/jpom-server/extConfig.yml
Jpom Successful start preparation. start loading module
start load h2 db
h2 db Successfully loaded, url is 【jdbc:h2:/usr/local/jpom-server/db/Server;CACHE_SIZE=10240;MODE=MYSQL;LOCK_TIMEOUT=10000】
Server Successfully started,Can use happily => http://172.28.110.24:2122 【The current address is for reference only】
Time-consuming to start this time：4秒246毫秒
2022-11-23 11:02:01,085 WARN [pool-1-thread-2] i.j.s.u.TriggerTokenLogServer [TriggerTokenLogServer.java:156]- x:() TriggerToken status recover,user list empty
There is no docker service local java.io.IOException: com.sun.jna.LastErrorException: [2] No such file or directory


```

访问`2122`端口设置账号密码

![image-20221123110639435](/imgs/oss/picGo/image-20221123110639435.png)

懒得配置两步验证，忽略

![image-20221123111013148](/imgs/oss/picGo/image-20221123111013148.png)

