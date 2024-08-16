---
title: Centos7防火墙命令
date: 2020-07-17 20:10:26
tags: 运维
---
记点防火墙常用命令

```shell
#重启防火墙
systemctl restart firewalld
#启动防火墙
systemctl start firewalld
#关闭防火墙
systemctl stop firewalld
#禁用防火墙
systemctl disable firewalld
#查看防火墙状态
systemctl status firewalld
#帮助（太多了，于是记几个常用的）
firewall-cmd --help
#重载防火墙配置
firewall-cmd --reload
#开放服务
firewall-cmd --add-service=ssh --permanent
#查看服务是否开放
firewall-cmd --query-service ftp
#关闭服务
firewall-cmd --remove-service=ftp --permanent
#防火墙添加端口
firewall-cmd --permanent --zone=public --add-port=8080/tcp
```

