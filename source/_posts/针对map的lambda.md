---
title: 针对map的lambda
date: 2023-05-21 19:52:32
tags: java
---

> 雄辩是银，沉默是金。——佚名

例如原来的：

```java
Steam.of(Maps.of("foo", "bar"))
            .map(e -> e.getKey() + e.getValue())
            .findFirst();
```

现在

```java
Steam.of(Maps.of("foo", "bar"))
                    .map(SerFunc.entryFunc((key, value) -> key + value))
                    .findFirst();
```

可以给`key`和`value`取不同的变量名，源码是

```java
static <K, V, R> Function<Map.Entry<K, V>, R> entryFunc(BiFunction<K, V, R> biFunc) {
    return entry -> biFunc.apply(entry.getKey(), entry.getValue());
  }
```

还有其他的类型

```java
    val list = Lists.of();
    Steam.of(Maps.of("foo", "bar"))
        .forEach(SerCons.entryCons((key, value) -> list.add(key + value)));
    Assertions.assertEquals("foobar", list.get(0));
```

源码

```java
  static <K, V> Consumer<Map.Entry<K, V>> entryCons(BiConsumer<K, V> biCons) {
    return entry -> biCons.accept(entry.getKey(), entry.getValue());
  }
```

以及

```java
    val first =
        Steam.of(Maps.of("foo", "bar"))
            .findFirst(SerPred.entryPred((key, value) -> key.equals("foo") && value.equals("bar")));
    Assertions.assertTrue(first.isPresent());
```

源码

```java
  static <K, V> Predicate<Map.Entry<K, V>> entryPred(BiPredicate<K, V> biPred) {
    return entry -> biPred.test(entry.getKey(), entry.getValue());
  }
```

