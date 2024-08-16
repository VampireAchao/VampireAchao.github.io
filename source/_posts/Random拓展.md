---
title: Random拓展
date: 2021-01-03 16:24:37
tags: java
---

> 顽强的毅力可以征服世界上任何一座高峰。——狄更斯

`random`拓展

```java
package com.ruben;

import com.baomidou.mybatisplus.extension.api.R;

import java.util.Random;
import java.util.Spliterators;
import java.util.stream.IntStream;
import java.util.stream.StreamSupport;

/**
 * @ClassName: RandomDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/3 0003 12:39
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class RandomDemo {
    public static void main(String[] args) {
        // 取出随机数
        Random random = new Random();
        for (int i = 20; i > 0; i--) {
            // 0-199
            System.out.print(random.nextInt(200));
        }
        System.out.println();
        // 给定seed，之后产生的随机数每次都是一样的
        Random seedRandom = new Random(80);
        for (int i = 20; i > 0; i--) {
            // 0-199，打印结果每次都是 18614713838153133308212573421062513519012491096106
            System.out.print(seedRandom.nextInt(200));
        }
        System.out.println();
        // 0-199
        new Random().ints(20, 0, 200).forEach(System.out::print);
        System.out.println();
        // 在1、2、3中取任意一个
        IntStream intStream = StreamSupport.intStream(Spliterators.spliterator(new int[]{1, 2, 3}, 3), false);
        intStream.forEach(System.out::print);
        System.out.println();
        // 0-199，为了提高效率，可能多数情况下取出的值是一样的
        for (int i = 20; i > 0; i--) {
            System.out.print(IntStream.range(0, 200).parallel().findAny().orElse(0));
        }
        System.out.println();
    }


}
```

执行结果

![image-20210103162836797](/imgs/oss/picGo/image-20210103162836797.png)