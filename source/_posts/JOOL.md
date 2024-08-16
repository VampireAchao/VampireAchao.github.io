---
title: JOOL
date: 2023-03-09 20:22:34
tags: java
---

> 感官并不欺骗人，欺骗人的是判断力——歌德

分享一个框架`JOOL`

https://github.com/jOOQ/jOOL

![image-20230309202623895](/imgs/oss/blog/vampireachao/image-20230309202623895.png)

其封装了更好用的`lambda`

例如：

```java
// (1, 2, 3, 4, 5, 6)
Seq.of(1, 2, 3).concat(Seq.of(4, 5, 6));

// true
Seq.of(1, 2, 3, 4).contains(2);

// true
Seq.of(1, 2, 3, 4).containsAll(2, 3);

// true
Seq.of(1, 2, 3, 4).containsAny(2, 5);

// (tuple(1, "A"), tuple(1, "B"), tuple(2, "A"), tuple(2, "B"))
Seq.of(1, 2).crossJoin(Seq.of("A", "B"));

// (tuple(1, 1), tuple(1, 2), tuple(2, 1), tuple(2, 2))
Seq.of(1, 2).crossSelfJoin()

// (1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, ...)
Seq.of(1, 2, 3).cycle();

// tuple((1, 2, 3), (1, 2, 3))
Seq.of(1, 2, 3).duplicate();

// "!abc"
Seq.of("a", "b", "c").foldLeft("!", (u, t) -> u + t);

// "abc!"
Seq.of("a", "b", "c").foldRight("!", (t, u) -> t + u);

// { 1 = (1, 3), 0 = (2, 4) }
Seq.of(1, 2, 3, 4).groupBy(i -> i % 2);

// (tuple(1, (1, 3)), tuple(0, (2, 4)))
Seq.of(1, 2, 3, 4).grouped(i -> i % 2);

// (tuple(1, 1), tuple(2, 2))
Seq.of(1, 2, 4).innerJoin(Seq.of(1, 2, 3), (a, b) -> a == b);

// (tuple(1, 2), tuple(2, 1))
Seq.of(1, 2).innerSelfJoin((t, u) -> t != u)

// (1, 0, 2, 0, 3, 0, 4)
Seq.of(1, 2, 3, 4).intersperse(0);

// "123"
Seq.of(1, 2, 3).join();

// "1, 2, 3"
Seq.of(1, 2, 3).join(", ");

// "^1|2|3$"
Seq.of(1, 2, 3).join("|", "^", "$"); 

// (tuple(1, 1), tuple(2, 2), tuple(4, null))
Seq.of(1, 2, 4).leftOuterJoin(Seq.of(1, 2, 3), (a, b) -> a == b);

// (tuple(tuple(1, 0), NULL), tuple(tuple(2, 1), tuple(1, 0)))
Seq.of(tuple(1, 0), tuple(2, 1)).leftOuterSelfJoin((t, u) -> t.v2 == u.v1)

// (1, 2)
Seq.of(1, 2, 3, 4, 5).limitWhile(i -> i < 3);

// (1, 2)
Seq.of(1, 2, 3, 4, 5).limitUntil(i -> i == 3);

// (1, 2L)
Seq.of(new Object(), 1, "B", 2L).ofType(Number.class);

// (tuple(1, 1), tuple(2, 2), tuple(null, 3))
Seq.of(1, 2, 4).rightOuterJoin(Seq.of(1, 2, 3), (a, b) -> a == b);

// (tuple(NULL, tuple(1, 0)), tuple(tuple(1, 0), tuple(2, 1)))
Seq.of(tuple(1, 0), tuple(2, 1)).rightOuterSelfJoin((t, u) -> t.v1 == u.v2)

// tuple((1, 3), (2, 4))
Seq.of(1, 2, 3, 4).partition(i -> i % 2 != 0);

// (1, 3, 4)
Seq.of(1, 2, 3, 4).remove(2);

// (1, 4)
Seq.of(1, 2, 3, 4).removeAll(2, 3, 5);

// (2, 3)
Seq.of(1, 2, 3, 4).retainAll(2, 3, 5);

// (4, 3, 2, 1)
Seq.of(1, 2, 3, 4).reverse();

// (3, 1, 4, 5, 2) for example
Seq.of(1, 2, 3, 4, 5).shuffle();

// (3, 4, 5)
Seq.of(1, 2, 3, 4, 5).skipWhile(i -> i < 3);

// (3, 4, 5)
Seq.of(1, 2, 3, 4, 5).skipUntil(i -> i == 3);

// (2, 3)
Seq.of(1, 2, 3, 4, 5).slice(1, 3)

// tuple((1, 2), (3, 4, 5))
Seq.of(1, 2, 3, 4, 5).splitAt(2);

// tuple(1, (2, 3, 4, 5))
Seq.of(1, 2, 3, 4, 5).splitAtHead();

// tuple((1, 2, 3), (a, b, c))
Seq.unzip(Seq.of(tuple(1, "a"), tuple(2, "b"), tuple(3, "c")));

// (tuple(1, "a"), tuple(2, "b"), tuple(3, "c"))
Seq.of(1, 2, 3).zip(Seq.of("a", "b", "c"));

// ("1:a", "2:b", "3:c")
Seq.of(1, 2, 3).zip(Seq.of("a", "b", "c"), (x, y) -> x + ":" + y);

// (tuple("a", 0), tuple("b", 1), tuple("c", 2))
Seq.of("a", "b", "c").zipWithIndex();
```

最后是`GAV`

> **For use with Java 9+**
>
> ```xml
> <dependency>
>   <groupId>org.jooq</groupId>
>   <artifactId>jool</artifactId>
>   <version>0.9.15</version>
> </dependency>
> ```
>
> **For use with Java 8+**
>
> ```xml
> <dependency>
>   <groupId>org.jooq</groupId>
>   <artifactId>jool-java-8</artifactId>
>   <version>0.9.15</version>
> </dependency>
> ```