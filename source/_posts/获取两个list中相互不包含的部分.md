---
title: 获取两个list中相互不包含的部分
date: 2022-01-12 19:29:52
tags: java
---

> “走吧，去吃肉。”——《非正常死亡》

![img](/imgs/oss/picGo/v2-8500ebb94736a1e685d340d5120fb166_720w.jpg)

代码如下：提供了几种方法(自个写的)

```java

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

class Scratch {
    public static void main(String[] args) {

        List<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        list.add(5);
        list.add(6);

        List<Integer> list1 = new ArrayList<>();
        list1.add(1);
        list1.add(2);
        list1.add(3);
        list1.add(4);
        list1.add(8);
        list1.add(9);

        // 从list中过滤出list1不包含的
        List<Integer> reduce1 = list.stream().filter(item -> !list1.contains(item)).collect(Collectors.toList());
        // 从list1中过滤出list不包含的
        List<Integer> collect = list1.stream().filter(item -> !list.contains(item)).collect(Collectors.toList());
        // 连接起来
        reduce1.addAll(collect);

        // 预期结果[5,6,8,9]
        List<Integer> result = Stream.concat(list.stream().filter(item -> !list1.contains(item)), list1.stream().filter(item -> !list.contains(item))).collect(Collectors.toList());

        System.out.println(result);
    }

    public static List<Integer> subListRemoveAll(List<Integer> list1, List<Integer> list2) {
        List<Integer> list = new ArrayList<>(list1);
        list1.removeAll(list2);
        list2.removeAll(list);
        list1.addAll(list2);
        return list1;
    }

    public static List<Integer> subListRetainAll(List<Integer> list1, List<Integer> list2) {
        List<Integer> list = new ArrayList<>(list1);
        list.retainAll(list2);
        list1.addAll(list2);
        list1.removeAll(list);
        return list1;
    }

    public static List<Integer> subListStream(List<Integer> list1, List<Integer> list2) {
        return Stream.concat(list1.stream(), list2.stream()).filter(i -> !list1.contains(i) || !list2.contains(i)).collect(Collectors.toList());
    }

    public static List<Integer> subListCollect(List<Integer> list1, List<Integer> list2) {
        return Stream.concat(list1.stream(), list2.stream()).collect(ArrayList::new, (l, v) -> Optional.of(!list1.contains(v) || !list2.contains(v)).filter(i -> i).ifPresent(p -> l.add(v)), ArrayList::addAll);
    }

    public static List<Integer> subListPartitioningBy(List<Integer> list1, List<Integer> list2) {
        return Stream.concat(list1.stream(), list2.stream()).collect(Collectors.partitioningBy(v -> !list1.contains(v) || !list2.contains(v))).getOrDefault(true, Collections.emptyList());
    }
}
```

