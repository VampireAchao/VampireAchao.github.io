---
title: 动态mapper日志问题
date: 2023-04-01 16:08:45
tags: java
---

> 为学勿忘家世俭，唯金能使子孙愚。——刘克庄

今天发现`stream-query`的动态`mapper`，独立配置不生效：

![image-20230401164043203](/imgs/oss/blog/vampireachao/image-20230401164043203.png)

原来是因为`logback`解析日志对应的类和包时，忽略了内部类的判断

在执行时发现用的`Logger`对象是`MappedStatement`里面的，于是就从`MappedStatement`的创建

找到`C:/Users/achao/.m2/repository/org/mybatis/mybatis/3.5.10/mybatis-3.5.10-sources.jar!/org/apache/ibatis/mapping/MappedStatement.java:81`里面的

`LogFactory.getLog(logId)`(`logId`)此时是我们的动态`Mapper`

![image-20230401164740220](/imgs/oss/blog/vampireachao/image-20230401164740220.png)

然后找到`C:/Users/achao/.m2/repository/ch/qos/logback/logback-classic/1.2.4/logback-classic-1.2.4.jar!/ch/qos/logback/classic/LoggerContext.class:84`下面有一段获取分隔符下标然后进行分割的逻辑

![image-20230401164254804](/imgs/oss/blog/vampireachao/image-20230401164254804.png)

于是将动态`mapper`原来以`$dynamicMapper`开头的类名，改成了以`org.dromara.streamquery.stream.plugin.mybatisplus.dynamicMapper`开头

重新配置，问题解决

![image-20230401164618575](/imgs/oss/blog/vampireachao/image-20230401164618575.png)