---
title: 自增sql
date: 2021-02-10 18:25:58
tags: 数据库
---

> 所谓觉悟，就是在漆黑的荒野上开辟出一条理当前进的道路。——乔鲁诺.乔巴纳

我们可以使用

```sql
update user set age=age+1 where id = 1
```

来让`age`在原来的基础上`+1`