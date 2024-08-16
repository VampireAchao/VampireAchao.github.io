---
title: docker实现mysql主从复制
date: 2020-12-12 20:04:58
tags: 运维
---

> 有了钱，在这个世界上可以做很多事，就是无法用钱来买青春。 ——雷蒙德

1.安装主库

1.1 先准备`mysql`配置文件，`my.cnf`

```java
# Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

#
# The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/
## 同一局域网内注意要唯一
server-id=100  
## 开启二进制日志功能，可以随便取（关键）
log-bin=mysql-bin
```

1.2 下载镜像，制作容器

```
docker pull mysql
docker run -p 3306:3306 --name mysql8 -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -v $PWD/my.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=123456  -d mysql --lower_case_table_names=1
```

```shell
# 把配置文件挂载到容器中，因为容器内部不能使用vi
-v $PWD/my.cnf:/etc/mysql/my.cnf
```

1.3允许root 远程登录

```java
docker exec -it mysql8 /bin/bash
mysql -uroot -p
mysql> GRANT ALL ON *.* TO 'root'@'%';
mysql> flush privileges;
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER;
mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
mysql> flush privileges;
```

1.4 创建数据同步用户

在`Master`数据库创建数据同步用户，授予用户` slave REPLICATION SLAVE`权限和`REPLICATION CLIENT`权限，用于在主从库之间同步数据。

```java
CREATE USER 'slave'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'slave'@'%';
```

2. 安装从库

2.1 准备配置文件，`my2.cnf`

```java
# Copyright (c) 2017, Oracle and/or its affiliates. All rights reserved.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; version 2 of the License.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301 USA

#
# The MySQL  Server configuration file.
#
# For explanations see
# http://dev.mysql.com/doc/mysql/en/server-system-variables.html

[mysqld]
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
datadir         = /var/lib/mysql
secure-file-priv= NULL

# Custom config should go here
!includedir /etc/mysql/conf.d/
## 设置server_id,注意要唯一
server-id=101  
## 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
log-bin=mysql-slave-bin   
## relay_log配置中继日志
relay_log=edu-mysql-relay-bin  
```

2.1 制作容器

```java
docker run -p 3307:3306 --name mysql8-2 -v $PWD/conf2:/etc/mysql/conf.d -v $PWD/logs2:/logs -v $PWD/data2:/var/lib/mysql -v $PWD/my2.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=123456  -d mysql --lower_case_table_names=1
```

然后重复1.3

2.2 链接Master(主)和Slave(从)

在主库中进入`mysql`，执行

```java
flush logs;
show master status;
```

记住`file`和`position`

期间主库不要进行任何操作，然后在从库中执行

```java
change master to master_host='172.17.0.3', master_user='slave', master_password='123456', master_port=3306, master_log_file='mysql-bin.000004', master_log_pos= 156, master_connect_retry=30;
```

**master_host** ：Master的地址，指的是容器的独立ip,可以通过`docker inspect --format='{ {.NetworkSettings.IPAddress} }' 容器名称|容器id` 查询容器的ip

**master_port**：Master的端口号，指的是容器的端口号

**master_user**：用于数据同步的用户

**master_password**：用于同步的用户的密码

**master_log_file**：指定 Slave 从哪个日志文件开始复制数据，即上文中提到的 File 字段的值

**master_log_pos**：从哪个 Position 开始读，即上文中提到的 Position 字段的值

**master_connect_retry**：如果连接失败，重试的时间间隔，单位是秒，默认是60秒

2.3 在Slave 中的mysql终端执行`show slave status \G`;用于查看主从同步状态。

![blogmysql](/imgs/oss/picGo/blogmysql.png)

正常情况下，`Slave_IO_Running `和` Slave_SQL_Running` 都是No，因为我们还没有开启主从复制过程。使用`start slave`开启主从复制过程，然后再次查询主从同步状态 `show slave status \G;`。

![blogmysql2](/imgs/oss/picGo/blogmysql2.png)

看到两个yes就成功了。

2.4 验证

测试主从复制方式就十分多了，最简单的是在Master创建一个数据库，然后检查Slave是否存在此数据库。

3. 再配置一个从数据库

```java
docker run -p 3308:3306 --name mysql8-3 -v $PWD/conf3:/etc/mysql/conf.d -v $PWD/logs3:/logs -v $PWD/data3:/var/lib/mysql -v $PWD/my2.cnf:/etc/mysql/my.cnf -e MYSQL_ROOT_PASSWORD=123456  -d mysql --lower_case_table_names=1
```

然后重复步骤2.2,2.3就行了