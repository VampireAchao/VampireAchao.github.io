---
title: mysql使用druid时自动断开连接解决方案二
date: 2020-07-02 21:17:08
tags: 数据库
---

直接上xml配置！

```xml
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource" destroy-method="close">
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="validationQuery" value="select 1"/>
        <property name="validationQueryTimeout" value="1"/>
    </bean>
```

重要的就是这两句

```xml
validationQuery
在连接池返回连接给调用者前用来对连接进行验证的查询 SQL，要求为一条查询语句
validationQueryTimeout
SQL 查询验证超时时间（秒），小于或等于 0 的数值表示禁用
```

原理和我之前写的那个定时任务一样的，也就是定时请求数据库，只不过是druid帮我们写好