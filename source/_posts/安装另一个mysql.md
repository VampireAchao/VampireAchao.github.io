---
title: 安装另一个mysql
date: 2022-02-21 21:00:51
tags: 数据库
---

> 生命中的全部偶然，其实都是命中注定。是为宿命。——《宿命》

首先下载：

https://downloads.mysql.com/archives/community/

我这里下载`5.7`

![image-20220221210452853](/imgs/oss/picGo/image-20220221210452853.png)

下载完了解压

解压后目录如下

![image-20220221211505434](/imgs/oss/picGo/image-20220221211505434.png)

我们新建一个`my.ini`

```ini
[mysqld]
# 端口
port=3305
# 安装目录
basedir=D:\environment\mysql5
# 数据目录
datadir=D:\environment\mysql5\data
# 最大连接数
max_connections=200
# 连接失败最大次数
max_connect_errors=10
# 默认字符集
character-set-server=utf8
# 默认存储引擎
default-storage-engine=INNODB
# 认证方式
# mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 客户端默认字符集
default-character-set=utf8
[client]
# 客户端端口
port=3305
```

然后保存，新建一个空的`data`文件夹

然后我们到`bin`目录下运行初始化命令

```shell
mysqld --initialize --console
```

![image-20220221212016311](/imgs/oss/picGo/image-20220221212016311.png)

注意此处会打印临时密码

然后是安装

```shell
mysqld --install MYSQL5
```

最后连接

```shell
mysql -uroot -p
```

输入上方的临时密码后进入，更改密码：

```mysql
alter user user() identified by "密码";
```

最后效果：

![image-20220221212425985](/imgs/oss/picGo/image-20220221212425985.png)