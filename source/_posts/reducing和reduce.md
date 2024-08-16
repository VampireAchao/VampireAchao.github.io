---
title: reducing和reduce
date: 2022-07-04 13:20:38
tags: java
---

> 我的悲伤还来不及出发，就已经到站下车。——《第七天》

在`java`中，分为`Collectors.reducing`和`Stream#reduce`

`reduce`是减少的意思，此处意为聚合

聚合是聚拢、合并的意思

我们来看看这俩函数的区别吧，下方我用了静态导入：

```java
import java.math.BigDecimal;
import java.util.*;
import java.util.function.BinaryOperator;
import java.util.stream.Collector;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;
```

首先是写法差异，对于只有一个参数的，这个参数指定了我们聚合的操作，此处我做一个累加，返回值为`Optional`证明有可能不存在值，就没有累加

```java
        Optional<Integer> sumOpt = Stream.iterate(0, i -> ++i).limit(10).collect(reducing(Integer::sum));
        System.out.println(sumOpt);     // Optional[45]
        sumOpt = Stream.iterate(0, i -> ++i).limit(10).reduce(Integer::sum);
        System.out.println(sumOpt);     // Optional[45]
```

两个参数的，这里第一个参数为默认值，这里返回的是默认值+累加后的结果，此处默认值只能指定为相同类型

```java
        Integer sum = Stream.iterate(0, i -> ++i).limit(10).collect(reducing(10, Integer::sum));
        System.out.println(sum);        // 55
        sum = Stream.iterate(0, i -> ++i).limit(10).reduce(10, Integer::sum);
        System.out.println(sum);        // 55
```

到此为止，其实都差不多，下面是三个参数的，这个三参用于聚合为其他类型的默认值，第一个参数还是默认值，第二个参数和第三个参数就有区别了

```java
    BigDecimal sumDecimal = Stream.iterate(0, i -> ++i).limit(10).collect(
            reducing(BigDecimal.ZERO, BigDecimal::new, BigDecimal::add));
    System.out.println(sumDecimal); // 45
    sumDecimal = Stream.iterate(0, i -> ++i).limit(10)
            .reduce(BigDecimal.ZERO, (d, i) -> d.add(new BigDecimal(i)), BigDecimal::add);
    System.out.println(sumDecimal); // 45
```
可以看出我们的`Collectors.reducing`第二个参数是一个`Function<Integer,BigDecimal>`，入参为`Integer`返回值为`BigDecimal`，并没有进行聚合运算，而是进行了一个转换，此处是由`Integer`去生成一个`BigDecimal`，调用的`java.math.BigDecimal#BigDecimal(int)`这个构造，而第三个参数才是我们的累加操作

但`Stream#reduce`中，第二个参数是一个`BiFunction<BigDecimal, Integer, BigDecimal>`，入参变为两个参数`BigDecimal`(已经累加的结果，并行流下值不可控)和`Integer`(本次参与运算的值)，返回值为`BigDecimal`(运算结果)，第三个参数是个`BinaryOperator<BigDecimal>`只在并行流场景下会用到，之前讲过，这里就不再表了，贴上链接：

[reduce补充二](https://VampireAchao.github.io/2021/06/13/reduce补充二/)

第三个参数区别：

也就是说，我们在串行流中哪怕将`Stream#reduce`的第三个参数，改为任意操作，他都是不影响结果执行的，例如我们这里取最大值

```java
BigDecimal sumDecimal = Stream.iterate(0, i -> ++i).limit(10).collect(
                reducing(BigDecimal.ZERO, BigDecimal::new, BinaryOperator.maxBy(BigDecimal::compareTo)));
        System.out.println(sumDecimal); // 9
        sumDecimal = Stream.iterate(0, i -> ++i).limit(10)
                .reduce(BigDecimal.ZERO, (d, i) -> d.add(new BigDecimal(i)), BinaryOperator.maxBy(BigDecimal::compareTo));
        System.out.println(sumDecimal); // 45
```

可以看出，哪怕我们改为`BinaryOperator.maxBy(BigDecimal::compareTo)`，是不影响`Stream#reduce`的，哪怕我们改为`null`

```java
        BigDecimal sumDecimal = Stream.iterate(0, i -> ++i).limit(10).collect(
                reducing(BigDecimal.ZERO, BigDecimal::new, (l, r) -> null));
        System.out.println(sumDecimal); // null
        sumDecimal = Stream.iterate(0, i -> ++i).limit(10)
                .reduce(BigDecimal.ZERO, (d, i) -> d.add(new BigDecimal(i)), (l, r) -> null);
        System.out.println(sumDecimal); // 45
```

除非并行流场景下：

```java
        Optional<Integer> sumOpt = Stream.iterate(0, i -> ++i).parallel().limit(10).collect(reducing(Integer::sum));
        System.out.println(sumOpt);     // Optional[45]
        sumOpt = Stream.iterate(0, i -> ++i).parallel().limit(10).reduce(Integer::sum);
        System.out.println(sumOpt);     // Optional[45]
        Integer sum = Stream.iterate(0, i -> ++i).parallel().limit(10).collect(reducing(10, Integer::sum));
        System.out.println(sum);        // 145
        sum = Stream.iterate(0, i -> ++i).parallel().limit(10).reduce(10, Integer::sum);
        System.out.println(sum);        // 145
        BigDecimal sumDecimal = Stream.iterate(0, i -> ++i).parallel().limit(10).collect(
                reducing(BigDecimal.ZERO, BigDecimal::new, (l, r) -> null));
        System.out.println(sumDecimal); // null
        sumDecimal = Stream.iterate(0, i -> ++i).parallel().limit(10)
                .reduce(BigDecimal.ZERO, (d, i) -> d.add(new BigDecimal(i)), (l, r) -> null);
        System.out.println(sumDecimal); // null
```

我们再次改为求最大值

```java
        BigDecimal sumDecimal = Stream.iterate(0, i -> ++i).parallel().limit(10).collect(
                reducing(BigDecimal.ZERO, BigDecimal::new, BinaryOperator.maxBy(BigDecimal::compareTo)));
        System.out.println(sumDecimal); // 9
        sumDecimal = Stream.iterate(0, i -> ++i).parallel().limit(10)
                .reduce(BigDecimal.ZERO, (d, i) -> d.add(new BigDecimal(i)), BinaryOperator.maxBy(BigDecimal::compareTo));
        System.out.println(sumDecimal); // 9
```

可以看到并行流场景下均生效
