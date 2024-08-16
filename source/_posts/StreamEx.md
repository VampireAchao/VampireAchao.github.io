---
title: StreamEx
date: 2022-07-07 12:39:36
tags: java
---

> 这个世界上没有无用的齿轮，也只有齿轮本身能决定自己的用途。——《嫌疑犯X的献身》

跟昨天介绍的[eclipse-collections](https://VampireAchao.github.io/2022/07/06/eclipse-collections/)一样，这是一个同类产品：

仓库地址：https://github.com/amaembo/streamex

`JavaDoc`：http://amaembo.github.io/streamex/javadoc/one/util/streamex/package-summary.html

感受下：

```java
List<String> userNames = StreamEx.of(users).map(User::getName).toList();
Map<Role, List<User>> role2users = StreamEx.of(users).groupingBy(User::getRole);
StreamEx.of(1,2,3).joining("; "); // "1; 2; 3"
```

对比起来好像比`eclipse-collections`写更少代码

![image-20220707124148438](/imgs/oss/picGo/image-20220707124148438.png)

而且更向原生`stream`靠拢

文档：https://github.com/amaembo/streamex/blob/master/wiki/CHEATSHEET.md
