---
title: 避免list中remove导致ConcurrentModificationException
date: 2021-03-05 22:31:55
tags: java
---

> 凡不是就着泪水吃过面包的人是不懂得人生之味的人——歌德

我们在`list`循环中调用`remove`函数删除自身元素可能会导致`java.util.ConcurrentModificationException`

例如

```java
        // 构造从0到20的list
        List<Integer> list = Stream.iterate(0, i -> ++i).limit(20).collect(Collectors.toList());
        // 删除
        list.forEach(list::remove);
```

首先我们可以使用[`removeIf`](https://VampireAchao.github.io/2021/01/19/removeIf/)代替

```java
        list.removeIf(i -> i.equals(i));
```

其次我们可以使用迭代器

我们可以看到`removeIf`的源码正是使用了迭代器

![image-20210305223612389](/imgs/oss/picGo/image-20210305223612389.png)

如下

```java
        Iterator<Integer> iterator = list.iterator();
        while (iterator.hasNext()) {
            Integer nowNumber = iterator.next();
            iterator.remove();
        }
```

在无法使用`removeIf`的场景下即可使用`Iterator`下的`remove()`方法
