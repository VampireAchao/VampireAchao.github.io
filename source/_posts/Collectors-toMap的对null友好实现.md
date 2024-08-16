---
title: Collectors.toMap的对null友好实现
date: 2022-01-22 17:47:36
tags: java
---

> 令她反感的，远不是世界的丑陋，而是这个世界所戴的漂亮面具。——《不能承受的生命之轻》

我们在使用`toMap`时如果遇到`null`元素，经常会导致我们发生`npe`

很不方便

于是我给`hutool`提交了一个[`PR`](https://gitee.com/dromara/hutool/pulls/502/files)

完美解决了这个问题

使用方式：

升级到`hutool-5.7.20`

然后使用`CollectorUtil`

```java
        Map<String, Integer> collect = Arrays.asList("ruben", "a chao", "vampire", "RUBEN", "VAMPIRE", null).stream().collect(CollectorUtil.toMap(Function.identity(), String::length, (l, r) -> l));
        System.out.println(collect);
```

即可