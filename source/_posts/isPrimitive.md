---
title: isPrimitive
date: 2021-06-08 22:05:35
tags: java
---

> 常制不可以待变化,一涂不可以应万方,刻船不以索遗剑。一一东晋·葛洪《抱朴子》

> 常制不可以待变化,一涂不可以应万方,刻船不以索遗剑。一一东晋·葛洪《抱朴子》

在`Class`中有这样一个函数`isPrimitive`

可以判断我们的`class`是否为基本类型

![image-20210608220740594](/imgs/oss/picGo/image-20210608220740594.png)

```java
package com.ruben;

/**
 * @author <achao1441470436@gmail.com>
 * @since 2021/6/8 0008 22:00
 */
public class ClassDemo {
    public static void main(String[] args) {
        Class<Integer> integerClass = int.class;
        System.out.println("int.class是否为基本类型：" + integerClass.isPrimitive());

        Class<Integer> boxIntegerClass = Integer.class;
        System.out.println("Integer.class是否为基本类型：" + boxIntegerClass.isPrimitive());

        System.out.println("八大基本类型");
        System.out.println(int.class.isPrimitive());
        System.out.println(short.class.isPrimitive());
        System.out.println(long.class.isPrimitive());
        System.out.println(byte.class.isPrimitive());
        System.out.println(char.class.isPrimitive());
        System.out.println(boolean.class.isPrimitive());
        System.out.println(float.class.isPrimitive());
        System.out.println(double.class.isPrimitive());

    }
}
```

运行结果

![image-20210608220832270](/imgs/oss/picGo/image-20210608220832270.png)
