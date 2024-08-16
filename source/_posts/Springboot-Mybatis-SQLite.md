---
title: Springboot+Mybatis+SQLite
date: 2020-10-13 20:50:34
tags: java
---

> 时人莫小池中水，浅处无妨有卧龙。——唐·窦庠《醉中赠符载》

之前写过一个[`springboot`的小项目](https://gitee.com/VampireAchao/simple-springboot.git)

现在又在往里加东西啦！

之前没有对数据库添加支持，今天就往里整合`SQLite`吧！

首先先引入依赖

```xml
        <!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.1.3</version>
        </dependency>

        <!-- sqlite驱动 -->
        <!-- https://mvnrepository.com/artifact/org.xerial/sqlite-jdbc -->
        <dependency>
            <groupId>org.xerial</groupId>
            <artifactId>sqlite-jdbc</artifactId>
            <version>3.32.3.2</version>
        </dependency>
```

然后添加配置文件

```
spring:
  datasource:
    url: jdbc:sqlite:data.db
    driver-class-name: org.sqlite.JDBC
```

这个`url`配置可以参照我之前这篇[SQLite入门のjava创建库表](https://VampireAchao.github.io/2020/10/11/SQLite入门のjava创建库表/)

当时创建的`data.db`文件在哪，这里就写哪

然后就开始写吧

创建`Dao`接口

```java
package com.ruben.dao;

import com.ruben.pojo.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @ClassName: UserDao
 * @Date: 2020/10/11 0011 13:24
 * @Description:
 */
@Mapper
public interface UserDao {

    @SelectProvider(type = UserMapper.class, method = "findUserByCondition")
    User findUserByCondition(User user);

    @InsertProvider(type = UserMapper.class, method = "insertUser")
    int insertUser(User user);
    
}
```

然后是`Mapper`

```java
package com.ruben.dao;

import com.aliyuncs.utils.StringUtils;
import com.ruben.pojo.User;
import com.ruben.utils.StringUtil;
import org.apache.ibatis.jdbc.SQL;
import org.thymeleaf.expression.Lists;

import java.util.ArrayList;
import java.util.List;

/**
 * @ClassName: UserMapper
 * @Date: 2020/10/11 0011 13:26
 * @Description:
 */
public class UserMapper {
    public String findUserByCondition(User user) {
        SQL sql = new SQL();
        sql.SELECT("id,username,password");
        sql.FROM("user");
        if (user.getId() != null) {
            sql.WHERE("id=#{id}");
        } else if (StringUtils.isNotEmpty(user.getUsername())) {
            sql.WHERE("username=#{username}");
        }
        return sql.toString();
    }

    public String insertUser(User user) {
        SQL sql = new SQL();
        sql.INSERT_INTO("user");
        sql.VALUES("id,username,password", "#{id},#{username},#{password}");
        return sql.toString();
    }
}
```

`SQLite`入门就是这么简单...

然后把原来的假数据替换成真数据

```java
    @Override
    public User getUserByUsername(String username) {
        User condition = new User();
        condition.setUsername(username);
        //从缓存中获取，获取不到再从数据库中获取
        String userJson = (String) stringRedisTemplate
                .opsForHash()
                .get(UserConstant.USER_CACHE,
                        UserConstant.LOGIN_USER_PRE + username);
        if (StringUtils.isEmpty(userJson)) {
            //从数据库中获取
            return userDao.findUserByCondition(condition);
        }
        return JSON.parseObject(userJson, User.class);
    }

    @Override
    public User createUser(User user) {
        // 密码加密
        String password = Encrypt.SHA512(UserConstant.SALT + user.getUsername() + user.getPassword());
        user.setId(new Long(System.currentTimeMillis()).intValue());
        user.setPassword(password);
        try {
            int affect = userDao.insertUser(user);
            if (affect != 1) {
                return null;
            }
            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public User findUserByUsername(String username) {
        User user = new User();
        user.setUsername(username);
        return userDao.findUserByCondition(user);
    }

    @Override
    @Transactional
    public String register(User user) {
        // 密码加密
        String password = Encrypt.SHA512(UserConstant.SALT + user.getUsername() + user.getPassword());
        user.setId(new Long(System.currentTimeMillis()).intValue());
        user.setPassword(password);
        try {
            // 插入用户
            int affect = userDao.insertUser(user);
            if (affect != 1) {
                return "添加用户失败";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "添加用户失败";
        }
        return null;
    }
```

源码还是放在了上面那个项目地址中

