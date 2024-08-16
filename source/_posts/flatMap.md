---
title: flatMap
date: 2021-05-31 23:17:44
tags: java
---

> 君子成人之美，不成人之恶。小人反是。——《论语》

在`Stream`中有这么一个函数

![image-20210531232225786](/imgs/oss/picGo/image-20210531232225786.png)

它和[`map`](https://VampireAchao.github.io/2020/06/21/java8%E7%9A%84stream%E6%B5%81/)不一样的是，`map`你输入多少个，输出就是多少个

例如我要生成一个集合，装着`26`个小写字母和`26`个大写字母

用`flatMap`可以一行实现

```java
        List<String> abc = Stream.iterate('a', i -> ++i).map(String::valueOf).limit(26).flatMap(i -> Stream.concat(Stream.of(i), Stream.of(i).map(String::toUpperCase))).sorted().collect(Collectors.toList());
        System.out.println(abc);
```

![image-20210531233743054](/imgs/oss/picGo/image-20210531233743054.png)

马上这时候就有人跳出来说，我不用`flatMap`还不是可以！！！不信你看

```java
        List<Character> ab = Stream.iterate('A', i -> ++i).limit(58).filter(i -> i < 91 || i > 96).collect(Collectors.toList());
        System.out.println(ab);
```

。。。我只能说，我这篇博客是写`flatMap`，所以不要杠，我知道`Stream.concat`可以换成`Stream.of`

而且，你下面这种方式生成`58`个元素，其中浪费了`6`个元素

而我上面的方式只用`26`个元素就生成了`54`个元素

哪种方式的入参代价更小，明白了吧

那么这个`flatMap`如何使用？

再来看个例子：

九九乘法表都会吧

我们用`flatMap`一行写一个

```java
        List<String> nineNine = Stream.iterate(1, i -> ++i).flatMap(i -> Stream.iterate(i, in -> ++in).map(in -> i + "*" + in + "=" + i * in).limit(10 - i)).limit(45).collect(Collectors.toList());
        nineNine.forEach(System.out::println);
```

![image-20210531233930490](/imgs/oss/picGo/image-20210531233930490.png)

看懂了吗？

还看不懂？？？

那我们来读源码

```java
    <R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);
```

可以看到`flatMap`里就一个参数，`Function`

而关键就在于`Function`的两个泛型，注意不是`T`和`R`，而是`? super T`和`? extends Stream<? extends R>`

然后现在你可能有点懵，这两个泛型干嘛的



第一个泛型`? super T`你甚至可以忽略掉`? super`去看，直接把他认为是泛型`T`，而这个泛型`T`，就是我们原来的元素

简单来说，它就是你的入参，就是你的集合里的每一个元素

就是`.flatMap(i -> Stream.concat(Stream.of(i), Stream.of(i).map(String::toUpperCase)))`中的`i`



第二个泛型`? extends Stream<? extends R>`同理，你先忽略掉`? extends`，表示你的返回值需要`Stream<R>`类型

这个`R`可以和`T`一样，也可以不一样

例如我这里就是一样的，都是`String`类型，我使用`Steam.of`以及`Stream.concat`函数去将我们的元素转换成`Stream`再返回

就是`.flatMap(i -> Stream.concat(Stream.of(i), Stream.of(i).map(String::toUpperCase)))`中箭头右边部分

举个开发中遇到的场景

假设用户类，其中部分用户有个父账户`id`，对应父账户，使用的同一张表

你现在拿到了一个包含这些用户的`list`，需要把用户`id`和父账户`id`放到一个`list`里面去进行`in`查询

就可以这么写

```java
        List<User> userList = new ArrayList<>();
        userList.add(User.builder().id("用户id").parentId("父id").build());
        List<String> userIds = userList.parallelStream().flatMap(u -> Stream.of(u.getId(), u.getParentId())).collect(Collectors.toList());
        System.out.println(userIds);
```

打印出来结果

![image-20210531235346955](/imgs/oss/picGo/image-20210531235346955.png)

`Optional`中也有`flatMap`函数，这个我们之后再讲

