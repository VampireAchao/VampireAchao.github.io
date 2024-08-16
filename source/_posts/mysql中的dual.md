---
title: mysql中的dual
date: 2021-07-24 23:35:57
tags: 数据库
---

> 许多人都是由于本身软弱而做出问心有愧的事来的，并非都是蓄意背信弃义。——拉罗什富科

前两天看到项目中有这样一句`SQL`

```mysql
SELECT (SELECT username FROM `user_2018` WHERE id = 1) username,(SELECT `password` FROM `user_2019` WHERE id = 1) `password` FROM DUAL;
```

最后这里有一个`FROM DUAL`

我没有在数据库中找到`DUAL`表，它是一个关键字

但我们就算去掉`FROM DUAL`，也能成功执行

```mysql
SELECT (SELECT username FROM `user_2018` WHERE id = 1) username,(SELECT `password` FROM `user_2019` WHERE id = 1) `password`;
```

而且很多类似的例子

```mysql
-- 查询当前时间
SELECT NOW() FROM DUAL;
-- 查询当前数据库版本号
SELECT VERSION() FROM DUAL;
```

我们去掉后面的`FROM DUAL`，仍然能得到同样的结果

网上很多博客文章写的`DUAL`可用于虚拟列名，效果如下

![image-20210724234916670](/imgs/oss/picGo/image-20210724234916670.png)

但我实际测试过，哪怕就是不加`FROM DUAL`，也是一样的

![image-20210724234846425](/imgs/oss/picGo/image-20210724234846425.png)

稍微了解了下，`DUAL`在`ORACLE`中作为特殊的表存在

但在`MYSQL`中它好像确实没用，因此加不加`FROM DUAL`都无所谓。。。

个人推测可能是`MYSQL`中默认省略了`FROM DUAL`？
