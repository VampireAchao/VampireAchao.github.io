---
title: Optional再扩展
date: 2021-01-05 20:46:58
tags: java
---

> 他们之所以做得到，就因为他们认为他们能够做到。—— 维吉尔

关于`Optional`的介绍，[之前的博客](https://VampireAchao.github.io/2020/06/17/Optional%E8%BF%9B%E8%A1%8C%E4%BC%98%E9%9B%85%E9%9D%9E%E7%A9%BA%E5%88%A4%E6%96%AD/)已经说过了，这里就不再赘述

这里写点常用的例子

```java
package com.ruben;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Supplier;
import java.util.stream.Stream;

/**
 * @ClassName: OptionalDemo
 * @Description: 我还没有写描述
 * @Date: 2021/1/5 0005 20:47
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class OptionalDemo {
    public static void main(String[] args) {
        String str = null;
        // 直接使用Optional.map去调用函数，避免空指针，其中的任意一个函数返回为空的话，则直接调用后面的orElse(String::new)并返回new String()执行的结果
        System.out.println(Optional.ofNullable(str).map(""::equals).map(Boolean::getClass).map(Class::getName).orElseGet(String::new));
        // 上面的方法，每次都需要使用.map去操作，比较繁琐，于是这里定义一个叫 avoidNPE 的函数去处理空指针异常
        // 使用方式如下
        System.out.println(avoidNPE(() -> Boolean.valueOf(str.equals("")).equals(Boolean.FALSE)).orElse(false));
        // 再来一个对比，更明显一点
        // 之前
        System.out.println(Optional.ofNullable(Arrays.asList()).map(List::stream).map(Stream::sorted).map(Stream::distinct).flatMap(Stream::findFirst).orElse("empty"));
        // 使用自定义的函数后
        System.out.println(avoidNPE(() -> Arrays.asList().stream().sorted().distinct().findFirst().orElse("empty")).get());
        List<String> list = null;
        // 同理，数组越界也可以自定义一个函数做相同处理
        avoidNPEOrIOB(list, 5).filter(s -> s.length() > 2).map(String::hashCode).ifPresent(System.out::println);

    }

    /**
     * @MethodName: avoidNPEOrIOB
     * @Description: 避免空指针和数组越界
     * @Date: 2021/1/5 0005 21:14
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [list, index]
     * @returnValue: java.util.Optional<T>
     */
    public static <T> Optional<T> avoidNPEOrIOB(List<T> list, int index) {
        try {
            return Optional.ofNullable(list.get(index));
        } catch (NullPointerException | ArrayIndexOutOfBoundsException e) {
            return Optional.empty();
        }
    }

    /**
     * @MethodName: avoidNPE
     * @Description: 避免空指针
     * @Date: 2021/1/5 0005 21:14
     * *
     * @author: <achao1441470436@gmail.com>
     * @param: [supplier]
     * @returnValue: java.util.Optional<T>
     */
    public static <T> Optional<T> avoidNPE(Supplier<T> supplier) {
        try {
            return Optional.ofNullable(supplier.get());
        } catch (NullPointerException e) {
            return Optional.empty();
        }
    }

}
```

执行结果

![image-20210105211448887](/imgs/oss/picGo/image-20210105211448887.png)
