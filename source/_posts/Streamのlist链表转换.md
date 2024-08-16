---
title: Streamのlist链表转换
date: 2020-11-20 23:57:49
tags: java
---

> 如果人生有也能有第二版，我将会如何认真地修改校对！——克莱尔

直接上代码！

```java
package com.ruben;/**
 * @ClassName: ListNodeDemo
 * @Date: 2020/11/21 0021 00:06
 * @Description:
 */

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @ClassName: ListNodeDemo
 * @Description: 我还没有写描述
 * @Date: 2020/11/21 0021 0:06
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class ListNodeDemo {

    public static void main(String[] args) {
        // 创建链表
        ListNode zero = new ListNode(0);
        ListNode one = new ListNode(1);
        ListNode two = new ListNode(2);
        ListNode three = new ListNode(3);

        two.next = three;
        one.next = two;
        zero.next = one;

        // 获取链表长度，为什么要获取链表长度呢？因为下面使用的无限流，在jdk8的时候是没法通过条件判断停止，所以这里使用limit去截取，jdk9的时候就可以不用下面的获取长度操作了
        ListNode tmp = zero;
        AtomicInteger length = new AtomicInteger();
        while (tmp != null) {
            length.getAndIncrement();
            tmp = tmp.next;
        }
        // 链表转换成List<Integer>
        List<Integer> integerList = Stream.iterate(zero, l -> l.next).limit(length.get()).mapToInt(l -> l.val).boxed().collect(Collectors.toList());
        // 链表转换成int[]
        int[] ints = Stream.iterate(zero, l -> l.next).limit(length.get()).mapToInt(l -> l.val).toArray();
        // List<Integer>转换成链表
        ListNode listNode = integerList.stream()
                // 可以在这里进行倒序排序，以证明我们确实转换成功
                .sorted(Comparator.reverseOrder())
                .collect(() -> new ListNode(0), (listNode1, integer) -> {
                    ListNode tmp1 = listNode1;
                    while (tmp1.next != null) {
                        tmp1 = tmp1.next;
                    }
                    tmp1.next = new ListNode(integer);
                }, (listNode12, listNode2) -> Function.identity());

        System.out.println(listNode.val);
    }

    public static class ListNode {
        int val;
        ListNode next;

        public ListNode(int x) {
            val = x;
        }
    }
}
```

