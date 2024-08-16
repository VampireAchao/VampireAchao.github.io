---
title: mybatis-plus使用oceanbase-oracle模式
date: 2024-04-12 21:31:35
tags: java
---

> 不用劳力而获得的东西，只有“贫困”。——莎士比亚

首先引入依赖

```xml
 <dependency>
    <groupId>com.oceanbase</groupId>
    <artifactId>oceanbase-client</artifactId>
    <version>最新版本</version>
  </dependency>
  <!-- mybatis-plus-boot-starter -->
  <dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>最新版本</version>
  </dependency>
```

然后配置连接

```properties
spring.datasource.url=jdbc:oceanbase://11.XX.XX.197:1130/TEST#mysql模式#spring.datasource.username=XXXX@mysql#oracle模式下需要额外设置分页插件DbType为Oraclespring.datasource.username=XXXX@xyoraclespring.datasource.password=XXXXspring.datasource.driverClassName=com.alipay.oceanbase.jdbc.Driver
```

新建实体类和`Mapper`

```java
public interface UserMapper extends BaseMapper<User> {
}
```

直接使用即可查询

```java

```
