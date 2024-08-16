---
title: 解决lambda中必须为final的方式
date: 2020-12-04 21:52:36
tags: java
---

> 一个真正而且热切地工作的人总是有希望的——只有怠惰才是永恒的绝望。——卡莱尔

在开发中使用`lambda`经常出现一个问题

![image-20201204220957797](/imgs/oss/picGo/image-20201204220957797.png)

编译提示我们`lambda`中使用的变量必须为`final`或者`effectively final`

```java
        int i = 2;
        BigDecimal j = BigDecimal.ZERO;
        j = BigDecimal.TEN;
        List<String> stringList = mpUserMapper.selectList(Wrappers.lambdaQuery()).stream().map(UserDataObject::getUsername).collect(Collectors.toList());
        stringList = stringList.stream().distinct().collect(Collectors.toList());
        List<String> strings = new ArrayList<>(10);
        strings.stream().peek(s -> {
            stringList.add(s);
            i = 3;
            j.add(BigDecimal.ONE);
        }).collect(Collectors.toList());
```

如何处理，我想大家一般都是直接点转换为自动

把`int`转换为`AtomicInteger`，`list`赋值给为`finalList`

之后就是这样子

![image-20201204221035359](/imgs/oss/picGo/image-20201204221035359.png)

```java
        AtomicInteger i = new AtomicInteger(2);
        BigDecimal j = BigDecimal.ZERO;
        j = BigDecimal.TEN;
        List<String> stringList = mpUserMapper.selectList(Wrappers.lambdaQuery()).stream().map(UserDataObject::getUsername).collect(Collectors.toList());
        stringList = stringList.stream().distinct().collect(Collectors.toList());
        List<String> strings = new ArrayList<>(10);
        List<String> finalStringList = stringList;
        BigDecimal finalJ = j;
        strings.stream().peek(s -> {
            finalStringList.add(s);
            i.set(3);
            finalJ.add(BigDecimal.ONE);
        }).collect(Collectors.toList());
```

虽然上面的`integer`，`idea`帮我们转换成了`atomic`原子类，但下面的`stringList`和变量`j`都赋值给了一个临时变量【`final`+变量名】

编译报错是解决了，但代码的可读性降低了

那么有没有更优雅的解决方案呢？其实是有的

我们这里出现变量必须为`final`或者`effectively final`的提示，造成的原因是因为我们对变量进行了二次赋值

我们这里可以像`AtomicInteger`一样使用原子类`AtomicReference`

![image-20201204221918329](/imgs/oss/picGo/image-20201204221918329.png)

再观察`stringList`，我们当然可以接连下面的去重操作，把两行变为一行去解决

但如果场景发生变化，我们要执行一些判断或者其他逻辑，再进行赋值

![image-20201204222411973](/imgs/oss/picGo/image-20201204222411973.png)

对于这种场景，使用两行变一行的方式就不好用了

我们就可以使用`Lists.addAll`代替我们的赋值操作

![image-20201204222602604](/imgs/oss/picGo/image-20201204222602604.png)

这种方式比一开始的使用一个临时变量赋值的方式感觉要好多了

特别是大量用到`stream`的时候，如果是一堆用于`lambda`的临时变量，很可能会犯晕