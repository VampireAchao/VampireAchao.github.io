---
title: MP-p6spy日志分析打印
date: 2022-01-31 21:50:32
tags: java
---

> 我们杀人不用愤怒，而用笑。——尼采。

按照[官方文档](https://baomidou.com/pages/833fab/)步骤

首先引入`GAV`：

```xml
<dependency>
  <groupId>p6spy</groupId>
  <artifactId>p6spy</artifactId>
  <version>最新版本</version>
</dependency>
```

然后是修改配置：

注意此处协议前加上`p6spy`

驱动也要改为`P6SpyDriver`

```yaml
spring:
  datasource:
    driver-class-name: com.p6spy.engine.spy.P6SpyDriver
    username: xxx
    password: xxx
    url: jdbc:p6spy:mysql://localhost:3306/ruben?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true&allowPublicKeyRetrieval=true
    ...
```

然后放入日志配置文件`spy.properties`到`resources`目录下

![image-20220131220043670](/imgs/oss/picGo/image-20220131220043670.png)

```properties
#3.2.1以上使用
modulelist=com.baomidou.mybatisplus.extension.p6spy.MybatisPlusLogFactory,com.p6spy.engine.outage.P6OutageFactory
# 自定义日志打印
logMessageFormat=com.baomidou.mybatisplus.extension.p6spy.P6SpyLogger
#日志输出到控制台
appender=com.baomidou.mybatisplus.extension.p6spy.StdoutLogger
# 使用日志系统记录 sql
#appender=com.p6spy.engine.spy.appender.Slf4JLogger
# 设置 p6spy driver 代理
deregisterdrivers=true
# 取消JDBC URL前缀
useprefix=true
# 配置记录 Log 例外,可去掉的结果集有error,info,batch,debug,statement,commit,rollback,result,resultset.
excludecategories=info,debug,result,commit,resultset
# 日期格式
dateformat=yyyy-MM-dd HH:mm:ss
# 实际驱动可多个
#driverlist=org.h2.Driver
# 是否开启慢SQL记录
outagedetection=true
# 慢SQL记录标准 2 秒
outagedetectioninterval=2
```

接下来我们执行查询测试一下可以看到确实输出`SQL`分析日志

![image-20220131220602101](/imgs/oss/picGo/image-20220131220602101.png)