---
title: sqlite读取文件初始库表
date: 2022-05-19 13:20:20
tags: java
---

> 一旦发现英雄也会落井，投石的人会格外勇敢，人群会格外拥挤。——《芳华》

目录结构：

![image-20220519132236549](/imgs/oss/picGo/image-20220519132236549.png)

`GAV`

```xml
        <dependency>
            <groupId>com.ejlchina</groupId>
            <artifactId>bean-searcher-boot-starter</artifactId>
            <version>3.6.0</version>
        </dependency>
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.36.0.3</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>5.8.0.M5</version>
        </dependency>
```

配置：

```yaml
spring:
  datasource:
    driver-class-name: org.sqlite.JDBC
    url: jdbc:sqlite:src/main/resources/data.sqlite
  sql:
    init:
      schema-locations: classpath:db/schema-sqlite.sql
      data-locations: classpath:db/data-sqlite.sql

# Logger Config
logging:
  level:
    root: debug
bean-searcher:
  sql:
    default-mapping:
      redundant-suffixes: PO
  params:
    pagination:
      start: 1
```

`schema-sqlite.sql`

```sqlite
DROP TABLE IF EXISTS PERSON;

CREATE TABLE PERSON
(
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname VARCHAR(30) NULL DEFAULT NULL,
    age       INT(11)     NULL DEFAULT NULL,
    lastname  VARCHAR(50) NULL DEFAULT NULL
);
```

`data-sqlite.sql`

```sqlite
DELETE
FROM PERSON;

INSERT INTO PERSON (id, firstname, age, lastname)
VALUES (1, 'John', 18, 'White'),
       (2, 'John', 20, 'Doe'),
       (3, 'Tom', 28, 'clancy'),
       (4, 'Sandy', 21, 'white'),
       (5, 'Billie', 24, 'Billie');
```

测试代码：

```java
package com.ruben;

import java.io.BufferedInputStream;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.util.ResourceUtils;

import com.ejlchina.searcher.BeanSearcher;
import com.ejlchina.searcher.SearchResult;
import com.ejlchina.searcher.util.MapUtils;
import com.ruben.pojo.po.PersonPO;

import cn.hutool.core.io.IoUtil;
import cn.hutool.core.util.StrUtil;
import lombok.SneakyThrows;

@SpringBootTest
class SimpleBeanSearcherApplicationTests {

    @Resource
    private JdbcTemplate jdbcTemplate;
    @Resource
    private BeanSearcher beanSearcher;

    @Value("${spring.sql.init.schema-locations}")
    private String schemaLocations;
    @Value("${spring.sql.init.data-locations}")
    private String dataLocations;

    public static final String SQL_SPLIT = ";";

    @SneakyThrows
    @Autowired
    public void init() {
        final String schemaSql = IoUtil.readUtf8(
                (BufferedInputStream) ResourceUtils.getURL(schemaLocations).getContent());
        final String dataSql = IoUtil.readUtf8((BufferedInputStream) ResourceUtils.getURL(dataLocations).getContent());
        Arrays.stream(schemaSql.split(SQL_SPLIT)).filter(StrUtil::isNotBlank).forEach(jdbcTemplate::execute);
        Arrays.stream(dataSql.split(SQL_SPLIT)).filter(StrUtil::isNotBlank).forEach(jdbcTemplate::execute);
    }


    @Test
    void searchPage() {
        final Map<String, Object> params = MapUtils.builder().page(1, 5).build();
        final SearchResult<PersonPO> result = beanSearcher.search(PersonPO.class, params);
        Assertions.assertEquals(5, result.getTotalCount().longValue());
        final List<PersonPO> personPOList = result.getDataList();
        Assertions.assertAll(() -> personPOList.forEach(System.out::println));
    }


}
```

