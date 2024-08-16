---
title: springboot连接oracle
date: 2022-04-16 16:38:01
tags: java
---

> 她愿意服从，因为她能够统治。——巴尔扎克《奇双会》

首先引入`GAV`

```xml
        <dependency>
            <groupId>org.zenframework.z8.dependencies.commons</groupId>
            <artifactId>ojdbc6</artifactId>
            <version>2.0</version>
        </dependency>
```

然后修改`application`中`url`和驱动

```yaml
datasource:
	driver-class-name: oracle.jdbc.OracleDriver
	url: jdbc:oracle:thin:@localhost:1521/数据库名
```



