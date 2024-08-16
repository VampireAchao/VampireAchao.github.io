---
title: hutool-db
date: 2022-03-15 18:29:47
tags: java
---

> 世间事，除了生死，哪一件不是闲事。——仓央嘉措《地空》

`hutool`操作数据库这块可以看[官方文档](https://www.hutool.cn/docs/#/db/%E6%95%B0%E6%8D%AE%E5%BA%93%E7%AE%80%E5%8D%95%E6%93%8D%E4%BD%9C-Db)：

这里做个简单演示：例如`select * from user`

`GAV`一导

```xml
    <dependencies>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.7.22</version>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.28</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.12</version>
        </dependency>
    </dependencies>
```

代码一写：

```java
		List<Entity> query = Db.use(new SimpleDataSource("jdbc:mysql://localhost:3306/test?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true&allowPublicKeyRetrieval=true", "root", "root")).query("select * from user");
        System.out.println(query);
```

完成

![image-20220315183248712](/imgs/oss/picGo/image-20220315183248712.png)