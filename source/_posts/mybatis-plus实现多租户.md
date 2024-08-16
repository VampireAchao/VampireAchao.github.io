---
title: mybatis-plus实现多租户
date: 2021-02-13 18:14:21
tags: java
---

> 我无论作什麽，始终在想着，只要我的精力允许我的话，我就要首先为我的祖国服务。——巴甫

个人理解的多租户：一套产品提供给多个企业使用，每家企业之间的数据相互隔离。例如我有一套运输管理系统，开发完成后，每一家企业购买我们的产品，我只需要提供一个账号，即可拥有完整的内容。如权限管理、订单管理等，他们之间的数据是不互通的

我们可以通过在每张表上加一个租户`id`去实现这个功能

我们的`mybatis-plus`版本为`3.1.0`，这里放上依赖

```java
        <!--    mybatis-plus    -->
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>mybatis-plus-boot-starter</artifactId>
            <version>3.1.0</version>
        </dependency>
```

然后我们需要修改配置文件

```yaml
#mybatis的配置
mybatis-plus:
  config-location: classpath:/mybatis/mybatis-config.xml
  mapper-locations:
    - classpath*:com/ruben/dao/xml/*Mapper.xml
  configuration-properties:
    prefix:
    boolValue: TRUE
    blobType: BLOB
  global-config:
    sql-parser-cache: true
```

关键是最下面两行`sql-parser-cache: true`

然后我们需要在`Mybatis-Plus`的配置类中进行配置

我们之前注入的分页拦截器`PaginationInterceptor`

当时是这么写的

```java
    @Bean
    public PaginationInterceptor paginationInterceptor() {
        return new PaginationInterceptor();
    }
```

现在我们加上配置

```java
package com.ruben.config;

import com.baomidou.mybatisplus.core.parser.ISqlParser;
import com.baomidou.mybatisplus.extension.parsers.BlockAttackSqlParser;
import com.baomidou.mybatisplus.extension.plugins.PaginationInterceptor;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantHandler;
import com.baomidou.mybatisplus.extension.plugins.tenant.TenantSqlParser;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.LongValue;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName: MybatisPlusConfig
 * @Description: MybatisPlus配置
 * @Date: 2020/11/21 0021 16:34
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Configuration
@MapperScan("com.ruben.dao.mapper*")
public class MybatisPlusConfig {

    @Bean
    public PaginationInterceptor paginationInterceptor() {
        PaginationInterceptor interceptor = new PaginationInterceptor();
        List<ISqlParser> sqlParserList = new ArrayList<>();
        sqlParserList.add(new BlockAttackSqlParser());
        TenantSqlParser tenantSqlParser = new TenantSqlParser();
        tenantSqlParser.setTenantHandler(new TenantHandler() {
            @Override
            public Expression getTenantId() {
                // 配置租户id，这里我简单使用1作为租户id
                return new LongValue(1);
            }

            @Override
            public String getTenantIdColumn() {
                // 配置租户id字段
                return "tenant_id";
            }

            @Override
            public boolean doTableFilter(String tableName) {
                // 配置是否过滤一些表，例如如果需要过滤 user 表，则：if (tableName.equals('user')) return true;
                return false;
            }
        });
        sqlParserList.add(tenantSqlParser);
        interceptor.setSqlParserList(sqlParserList);
        return interceptor;
    }
}
```

别忘了在数据库中的表加上字段`tenant_id`，如果我们的表非常多，可以参考我[这篇博客](https://VampireAchao.github.io/2020/08/20/mysql%E4%B8%80%E6%AC%A1%E7%BB%99%E6%95%B0%E6%8D%AE%E5%BA%93%E6%89%80%E6%9C%89%E8%A1%A8%E5%8A%A0%E5%AD%97%E6%AE%B5/)统一加字段

然后如果我们有些`sql`或者函数不需要加租户条件，则可以使用`@SqlParser(filter = true)`注解

![image-20210213182615411](/imgs/oss/picGo/image-20210213182615411.png)

不过注意，只能在`extends com.baomidou.mybatisplus.core.mapper.BaseMapper`的类中函数上加该注解才能生效

我们简单测试一下

```java
    @Test
    public void list() {
        List<UserPO> userList = mpUserMapper.findUserList(UserPO.builder().username("ruben").build());
        userList.forEach(System.out::println);
        LambdaQueryWrapper<UserPO> wrapper = Wrappers.lambdaQuery(UserPO.builder().build());
        wrapper.select(w -> true).inSql(UserPO::getId, "select id from user");
        mpUserMapper.selectList(wrapper);
    }
```

![image-20210213182928977](/imgs/oss/picGo/image-20210213182928977.png)

这里红色打印出来的`sql`就是我们刚刚加了`@SqlParser(filter = true)`注解的函数

下面蓝色则是使用`mybatis-plus`封装好的`selectList`方法，可以看出蓝色里我们配置了租户`id`后的结果，默认加上了` user.tenant_id = 1`条件

这样每个租户之间就实现了相互隔离，非常便利~
