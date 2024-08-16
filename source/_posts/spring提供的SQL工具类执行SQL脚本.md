---
title: spring提供的SQL工具类执行SQL脚本
date: 2024-05-03 21:54:53
tags: java
---

> 方向是比速度更重要的追求。——白岩松

这里主要是用到了`org.springframework.jdbc.datasource.init.ScriptUtils#executeSqlScript(java.sql.Connection, org.springframework.core.io.Resource)`方法

例如

```java
    @BeforeAll
    static void setup(@Autowired DataSource dataSource) throws Exception {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        assertNotNull(jdbcTemplate.getDataSource());
        ScriptUtils.executeSqlScript(jdbcTemplate.getDataSource().getConnection(), new ClassPathResource("init.sql"));
    }
```

这样的话就可以使用`resources`目录下的`init.sql`
