---
title: ubuntu设置mysql远程访问
date: 2022-04-11 12:32:08
tags: 运维
---

> 死亡，就像是水消失在水中。——博尔赫斯《另一次死亡》

找到`mysql`配置文件

```shell
cat /etc/mysql/my.cnf
```

发现这里提示配置文件放到了这下面

```shell
!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/
```

第一个是`mysql`客户端的配置文件目录

第二个是`mysql`服务端配置文件目录

我们找到第二个

```shell
vim /etc/mysql/mysql.conf.d/mysqld.cnf
```

注释掉

```shell
# bind-address          = 127.0.0.1
```

顺便加上忽略大小写

```shell
lower_case_table_names = 1
```

重启`mysql`服务

```shell
service mysql restart
```

