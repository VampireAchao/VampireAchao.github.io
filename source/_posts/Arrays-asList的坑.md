---
title: Arrays.asList的坑
date: 2020-09-23 19:52:06
tags: java
---

> 我认为对于一切情况，只有“热爱”才是最好的老师。——爱因斯坦

今天写代码遇到一个坑

本身不是什么难的逻辑，结果自己学艺不精忘了，导致程序出现不该出现的异常

是这样的，数据库里原有存了这么几张图片，使用的是`“;”`分割

现在要进行一个追加并去重的操作

```java
        // 原有数据库里的图片
        String pic = "http://p16.qhimg.com/bdm/960_593_0/t0195d14f593431562a.jpg;" +
                "http://p18.qhimg.com/bdm/480_296_0/t014a0ca534d64adbba.jpg;" +
                "http://p18.qhimg.com/bdm/480_296_0/t014a0ca534d64adbba.jpg;" +
                "http://p18.qhimg.com/bdm/480_296_0/t014a0ca534d64adbba.jpg";
        // 需要追加的图片
        String appendPic = "http://p19.qhimg.com/bdm/960_593_0/t01b24e85dc07d47b0d.jpg";
```

现在做一个操作，追加并去重，转换成`String`

一开始我想着用`“;”`分割成数组，转换成list 然后追加、去重，再转换成原来格式（每张图片用`“;”`分割）

的`String`

于是就有了下面这段问题代码

```java
        // 用“;”分割成数组并转换成List
        List<String> picList = Arrays.asList(pic.split(";"));
        // 添加元素
        picList.add(appendPic);
        // 去重，转换成String，并且中间用“;”分割
        pic = picList.stream().distinct().collect(Collectors.joining(";"));
        // 输出结果
        System.out.println(pic);
```

貌似没问题，结果一运行...程序抛出了`UnsupportedOperationException`

瞬间想起来！`asList()`的返回对象是一个`Arrays`的内部类，它并没有实现集合个数的相关修改方法！

于是改成了下面这种方式

```java
        // 直接在字符串后追加“;”和图片url
        pic = pic.concat(";").concat(appendPic);
        // 用“;”分割成数组并转换成List,去重后再转换为String，用“;”分隔
        pic = Arrays.stream(pic.split(";")).distinct().collect(Collectors.joining(";"));
        // 输出结果
        System.out.println(pic);
```

运行正常，输出结果

![image-20200923200310729](/imgs/oss/picGo/image-20200923200310729.png)

成功！

这里我补充一下，使用`List`的`set()`函数进行对`List`元素的修改，相应的原有数组的值也会被修改，但是不能进行修改元素个数的任何操作，否则会抛出`UnsupportedOperationException`

给个《码出高效》给出的例子吧

```java
        String[] stringArray = new String[3];
        stringArray[0] = "one";
        stringArray[1] = "two";
        stringArray[2] = "three";

        List<String> stringList = Arrays.asList(stringArray);
        stringList.set(0, "oneList");
        stringList.forEach(System.out::println);
        System.out.println("-----------");
        for (String s : stringArray) {
            System.out.println(s);
        }

        // 以下三行代码编译正确，但都会抛出运行时异常
        stringList.add("four");
        stringList.remove(2);
        stringList.clear();
```

运行结果

![image-20200923200912635](/imgs/oss/picGo/image-20200923200912635.png)