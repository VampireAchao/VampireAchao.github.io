---
title: Collectors.flatMapping
date: 2022-07-09 22:07:16
tags: java
---

> 我只想站在比你高的地方，用人类最纯粹的痛苦和烦恼给你一记响亮的耳光。——《阴火》

发现官方竟然没有，那就自己写一个

```java
    public static <T, U, A, R>
    Collector<T, ?, R> flatMapping(Function<? super T, Stream<? extends U>> mapper,
                                   Collector<? super U, A, R> downstream) {
        BiConsumer<A, ? super U> downstreamAccumulator = downstream.accumulator();
        return new Collectors.CollectorImpl<>(downstream.supplier(),
                (r, t) -> Opp.ofNullable(t).map(mapper).ifPresent(s -> s.sequential()
                        .forEach(v -> downstreamAccumulator.accept(r, v))),
                downstream.combiner(), downstream.finisher(),
                downstream.characteristics());
    }
```

用法：

```java
        List<Integer> actual = Stream.iterate(0, i -> ++i).limit(3)
                .collect(Collectors.flatMapping(i -> Stream.of(i, i), Collectors.toList()));
        Assertions.assertEquals(Arrays.asList(0, 0, 1, 1, 2, 2), actual);
```

