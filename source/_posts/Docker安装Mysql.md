---
title: Docker安装Mysql
date: 2020-07-08 20:42:18
tags: 运维
---

命令(记得端口被占用了要改哦)

如果报

```shell
No chain/target/match by that name
```

输入

```shell
systemctl restart docker
```

重启一下就好了

```shell
# docker 中下载 mysql
docker pull mysql
#启动
docker run --name mysql-demo -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql
#进入容器
docker exec -it mysql-demo bash
#登录mysql
mysql -u root -proot
#添加远程登录用户
ALTER USER 'root'@'localhost' IDENTIFIED BY 'root';
CREATE USER 'mysql'@'%' IDENTIFIED WITH mysql_native_password BY 'root';
GRANT ALL PRIVILEGES ON *.* TO 'mysql'@'%';
```

还可以在配置文件里加一个

```shell
[mysqld]		#在这下面加
#让mysql不区分大小写
lower_case_table_names=1
```

对了，如果是宝塔面板安装，记得**是在左侧菜单栏**中改mysql的root账户的密码哦~