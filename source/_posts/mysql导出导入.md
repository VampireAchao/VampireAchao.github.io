---
title: mysql导出导入
date: 2022-02-22 21:26:17
tags: 数据库
---

> 成熟意味着停止展示自己并学会隐藏自己。——《失踪的孩子》
>

官方文档：https://dev.mysql.com/doc/refman/8.0/en/backup-and-recovery.html

我们可以使用`mysql`自带的导出工具`mysqldump`进行导出，我们进入到`mysql`的`bin`目录，运行命令

```shell
mysqldump -u[用户名] -p --default-character-set=[编码格式] --databases [数据库名] > [导出路径]
```

例如我此处的：

```shell
mysqldump -uroot -p --default-character-set=utf8 --databases test > D:\file\tmp\xxx.sql
```

输入完毕后需要输入密码，我们输入就行了

![image-20220222212924262](/imgs/oss/picGo/image-20220222212924262.png)

然后我们可以在`mysql`客户端中使用`source`命令，首先连接`mysql`

```shell
mysql -uroot -p
```

输入密码后我们切换到想导入的数据库

```mysql
use test;
```

然后使用`source`

```mysql
source D:/file/tmp/xxx.sql;
```

注意反斜杠转义问题

![image-20220222213334575](/imgs/oss/picGo/image-20220222213334575.png)

我们再次`show tables;`

![image-20220222213407601](/imgs/oss/picGo/image-20220222213407601.png)

可以看到成功导入