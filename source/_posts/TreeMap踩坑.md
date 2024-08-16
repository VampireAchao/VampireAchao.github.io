---
title: TreeMap踩坑
date: 2023-09-02 12:31:29
tags: java
---

> 不降志，不屈身，不追赶时髦，也不回避危险。──胡适

今天使用`TreeMap`踩坑了

代码如下：

```java
    @Test
    void test() {
        Map<Integer, Object> map = new TreeMap<>(Comparator.comparing(i -> i % 2 == 0));
        map.put(2, 0);
        map.put(1, 0);
        map.put(3, 0);
        System.out.println(map);
    }
```

输出结果却是

```bash
{1=0, 2=0}
```

这是因为`Comparator`里计算结果重复导致的，即便我们的`key`并不相同，也会被覆盖。。。

于是我们可以指定计算结果相同时策略：

```java
    @Test
    void test() {
        Map<Integer, Object> map = new TreeMap<>(Comparator.<Integer, Boolean>comparing(i -> i % 2 == 0).thenComparing(Comparator.naturalOrder()));
        map.put(2, 0);
        map.put(1, 0);
        map.put(3, 0);
        System.out.println(map);
    }

```

结果：

```bash
{1=0, 3=0, 2=0}
```
