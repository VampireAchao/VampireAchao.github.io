---
title: soya
date: 2023-05-28 13:02:28
tags: 软件及插件
---

> 发觉谬误比寻求真理容易，因为前者浮于表面容易见到，而后者藏于深处。——歌德

分享一个基于`jvm`的编程语言`soya`

https://github.com/mySingleLive/soya

![image-20230528130534767](/imgs/oss/picGo/image-20230528130534767.png)

`soya`有很多很棒的特性：

1. Intuitive Syntax：指编程语言的语法易于理解和使用。

2. OOP features：指面向对象编程的特性，如封装、继承、多态等。

3. Functional Programming features：指函数式编程的特性，如高阶函数、纯函数、不可变性等。

4. Support many basic type literals (ex. collection, regular expression, file, url, date)：指编程语言支持多种基本类型的字面量，如集合、正则表达式、文件、URL、日期等。

5. Pattern Matching features：指模式匹配的特性，可以用于匹配数据结构中的模式。

6. Exception Handling：指程序出现异常时的处理机制，可以用于优雅地处理错误。

7. Advanced Assignment：指高级赋值语法，如解构赋值、链式赋值等。

例如这里的简单语法展示

```soya
lst := [1, 3, 'Apple', 'Peter', 2, 'House', 14]
lst[String] = 'X'
lst[int v] = v * 2
println(lst)  // Output: [2, 6, "X", "X", 4, "X", 28]
```

以及进阶语法：

```soya
users :=
   * name: 'Peter'
     age: 16
   * name: 'Marry'
     age: 12
   * name: 'Scott'
     age: 78

users[age: 14..100].each { println(it.name) }

// Output:
// Peter
// Scott

users.each {
   match it
     | age: 0..50   -> println("{it.name} is young")
     | age: 50..100 ->  println("{it.name} is old")
}

// Output:
// Peter is young
// Marry is young
// Scott is old
```

