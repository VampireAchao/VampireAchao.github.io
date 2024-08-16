---
title: like concat 兼容h2、mysql、pgsql语法
date: 2024-01-06 16:05:26
tags: java
---

> 推动你的事业，不要让你的事业推动你。——爱因斯坦

今天解决

https://github.com/apache/incubator-streampark/issues/3451

时候发现从`'%${variable.variableCode}%'`改为`concat ('%', #{variable.variableCode}, '%')`

解决的`sql`注入问题与`postgresql`不兼容

于是加了一个`CAST`解决

https://github.com/apache/incubator-streampark/pull/3457

`concat('%', CAST(#{variable.variableCode} AS CHAR), '%')`

这样就兼容了`h2`、`mysql`和`pgsql`

这里测试时候首先本地运行`h2`跑一下，然后用`docker`启动一个`mysql`跑一下：

```bash
docker run --name streampark-mysql -e MYSQL_ROOT_PASSWORD=streampark -e MYSQL_DATABASE=streampark -p 3306:3306 -d mysql
```

运行`sql`脚本`ddl`

修改相关配置文件：

```yaml
spring:
  profiles:
    active: mysql #[h2,pgsql,mysql]
```

测试通过

然后是`postgresql`

```bash
docker run --name streampark-postgres -e POSTGRES_PASSWORD=streampark -e POSTGRES_DB=streampark -d -p 5432:5432 postgres
```

运行`sql`脚本`ddl`

配置文件修改为`pgsql`

```yaml
spring:
  profiles:
    active: pgsql #[h2,pgsql,mysql]
```

测试通过
