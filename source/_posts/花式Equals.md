---
title: 花式Equals
date: 2021-04-26 11:15:51
tags: java
---

> 人们很少做他们相信是对的事，他们做比较方便的事，然后后悔。——鲍勃.迪伦

相信大伙在开发中经常用`equals`去比较两个对象是否相等，这里分享一下一些别的写法

注意翻转`equals`：例如我们之前是这样写`ruben.equals("ruben")`，一定要改成`"ruben".equals(ruben)`

养成好习惯，利人利己

第一种写法，最常见的这种

```java
        String ruben = "ruben";
        String rabbit = "ruben";
        String achao = "achao";
        // 常用的Object.equals
        System.out.println(ruben.equals(rabbit));
```

第二种写法，避免空指针

```java
        // 避免空指针的java.util.Objects.equals
        System.out.println(Objects.equals(ruben, rabbit));
```

比较数组的`equals`

```java
// 比较数组的Objects.deepEquals
int[] rainbowNumber = new int[]{1, 2, 3, 4, 5, 6, 7};
int[] weekNumber = new int[]{1, 2, 3, 4, 5, 6, 7};
int[] misdaNumber = new int[]{4, 4, 4, 4};
System.out.println(Objects.deepEquals(rainbowNumber, weekNumber));
System.out.println(Objects.deepEquals(rainbowNumber, misdaNumber));
```

`Junit`的`equals`

```java
        // Junit的org.junit.Assert.assertEquals(java.lang.Object, java.lang.Object)，用于测试，如果equals结果为false则抛出Error
        Assert.assertEquals(rabbit, ruben);
```

花式写法

```java
        // java.util.function.Predicate花式写法
        System.out.println(Predicate.isEqual(ruben).test(achao));
```

