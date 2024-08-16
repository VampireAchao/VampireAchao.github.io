---
title: collect补充
date: 2021-06-14 20:36:36
tags: java
---

> 青年之文明，奋斗之文明也，与境遇奋斗，与时代奋斗，与经验奋斗。故青年者，人生，人生之春，人生之华也。——李大钊

书接[上文](https://VampireAchao.github.io/2021/06/13/reduce%E8%A1%A5%E5%85%85%E4%BA%8C/)，我们讲到并行流场景下三个参数的`reduce`会有一个坑

同理，在`collect`函数中也有这个坑

我们先使用普通流去做

```java
        // 生成1-100
        List<Integer> list = Stream.iterate(1, i -> ++i).limit(200).collect(Collectors.toList());
        System.out.println(list);
        // 使用collect函数进行转换为List<Map<Integer,Integer>>，包含值和线程id
        List<Map<String, Object>> result = list.stream().collect(() -> {
            System.out.println("第一个参数：Supplier，我们返回一个带初始值的List，放进去三个负数");
            Map<String, Object> map1 = new HashMap<>();
            // 获取线程id
            long threadId = Thread.currentThread().getId();
            // 放入一个值为负数，只有一个元素的map
            map1.put("value", -1);
            map1.put("threadId", threadId);
            List<Map<String, Object>> currentList = new ArrayList<>();
            // 将map添加进去
            currentList.add(map1);
            return currentList;
        }, (lastList, value) -> {
            // 具体的聚合操作，将value封装为map，加上线程id，放入list
            HashMap<String, Object> map = new HashMap<>();
            map.put("value", value);
            map.put("threadId", Thread.currentThread().getId());
            lastList.add(map);
        }, (lastList, currentList) -> {
            // 并行流下合计上面多个结果
            System.out.println("lastList：" + lastList);
            lastList.addAll(currentList);
            System.out.println("currentList：" + currentList);
        });
        System.out.println("最终结果：" + result);
        System.out.println("最终结果个数：" + result.size());
```

运行结果

![image-20210614211148873](/imgs/oss/picGo/image-20210614211148873.png)

初始值一个，加上我们`200`个元素，最后`201`个元素，并且线程`id`全是`1`，说明是主线程

换成并行流，则变成了`264`个元素：初始值`1`个，`64`个线程，一共`64`个，加上我们`200`个元素，则变成了`264`个元素，并且线程`id`五花八门，有相同的也有不同的，说明是多个线程去并行执行

同样要注意，可能我的最大线程数并没有这么多，一些线程可能会被重复使用，因此累加次数可能是大于最大线程数

```java
        // 生成1-100
        List<Integer> list = Stream.iterate(1, i -> ++i).limit(200).collect(Collectors.toList());
        System.out.println(list);
        // 使用collect函数进行转换为List<Map<Integer,Integer>>，包含值和线程id
        List<Map<String, Object>> result = list.stream().parallel().collect(() -> {
            System.out.println("第一个参数：Supplier，我们返回一个带初始值的List，放进去三个负数");
            Map<String, Object> map1 = new HashMap<>();
            // 获取线程id
            long threadId = Thread.currentThread().getId();
            // 放入一个值为负数，只有一个元素的map
            map1.put("value", -1);
            map1.put("threadId", threadId);
            List<Map<String, Object>> currentList = new ArrayList<>();
            // 将map添加进去
            currentList.add(map1);
            return currentList;
        }, (lastList, value) -> {
            // 具体的聚合操作，将value封装为map，加上线程id，放入list
            HashMap<String, Object> map = new HashMap<>();
            map.put("value", value);
            map.put("threadId", Thread.currentThread().getId());
            lastList.add(map);
        }, (lastList, currentList) -> {
            // 并行流下合计上面多个结果
            System.out.println("lastList：" + lastList);
            lastList.addAll(currentList);
            System.out.println("currentList：" + currentList);
        });
        System.out.println("最终结果：" + result);
        System.out.println("最终结果个数：" + result.size());
```

注意这里我们使用的`Stream.parallel()`去转换为并行流

![image-20210614211814639](/imgs/oss/picGo/image-20210614211814639.png)

要是看不太懂，可以跟着[上篇](https://VampireAchao.github.io/2021/06/13/reduce%E8%A1%A5%E5%85%85%E4%BA%8C/)看

