---
title: COALESCE
date: 2022-09-17 13:14:01
tags: 数据库
---

> 沉默是最好的蔑视——康格里夫

分享一个关键字`COALESCE`获取第一个非空数据，表结构如下

![image-20220917131435023](/imgs/oss/blog/image-20220917131435023.png)

执行`sql`：

```sql
SELECT COALESCE(username,password) FROM `user_detail`
```

![image-20220917131534128](/imgs/oss/blog/image-20220917131534128.png)