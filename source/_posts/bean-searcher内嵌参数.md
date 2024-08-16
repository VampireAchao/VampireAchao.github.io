---
title: bean-searcher内嵌参数
date: 2023-02-15 22:26:39
tags: java
---

> 凡事有私心的人，虚荣心强的人，一切以我为中心的人才最爱听拍马屁的奉承话、甜言蜜语，其中一定包含着辛辣——席勒

[文档链接](https://bs.zhxu.cn/guide/latest/params.html#%E5%86%85%E5%B5%8C%E5%8F%82%E6%95%B0)

这里的内嵌参数中的一种，拼接参数可以让我们传入自定义的`sql`，更加的灵活

例如嵌入到`@SearchBean.tables`里

```java
@SearchBean(
    tables = ":table:"      // 参数 table 由检索时动态指定，这在分表检索时非常有用
) 
public class Order {
    
    @DbField("id")
    private long id;

    @DbField("order_no")
    private String orderNo;

}
```

又或者是`groupBy`里

```java
@SearchBean(
    tables = "student", 
    groupBy = ":groupBy:"           // 动态指定分组条件
) 
public class StuAge {

    @DbField("avg(age)")
    private int avgAge;

}
```

甚至字段也可以嵌入

```java
@SearchBean(tables = "sutdent") 
public class StuAge {

    @DbField(":field:")
    private String value;

}
```

这个特性，能让我们直接将构造好的`sql`放入`map`中

例如这里的`:field:`，我们只需要在`map`里放入一个`key`为`field`的值，例如`IFNULL(name,'default')`，即可生成对应的`sql`