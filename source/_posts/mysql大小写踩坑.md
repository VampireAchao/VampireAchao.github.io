---
title: mysql大小写踩坑
date: 2022-04-12 12:39:11
tags: 运维
---

> 不求苍天俯就我的美意，但求永远恣意挥洒。——惠特曼《自我之歌》

设置了`mysqld`下的配置

```cnf
[mysqld]
lower_case_table_names = 1
```

`lower_case_table_names`的官方文档：

https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_lower_case_table_names

描述为：

> If set to 0, table names are stored as specified and comparisons are case-sensitive. If set to 1, table names are stored in lowercase on disk and comparisons are not case-sensitive. If set to 2, table names are stored as given but compared in lowercase. This option also applies to database names and table aliases. For additional details, see [Section 9.2.3, “Identifier Case Sensitivity”](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html).

翻译过来大致

0. 按大小写敏感存储表名
1. 按小写形式存储表名
   - 比较时不区分大小写
2. 按大小写敏感存储表名
   - 以小写字母进行比较

他们的默认值在不同系统下面有区分

`MacOS`<sup>2</sup> `Unix`<sup>0</sup> `Windows`<sup>1</sup>

然后注意`ubuntu`下重启`mysql`服务不是`mysqld`而是`mysql`，下面是`ubuntu`的三种重启方式

```shell
# 重启服务
service mysql restart;
# 重启系统服务
systemctl restart mysql
# 重启mysql，请确认路径
/etc/init.d/mysql restart
```

修改后可以用这三个`sql`查询是否生效

```sql
select @@lower_case_table_names;
+--------------------------+
| @@lower_case_table_names |
+--------------------------+
|                        1 |
+--------------------------+

show variables like 'lower_case_table_names';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_table_names | 1     |
+------------------------+-------+

show global variables like '%lower_case%';
+------------------------+-------+
| Variable_name          | Value |
+------------------------+-------+
| lower_case_file_system | OFF   |
| lower_case_table_names | 1     |
+------------------------+-------+
```

关键点来了，`quartz`查询`mysql`中的表是按照大写表名去查，而我们此处配置的，并不是查询时忽略表名大小写，而是全部以小写表名去查询

因此配置了`lower_case_table_names = 1`后，大写表名用大写`sql`一律作废匹配不到

```sql
SELECT * FROM QRTZ_LOCKS
```

查询表名为大写`QRTZ_LOCKS`的表找不到

但由于我`windows`开发环境下的表名又为小写`qrtz_locks`

此时就有以下方案：

- 配置改回`lower_case_table_names = 0`或者移除掉该配置(`Unix`下默认为`0`)
- 修改表名为小写

百度有的说可以设置为`2`

官方文档表示：

> On Linux (and other Unix-like systems), setting the value to `2` is not supported; the server forces the value to `0` instead.

翻译过来就是说`Linux`或者其他类似`Unix`的系统，不支持设置为`2`[^1]，`mysql`服务端会强制使用`0`代替

[^1]: 好坑，亏我还傻兮兮的试

那么这么多表名，一个一个改不是很麻烦？

这里我们可以使用[`mysql`数据库信息函数](https://VampireAchao.github.io/2022/02/10/mysql数据库信息函数/)去按规则[^2]查询出表名转换为小写，再拼接成多条`sql`

[^2]:此处为`QRTZ_`开头

或者使用存储过程、代码处理等方式

这里我使用以下`sql`：

```sql
SELECT
	CONCAT( 'ALTER TABLE ', table_name, ' RENAME ', LOWER( table_name ), ";" ) AS statement 
FROM
	information_schema.TABLES 
WHERE
	table_schema = '改成你的库名' 
	AND table_name LIKE 'QRTZ_%';
```

然后就会出现这样的结果：

```shell
+-----------------------------------------------------------------------+
| statement                                                             |
+-----------------------------------------------------------------------+
| ALTER TABLE QRTZ_BLOB_TRIGGERS RENAME qrtz_blob_triggers;             |
| ALTER TABLE QRTZ_CALENDARS RENAME qrtz_calendars;                     |
| ALTER TABLE QRTZ_CRON_TRIGGERS RENAME qrtz_cron_triggers;             |
| ALTER TABLE QRTZ_FIRED_TRIGGERS RENAME qrtz_fired_triggers;           |
| ALTER TABLE QRTZ_JOB_DETAILS RENAME qrtz_job_details;                 |
| ALTER TABLE QRTZ_LOCKS RENAME qrtz_locks;                             |
| ALTER TABLE QRTZ_PAUSED_TRIGGER_GRPS RENAME qrtz_paused_trigger_grps; |
| ALTER TABLE QRTZ_SCHEDULER_STATE RENAME qrtz_scheduler_state;         |
| ALTER TABLE QRTZ_SIMPLE_TRIGGERS RENAME qrtz_simple_triggers;         |
| ALTER TABLE QRTZ_SIMPROP_TRIGGERS RENAME qrtz_simprop_triggers;       |
| ALTER TABLE QRTZ_TRIGGERS RENAME qrtz_triggers;                       |
+-----------------------------------------------------------------------+
```

我们把结果中的`sql`复制下来再执行一遍即可

```sql
ALTER TABLE QRTZ_BLOB_TRIGGERS RENAME qrtz_blob_triggers;
ALTER TABLE QRTZ_CALENDARS RENAME qrtz_calendars;
ALTER TABLE QRTZ_CRON_TRIGGERS RENAME qrtz_cron_triggers;
ALTER TABLE QRTZ_FIRED_TRIGGERS RENAME qrtz_fired_triggers;
ALTER TABLE QRTZ_JOB_DETAILS RENAME qrtz_job_details;
ALTER TABLE QRTZ_LOCKS RENAME qrtz_locks;
ALTER TABLE QRTZ_PAUSED_TRIGGER_GRPS RENAME qrtz_paused_trigger_grps;
ALTER TABLE QRTZ_SCHEDULER_STATE RENAME qrtz_scheduler_state;
ALTER TABLE QRTZ_SIMPLE_TRIGGERS RENAME qrtz_simple_triggers;
ALTER TABLE QRTZ_SIMPROP_TRIGGERS RENAME qrtz_simprop_triggers;
ALTER TABLE QRTZ_TRIGGERS RENAME qrtz_triggers;
```

如果不知道这些表是怎么来的，可以查看这篇[quartz](https://VampireAchao.github.io/2021/01/24/quartz/)

结束后，我们配置的`lower_case_table_names = 1`即可生效，可以用`show tables;`检查一下
