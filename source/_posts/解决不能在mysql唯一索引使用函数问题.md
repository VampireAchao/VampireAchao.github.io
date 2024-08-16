---
title: 解决不能在mysql唯一索引使用函数问题
date: 2023-06-28 20:31:05
tags: 数据库
---

> 我们在伤害别人之前，要想到别人也会同样伤害我们。——达·芬奇

遇到不能在`mysql`唯一索引使用函数问题

可以使用虚拟列，例如下面的例子

```mysql
# 添加虚拟列，为`date`字段格式化为月计算出来得到`month`字段
ALTER TABLE `my_table` ADD COLUMN `month` VARCHAR(7) AS (DATE_FORMAT(`date`, '%Y-%m')) VIRTUAL;
# 添加唯一索引到`month`和其他字段，组成联合唯一索引
ALTER TABLE `my_table` ADD UNIQUE INDEX uk_date (`month`, `gmt_deleted`);
```

