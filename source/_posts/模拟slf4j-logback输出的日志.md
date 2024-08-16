---
title: 模拟slf4j+logback输出的日志
date: 2021-03-21 23:20:05
tags: java
---

> 宿命论是那些缺乏意志力的弱者的借口。——罗曼·罗兰

实现

```java
package com.ruben.utils;

import lombok.extern.slf4j.Slf4j;

import java.lang.management.ManagementFactory;
import java.lang.management.RuntimeMXBean;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * @ClassName: LineUtils
 * @Description: 我还没有写描述
 * @Date: 2021/3/17 0017 21:45
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Slf4j
public class LineUtils {

    public static void print() {
        print("");
    }

    public static void print(String value) {
        StackTraceElement[] stacks = new Throwable().getStackTrace();
        final StackTraceElement stack = stacks[1];
        String className = stack.getClassName();
        String methodName = stack.getMethodName();
        int lineNumber = stack.getLineNumber();
        System.out.println(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"))
                + "  INFO " + ManagementFactory.getRuntimeMXBean().getName().split("@")[0]
                + " --- [" + Thread.currentThread().getName() + "] "
                + className + "." + methodName + "  :" + lineNumber + value);

    }

    public static void main(String[] args) {
        print();
    }
}

```

效果

![image-20210321232117400](/imgs/oss/picGo/image-20210321232117400.png)