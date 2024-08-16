---
title: 动态参数+reduce累加stream
date: 2021-10-24 21:15:46
tags: java
---

> 通向面包的小路蜿蜒于劳动的沼泽之中，通向衣裳的小路从一块无花的土地中穿过，无论是通向面包的路还是通向衣裳的路，都是一段艰辛的历程。 ——福斯

今天有朋友问我，`stream`中如果要将一个`User`类中的`username`和`id`收集起来变成两个`list`怎么写，我说可以使用`peek`函数

```java
    @Data
    @AllArgsConstructor
    static class User {
        private Long id;
        private Long groupId;
        private String username;
    }
```

就像这样：

```java
        // 用户列表
        List<User> userList = Stream.iterate(1L, i -> ++i).map(id -> new User(id, 999L, Faker.instance().name().username())).limit(10).collect(Collectors.toList());
        // 要收集起来的groupId
        List<Long> groupIds = new ArrayList<>(userList.size() * 2);
        // 要收集起来的username
        List<String> usernames = new ArrayList<>(userList.size() * 2);
        // 写死调用两个peek
        List<Long> userIds = userList.parallelStream().peek(user -> groupIds.add(user.getGroupId())).peek(user -> usernames.add(user.getUsername())).map(User::getId).collect(Collectors.toList());
		System.out.println(userIds);
        System.out.println(groupIds);
        System.out.println(usernames);
```

然后运行结果：

![image-20211024213325222](/imgs/oss/picGo/image-20211024213325222.png)

然后它有问，如果他不知道有多少个，有可能有一个，也有可能两个怎么办

我就给他写了另外两种实现方式：

使用动态参数+`reduce`实现，以及`List`+`reduce`实现

```java
    /**
     * 封装peeks
     *
     * @param stream 流
     * @param peeks  操作
     * @return java.util.stream.Stream<T>
     * @author <achao1441470436@gmail.com>
     * @since 2021/10/24 21:12
     */
    @SafeVarargs
    public static <T> Stream<T> peek(Stream<T> stream, Consumer<T>... peeks) {
        return Stream.of(peeks).reduce(stream, Stream::peek, Stream::concat);
    }

    public static <T> Stream<T> peek(Stream<T> stream, List<Consumer<T>> peeks) {
        return peeks.stream().reduce(stream, Stream::peek, Stream::concat);
    }
```

这两种，使用方式如下：

```java
        // 可以写死也可以动态
        userIds = peek(userList.parallelStream(), user -> groupIds.add(user.getGroupId()), user -> usernames.add(user.getUsername())).map(User::getId).collect(Collectors.toList());
        // 动态
        List<Consumer<User>> peeks = Arrays.asList(user -> groupIds.add(user.getGroupId()), user -> usernames.add(user.getUsername()));
        Stream<User> peek = peek(userList.stream(), peeks);
        // 转成array
        peek(userList.stream(), peeks.stream().<Consumer<User>>toArray(Consumer[]::new));
        peek(userList.stream(), peeks.<Consumer<User>>toArray(new Consumer[0]));
```

这里原理就是用了`reduce`函数的累加特性，这个聚合操作：

```java
		Stream.of(peeks).reduce(stream, Stream::peek, Stream::concat);
```

相当于：

```java
		Stream<User> stream = userList.stream();
        for (Consumer<User> consumer : peeks) {
            stream = stream.peek(consumer);
        }
```

[关于`reduce`我之前的博客也写过了](https://VampireAchao.github.io/2021/06/13/reduce%E8%A1%A5%E5%85%85%E4%BA%8C/)，就不再赘述啦~

主要就是分享这种思路，多了一种写法而已

