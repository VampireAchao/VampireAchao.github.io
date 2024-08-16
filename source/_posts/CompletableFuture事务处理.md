---
title: CompletableFuture事务处理
date: 2022-12-07 12:35:55
tags: java
---

> 男人的盟誓是女人的陷阱——莎士比亚

使用`CompletableFuture`进行异步任务编排时，可能会有事务的支持需求，我们这里可以使用之前我写的[手动回滚、提交事务](https://VampireAchao.github.io/2021/07/09/手动回滚、提交事务/)进行处理

代码案例如下，所用框架[stream-query](https://VampireAchao.github.io/stream-query-docs/#/)：

首先是不加事务的

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

/**
 * AsyncTest
 *
 * @author VampireAchao
 * @since 2022/12/6
 */
@SpringBootTest
class AsyncTest {

    @Test
    @Transactional
    void test(@Autowired ThreadPoolTaskExecutor executor) {
        UserInfo userInfo = new UserInfo();
        userInfo.setName("ruben");
        Database.save(userInfo);
        CompletableFuture.runAsync(() -> {
                Assertions.assertNotNull(userInfo.getId(), "id is null");
                Assertions.assertNotNull(Database.getById(userInfo.getId(), userInfo.getClass()), "user is null");
        }, executor).join();
    }
}
```

此处会抛出`assertNotNull`，提示`user is null`

因为外部事务未提交，但内部默认事务没有设置为读未提交

修改后事务支持的代码：

```java
package io.github.vampireachao.stream.plugin.mybatisplus;

import io.github.vampireachao.stream.plugin.mybatisplus.pojo.po.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.DefaultTransactionDefinition;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.Objects;
import java.util.concurrent.CompletableFuture;

/**
 * AsyncTest
 *
 * @author VampireAchao
 * @since 2022/12/6
 */
@SpringBootTest
class AsyncTest {

    @Test
    @Transactional
    void test(
            @Autowired TransactionTemplate transactionTemplate,
            @Autowired ThreadPoolTaskExecutor executor) {
        UserInfo userInfo = new UserInfo();
        userInfo.setName("ruben");
        Database.save(userInfo);
        CompletableFuture.runAsync(() -> {
            PlatformTransactionManager transactionManager = Objects.requireNonNull(transactionTemplate.getTransactionManager());
            DefaultTransactionDefinition transactionDefinition = new DefaultTransactionDefinition();
            transactionDefinition.setIsolationLevel(TransactionDefinition.ISOLATION_READ_UNCOMMITTED);
            TransactionStatus transactionStatus = transactionManager.getTransaction(transactionDefinition);
            try {
                Assertions.assertNotNull(userInfo.getId(), "id is null");
                Assertions.assertNotNull(Database.getById(userInfo.getId(), userInfo.getClass()), "user is null");
                transactionManager.commit(transactionStatus);
            } catch (Throwable e) {
                transactionManager.rollback(transactionStatus);
                throw e;
            }
        }, executor).join();
    }
}
```

成功执行

