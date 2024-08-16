---
title: 对null值友好的Collectors.groupingBy
date: 2022-01-09 21:08:15
tags: java
---

> 一个人行走的范围，就是他的世界。——北岛

我们在使用`Collectors.groupingBy`时会遇到这种情况：

```java
Map<String, List<User>> map = Arrays.asList(new User(), null).stream().collect(Collectors.groupingBy(User::getName));
```

![image-20220109213438674](/imgs/oss/picGo/image-20220109213438674.png)

为了避免这种情况，于是我自己实现了一个：

```java
    @SafeVarargs
    @SuppressWarnings("unchecked")
    public static <T, K, D, A, M extends Map<K, D>> M listGroupBy(List<T> list, Function<T, K> sFunction, Collector<? super T, A, D> downstream, boolean isParallel, Consumer<T>... peeks) {
        boolean hasFinished = downstream.characteristics().contains(Collector.Characteristics.IDENTITY_FINISH);
        return peekStream(list, isParallel, peeks).collect(new Collector<T, HashMap<K, A>, M>() {
            @Override
            public Supplier<HashMap<K, A>> supplier() {
                return HashMap::new;
            }

            @Override
            public BiConsumer<HashMap<K, A>, T> accumulator() {
                return (m, t) -> {
                    K key = Optional.ofNullable(t).map(sFunction).orElse(null);
                    A container = m.computeIfAbsent(key, k -> downstream.supplier().get());
                    downstream.accumulator().accept(container, t);
                };
            }

            @Override
            public BinaryOperator<HashMap<K, A>> combiner() {
                return (m1, m2) -> {
                    for (Map.Entry<K, A> e : m2.entrySet()) {
                        m1.merge(e.getKey(), e.getValue(), downstream.combiner());
                    }
                    return m1;
                };
            }

            @Override
            public Function<HashMap<K, A>, M> finisher() {
                return hasFinished ? i -> (M) i : intermediate -> {
                    // a-> a[0]
                    intermediate.replaceAll((k, v) -> (A) downstream.finisher().apply(v));
                    @SuppressWarnings("unchecked")
                    M castResult = (M) intermediate;
                    return castResult;
                };
            }

            @Override
            public Set<Characteristics> characteristics() {
                return hasFinished ? Collections.unmodifiableSet(EnumSet.of(Collector.Characteristics.IDENTITY_FINISH)) : Collections.emptySet();
            }
        });
    }
```

使用方式：

```java
Map<String, List<User>> map = listGroupBy(Arrays.asList(new User(), null), User::getName, Collectors.toList(), false)
```

这样避免了抛出异常，返回了对`null`值友好的结果(`map`里包含一个`key`为`null`的结果)

我稍作修改放到`MP`的`SimpleQuery`和`hutool`中的`CollStreamUtil`以及`CollectorUtil`中去了

