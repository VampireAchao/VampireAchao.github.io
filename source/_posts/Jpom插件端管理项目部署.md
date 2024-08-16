---
title: Jpom插件端管理项目部署
date: 2022-12-03 16:28:12
tags:
---

> 礼尚往来，往而不来非礼也；来而不往亦非礼也——佚名

安装`Jpom`插件端：

```shell
root@iZuf6afyp0j8anyom0ro8zZ:~# apt-get install -y wget && wget -O install.sh https://jpom.top/docs/install.sh && bash install.sh Agent
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
wget is already the newest version (1.21.2-2ubuntu1).
The following package was automatically installed and is no longer required:
  squashfs-tools
Use 'apt autoremove' to remove it.
0 upgraded, 0 newly installed, 0 to remove and 3 not upgraded.
--2022-11-25 16:47:41--  https://jpom.top/docs/install.sh
Resolving jpom.top (jpom.top)... 125.77.142.123, 125.77.141.131, 140.249.61.209, ...
Connecting to jpom.top (jpom.top)|125.77.142.123|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 6094 (6.0K) [text/x-sh]
Saving to: ‘install.sh’

install.sh                      100%[=======================================================>]   5.95K  --.-KB/s    in 0s      

2022-11-25 16:47:41 (3.72 GB/s) - ‘install.sh’ saved [6094/6094]

默认安装目录 /usr/local/jpom-agent, 是否使用此目录作为安装目录? 输入 y 确定, 否则请输入安装目录, 需要使用绝对路径 (注意: agent 和 server 不能装到同一个目录!)：y
开始安装：Agent  , 安装目录 /usr/local/jpom-agent
--2022-11-25 16:47:48--  https://download.jpom.top/release/2.9.15/agent-2.9.15-release.tar.gz
Resolving download.jpom.top (download.jpom.top)... 122.228.7.243, 122.228.7.241, 122.228.7.242, ...
Connecting to download.jpom.top (download.jpom.top)|122.228.7.243|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 30112212 (29M) [application/gzip]
Saving to: ‘Agent.tar.gz’

Agent.tar.gz                    100%[=======================================================>]  28.72M  18.2MB/s    in 1.6s    

2022-11-25 16:47:50 (18.2 MB/s) - ‘Agent.tar.gz’ saved [30112212/30112212]

KeepBx-Agent-System-JpomAgentApplication
/usr/local/jpom-agent/
/usr/local/jpom-agent/agent.log
automatic running：agent-2.9.15.jar
  _   | | '_ \ / _ \| '_ ` _ \
 | |__| | |_) | (_) | | | | | |
  \____/| .__/ \___/|_| |_| |_|
        | |
        |_|

 ➜ Jpom \﻿ (•◡•) / (v2.9.15)
Jpom[2.9.15] Current data path：/usr/local/jpom-agent External configuration file path：file:/usr/local/jpom-agent/extConfig.yml
Jpom Successful start preparation. start loading module
Automatically generate authorized account:jpomAgent  password:[你的密码]  Authorization information storage location：/usr/local/jpom-agent/data/agent_authorize.json
Agent Successfully started,Please go to the server to configure and use,Current node address => http://localhost:2123 【The current address is for reference only】
Time-consuming to start this time：3秒20毫秒
root@iZuf6afyp0j8anyom0ro8zZ:~# 
```

记下来上面的密码，新建个节点

![image-20221125165436190](/imgs/oss/picGo/image-20221125165436190.png)

然后就可以点击管理进入节点界面

![image-20221125165535758](/imgs/oss/picGo/image-20221125165535758.png)

配置一下项目路径(别忘了去页面最下面点保存)

![image-20221125170441449](/imgs/oss/picGo/image-20221125170441449.png)

新建个项目

![image-20221125170842290](/imgs/oss/picGo/image-20221125170842290.png)

提示必须填写路径，可我的`jar`路径就是在`/test/`目录下

![image-20221125171203488](/imgs/oss/picGo/image-20221125171203488.png)

只好修改路径了，新建个`/test/management-back/`

路径改好了重新配置一下

![image-20221125173330030](/imgs/oss/picGo/image-20221125173330030.png)

这次可以保存了

点一下控制台

![image-20221125173646762](/imgs/oss/picGo/image-20221125173646762.png)

点击启动

![image-20221125173844058](/imgs/oss/picGo/image-20221125173844058.png)

我们配置一下构建列表原来的脚本，改为`Jpom`项目

![image-20221125174826890](/imgs/oss/picGo/image-20221125174826890.png)

重新构建一下试试，成功

![image-20221125175231357](/imgs/oss/picGo/image-20221125175231357.png)

前端项目也一样，选择文件类型即可

![image-20221125181543370](/imgs/oss/picGo/image-20221125181543370.png)

构建列表

![image-20221125181728697](/imgs/oss/picGo/image-20221125181728697.png)

