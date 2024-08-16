---
title: groupingBy
date: 2021-03-29 22:32:56
tags: java
---

> 老老实实最能打动人心。——莎士比亚

你们可能知道`Collectors.groupingBy`是干嘛的了，没错分组

例如我们需要把用户根据`age`分组

```java
        SecureRandom random = new SecureRandom();
        List<User> users = random.ints(20,25).parallel().mapToObj(r -> User.builder().name(Faker.instance(Locale.CHINA).name().username()).age(r).build()).limit(20).collect(Collectors.toList());
        Map<Integer, List<User>> listMap = users.stream().collect(Collectors.groupingBy(User::getAge));
        listMap.forEach((k, v) -> System.out.println(k + ":" + v));
```

![image-20210329223949536](/imgs/oss/picGo/image-20210329223949536.png)

这里看到我们成功使用`Collectors.groupingBy(User::getAge)`将我们的用户根据`age`分成了`5`组

那么，`groupingBy`还有没有其他的重载呢？

当然是有滴

假设，我现在根据年龄分组后，我还需要根据每一组内不同的名字分组

那么我们可以使用

```java
    public static <T, K, A, D>
    Collector<T, ?, Map<K, D>> groupingBy(Function<? super T, ? extends K> classifier,
                                          Collector<? super T, A, D> downstream) {
        return groupingBy(classifier, HashMap::new, downstream);
    }
```

写法如下

```java
        Map<Integer, Map<String, List<User>>> collect = users.stream().collect(Collectors.groupingBy(User::getAge, Collectors.groupingBy(User::getName)));
        collect.forEach((age, map) -> {
            System.out.println(age + ":");
            map.forEach((name, user) -> System.out.println(name + ":" + user));
        });
```

![image-20210329224950284](/imgs/oss/picGo/image-20210329224950284.png)

区别就是刚刚的`Collectors.groupingBy(User::getAge)`后面加了个参数`Collectors.groupingBy(User::getName)`变成了`Collectors.groupingBy(User::getAge, Collectors.groupingBy(User::getName))`

当然你还可以继续套或者使用别的`Collector`例如你可以写成`Collectors.groupingBy(User::getAge, Collectors.toMap(User::getName))`

就像如下

```java
Map<Integer, Map<String, User>> collect1 = users.stream().collect(Collectors.groupingBy(User::getAge, Collectors.toMap(User::getName, Function.identity(), (o1, o2) -> o2)));
```

还有一个重载

如果我们需要返回不同的`map`，可以通过它来指定

例如我们要一个`TreeMap`

```java
TreeMap<Integer, List<User>> collect2 = users.stream().collect(Collectors.groupingBy(User::getAge, TreeMap::new, Collectors.toList()));
```

这里三个参数，除了我们刚刚两个(分组依据和后续分组处理)，还有一个`Supplier`，返回一个`TreeMap`即可啦

```java
TreeMap<Integer, List<User>> collect2 = users.stream().collect(Collectors.groupingBy(User::getAge, TreeMap::new, Collectors.toList()));
```

还有一个它的线程安全版`Collectors.groupingByConcurrent()`

活用`Stream`，让你的代码简洁起来吧！