---
title: Gitlab的安装
date: 2020-07-14 19:28:58
tags: java
---

### Gitlab安装

1.安装相关依赖

```shell
yum -y install policycoreutils openssh-server openssh-clients postfix
```

2.启动ssh服务&设置为开机启动

```shell
systemctl enable sshd && sudo systemctl start sshd
```

3.设置postfix开机自启，并启动，postfix支持gitlab发信功能

```shell
systemctl enable postfix && sudo systemctl start postfix
```

如果报这个错

```shell
Job for postfix.service failed because the control process exited with error code. See "systemctl status postfix.service" and "journalctl -xe" for details.
```

可以采取以下解决方案

```shell
#修改 /etc/postfix/main.cf的设置
#别写反了。。。
inet_protocols = ipv4
inet_interfaces = all
```

4.开放ssh以及http服务，然后重新加载防火墙列表

```shell
firewall-cmd --add-service=ssh --permanent
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
```

5.下载gitlab包，并且安装

```shell
#在线下载安装包
wget https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/yum/el7/gitlab-ce-12.4.2-ce.0.el7.x86_64.rpm
rpm -i gitlab-ce-12.4.2-ce.0.el7.x86_64.rpm
```

6.修改gitlab配置

```shell
vi /etc/gitlab/gitlab.rb
```

修改gitlab访问地址和端口，默认80，我们改成82，改这两处

```shell
external_url 'https://121.89.163.191:82'
nginx['listen_port']=82
```

7.重载配置及启动gitlab

```shell
gitlab-ctl reconfigure
gitlab-ctl restart
```

8.把端口添加到防火墙

```shell
firewall-cmd --zone=public --add-port=82/tcp --permanent
firewall-cmd --reload
```

如果一直502，查看8080端口是否被占用

```shell
#查看端口
netstat -ntpl
#停止端口
kill -9 4789
```

之后重启

```shell
gitlab-ctl restart
```

进去了后改密码...

左上角创建一个group（有手就行）

<img src="/imgs/oss/picGo20200714193142.png" alt="gitlab" style="zoom:100%;" />

new project

### 接下来是push项目

创建项目，8088端口

然后在idea的

> VCS->Enable Version Control Integration...

![image-20200804222027830](/imgs/oss/picGo/image-20200804222027830.png)

打开后选择`Git`创建版本控制库

![image-20200804222050074](/imgs/oss/picGo/image-20200804222050074.png)

![image-20200804222146217](/imgs/oss/picGo/image-20200804222146217.png)

开始写代码

然后右键项目根路径`Add`代码，`commit`代码...

![image-20200804222759496](/imgs/oss/picGo/image-20200804222759496.png)

![image-20200804222858444](/imgs/oss/picGo/image-20200804222858444.png)

![image-20200804223327715](/imgs/oss/picGo/image-20200804223327715.png)

![image-20200804223402838](/imgs/oss/picGo/image-20200804223402838.png)

![image-20200804223435012](/imgs/oss/picGo/image-20200804223435012.png)

以及`Remotes`里添加我们的远程仓库

![image-20200804223502609](/imgs/oss/picGo/image-20200804223502609.png)

`push`

![image-20200804223638515](/imgs/oss/picGo/image-20200804223638515.png)

也可以去管理远程仓库

![image-20200804223733362](/imgs/oss/picGo/image-20200804223733362.png)

![image-20200804223834907](/imgs/oss/picGo/image-20200804223834907.png)

对了，中途弹出的输入用户名和密码

如果密码输错了，可以去

`windows`控制面板->用户账户->凭据管理器找到`windows`凭据

然后删除对应的凭据就行了

![image-20200804224042359](/imgs/oss/picGo/image-20200804224042359.png)