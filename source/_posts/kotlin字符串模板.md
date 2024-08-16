---
title: kotlin字符串模板
date: 2022-08-26 17:28:01
tags: kotlin
---

> 超乎一切之上的一件事，就是保持青春朝气。——莎士比亚

中文文档：https://www.kotlincn.net/docs/reference/basic-syntax.html#using-string-templates

```kotlin
var a = 1
// 模板中的简单名称：
val s1 = "a is $a" 

a = 2
// 模板中的任意表达式：
val s2 = "${s1.replace("is", "was")}, but now is $a"
```

得到`s2`结果：

`a was 1, but now is 2`

如果我们需要使用`$`符号，则可以参考：

https://www.kotlincn.net/docs/reference/basic-types.html#%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%A8%A1%E6%9D%BF

使用`${'$'}`

例如下面的多行文本：

```kotlin
val price = """
${'$'}9.99
"""
```

多行文本介绍：https://www.kotlincn.net/docs/reference/basic-types.html#%E5%AD%97%E7%AC%A6%E4%B8%B2%E5%AD%97%E9%9D%A2%E5%80%BC