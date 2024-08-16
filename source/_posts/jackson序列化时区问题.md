---
title: jackson序列化时区问题
date: 2023-01-29 21:40:10
tags: java
---

> 念人之过必忘人之功——佚名

今天发现返回给前端的`Date`和数据库中查到的时间对不上

排查发现是`Jackson`指定时区问题，原先用的`GMT+8`，但数据库是`Asia/Shanghai`

```java
ObjectMapper shanghaiObjectMapper = new ObjectMapper()
                .setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"))
                .setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
```

引用：https://alphahinex.github.io/2021/10/31/difference-between-gmt-plus-8-and-asia-shanghai/

里面提到的

> # `GMT+8` 和 `Asia/Shanghai` 的区别
>
> - `GMT+8` 因为没有位置信息，所以无法使用夏令时
> - `Asia/Shanghai` 使用夏令时
>
> **时间戳字符串中不包含时区信息时，解析到的具体时区如果是使用夏令时的，就会跟不使用夏令时的时区，时间不一致。**

复现：

```java
package com.ruben.simplestreamquery;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

@SpringBootTest
class SimpleStreamQueryApplicationTests {

    @Test
    void testQuery() throws JsonProcessingException {
        Date date = new Date(1989 - 1900, Calendar.JULY, 4);
        ObjectMapper gmt8ObjectMapper = new ObjectMapper()
                .setTimeZone(TimeZone.getTimeZone("GMT+8"))
                .setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        ObjectMapper shanghaiObjectMapper = new ObjectMapper()
                .setTimeZone(TimeZone.getTimeZone("Asia/Shanghai"))
                .setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));

        Assertions.assertEquals("\"1989-07-04 00:00:00\"", gmt8ObjectMapper.writeValueAsString(date));
        Assertions.assertEquals("\"1989-07-04 00:00:00\"", shanghaiObjectMapper.writeValueAsString(date));
    }

}

```

![image-20230129225243560](/imgs/oss/blog/vampireachao/image-20230129225243560.png)

文章还进行了科普：

> # 夏令时
>
> [夏令时](https://baike.baidu.com/item/夏令时/1809579)（Daylight Saving Time: DST），也叫 `夏时制`，是指为了节约能源，在天亮的早的夏季，人为将时间调快一小时，以充分利用光照资源，节约照明用电。
>
> 在冬季光照时间变短后，将时间再拨回一小时的标准时间，也称为冬令时。
>
> 中国在 1986 年至 1991 年也实行过夏令时：
>
> > 1986年4月，中国中央有关部门发出“在全国范围内实行夏时制的通知”，具体做法是：每年从四月中旬第一个星期日的凌晨2时整（北京时间），将时钟拨快一小时，即将表针由2时拨至3时，夏令时开始；到九月中旬第一个星期日的凌晨2时整（北京夏令时），再将时钟拨回一小时，即将表针由2时拨至1时，夏令时结束。从1986年到1991年的六个年度，除1986年因是实行夏时制的第一年，从5月4日开始到9月14日结束外，其它年份均按规定的时段施行。在夏令时开始和结束前几天，新闻媒体均刊登有关部门的通告。1992年起，夏令时暂停实行。 —— 引自百度百科 [夏令时](https://baike.baidu.com/item/夏令时/1809579)
>
> ![img](/imgs/oss/blog/vampireachao/cdt.jpg)