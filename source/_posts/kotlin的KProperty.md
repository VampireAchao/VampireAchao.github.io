---
title: kotlin的KProperty
date: 2023-04-20 22:03:22
tags: kotlin
---

> 浪子挥霍的是他的祖业，财迷葬送的却是他自己。——托·富勒

在`mp`中使用`KtQueryWrapper`时，需要如下使用：

```kotlin
KtQueryWrapper(User::class.java).eq(User::name, "sss").eq(User::roleId, "sss2")
```

这里的`User::name`是一个`KProperty`，其文档：https://kotlinlang.org/docs/reflection.html

可以使用`KProperty`的`name`属性获取到其属性名

```kotlin
User::name.name
```

当然其还有很丰富的其他属性、函数

![image-20230420222243552](/imgs/oss/blog/vampireachao/image-20230420222243552.png)

在项目中使用其，需要先引入`kotlin-reflect`依赖

```xml
<dependency>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-reflect</artifactId>
</dependency>
```

