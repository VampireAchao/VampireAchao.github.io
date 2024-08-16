---
title: springboot使用异步任务
date: 2020-11-30 21:26:37
tags: java
---

> 

一个简单的异步任务在`springboot`中已经为我们封装好，这里我们可以直接在函数上加`@Async`注解即可使用

注意，我们要接收返回值的话，函数返回类型需要为`Future`

例如，我们这里使用异步任务和建造者模式去创建一个对象

```java
package com.ruben;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;

/**
 * @ClassName: AsyncDemo
 * @Description: 我还没有写描述
 * @Date: 2020/11/30 0030 21:17
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@SpringBootTest
public class AsyncDemo {

    @Test
    public void test() throws ExecutionException, InterruptedException {
        Future<StreamDemo.User> future = whoAmI("ruben", 19);
        StreamDemo.User user = future.get();
        System.out.println(user);
    }

    @Async
    public Future<StreamDemo.User> whoAmI(String ruben, Integer age) {
        return new AsyncResult<>(StreamDemo.User.builder().name(ruben).age(age).build());
    }

}

```

运行结果

![image-20201130212928922](/imgs/oss/picGo/image-20201130212928922.png)

要注意这里返回值是`new AsyncResult`