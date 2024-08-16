---
title: '@Scheduled的使用'
date: 2020-12-21 20:17:10
tags: java
---

> 人之患在好为人师。——《孟子》

今天朋友问我定时任务怎么创建，让我们一起重温复习一下吧~

![img](/imgs/oss/picGo/OBN%7BKJ1DS81ZD8YMYVIE%5D$K.png)

首先需要在启动类上加`@EnableScheduling`注解(组件上也可以加)

![image-20201221202441018](/imgs/oss/picGo/image-20201221202441018.png)

然后在需要定时的方法上加上`@Scheduled`注解

```java
package com.ruben.task;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @ClassName: LogTask
 * @Description: 我还没有写描述
 * @Date: 2020/12/21 0021 20:11
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
@Slf4j
@Component
public class LogTask {


    @Scheduled(cron = "*/5 * * * * ?")
    public void logRecord() {
        log.info("执行了");
    }
}

```

然后运行项目，发现每过五秒就执行了一次

![image-20201221202650846](/imgs/oss/picGo/image-20201221202650846.png)

关于上面用于指定时间的`cron`表达式，常用的可以看[我这篇博客](https://VampireAchao.github.io/2020/06/25/cron%E8%A1%A8%E8%BE%BE%E5%BC%8F/)

如果我们需要给定条件判断是否执行，可以往`redis`里存一个`key`，执行开始判断有无此`key`,有则不执行
