---
title: explain
date: 2020-12-05 00:11:12
tags: 数据库
---

> 人们很少做他们相信是对的事，他们做比较方便的事，然后后悔。——鲍勃.迪伦

使用`explain`+`SQL`

作用：

表的读取顺序

数据读取操作的操作类型

哪些索引可以使用

哪些索引被实际使用

表之间的引用

每张表有多少行被优化器查询

![image-20201101225305101](/imgs/oss/picGo/image-20201101225305101.png)

> id select_type table partitions type possible_keys key key_len ref rows filtered Extra

#### **`id`**：查询的序列号，包含一组数字，表示查询中执行select字句或操作表的顺序

`id`值越大执行优先级越高，`id`相同情况下执行顺序从上到下

#### **`select_type`**：查询的类型，主要是用于区别普通查询、联合查询、子查询等的复杂查询

`simple`简单的`select`查询，不包含子查询、`UNION`

`primary`子查询的最外层

`subquery`子查询的内层

`derived`表示 `FROM`临时表，这个表被标记为衍生

`union`在`union`后面的查询，若`union`包含在`from`字句的子查询中，外层`select`被标记为`derived`

`union result`从`union`表获取结果的`select`

#### **`type`**：访问类型排列

从最好到最差

常用

> system>const>eq_ref>ref>range>index>ALL

`system`系统表

`const`通过索引一次就找到了，例如主键查询

```sql
explain select * from user where id = ""
```

`eq_ref`连表唯一条件

```sql
selec * from user,user_info where user.id = user_info.id
```

`ref`返回匹配某个单独值的所有行

```sql
explain SELECT * FROM `user` WHERE HOST = "%"
```

`range`范围查询

```sql
select * from user where id between 0 and 10
```

`index`全索引扫描

```
select id from user
```

`all`全表扫描

全部

`system>const>eq_ref>ref>fulltext>ref_or_null>index_merge>unique_subquery>range>index>ALL`

#### **`possible_keys`**：显示这张表可能用到的全部索引

#### **`key`**：实际用到的索引

#### **`key_length`**：索引使用的最大可能长度，为字节数，越短越好

#### **`ref`**：显示索引使用的列，const表示匹配常量

#### **`rows`**：估算查询需要读取的行数

#### **`Extra`**：额外信息

`Using filesort`：`mysql`无法利用索引完成的排序叫文件排序

`Using temporary`：使用了临时表

`Using index`：用到了覆盖索引(`Covering Index`:查询的列被索引覆盖)，同时出现`using where`，说明索引被用于查找，反之则用于读取数据

`Using where`：说明用到了`where`

`Using join buffer`：使用了连接缓存，多次`join`时出现

`impossible where`：`where`条件错误，例如`id = xxx and id = xxx`

`select tables optimized away`：没有`group by`时，优化`MIN/MAX`或者`COUNT(*)`

`distinct`：找到第一个匹配的元素后停止查找相同的值