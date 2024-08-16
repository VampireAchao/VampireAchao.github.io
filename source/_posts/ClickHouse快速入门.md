---
title: ClickHouse快速入门
date: 2024-06-10 16:33:50
tags: 数据库
---

> 幻想中有比显示更高的东西，现实中也有比幻想更高的东西，把两者结合起来是最完美的。——列夫·托尔斯泰

官网：

https://clickhouse.com/

中文文档：

https://clickhouse.com/docs/zh

我们执行命令运行

```bash
curl https://clickhouse.com/ | sh
```

可以看到非常方便就好了

```bash
Last login: Tue Jun  4 22:23:34 on ttys001
curl https://clickhouse.com/ | sh
The default interactive shell is now zsh.
To update your account to use zsh, please run `chsh -s /bin/zsh`.
For more details, please visit https://support.apple.com/kb/HT208050.
GithubIireAchao:blog achao$ curl https://clickhouse.com/ | sh
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2822    0  2822    0     0   3400      0 --:--:-- --:--:-- --:--:--  3400

Will download https://builds.clickhouse.com/master/macos-aarch64/clickhouse into clickhouse

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 68.1M  100 68.1M    0     0  10.8M      0  0:00:06  0:00:06 --:--:-- 14.0M

Successfully downloaded the ClickHouse binary, you can run it as:
    ./clickhouse
GithubIireAchao:blog achao$ ./clickhouse
...
ClickHouse local version 24.6.1.3290 (official build).

githubiireachao :) 
```

我们继续创建表

```sql
CREATE TABLE my_first_table
(
    user_id UInt32,
    message String,
    timestamp DateTime,
    metric Float32
)
ENGINE = MergeTree
PRIMARY KEY (user_id, timestamp)
```

插入数据

```sql
INSERT INTO my_first_table (user_id, message, timestamp, metric) VALUES
    (101, 'Hello, ClickHouse!',                                 now(),       -1.0    ),
    (102, 'Insert a lot of rows per batch',                     yesterday(), 1.41421 ),
    (102, 'Sort your data based on your commonly-used queries', today(),     2.718   ),
    (101, 'Granules are the smallest chunks of data read',      now() + 5,   3.14159 )
```

查询

```sql
githubiireachao :)  SELECT *
 FROM my_first_table
 ORDER BY timestamp

SELECT *
FROM my_first_table
ORDER BY timestamp ASC

Query id: 2997657d-89e0-4280-8333-428c67106986

   ┌─user_id─┬─message────────────────────────────────────────────┬───────────timestamp─┬──metric─┐
1. │     102 │ Insert a lot of rows per batch                     │ 2024-06-09 00:00:00 │ 1.41421 │
2. │     102 │ Sort your data based on your commonly-used queries │ 2024-06-10 00:00:00 │   2.718 │
3. │     101 │ Hello, ClickHouse!                                 │ 2024-06-10 16:43:25 │      -1 │
4. │     101 │ Granules are the smallest chunks of data read      │ 2024-06-10 16:43:31 │ 3.14159 │
   └─────────┴────────────────────────────────────────────────────┴─────────────────────┴─────────┘

4 rows in set. Elapsed: 0.004 sec. 
```

这里例如从`mysql`导入：

```sql

```
