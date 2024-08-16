---
title: mysql使用druid时自动断开连接解决方案
date: 2020-06-19 21:16:13
tags: 数据库
---

今天接手了一个上了年龄的项目，用的是smm，数据库连接池用的druid，数据库版本较老，是5.0的mysql，我升级成mysql8.0后，一开始还没问题，然后大概每次无连接2分钟后数据库自动断开。。。

前端妹子立马跟我说接口报错了，我咯噔心里一慌，让前端妹子给我截一下报错信息（后台日志刷的太多，当时没注意到）。然后前端妹子说，哦又好了，我当时意识到不对劲，但也没有深究，直到这样的问题出了几次，每次一刷新又好了，我开始意识到问题的严重性。

一开始我复制了报错信息，也就是这一段

```shell
Caused by: com.mysql.cj.exceptions.CJCommunicationsException: Communications link failure

The last packet successfully received from the server was 8848 milliseconds ago.  The last packet sent successfully to the server was 8848 milliseconds ago.
```

搜了半天，网上说加配置、也就是在连接池配置加上

```xml
<property name="testOnBorrow" value="true" />
<property name="testWhileIdle" value="true" />
```

也就是这里，加上这两行，然而无事发生。。。两分钟后依旧报错

```xml
<!-- 数据库连接池 -->
	<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSourc
e" destroy-method="close">
		<property name="url" value="${jdbc.url}" />
		<property name="username" value="${jdbc.username}" />
		<property name="password" value="${jdbc.password}" />
		<property name="driverClassName" value="${jdbc.driver}" />
		<property name="maxActive" value="10" />
		<property name="minIdle" value="5" />
		<property name="testOnBorrow" value="true" />
		<property name="testWhileIdle" value="true" />
	</bean>
```

于是我想到了用mysql的select(1)语句去保持连接，它不是两分钟断开嘛~

那我每分钟执行一次这个语句，保持mysql和服务端连接不就好了吗？

果然，写了个定时任务

```java
@Resource
RefreshMysqlConnectionMapper refreshMysqlConnectionMapper;

@Scheduled(cron = "*/60 * * * * ?")
public void refreshMysqlConnection() {
		System.out.println("-----------------Performed task scheduling and maintained database connection" ); // 每60秒执行一次
		refreshMysqlConnectionMapper.refreshMysqlConnection();
	}
```

配置定时任务

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
	xmlns:context="http://www.springframework.org/schema/context"
	xmlns:task="http://www.springframework.org/schema/task"
	xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/task http://www.springframework.org/schema/task/spring-task-4.2.xsd">

	<context:component-scan base-package="com.ruben.task" />
	<!-- 开启task注解驱动 -->
	<task:annotation-driven />
</beans>
```

RefreshMysqlConnectionMapper.xml里面的sql语句，就这一条

```xml
<select id="refreshMysqlConnection" resultType="int">
    select (1)
  </select>
```

之后再也没出现过断开连接的错误~

还有其他的方式，比如修改数据库配置文件，让无连接后断开时间改久一点。

但无奈公司的DBA不在，数据库不让我碰，只好出此下策hh。好在问题解决了！