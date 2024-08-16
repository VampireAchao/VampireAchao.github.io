---
title: mysql重置自增主键坑
date: 2021-12-03 20:31:01
tags: 数据库
---

> 商人的兴趣就在那些能找到财富的地方。——埃伯克

今天重置`mysql`自增主键时遇到个坑，明明`sql`执行了

```mysql
ALTER TABLE table_name AUTO_INCREMENT= 1;
```

但还是修改失败了

后来发现原来是因为当前表最大`id`比我设置的自增`id`大导致的

而且这种情况还不报错，提示`sql`正常执行，就挺坑的

最后把表内数据调整了，成功重置自增`id`

可以通过

```mysql
SHOW TABLE STATUS WHERE NAME = 'user';
```

查看表状态