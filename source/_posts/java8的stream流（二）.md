---
title: java8的stream流（二）
date: 2020-11-01 18:17:41
tags: java
---

> 字典里最重要的三个词，就是意志、工作、等待。我将要在这三块基石上建立我成功的金字塔——（法）巴斯德

之前写过一个[关于`stream`流的博客](https://VampireAchao.github.io/2020/06/21/java8%E7%9A%84stream%E6%B5%81/)，这次再做个补充吧

```java
        // 取出第一条，没取到则为0
        Integer first = someNumber.stream().findFirst().orElse(0);
        // 随机取一个，没取到则为0
        Integer any = someNumber.stream().findAny().orElse(0);
        // 直接取和，没取到则为0
        Integer sum = someNumber.stream().reduce(Integer::sum).orElse(0);
        // 不包含20为true
        boolean noneMatch = someNumber.stream().noneMatch(data -> data == 20);
        // 全部大于0为true
        boolean allMatch = someNumber.stream().allMatch(data -> data > 0);
        // 任何等于0为true
        boolean anyMatch = someNumber.stream().anyMatch(data -> data.equals(0));
        // 从下标2开始往后取3条
        List<Integer> page = someNumber.stream().skip(2).limit(3).collect(Collectors.toList());
```

