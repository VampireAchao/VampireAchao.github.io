---
title: mysql连接数满了怎么调大
date: 2021-11-30 20:54:23
tags: 数据库
---

> 人生应该如蜡烛一样，从顶燃到底，一直都是光明。——萧楚女

今天链接数据库发现提示`too many connections`

于是临时把`mysql`连接数调大了一点

查看参数`sql`：

```mysql
show variables;
```

![image-20211130210004550](/imgs/oss/picGo/image-20211130210004550.png)

设置连接数：

```mysql
set GLOBAL max_connections=99999;
```

