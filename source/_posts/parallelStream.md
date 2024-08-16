---
title: parallelStream
date: 2021-06-12 21:04:00
tags: java
---

> 我又愿中国青年只是向上走，不必理会这冷笑和暗箭。——鲁迅

我们在开发中经常使用`stream`去处理我们的集合

这里分享一个并行流：`parallelStream`

它可以允许我们的声明式编程以多线程并行的方式执行

首先我们可以比较一下性能

```java
        List<Integer> list = new SecureRandom().ints().limit(10000000).boxed().collect(Collectors.toList());

        long startTime = System.nanoTime();
        // 求和操作
        int sum = list.stream().mapToInt(Integer::intValue).reduce(0, Integer::sum);
        System.out.println("普通stream求和结果：" + sum);
        long normalStreamEndTime = System.nanoTime();

        System.out.println("普通stream耗时：" + ((normalStreamEndTime - startTime) / (1000.0 * 1000.0)) + " ms");
        // 求和操作
        int parallelSum = list.parallelStream().mapToInt(Integer::intValue).reduce(0, Integer::sum);
        System.out.println("parallelStream求和结果：" + parallelSum);
        long parallelStreamEndTime = System.nanoTime();
        System.out.println("parallelStream耗时：" + ((parallelStreamEndTime - normalStreamEndTime) / (1000.0 * 1000.0)) + " ms");
```

实验结果

![image-20210612220021231](/imgs/oss/picGo/image-20210612220021231.png)

可以明显看到我们的并行流`parallelStream`性能远超`stream`，那它性能这么好，为啥不直接使用`parallelStream`呢？

其实并行流也是有代价的

它会存在线程安全问题，并且它的执行是无序的

这里举个例子

我们在源代码上加上给`lastValue`设置值这样一个操作

![image-20210612220726908](/imgs/oss/picGo/image-20210612220726908.png)

可以明显看到两者不一致

![image-20210612220748254](/imgs/oss/picGo/image-20210612220748254.png)

如果还没`get`到，我们还可以直接打印元素，看看顺序，这里我把元素改少一点

然后再把打印语句放到`mapToInt`里面去

现在总发现两者顺序不一致了吧

![image-20210612221046764](/imgs/oss/picGo/image-20210612221046764.png)

所以要根据场合进行灵活应用，明天我将继续深入并行流中的其中一种特性

