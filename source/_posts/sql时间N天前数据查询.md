---
title: sql时间N天前数据查询
date: 2020-07-22 23:02:07
tags: 数据库
---

今天写代码用到了

```sql
#三年前的日期
select date_format(date_sub(now(),interval 3 year),'%Y-%m-%d')
#6个月之后的时间
select date_add(now(),interval 6 month);
#14天后的时间
select date_add(now(),interval 3 day);
#10分钟之内的数据
select * from table_name where create_time >= 
(select date_sub(now(),interval 10 minute))
#30秒后的时间
select date_add(now(),interval 30 second);
```

