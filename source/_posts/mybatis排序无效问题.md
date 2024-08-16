---
title: mybatis排序无效问题
date: 2020-07-10 22:41:02
tags: java
---

今天在<code>mybatis.xml</code>里加了段排序，一开始发现排序不生效，debug发现参数确实传过去了，但并没有执行排序逻辑

最后发现。。。

```xml
//这样写法是错误的，mybatis会给它加上引号
ORDER BY #{cowBeer}
```

要更改成<code>$</code>

```xml
//也就是这样
ORDER BY ${cowBeer}
```

这样会直接替换、拼接<code>sql</code>

