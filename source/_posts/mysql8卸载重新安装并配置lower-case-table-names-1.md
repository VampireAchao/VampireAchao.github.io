---
title: mysql8卸载重新安装并配置lower_case_table_names=1
date: 2022-12-01 12:55:53
tags: 运维
---

> 酒食上得来的朋友，等到酒尽樽空，转眼成为路人——莎士比亚

因为`mysql8`不支持在已经初始化完成后再进行配置`lower_case_table_names`

我这里卸载重装(重新初始化应该也可以吧？)

```shell
# 卸载
root@iZuf6afyp0j8anyom0ro8zZ:~# apt purge mysql-* -y
# 查看是否还有残余依赖
root@iZuf6afyp0j8anyom0ro8zZ:~# dpkg --list|grep mysql
# 删除数据目录以及配置文件目录
root@iZuf6afyp0j8anyom0ro8zZ:~# rm -rf /var/lib/mysql /etc/mysql/
```

安装，执行

```shell
apt-get install mysql-server -y
```

修改配置文件`/etc/mysql/mysql.conf.d/mysqld.cnf`

```shell
cd /etc/mysql/mysql.conf.d/
```

修改字符集以及配置表名以小写形式存储，并且在比较时不区分大小写

```conf
[mysqld]
character_set_server = utf8mb4
lower_case_table_names = 1
# 注释掉 bind-address		= 127.0.0.1
```

然后重建数据目录

```shell
root@iZuf6afyp0j8anyom0ro8zZ:~# rm -rf /var/lib/mysql
root@iZuf6afyp0j8anyom0ro8zZ:~# mkdir /var/lib/mysql
root@iZuf6afyp0j8anyom0ro8zZ:~# chown mysql:125 /var/lib/mysql
# 初始化数据库
root@iZuf6afyp0j8anyom0ro8zZ:/etc/mysql/mysql.conf.d# /usr/sbin/mysqld --initialize --user=root --lower-case-table-names=1
# 重启mysql看看有没有报错
root@iZuf6afyp0j8anyom0ro8zZ:~# systemctl restart mysql
```

查看初始密码

```shell
root@iZuf6afyp0j8anyom0ro8zZ:/var/lib/mysql# grep "A temporary password" /var/log/mysql/error.log
2022-11-24T02:35:31.584059Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: =mg&eZ8sA%TV
```

重连终端，进到`mysql`

```shell
root@iZuf6afyp0j8anyom0ro8zZ:/var/lib/mysql# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 811
Server version: 8.0.31-0ubuntu0.22.04.1

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password by 'mysql数据库root密码';
Query OK, 0 rows affected (0.00 sec)
```

然后`root`密码设好了，尝试登陆一下

```shell
root@iZuf6afyp0j8anyom0ro8zZ:~# mysql -uroot -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 17
Server version: 8.0.31-0ubuntu0.22.04.1 (Ubuntu)

Copyright (c) 2000, 2022, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

创建`mysql`远程用户、设置密码

```shell
mysql> CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
Query OK, 0 rows affected (0.01 sec)

mysql> use mysql;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> UPDATE user SET host = '%' WHERE user = 'mysql';
Query OK, 0 rows affected (0.00 sec)
Rows matched: 1  Changed: 0  Warnings: 0
```

创建数据库并赋予权限

```shell
mysql> create database test default charset utf8mb4 COLLATE utf8mb4_general_ci;
Query OK, 1 row affected (0.01 sec)

# 赋予'mysql'@'%'数据库为test的所有权限
mysql> GRANT ALL ON test.* TO 'mysql'@'%';
Query OK, 0 rows affected (0.01 sec)
# 从MySQL系统授权表中重新读取权限
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)
```

防火墙开放端口

```shell
 iptables -A INPUT -p tcp --dport 3306 -j ACCEPT
```

然后连接

![image-20221123171345307](/imgs/oss/picGo/image-20221123171345307.png)

