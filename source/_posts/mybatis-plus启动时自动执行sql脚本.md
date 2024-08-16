---
title: mybatis-plus启动时自动执行sql脚本
date: 2024-04-11 21:51:15
tags: java
---

> 不劳动，无所得。——富兰克林

源码地址：

[mybatis-plus-samples/mybatis-plus-sample-ddl-mysql/src/main/java/com/baomidou/mybatisplus/samples/ddl/mysql/MysqlDdl.java at master · baomidou/mybatis-plus-samples · GitHub](https://github.com/baomidou/mybatis-plus-samples/blob/master/mybatis-plus-sample-ddl-mysql/src/main/java/com/baomidou/mybatisplus/samples/ddl/mysql/MysqlDdl.java)

代码如下：

```java
package com.baomidou.mybatisplus.samples.ddl.mysql;

import com.baomidou.mybatisplus.extension.ddl.SimpleDdl;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class MysqlDdl extends SimpleDdl {

    /**
     * 执行 SQL 脚本方式
     */
    @Override
    public List<String> getSqlFiles() {
        return Arrays.asList(
                // 测试存储过程
                "db/test_procedure.sql#$$",

                // 内置包方式
                "db/tag-schema.sql",
                "db/tag-data.sql"

                // 文件绝对路径方式（修改为你电脑的地址）
                // "D:\\sql\\tag-data.sql"
        );
    }
}
```

这里对应的目录

```
resources
    ├── db
    |   ├── tag-data.sql
    |   ├── tag-schema.sql    
    |   └── test_procedure.sql
    └── application.yml
```

只需要启动项目，即可自动执行
