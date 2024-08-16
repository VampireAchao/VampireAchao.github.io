---
title: kotlin泛型多个上界
date: 2023-02-03 21:54:02
tags: kotlin
---

> 善气迎人，亲如兄弟；恶气迎人，害于戈兵。——管子

`java`中，我们可以使用`<T extends Comparable<? super T>, Serializable>`来指定多个接口的泛型限制

`kotlin`中 对应的是[上界](https://www.kotlincn.net/docs/reference/generics.html#%E4%B8%8A%E7%95%8C)

> ### 上界
>
> 最常见的约束类型是与 Java 的 *extends* 关键字对应的 **上界**：
>
> ```
> fun <T : Comparable<T>> sort(list: List<T>) {  …… }
> ```
>
> 冒号之后指定的类型是**上界**：只有 `Comparable<T>` 的子类型可以替代 `T`。 例如：
>
> ```
> sort(listOf(1, 2, 3)) // OK。Int 是 Comparable<Int> 的子类型
> sort(listOf(HashMap<Int, String>())) // 错误：HashMap<Int, String> 不是 Comparable<HashMap<Int, String>> 的子类型
> ```
>
> 默认的上界（如果没有声明）是 `Any?`。在尖括号中只能指定一个上界。 如果同一类型参数需要多个上界，我们需要一个单独的 **where**-子句：
>
> ```
> fun <T> copyWhenGreater(list: List<T>, threshold: T): List<String>
>     where T : CharSequence,
>           T : Comparable<T> {
>     return list.filter { it > threshold }.map { it.toString() }
> }
> ```
>
> 所传递的类型必须同时满足 `where` 子句的所有条件。在上述示例中，类型 `T` 必须*既*实现了 `CharSequence` *也*实现了 `Comparable`。

换言之，我们上面的`<T extends Comparable<? super T>, Serializable>`使用`kotlin`则应该：

```kotlin
@Mapper
interface UserInfoMapper<T> : IMapper<UserInfo> where T : Comparable<T>, T : Serializable {
}
```

