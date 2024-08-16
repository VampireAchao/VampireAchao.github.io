---
title: replaceAll坑
date: 2021-02-19 20:55:25
tags: java
---

> 学如弓弩，才如箭镞，识以领之，方能中鹄。一一袁枚

前两天遇到一个坑，在使用`String.replace()`和`replaceAll`的时候

因为没有看过`API`和注释，拿着就开用，结果造成一个`bug`

这里留做记录

场景是这样的，我对一个字符串进行替换，将`[idea]`替换为`""`时使用了`replaceAll`，导致其他不该被替换的字符也被替换了

这段代码

```java
        String str = "Hino Supa and ruben";
        System.out.println(str.replace("[idea]", ""));
        System.out.println(str.replaceAll("[idea]", ""));
```

输出的结果为

```shell
Hino Supa and ruben
Hno Sup n rubn
```

可以看到，`replaceAll`把我们的`[idea]`当做了正则表达式...

点进源码一看注释，好家伙

第一句就是

```java
Replaces each substring of this string that matches the given regular expression with the given replacement.
// 翻译过来就是
用给定的替换项替换该字符串中与给定的正则表达式匹配的每个子字符串。
```

而我们的`replace`

```java
Replaces each substring of this string that matches the literal target sequence with the specified literal replacement sequence.
// 翻译
用指定的文字替换序列替换该字符串中与文字目标序列匹配的每个子字符串。
```

所以，在使用`API`之前一定要看注释或文档，否则就很可能会因为使用方式错误导致`BUG`的发生