---
title: mysql数据库信息函数
date: 2022-02-10 17:52:01
tags: 数据库
---

> 我将仇恨写在冰上，然后期待太阳的升起。——加西亚马尔克斯

打开`mysql`官方文档：[`Information Functions`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database)

可以看到`mysql`查询库表信息的函数

> | Name                                                         | Description                                                  |
> | :----------------------------------------------------------- | :----------------------------------------------------------- |
> | [`BENCHMARK()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_benchmark) | Repeatedly execute an expression                             |
> | [`CHARSET()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_charset) | Return the character set of the argument                     |
> | [`COERCIBILITY()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_coercibility) | Return the collation coercibility value of the string argument |
> | [`COLLATION()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_collation) | Return the collation of the string argument                  |
> | [`CONNECTION_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_connection-id) | Return the connection ID (thread ID) for the connection      |
> | [`CURRENT_ROLE()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_current-role) | Return the current active roles                              |
> | [`CURRENT_USER()`, `CURRENT_USER`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_current-user) | The authenticated user name and host name                    |
> | [`DATABASE()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_database) | Return the default (current) database name                   |
> | [`FOUND_ROWS()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_found-rows) | For a SELECT with a LIMIT clause, the number of rows that would be returned were there no LIMIT clause |
> | [`ICU_VERSION()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_icu-version) | ICU library version                                          |
> | [`LAST_INSERT_ID()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_last-insert-id) | Value of the AUTOINCREMENT column for the last INSERT        |
> | [`ROLES_GRAPHML()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_roles-graphml) | Return a GraphML document representing memory role subgraphs |
> | [`ROW_COUNT()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_row-count) | The number of rows updated                                   |
> | [`SCHEMA()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_schema) | Synonym for DATABASE()                                       |
> | [`SESSION_USER()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_session-user) | Synonym for USER()                                           |
> | [`SYSTEM_USER()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_system-user) | Synonym for USER()                                           |
> | [`USER()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_user) | The user name and host name provided by the client           |
> | [`VERSION()`](https://dev.mysql.com/doc/refman/8.0/en/information-functions.html#function_version) | Return a string that indicates the MySQL server version      |

除了`USER`、`VERSION`、`LAST_INSERT_ID`以外等常用函数还有`DATABASE`

这个可以用于获取当前`USE`的数据库

例如获取当前数据库中的所有表，`sql`如下：

```mysql
select * from information_schema.tables where table_schema = (select database());
```

这些函数常用的场景如代码生成器和数据库备份维护应用等