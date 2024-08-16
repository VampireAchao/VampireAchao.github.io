---
title: reduce补充
date: 2021-03-01 20:26:38
tags: java
---

> 先发制人，后发制于人。——《汉书》

关于[`stream`](https://VampireAchao.github.io/2020/11/01/java8%E7%9A%84stream%E6%B5%81%EF%BC%88%E4%BA%8C%EF%BC%89/)中的`reduce`这里做个补充

我们使用`reduce`常用的其实有两种方式

```java
System.out.println("求和:" + random.ints().limit(10).boxed().reduce(Integer::sum).orElseThrow(() -> new RuntimeException("求和失败")));
        System.out.println("求和2:" + random.ints().limit(10).boxed().reduce(0, Integer::sum));
```

这里求和`2`中我们传入参数`0`，表示后面返回的是和参数`0`同类型的返回值

但如果使用第一种，返回的则是[`Optional`](https://VampireAchao.github.io/2021/01/05/Optional%E5%86%8D%E6%89%A9%E5%B1%95/)

这里其实还有第三种重载方法，但这种方法我们使用场景较少

```java
System.out.println("求和3:" + random.ints().limit(10).boxed().reduce(0, (i1, i2) -> Integer.sum(i1, i2), (i1, i2) -> null));
```

我们可以直接返回`null`

或者任意给一个

```java
System.out.println("求和3:" + random.ints().limit(10).boxed().reduce(0, Integer::sum, Integer::sum));
```

因为通常情况下是不会执行第三个参数传入的`Function`的
