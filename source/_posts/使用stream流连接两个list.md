---
title: 使用stream流连接两个list
date: 2020-11-18 21:17:48
tags: java
---

> 生命如同寓言，其价值不在于长短，而在于内容—— 塞涅卡

```java
        List<Integer> integerList = Arrays.stream(new int[]{1, 2, 3}).boxed().collect(Collectors.toList());
        List<Integer> collect = Stream.concat(integerList.stream(), integerList.stream()).collect(Collectors.toList());
        collect.forEach(System.out::print);
        System.out.println();
        collect = Stream.of(integerList, integerList).flatMap(List::stream).collect(Collectors.toList());
        collect.forEach(System.out::print);
        System.out.println();
```

![image-20201118211949987](/imgs/oss/picGo/image-20201118211949987.png)

