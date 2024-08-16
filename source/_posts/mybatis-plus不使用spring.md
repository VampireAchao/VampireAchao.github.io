---
title: mybatis-plus不使用spring
date: 2021-08-15 19:49:24
tags: java
---

> 只有把抱怨环境的心情，化为上进的力量，才是成功的保证。——罗曼·罗兰

代码如下：

```java
package com.ruben.simplescaffold;


import com.baomidou.mybatisplus.core.MybatisConfiguration;
import com.baomidou.mybatisplus.core.MybatisSqlSessionFactoryBuilder;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.ruben.simplescaffold.entity.UserDetail;
import com.ruben.simplescaffold.mapper.UserDetailMapper;
import org.apache.ibatis.logging.stdout.StdOutImpl;
import org.apache.ibatis.mapping.Environment;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.transaction.TransactionFactory;
import org.apache.ibatis.transaction.jdbc.JdbcTransactionFactory;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * @author miemie
 * @since 2020-03-11
 */
public class NoSpring {

    private static SqlSessionFactory sqlSessionFactory = initSqlSessionFactory();

    public static void main(String[] args) {
        try (SqlSession session = sqlSessionFactory.openSession(true)) {
            UserDetailMapper mapper = session.getMapper(UserDetailMapper.class);
            System.out.println(mapper.selectList(Wrappers.lambdaQuery()));
            System.out.println(UserDetail.builder().build().selectAll());
        }
    }

    public static SqlSessionFactory initSqlSessionFactory() {
        DataSource dataSource = dataSource();
        TransactionFactory transactionFactory = new JdbcTransactionFactory();
        Environment environment = new Environment("Production", transactionFactory, dataSource);
        MybatisConfiguration configuration = new MybatisConfiguration(environment);
        configuration.addMapper(UserDetailMapper.class);
        configuration.setLogImpl(StdOutImpl.class);
        configuration.setDefaultEnumTypeHandler(org.apache.ibatis.type.EnumOrdinalTypeHandler.class);
        return new MybatisSqlSessionFactoryBuilder().build(configuration);
    }

    public static DataSource dataSource() {
        SimpleDriverDataSource dataSource = new SimpleDriverDataSource();
        dataSource.setDriverClass(com.mysql.cj.jdbc.Driver.class);
        dataSource.setUrl("jdbc:mysql://localhost:3306/test?autoReconnect=true&zeroDateTimeBehavior=CONVERT_TO_NULL&useUnicode=true&characterEncoding=utf-8&useSSL=false&nullCatalogMeansCurrent=true&serverTimezone=Asia/Shanghai&allowMultiQueries=true&allowPublicKeyRetrieval=true");
        dataSource.setUsername("achao");
        dataSource.setPassword("789456");
        try {
            Connection connection = dataSource.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery("SELECT VERSION()");
            resultSet.next();
            System.out.println(resultSet.getString("VERSION()"));
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return dataSource;
    }
}
```

项目地址：

https://gitee.com/VampireAchao/simple-scaffold/blob/master/src/test/java/com/ruben/simplescaffold/NoSpring.java
