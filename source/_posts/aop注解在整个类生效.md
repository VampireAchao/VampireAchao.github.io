---
title: aop注解在整个类生效
date: 2022-08-17 16:58:28
tags: kotlin
---

> 志向是天才的幼苗，经过热爱劳动的双手培育，在肥田沃土里将成长为粗壮的大树。——苏霍姆林斯基

之前写过[自定义注解和AOP](https://VampireAchao.github.io/2021/09/26/自定义注解和AOP/)，但其是作用于方法上

今天用`kotlin`写一个作用在类上的：主要是`@annotation`换成`@within`

```kotlin
package com.ruben.simpleboot

import org.aspectj.lang.ProceedingJoinPoint
import org.aspectj.lang.annotation.Around
import org.aspectj.lang.annotation.Aspect
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.stereotype.Component
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController


@SpringBootApplication
class SimpleBootApplication

fun main(args: Array<String>) {
    runApplication<SimpleBootApplication>(*args)
}

// 一个简单的Controller
@RestController
@TestInterface
class TestController {
    @GetMapping("test")
    fun test(): String {
        return "test";
    }

    @GetMapping("mock")
    fun mock(): String {
        return "mock";
    }
}

// 注解
annotation class TestInterface

// AOP
@Aspect
@Component
class TestAop {
    // 针对注解目标的Class进行匹配
    @Around("@within(TestInterface)")
    fun recordWithMe(point: ProceedingJoinPoint): Any {
        return point.proceed()
    }
}
```

访问`test`和`mock`接口均成功进入`AOP`逻辑

![image-20220817170126372](/imgs/oss/blog/image-20220817170126372.png)
