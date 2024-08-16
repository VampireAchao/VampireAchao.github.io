---
title: 在SpringBoot单元测试中添加参数
date: 2022-04-21 12:58:53
tags: java
---

> 我的肩上是风，风上是闪烁的星群。——北岛《结局或开始·献给遇罗克》

当时是解决一个`issue`而去查阅的

https://github.com/baomidou/mybatis-plus/issues/4417

最后代码如下：

```java
package com.ruben.mybatisplusissue;

import javax.annotation.Resource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootContextLoader;
import org.springframework.boot.test.context.SpringBootTestContextBootstrapper;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.BootstrapWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextLoader;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.baomidou.mybatisplus.core.toolkit.AES;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.ruben.mybatisplusissue.mapper.UserMapper;
import com.zaxxer.hikari.HikariDataSource;

@ContextConfiguration(classes = MybatisPlusIssueApplication.class)
@ExtendWith(SpringExtension.class)
@BootstrapWith(MybatisPlusIssueApplicationTests.Bootstrapper.class)
class MybatisPlusIssueApplicationTests {

    static class Bootstrapper extends SpringBootTestContextBootstrapper {

        static class ArgumentSupplyingContextLoader extends SpringBootContextLoader {

            @Override
            protected SpringApplication getSpringApplication() {
                return new SpringApplication() {
                    @Override
                    public ConfigurableApplicationContext run(String... args) {
                        return super.run("--mpw.key=de8accd4774af9eb");
                    }
                };
            }
        }

        @Override
        protected Class<? extends ContextLoader> getDefaultContextLoaderClass(Class<?> testClass) {
            return ArgumentSupplyingContextLoader.class;
        }
    }

    @Resource
    private UserMapper userMapper;
    @Resource
    private HikariDataSource hikariDataSource;

    @Test
    void testRestart() {
        userMapper.selectList(Wrappers.lambdaQuery());
        // 生成 16 位随机 AES 密钥
        String randomKey = AES.generateRandomKey();
        // 随机密钥加密
        String url = AES.encrypt(hikariDataSource.getJdbcUrl(), randomKey);
        String username = AES.encrypt(hikariDataSource.getUsername(), randomKey);
        String password = AES.encrypt(hikariDataSource.getPassword(), randomKey);
        System.out.println("randomKey：[ --mpw.key=" + randomKey + " ]");
        System.out.println("url：[ mpw:" + url + " ]");
        System.out.println("username：[ mpw:" + username + " ]");
        System.out.println("password：[ mpw:" + password + " ]");
    }
}
```

这里`--mpw.key=de8accd4774af9eb`即为添加的参数