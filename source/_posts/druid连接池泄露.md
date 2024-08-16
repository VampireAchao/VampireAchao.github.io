---
title: druid连接池泄露
date: 2022-01-15 18:36:28
tags: java
---

> 才华是刀刃，辛苦是磨刀石，很锋利的刀刃，若日久未磨，依旧会成为废韧——老舍

当程序存在缺陷时，申请的连接忘记关闭，这时候，就存在[连接泄漏](https://github.com/alibaba/druid/wiki/%E8%BF%9E%E6%8E%A5%E6%B3%84%E6%BC%8F%E7%9B%91%E6%B5%8B)了

我们使用`druid`时，可以配置如下参数进行用来关闭长时间不使用的连接

```yaml
spring:
  # 数据源配置
  datasource:
    druid:
      # 统计监控信息
      web-stat-filter:
        enabled: true
      # 可视化展示Druid的统计信息
      stat-view-servlet:
        enabled: true
      filter:
        # sql注入
        wall:
          enabled: true
          db-type: mysql
        slf4j:
          enabled: true
          statement-sql-pretty-format: true
      # 保持连接sql
      validation-query: SELECT 1 FROM DUAL
      # 保持连接sql超时时间
      validation-query-timeout: 600000
      # 连接初始化sql
      connection-init-sqls:
        - SET NAMES utf8mb4
      # 超时后释放连接设置时间
      remove-abandoned-timeout-millis: 100
      # 超时后释放连接开启
      remove-abandoned: true
      # 超时释放日志
      log-abandoned: true
      # 最大线程数
      max-wait: 2000
      # 最大等待时间
      max-active: 20
```

这里是`abandoned`相关配置

这样我们程序则会自动释放忘记关机的连接，并且输出日志信息

```shell
2022-01-15 18:49:29.560 ERROR 27396 --- [stroy-507383828] com.alibaba.druid.pool.DruidDataSource   : abandon connection, owner thread: pool-2-thread-4, connected at : 1642240141966, open stackTrace
	at java.lang.Thread.getStackTrace(Thread.java:1559)
	at com.alibaba.druid.pool.DruidDataSource.getConnectionDirect(DruidDataSource.java:1496)
	at com.alibaba.druid.filter.FilterChainImpl.dataSource_connect(FilterChainImpl.java:5059)
	at com.alibaba.druid.filter.FilterAdapter.dataSource_getConnection(FilterAdapter.java:2756)
	at com.alibaba.druid.filter.FilterChainImpl.dataSource_connect(FilterChainImpl.java:5055)
	at com.alibaba.druid.filter.logging.LogFilter.dataSource_getConnection(LogFilter.java:917)
	at com.alibaba.druid.filter.FilterChainImpl.dataSource_connect(FilterChainImpl.java:5055)
	at com.alibaba.druid.pool.DruidDataSource.getConnection(DruidDataSource.java:1405)
	at com.alibaba.druid.pool.DruidDataSource.getConnection(DruidDataSource.java:1397)
	at com.alibaba.druid.pool.DruidDataSource.getConnection(DruidDataSource.java:100)
	at org.springframework.jdbc.datasource.DataSourceUtils.fetchConnection(DataSourceUtils.java:158)
	at org.springframework.jdbc.datasource.DataSourceUtils.doGetConnection(DataSourceUtils.java:116)
	at org.springframework.jdbc.datasource.DataSourceUtils.getConnection(DataSourceUtils.java:79)
	at org.mybatis.spring.transaction.SpringManagedTransaction.openConnection(SpringManagedTransaction.java:80)
	at org.mybatis.spring.transaction.SpringManagedTransaction.getConnection(SpringManagedTransaction.java:67)
	at org.apache.ibatis.executor.BaseExecutor.getConnection(BaseExecutor.java:337)
	at org.apache.ibatis.executor.SimpleExecutor.prepareStatement(SimpleExecutor.java:86)
	at org.apache.ibatis.executor.SimpleExecutor.doQuery(SimpleExecutor.java:62)
	at org.apache.ibatis.executor.BaseExecutor.queryFromDatabase(BaseExecutor.java:325)
	at org.apache.ibatis.executor.BaseExecutor.query(BaseExecutor.java:156)
	at org.apache.ibatis.executor.CachingExecutor.query(CachingExecutor.java:109)
	at com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor.intercept(MybatisPlusInterceptor.java:81)
	at org.apache.ibatis.plugin.Plugin.invoke(Plugin.java:62)
	at com.sun.proxy.$Proxy190.query(Unknown Source)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:151)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:145)
	at org.apache.ibatis.session.defaults.DefaultSqlSession.selectList(DefaultSqlSession.java:140)
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.executeForMany(MybatisMapperMethod.java:166)
	at com.baomidou.mybatisplus.core.override.MybatisMapperMethod.execute(MybatisMapperMethod.java:77)
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy$PlainMethodInvoker.invoke(MybatisMapperProxy.java:148)
	at com.baomidou.mybatisplus.core.override.MybatisMapperProxy.invoke(MybatisMapperProxy.java:89)
	at com.sun.proxy.$Proxy121.selectList(Unknown Source)
	at com.baomidou.mybatisplus.extension.toolkit.SimpleQuery.group(SimpleQuery.java:109)
```

