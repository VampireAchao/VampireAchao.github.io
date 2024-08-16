---
title: replace、replaceAll、replaceFirst
date: 2022-03-04 19:01:02
tags: java
---

> 一年好景君须记，最是橙黄橘绿时。——苏轼

聊聊这仨很常用的函数

我相信很多人也跟我一样也有个误区，错把`replace`当成`replaceFirst`，把`replaceAll`当成`replace`

实际上，`replace`函数会替换掉满足字符串中所有出现过第一个参数中的值的地方

例如：

```java
        String string = "ruben love strawberry";

        String replace = string.replace("r", "");
		// uben love stawbey
```

如果我们只需要替换第一处，则需要使用`replaceFirst`

例如：

```java
        String string = "ruben love strawberry";

        String replaceFirst = string.replaceFirst("[A-Za-z0-9]", "");
		// uben love strawberry
```

并且`replaceFirst`支持正则表达式，`replace`则不支持

而`replaceAll`则是用于需要替换所有满足正则表达式匹配的场景

```java
        String string = "ruben love strawberry";

        String replaceAll = string.replaceAll("[A-Za-z0-9]", "");
		// 
```

这里因为全部匹配，所以被替换成空串了

因此注意这种情况：

```java
        String string = "D:\\Directory\\directory\\file.suffix";

        String replace = string.replace("\\D", "");
		// D:irectory\directory\file.suffix
        String replaceFirst = string.replaceFirst("\\D", "");
		// :\Directory\directory\file.suffix
        String replaceAll = string.replaceAll("\\D", "");
		// 
```

就是我们需要替换的字符中如果出现了刚好满足正则的情况下。。。