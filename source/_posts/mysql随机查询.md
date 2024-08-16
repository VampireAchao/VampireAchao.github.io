---
title: mysql随机查询
date: 2021-04-07 20:46:44
tags: 数据库
---

> 明者见危于无形，智者见祸于未萌。——《三国志》

我们如果需要使用`mysql`进行随机取`N`条这样的操作

我们可以这样写

```sql
-- 2.然后查询主表，与我们的tmp_table进行INNER JOIN[内连]
SELECT * FROM `film` AS main_table JOIN 
-- 1.取出主表主键的最大值，与RAND()相乘[RAND()生成0到1的随机数]，然后使用ROUND函数取整获得一个tmp_id
(SELECT ROUND(RAND() * (SELECT MAX(`film_id`) FROM `film`)) AS tmp_id) AS tmp_table
-- 3.条件为主表主键大于等于tmp_table.tmp_id
WHERE main_table.`film_id` >= tmp_table.tmp_id
-- 4.排序，限制条数，这里的可以任选
ORDER BY main_table.`film_id` LIMIT 5;
```

这个是我认为效率比较高的随机查询了

