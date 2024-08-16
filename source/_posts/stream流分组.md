---
title: stream流分组
date: 2020-11-06 22:13:45
tags: java
---

> 

前两天补充了博客中写的[`java8`的`stream`的用法](https://VampireAchao.github.io/2020/11/01/java8%E7%9A%84stream%E6%B5%81%EF%BC%88%E4%BA%8C%EF%BC%89/)

今天再写个分组的

例如我们下面需要根据奇数偶数分组

可以先新建一个`list`

```java
List<Integer> integerList = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 0));
```

然后进行分组

```java
        Map<Boolean, List<Integer>> collect = integerList.stream().collect(Collectors.groupingBy(data -> data % 2 == 0));
        List<Integer> evenNumbers = collect.get(true);
        List<Integer> oddNumber = collect.get(false);
        System.out.println("data % 2 == 0-----------");
        evenNumbers.forEach(System.out::println);
        System.out.println("data % 2 != 0-----------");
        oddNumber.forEach(System.out::println);
```

然后输出结果

![image-20201106223222979](/imgs/oss/picGo/image-20201106223222979.png)

比如我们现在自定义的`User`，我们需要根据`username`进行分组

```java
        List<User> userList = Lists.newArrayList();
        userList.add(new User("ruben", "1"));
        userList.add(new User("achao", "2"));
        userList.add(new User("ruben", "3"));
        Map<String, List<User>> userMap = userList.stream().collect(Collectors.groupingBy(User::getUsername));
        List<User> ruben = userMap.get("ruben");
        System.out.println("ruben-----------");
        ruben.forEach(System.out::println);
        List<User> achao = userMap.get("achao");
        System.out.println("achao-----------");
        achao.forEach(System.out::println);
```

![image-20201106223416680](/imgs/oss/picGo/image-20201106223416680.png)

可以看到同样分好组了
