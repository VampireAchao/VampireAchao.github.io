---
title: 使用Stream一行获取26个英文字母
date: 2020-12-31 14:34:42
tags: java
---

> 成功是从一个失败前进到另一个失败，而期间热情不减的能力。——丘吉尔

代码

```java
        List<String> A = Stream.iterate("A", e -> String.valueOf((char) (e.charAt(0) + 1))).limit(26).collect(Collectors.toList());
        System.out.println(A);
        String a = Stream.iterate("a", e -> String.valueOf((char) (e.charAt(0) + 1))).limit(26).collect(Collectors.joining(","));
        System.out.println(a);
```

执行结果

![image-20210103143706626](/imgs/oss/picGo/image-20210103143706626.png)