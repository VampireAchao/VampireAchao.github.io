---
title: unicode换行符
date: 2021-08-31 19:08:51
tags: java
---

> 良好的教养在于隐藏我们对自己较佳的评价，以及隐藏我们对他人较差的评价——马克吐温

挺有趣的：

```java
        String words = "哈哈";
        // \u000d words = "我丢";
        System.out.println(words);
```

![image-20210831190946603](/imgs/oss/picGo/image-20210831190946603.png)

以下语句输出

![image-20210831190930238](/imgs/oss/picGo/image-20210831190930238.png)

因为`\u000d`换行符被解析了
