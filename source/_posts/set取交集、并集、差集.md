---
title: set取交集、并集、差集
date: 2020-11-22 21:35:57
tags: java
---

> 蜡烛的美是绝唱的美，它以自焚的痛苦将自己化为光和热，照亮了别人。——鲁迅

```java
        HashSet<String> hashSet = new HashSet<>(Arrays.asList("0", "1", "2"));
        HashSet<String> hashSet2 = new HashSet<>(Arrays.asList("1", "2", "3"));
        // 取交集
        hashSet.retainAll(hashSet2);
        hashSet.forEach(System.out::println);
        System.out.println();
        HashSet<String> hashSet3 = new HashSet<>(Arrays.asList("0", "1", "2"));
        // 取并集
        hashSet3.addAll(hashSet2);
        hashSet3.forEach(System.out::println);
        System.out.println();
        HashSet<String> hashSet4 = new HashSet<>(Arrays.asList("0", "1", "2"));
        // 取差集
        hashSet4.removeAll(hashSet2);
        hashSet4.forEach(System.out::println);
```

