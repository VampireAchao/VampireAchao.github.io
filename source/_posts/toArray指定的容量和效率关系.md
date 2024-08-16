---
title: toArray指定的容量和效率关系
date: 2020-09-18 21:16:44
tags: java
---

> 我将于茫茫人海中访我唯一灵魂之伴侣；得之，我幸；不得，我命，如此而已。——徐志摩

分享一篇

```java
    private static final int COUNT = 100 * 100 * 100;

    private static void timeCost() {
        List<Double> list = new ArrayList<>(COUNT);
        for (int i = 0; i < COUNT; i++) {
            list.add(i * 1.0);
        }
        long start = System.nanoTime();
        Double[] notEnoughArray = new Double[COUNT - 1];
        list.toArray(notEnoughArray);
        long middle1 = System.nanoTime();
        Double[] equalArray = new Double[COUNT];
        list.toArray(equalArray);
        long middle2 = System.nanoTime();
        Double[] doubleArray = new Double[COUNT * 2];
        list.toArray(doubleArray);
        long middle3 = System.nanoTime();
        list.toArray(new Double[0]);
        long end = System.nanoTime();
        long notEnoughArrayTime = middle1 - start;
        long equalArrayTime = middle2 - middle1;
        long doubleArrayTime = middle3 - middle2;
        long zeroArrayTime = end - middle2;
        System.out.println("数组容量小于集合大小：notEnoughArrayTime：" + notEnoughArrayTime / (1000.0 * 1000.0) + " ms");
        System.out.println("数组容量等于集合大小：：equalArrayTime：" + equalArrayTime / (1000.0 * 1000.0) + " ms");
        System.out.println("数组容量是集合的两倍：doubleArrayTime：" + doubleArrayTime / (1000.0 * 1000.0) + " ms");
        System.out.println("数组容量传入0：zeroArrayTime：" + zeroArrayTime / (1000.0 * 1000.0) + " ms");
    }
```

输出结果

![image-20200918211910089](/imgs/oss/picGo/image-20200918211910089.png)

所以，以后尽量用`toArray[new Double[doubleArray.size()]]`指定刚刚好的长度

![image-20200918212041758](/imgs/oss/picGo/image-20200918212041758.png)