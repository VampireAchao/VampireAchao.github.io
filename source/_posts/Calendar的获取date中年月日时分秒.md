---
title: Calendar的获取date中年月日时分秒
date: 2020-12-10 21:12:12
tags: java
---

> 仿佛前世的密约，注定我们要在今生抵掌，然后一起创世，或者再次站成一排，慷慨赴死。——野夫

[转载，原文](https://blog.csdn.net/zhuifengnian/article/details/87276237)

```java
Date startTime = new Date();
Calendar c = Calendar.getInstance();
c.setTime(startTime);
int year = c.get(java.util.Calendar.YEAR);
int month = c.get(java.util.Calendar.MONTH) + 1;//获取月份（因为在格里高利历和罗马儒略历一年中第一个月为JANUARY，它为0，最后一个月取决于一年中的月份数，所以这个值初始为0，所以需要加1）
int day = c.get(java.util.Calendar.DATE);//获取日
int hour = c.get(Calendar.HOUR_OF_DAY);//小时（calendar.HOUR 12小时制，calendar.HOUR_OF_DAY 24小时）
int minute = c.get(java.util.Calendar.MINUTE);//分
int second = c.get(Calendar.SECOND);//秒
```

