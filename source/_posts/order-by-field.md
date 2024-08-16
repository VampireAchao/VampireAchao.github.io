---
title: order by field
date: 2022-12-11 17:28:11
tags: 数据库
---

> 勿以己才而笑不才——房玄龄

分享一个函数`field`

首先在`mysql`内置函数的文档地址能找到这个函数：

https://dev.mysql.com/doc/refman/8.0/en/built-in-function-reference.html

![image-20221211173340348](/imgs/oss/picGo/image-20221211173340348.png)

这里告诉我们，这个函数可以这么用，寻找第一个参数所在的下标位置，找不到为`0`：

```mysql
mysql> SELECT FIELD('Bb', 'Aa', 'Bb', 'Cc', 'Dd', 'Ff');
        -> 2
mysql> SELECT FIELD('Gg', 'Aa', 'Bb', 'Cc', 'Dd', 'Ff');
        -> 0
```

因为此处支持传入表字段

![image-20221211173925084](/imgs/oss/picGo/image-20221211173925084.png)

然后我们可以在查询时使用`ORDER BY FIELD(字段,已存在的排好序的字段值)`

![image-20221211173811043](/imgs/oss/picGo/image-20221211173811043.png)

