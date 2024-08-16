---
title: mybatis-plus最新版配置分页最大限制条数
date: 2021-03-26 23:03:37
tags: java
---

> 价值产生信心，信心产生热忱，而热忱则征服世界。——华特·H·柯亭姆

开发中，我们对于分页，经验老道的程序员会限制分页最大数据条数，避免被攻击、或是数据量太大造成各种可避免问题

`mybatis-plus`中配置分页最大限制非常容易，在配置分页的地方

加上如下代码即可

```java
        final PaginationInnerInterceptor innerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        innerInterceptor.setMaxLimit(200L);
        interceptor.addInnerInterceptor(innerInterceptor);
```

![image-20210326230831753](/imgs/oss/picGo/image-20210326230831753.png)

全部代码配置在[我之前的博客](https://VampireAchao.github.io/2021/03/23/mybatis-plus%E4%BB%8E3-1%E5%8D%87%E7%BA%A7%E5%88%B03-4-2/)可以找到

