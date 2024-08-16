---
title: mysql having报错this is incompatible with sql_mode=only_full_group_by
date: 2023-02-16 21:02:12
tags: 数据库
---

> 该得到荣誉却未得到，比不该得到荣誉而得到要好得多。——马克·吐温

今天遇到个报错

![image-20230216210618239](/imgs/oss/blog/vampireachao/image-20230216210618239.png)

发现原来是`MYSQL 8`不支持在`sql_mode`包含`only_full_group_by`时(默认包含)

`HAVING`的条件里有 非聚合字段 以外的字段

文档：

> - [`ONLY_FULL_GROUP_BY`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_only_full_group_by)
>
>   
>
>   Reject queries for which the select list, `HAVING` condition, or `ORDER BY` list refer to nonaggregated columns that are neither named in the `GROUP BY` clause nor are functionally dependent on (uniquely determined by) `GROUP BY` columns.
>
>   A MySQL extension to standard SQL permits references in the `HAVING` clause to aliased expressions in the select list. The `HAVING` clause can refer to aliases regardless of whether [`ONLY_FULL_GROUP_BY`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_only_full_group_by) is enabled.
>
>   For additional discussion and examples, see [Section 12.20.3, “MySQL Handling of GROUP BY”](https://dev.mysql.com/doc/refman/8.0/en/group-by-handling.html).

解决办法：

打开`mysql`的配置文件，修改或添加`sql_mode`

```sql
[mysqld]
sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

只要确保没有[`ONLY_FULL_GROUP_BY`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_only_full_group_by)即可