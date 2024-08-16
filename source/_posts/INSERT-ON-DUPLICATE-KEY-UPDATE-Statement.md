---
title: INSERT ... ON DUPLICATE KEY UPDATE Statement
date: 2022-02-06 12:37:07
tags: 数据库
---

> 打开`mysql`文档，总会有新发现。——碧安瑶
>

我们在使用`INSERT`语句时，有时会有这样的需求，不存在就新增，存在就更新

此时我们可以使用`INSERT ... ON DUPLICATE KEY UPDATE`语句

就像[`mysql`官方文档](https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html)中提到的那样，我们如果将`a`列设为`UNIQUE`唯一索引或者主键时，并且当前表已经存在了`a=1`的数据，对于这种情况，下面两条`sql`的结果是相等的

当然如果不满足上方条件，则会新增一条数据

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3)
  ON DUPLICATE KEY UPDATE c=c+1;

UPDATE t1 SET c=c+1 WHERE a=1;
```

对于`InnoDB`引擎的表，此处的新增可能会触发自增列，但修改操作不会触发

如果上方的唯一索引再加一个`b`列，则上方第一条`sql`和下方`sql`结果相等

```mysql
UPDATE t1 SET c=c+1 WHERE a=1 OR b=2 LIMIT 1;
```

注意如果此处`a=1 or b=2`匹配多行，则只会更新一行，所以我们需要避免在有多个唯一索引的表上使用本语法

我们在表内没有满足条件的数据时执行该`sql`，返回影响行数为`1`

![image-20220206145004474](/imgs/oss/picGo/image-20220206145004474.png)

我们再次执行

可以看到影响行数为`2`

![image-20220206145033807](/imgs/oss/picGo/image-20220206145033807.png)

这说明新增操作返回`1`，修改操作返回`2`

但如果我们修改的值没有变化，则为`0`，例如：

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3)
  ON DUPLICATE KEY UPDATE c=c,b=b;
```

![image-20220206150424175](/imgs/oss/picGo/image-20220206150424175.png)

如果使用 [`mysql_real_connect()`](https://dev.mysql.com/doc/c-api/8.0/en/mysql-real-connect.html)来连接`mysql`，修改的值没有变化时，还是返回`1`

并且如果我们触发了自增，也可以使用 [`LAST_INSERT_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_last-insert-id)函数获取自增后的值

我们还可以在`ON DUPLICATE KEY UPDATE`后方使用`VALUES`函数来获取上方`INSERT`语句中某列的值例如

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3),(4,5,6)
  ON DUPLICATE KEY UPDATE c=VALUES(a)+VALUES(b);
```

上面的`sql`和下面这条`sql`执行结果也是相同的

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3)
  ON DUPLICATE KEY UPDATE c=3;
INSERT INTO t1 (a,b,c) VALUES (4,5,6)
  ON DUPLICATE KEY UPDATE c=9;
```

> 从 MySQL 8.0.20开始，不推荐使用 VALUES ()来引用新的行和列，并且在将来的 MySQL 版本中可能会删除。相反，应该使用行和列别名

`Mysql8.0.19`之后，我们可以给表和列取别名，例如：

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3),(4,5,6) AS table1
  ON DUPLICATE KEY UPDATE c = table1.a+table1.b;
```

以及

```mysql
INSERT INTO t1 (a,b,c) VALUES (1,2,3),(4,5,6) AS table1(m,n,p)
  ON DUPLICATE KEY UPDATE c = m+n;
```

就先写这么多吧