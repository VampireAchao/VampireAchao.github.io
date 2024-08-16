---
title: virtualbox+centos8安装
date: 2021-02-02 19:58:27
tags: 运维
---

> 惟有悲观净化而成的乐观，才是真正的乐观。——尼采

首先是[下载](https://download.virtualbox.org/virtualbox/6.1.18/VirtualBox-6.1.18-142142-Win.exe)

然后是安装

![image-20210202200936271](/imgs/oss/picGo/image-20210202200936271.png)

一直下一步就行了

这里点击安装

![image-20210202200256575](/imgs/oss/picGo/image-20210202200256575.png)

然后去下载`centos8`的镜像

访问[阿里云镜像地址](http://mirrors.aliyun.com/centos/8/isos/x86_64/)

选这个就好

![image-20210202200448560](/imgs/oss/picGo/image-20210202200448560.png)

然后我们打开`virtualBox`点击新建

![image-20210202201058352](/imgs/oss/picGo/image-20210202201058352.png)

输入名称、选择类型和版本点击下一步

![image-20210202201127134](/imgs/oss/picGo/image-20210202201127134.png)

然后分配内存

![image-20210202201154366](/imgs/oss/picGo/image-20210202201154366.png)

选择现在创建虚拟硬盘

![image-20210202201211109](/imgs/oss/picGo/image-20210202201211109.png)

直接下一步

![image-20210202201228598](/imgs/oss/picGo/image-20210202201228598.png)

下一步

![image-20210202201237453](/imgs/oss/picGo/image-20210202201237453.png)

然后酌情选择虚拟硬盘大小

![image-20210202201318413](/imgs/oss/picGo/image-20210202201318413.png)

然后点击设置

![image-20210202201411719](/imgs/oss/picGo/image-20210202201411719.png)

找到储存，点击没有盘片，然后点击右边的光盘，选择虚拟盘

![image-20210202201535973](/imgs/oss/picGo/image-20210202201535973.png)

选择我们刚才下载的`ISO`镜像，点击打开

![image-20210202201630460](/imgs/oss/picGo/image-20210202201630460.png)

点击`OK`后我们启动虚拟机

![image-20210202201705430](/imgs/oss/picGo/image-20210202201705430.png)

点击显示即可操作

![image-20210202201754830](/imgs/oss/picGo/image-20210202201754830.png)

当然，上面选择正常启动也是一样的效果

稍加等待，选择中文

![image-20210202201921103](/imgs/oss/picGo/image-20210202201921103.png)

这个时候我们是没联网的状态，我们在外面打开虚拟机设置，选择网络，设置为桥接并选择你的网卡

![image-20210202202117806](/imgs/oss/picGo/image-20210202202117806.png)

点击OK后我们找到网络和主机名

![image-20210202202209991](/imgs/oss/picGo/image-20210202202209991.png)

点击打开，然后完成

![image-20210202202244334](/imgs/oss/picGo/image-20210202202244334.png)

选择安装目的地，然后点击完成

![image-20210202202316502](/imgs/oss/picGo/image-20210202202316502.png)

选择安装源

![image-20210202202340839](/imgs/oss/picGo/image-20210202202340839.png)

然后输入

> mirrors.aliyun.com/centos/8/BaseOS/x86_64/os

点击完成

![image-20210202202458055](/imgs/oss/picGo/image-20210202202458055.png)

然后点击软件选择

![image-20210202202538422](/imgs/oss/picGo/image-20210202202538422.png)

选择最小安装

![image-20210202202551688](/imgs/oss/picGo/image-20210202202551688.png)

点击完成后，在外面选择根密码设置`root`密码

![image-20210202202649807](/imgs/oss/picGo/image-20210202202649807.png)

设置完毕后点击开始安装

![image-20210202202706334](/imgs/oss/picGo/image-20210202202706334.png)

安装完成后重启系统

![image-20210202203515048](/imgs/oss/picGo/image-20210202203515048.png)

输入用户名和密码

![image-20210202203609365](/imgs/oss/picGo/image-20210202203609365.png)

如果我们不小心忘记了设置的密码，也可以在这个界面按`E`键

![image-20210202204214799](/imgs/oss/picGo/image-20210202204214799.png)

找到`ro`修改为`rw init=/sysroot/bin/bash`

![image-20210202204542093](/imgs/oss/picGo/image-20210202204542093.png)

然后按`ctrl+x`

输入`chroot /sysroot/`

然后输入`LANG=en`

接下来是`passwd`

然后输入密码，如果太短需要再输入一次确认

![image-20210202204755773](/imgs/oss/picGo/image-20210202204755773.png)

然后按`ctrl+d`

输入`reboot`

![image-20210202204921549](/imgs/oss/picGo/image-20210202204921549.png)

然后我们的密码即可登录啦

![image-20210202210812712](/imgs/oss/picGo/image-20210202210812712.png)

