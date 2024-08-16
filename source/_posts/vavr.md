---
title: vavr
date: 2022-06-28 12:55:28
tags: java
---

> 你的地图是一张白纸，所以即使想决定目的地，也不知道路在哪里。——《解忧杂货店》

分享一个`java`函数式库，简介我们的代码：https://www.vavr.io/

首先我们引入：

```xml
        <dependency>
            <groupId>io.vavr</groupId>
            <artifactId>vavr</artifactId>
            <version>1.0.0-alpha-4</version>
        </dependency>
```

文档：https://docs.vavr.io/

例如以前我们编写类似代码：

```java
int divide(int dividend, int divisor) {
    // throws if divisor is zero
    return dividend / divisor;
}
```

可能会抛出除`0`异常

使用`vavr`：

```java
// = Success(result) or Failure(exception)
Try<Integer> divide(Integer dividend, Integer divisor) {
    return Try.of(() -> dividend / divisor);
}
```

除此以外还有很多很多，不一一列举了