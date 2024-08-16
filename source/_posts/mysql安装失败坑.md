---
title: mysql安装失败坑
date: 2021-12-15 20:39:05
tags: 数据库
---

>来是偶然，走是必然。——林清玄

今天安装`mysql`遇到个问题：

`mysql windows msi`下载地址：

https://cdn.mysql.com//Downloads/MySQLInstaller/mysql-installer-community-8.0.27.1.msi

```shell
MySQL error 1042: Unable to connect to any of the specified MySQL hosts.
```

![image-20211215204139220](/imgs/oss/picGo/image-20211215204139220.png)

我们进行处理这个问题：

![image-20211215205001974](/imgs/oss/picGo/image-20211215205001974.png)

![image-20211215204717573](/imgs/oss/picGo/image-20211215204717573.png)

![image-20211215204738210](/imgs/oss/picGo/image-20211215204738210.png)

![image-20211215204751846](/imgs/oss/picGo/image-20211215204751846.png)

![image-20211215204801706](/imgs/oss/picGo/image-20211215204801706.png)

![image-20211215204813896](/imgs/oss/picGo/image-20211215204813896.png)

![image-20211215204824257](/imgs/oss/picGo/image-20211215204824257.png)

于是我又重装了一遍，因为我们服务已经安装成功了：

![img](/imgs/oss/picGo/G68ZZ%7DHB%5D12YUIAIEOW9J8V.png)

![image-20211215204454784](/imgs/oss/picGo/image-20211215204454784.png)

所以要卸载服务：

首先打开注册表：

![image-20211215204531947](/imgs/oss/picGo/image-20211215204531947.png)

![image-20211215204546310](/imgs/oss/picGo/image-20211215204546310.png)

然后重启电脑再安装就装好啦！

![image-20211215204623500](/imgs/oss/picGo/image-20211215204623500.png)