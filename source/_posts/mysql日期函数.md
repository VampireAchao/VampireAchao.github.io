---
title: mysql日期函数
date: 2020-12-27 21:21:22
tags: 数据库
---

> 不怨天，不尤人。——《论语》

[转，原文](http://www.itxm.cn/post/18842.html)

## 一、**MySQL 获得当前日期时间 函数**

1，获得当前日期+时间（date + time）函数：now()：

```java
select now(); 
结果：2008-08-08 22:20:46
```

2，获得当前日期+时间（date + time）函数：sysdate()
sysdate() 日期时间函数跟 now() 类似，不同之处在于：now() 在执行开始时值就得到了， sysdate() 在函数执行时动态得到值；

```java
select sysdate(); 
结果：2008-08-08 22:20:46
```

3，MySQL 获得当前时间戳函数：current_timestamp, current_timestamp()：

```java
select current_timestamp, current_timestamp(); 
结果：2008-08-09 23:22:24 , 2008-08-09 23:22:24
```

## 二、**MySQL 日期转换函数、时间转换函数**

1，MySQL Date/Time to Str（日期/时间转换为字符串）函数：date_format(date,format), time_format(time,format)：

```java
函数：date_format('2008-08-08 22:23:01', '%Y%m%d%H%i%s') 
结果：20080808222301 
```

MySQL 日期、时间转换函数：date_format(date,format), time_format(time,format) 能够把一个日期/时间转换成各种各样的字符串格式。它是 str_to_date(str,format) 函数的 一个逆转换。

2，MySQL Str to Date （字符串转换为日期）函数：str_to_date(str, format)：

```java
select str_to_date('08/09/2008', '%m/%d/%Y'); -- 2008-08-09 
select str_to_date('08/09/08' , '%m/%d/%y'); -- 2008-08-09 
select str_to_date('08.09.2008', '%m.%d.%Y'); -- 2008-08-09 
select str_to_date('08:09:30', '%h:%i:%s'); -- 08:09:30 
select str_to_date('08.09.2008 08:09:30', '%m.%d.%Y %h:%i:%s'); -- 2008-08-09 08:09:30
```

str_to_date(str,format) 转换函数，可以把一些杂乱无章的字符串转换为日期格式。

3，MySQL （日期、天数）转换函数：to_days(date), from_days(days)：

```java
select to_days('0000-00-00'); -- 0 
select to_days('2008-08-08'); -- 733627
```

4，MySQL （时间、秒）转换函数：time_to_sec(time), sec_to_time(seconds)：

```java
select time_to_sec('01:00:05'); -- 3605 
select sec_to_time(3605); -- '01:00:05'
```

5，MySQL 拼凑日期、时间函数：makdedate(year,dayofyear), maketime(hour,minute,second)：

```java
select makedate(2001,31); -- '2001-01-31' 
select makedate(2001,32); -- '2001-02-01' 
select maketime(12,15,30); -- '12:15:30'
```

6，MySQL （Unix 时间戳、日期）转换函数：

```java
unix_timestamp(), 
unix_timestamp(date), 
from_unixtime(unix_timestamp), 
from_unixtime(unix_timestamp,format)
```

## 三、**MySQL 日期时间计算函数**

1，MySQL 为日期增加一个时间间隔：date_add()：

```java
set @dt = now(); 
 
select date_add(@dt, interval 1 day); -- add 1 day 
select date_add(@dt, interval 1 hour); -- add 1 hour 
select date_add(@dt, interval 1 minute); -- ... 
select date_add(@dt, interval 1 second); 
select date_add(@dt, interval 1 microsecond); 
select date_add(@dt, interval 1 week); 
select date_add(@dt, interval 1 month); 
select date_add(@dt, interval 1 quarter); 
select date_add(@dt, interval 1 year); 
 
select date_add(@dt, interval -1 day); -- sub 1 day
```

2，MySQL adddate(), addtime()函数（可以用 date_add() 来替代）：

```java
set @dt = '2008-08-09 12:12:33'; 
 
select date_add(@dt, interval '01:15:30' hour_second); 
结果：2008-08-09 13:28:03  
 
select date_add(@dt, interval '1 01:15:30' day_second); 
结果：2008-08-10 13:28:03
```

3，MySQL 为日期减去一个时间间隔：date_sub()：

```java
select date_sub('1998-01-01 00:00:00', interval '1 1:1:1' day_second); 
结果：1997-12-30 22:58:59 
```

4，MySQL 日期、时间相减函数：datediff(date1,date2), timediff(time1,time2)：

```java
MySQL datediff(date1,date2)：两个日期相减 date1 - date2，返回天数。 
select datediff('2008-08-08', '2008-08-01'); -- 7 
select datediff('2008-08-01', '2008-08-08'); -- -7
```

5，MySQL timediff(time1,time2)：两个日期相减 time1 - time2，返回 time 差值：

```java
select timediff('2008-08-08 08:08:08', '2008-08-08 00:00:00'); -- 08:08:08 
select timediff('08:08:08', '00:00:00'); -- 08:08:08 
注意：timediff(time1,time2) 函数的两个参数类型必须相同。
```

6，MySQL 时间戳（timestamp）转换、增、减函数：

```java
timestamp(date) -- date to timestamp 
timestamp(dt,time) -- dt + time 
timestampadd(unit,interval,datetime_expr)  
timestampdiff(unit,datetime_expr1,datetime_expr2)  
 
select timestamp('2008-08-08'); -- 2008-08-08 00:00:00 
select timestamp('2008-08-08 08:00:00', '01:01:01'); -- 2008-08-08 09:01:01 
select timestamp('2008-08-08 08:00:00', '10 01:01:01'); -- 2008-08-18 09:01:01 
 
select timestampadd(day, 1, '2008-08-08 08:00:00'); -- 2008-08-09 08:00:00 
select date_add('2008-08-08 08:00:00', interval 1 day); -- 2008-08-09 08:00:00 
 
MySQL timestampadd() 函数类似于 date_add()。 
select timestampdiff(year,'2002-05-01','2001-01-01'); -- -1 
select timestampdiff(day ,'2002-05-01','2001-01-01'); -- -485 
select timestampdiff(hour,'2008-08-08 12:00:00','2008-08-08 00:00:00'); -- -12 
 
select datediff('2008-08-08 12:00:00', '2008-08-01 00:00:00'); -- 7
```

MySQL timestampdiff() 函数就比 datediff() 功能强多了，datediff() 只能计算两个日期（date）之间相差的天数。

## 四、**MySQL 时区（timezone）转换函数**

```java
convert_tz(dt,from_tz,to_tz) 
 
select convert_tz('2008-08-08 12:00:00', '+08:00', '+00:00'); -- 2008-08-08 04:00:00
```

时区转换也可以通过 date_add, date_sub, timestampadd 来实现：

```java
select date_add('2008-08-08 12:00:00', interval -8 hour); -- 2008-08-08 04:00:00 
select date_sub('2008-08-08 12:00:00', interval 8 hour); -- 2008-08-08 04:00:00 
select timestampadd(hour, -8, '2008-08-08 12:00:00'); -- 2008-08-08 04:00:00
```