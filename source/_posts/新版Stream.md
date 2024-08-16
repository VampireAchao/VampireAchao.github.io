---
title: 新版Stream
date: 2021-07-21 23:14:04
tags: java
---

> 最具挑战性的挑战莫过于提升自我。——迈克尔·F·斯特利

`Java9`和`Java16`中更新了`Stream`中的函数

```java
        // @since 9：无限流现在可以给终止条件啦！注意第二个参数
        // @since 16：toList简化了.collect(Collectors.toList())
        // 这里是从0获取到99的元素
        List<Integer> collect = Stream.iterate(0, i -> i < 100, i -> ++i).toList();
        System.out.println("iterate&toList：" + collect);

        // @since 9：takeWhile——只要满足条件就取出元素，直到遇到第一个不满足的元素为止(不受并行流影响，属于有状态中间操作)
        System.out.print("takeWhile：");
        collect.parallelStream().takeWhile(i -> i < 66).forEach(obj -> System.out.print(obj + " "));
        System.out.println();

        // @since 9：dropWhile——只要满足条件就跳过，直到遇到第一个不满足条件的开始取值(不受并行流影响，属于有状态中间操作)
        List<Integer> drop = collect.parallelStream().dropWhile(i -> i < 66).toList();
        System.out.println("dropWhile" + drop);

        // @since 9：ofNullable，之前只有Stream.of，而Stream.of(null)会抛出NPE
        // ofNullable如果为空，则得到一个Stream.empty()
        Stream.ofNullable(null);
        Stream.of("");

        // @since 16：mapMulti——拆分或替换所有元素为...
        // BiConsumer中第一个参数是当前元素，第二个参数为Consumer，调用accept，传入要替换的值即可，这里b为一个Consumer，调用多次即可实现一变多，类似flatMap
        Stream.of("1", "2").mapMulti((a, b) -> b.accept(a + "0")).forEach(System.out::print);
        System.out.println();
        // 例如：元素全部累加1，这里mapMultiToInt是mapMulti变种，转换为基本类型int，下方同理
        Stream.of(1, 2).mapMultiToInt((a, b) -> b.accept(a + 1)).forEach(System.out::print);
        System.out.println();
        // 全部替换成8
        Stream.of("1", "2").mapMultiToLong((a, b) -> b.accept(8L)).forEach(System.out::print);
        System.out.println();
        // 全部减一
        Stream.of(1, 2).mapMultiToDouble((a, b) -> b.accept(a - 1)).forEach(obj -> System.out.print(obj + " "));
```

控制台打印结果

![image-20210721231757287](/imgs/oss/picGo/image-20210721231757287.png)
