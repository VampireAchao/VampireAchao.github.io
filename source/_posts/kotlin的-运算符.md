---
title: kotlin的..<运算符
date: 2023-07-19 20:34:35
tags: kotlin
---

> 此处果有可乐，我即别无所思。——林语堂

今天升级了`kotlin`版本`1.9.0`

发现了个新特性

https://kotlinlang.org/docs/whatsnew19.html#stable-operator-for-open-ended-ranges

这个是用来取代以前的`until`函数的

```kotlin
fun main() {
    for (number in 2 until 10) {
        if (number % 2 == 0) {
            print("$number ")
        }
    }
    // 2 4 6 8
}
```

现在：

```kotlin
fun main() {
    for (number in 2..<10) {
        if (number % 2 == 0) {
            print("$number ")
        }
    }
    // 2 4 6 8
}
```

这样更直观地知道是从`2`开始，只要小于`10`就循环并累加
