---
title: kotlin NaN坑
date: 2022-11-03 13:03:21
tags: kotlin
---

> 发脾气的人比被发脾气的对象所受的损失更大——霍姆斯

今天发现一个坑，在代码里尝试`toBigDecimal`抛出了`NumberFormatException`

`debug`一看，发现值为`NaN`

在`kotlin`里，这样的代码会导致`NaN`

```kotlin
val nan = 0.0 / 0.0
nan.toBigDecimal()		// java.lang.NumberFormatException

java.lang.Double.isNaN(nan) // true
```

最重要的是`NaN`，不会通过 安全调用操作符`?.` 的判断，因为其属于有值

所以上述代码可以改为

```kotlin
val nan = 0.0 / 0.0
nan.takeUnless { it.isNaN() }?.toBigDecimal()		// null
```

