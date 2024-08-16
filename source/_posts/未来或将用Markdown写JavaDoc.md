---
title: 未来或将用Markdown写JavaDoc
date: 2024-05-04 12:54:42
tags: java
---

> 当囊空如洗时才开始节约的话，那就为时太晚了。——塞内加

提案链接：[JEP 467: Markdown Documentation Comments](https://openjdk.org/jeps/467)

1995 年的 HTML 写 JavaDoc 到现在已经快过时啦，于是 Jonathan Gibbons 提议用 Markdown 写 JavaDoc。目前这个提议在“Proposed to Target”状态，根据社区反响，这个提议很大概率能在 Java SE 23 版本中发布。

新的文档注释将使用 `///` 而不是传统的 `/** ... */`。这样做的好处是：

- 避免了在文档注释中使用传统注释（如 `/*...*/`）可能引发的问题。
- 消除了使用星号的传统注释可能带来的 Markdown 语法冲突。

下面的 JavaDoc 和 Markdown 版本的文档注释对比。

**JavaDoc 版本**:

```java
/**
 * Returns a hash code value for the object. This method is
 * supported for the benefit of hash tables such as those provided by
 * {@link java.util.HashMap}.
 * 
 * @return a hash code value for this object.
 */
```

**Markdown 版本**:

```java
/// Returns a hash code value for the object. This method is
/// supported for the benefit of hash tables such as those provided by
/// [java.util.HashMap].
///
/// @return  a hash code value for this object.
```
