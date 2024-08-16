---
title: kotlin延迟属性
date: 2022-08-27 13:23:47
tags: kotlin
---

> 得饶人处且饶人——曹雪芹

`kotlin`习惯用法见：https://www.kotlincn.net/docs/reference/idioms.html

这里试试延迟属性：

https://www.kotlincn.net/docs/reference/delegated-properties.html#%E5%BB%B6%E8%BF%9F%E5%B1%9E%E6%80%A7-lazy

```kotlin
val lazyValue: String by lazy {
    println("computed!")
    "Hello"
}

println(lazyValue)
println(lazyValue)
```

运行结果：

```shell
computed!
Hello
Hello
```

