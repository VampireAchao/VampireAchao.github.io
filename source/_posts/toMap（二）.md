---
title: toMap（二）
date: 2021-02-04 20:00:12
tags: java
---

> 一切的美德都包含在自我信赖里。——爱默森

今天继续聊聊`Stream`中`Jdk8`已经为我们封装好的这个`Collectors.toMap`

前两天写的[`List to Map`工具类](https://VampireAchao.github.io/2021/01/30/%E8%87%AA%E5%AE%9A%E4%B9%89list-To-HashMap%E5%B7%A5%E5%85%B7%E7%B1%BB/)是为了解决`key`重复问题

实际上我们可以用`Collectors.toMap`的重载直接解决，例如

```
List<User> userList = new ArrayList<>(10);
        Map<Integer, User> userMap = userList.stream().collect(Collectors.toMap(User::getId, Function.identity(), (user1, user2) -> user2));
```

我们在`toMap`的第三个参数给定，这里我们直接返回`user2`，意思是如果遇到重复的`key`[例如这里的`userId`重复]，我们使用第二个`user`，也就是后者去覆盖前者

除了这点，我们还可以看到一个包含四个参数的重载

![image-20210204201316848](/imgs/oss/picGo/image-20210204201316848.png)

这里第四个参数是用于返回指定的`map`使用的

例如我们需要返回一个`LinkedHashMap`

就可以这样写

```java
userMap = userList.stream().collect(Collectors.toMap(User::getId, Function.identity(), (user1, user2) -> user2, LinkedHashMap::new));
```

第四个参数接收的是一个`Supplier`，`lambda`写法就是`()->`这样啦！

