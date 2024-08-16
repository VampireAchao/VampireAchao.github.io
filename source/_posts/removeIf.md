---
title: removeIf
date: 2021-01-19 19:49:15
tags: java
---

> 礼貌是最容易做到的事，也是最珍贵的东西。—— 冈察尔

`Java`中我们可能使用`Stream`的`filter`从`List`去过滤一些数据

但如果我们想要更高的效率，或者我们修改源数据，就需要用到`List`的`removeif`了

下面是一个简单的测试

```java
// 生成从0到20的数字，过滤掉奇数
        List<Integer> intList = Stream.iterate(0, e -> ++e).limit(20).collect(Collectors.toList());
        long filterStart = System.nanoTime();
        intList.stream().filter(a -> a % 2 == 0).collect(Collectors.toList());
        long filterEnd = System.nanoTime();
        System.out.println("filter执行了" + ((filterEnd - filterStart) / (1000.0 * 1000.0)) + "ms");
        long removeIfStart = System.nanoTime();
        intList.removeIf(a -> a % 2 != 0);
        long removeIfEnd = System.nanoTime();
        System.out.println("removeIfEnd执行了" + ((removeIfEnd - removeIfStart) / (1000.0 * 1000.0)) + "ms");
```

执行结果

![image-20210119202344072](/imgs/oss/picGo/image-20210119202344072.png)