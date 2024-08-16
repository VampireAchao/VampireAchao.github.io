---
title: mysql join
date: 2020-08-14 19:23:06
tags: 数据库
---

首先先放张图

![](https://www.runoob.com/wp-content/uploads/2019/01/sql-join.png)

今天聊聊`mysql`表`join`连接，其本质是拿主表每条数据取出来和子表每行数据进行循环比较，如果满足则返回，不满足返回`null`

首先是内连接

两者之间取交集，两边都满足返回，不满足不返回

语法很简单

```mysql
SELECT
	* 
FROM
	tb_goods a
	INNER JOIN tb_goods_desc b 
WHERE
	a.id = b.goods_id
```

其中，`INNER`可以省略掉只写个`JOIN`

然后是左外连接

左外连接，此时可以理解为理解 左表为主表，右表为子表。在条件不满足时，左表数据存在，右表数据为`null`

简单来说就是结果集包含左表所有行，右表不匹配则为`null`

```mysql
SELECT
	* 
FROM
	sp_user a
	LEFT OUTER JOIN tb_seller b ON a.seller_id = b.seller_id 
```

其中，`OUTER`可省略

反向操作一波就是右外连接

```mysql
SELECT
	* 
FROM
	tb_seller a
	RIGHT OUTER JOIN sp_user b ON a.seller_id = b.seller_id 
WHERE
	b.seller_id IS NULL
```

还有一种是全外连接

全外连接是内联结果和不满足条件的行

`mysql`不支持全外连接语法，所以我们用`UNION`实现全外连接

```mysql
SELECT
	* 
FROM
	sp_user a
	LEFT OUTER JOIN tb_seller b ON a.seller_id = b.seller_id UNION
SELECT
	* 
FROM
	sp_user a
	RIGHT OUTER JOIN tb_seller b ON FALSE
```

另外，阿里开发规范表示

> 【强制】超过三个表禁止 join。需要 join 的字段，数据类型必须绝对一致；多表关联查询 时，保证被关联的字段需要有索引。

