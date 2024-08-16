---
title: 升级hutool 6.0
date: 2023-05-29 20:31:55
tags: java
---

> 给别人自由和维护自己的自由，两者同样是崇高的事业。——林肯

今天把`hutool`升级到了`6.0`

发现了很多变更

版本：5.8.7 -> 6.0.0.M3
不兼容情况：

- 首先是`groupId`
```diff
<dependency>
-    <groupId>cn.hutool</groupId>
+    <groupId>org.dromara.hutool</groupId>
    <artifactId>hutool-all</artifactId>
-    <version>5.8.7</version>
+    <version>6.0.0.M3</version>
</dependency>
```

- 然后是全部的包名
```diff
- import cn.hutool.core.collection.CollUtil;
- import cn.hutool.core.util.StrUtil;
- import cn.hutool.xxx;
+ import org.dromara.hutool.core.collection.CollUtil;
+ import org.dromara.hutool.core.text.StrUtil;
+ import org.dromara.hutool.xxx;
```

还有很多类变更，放到这个`issue`吧：https://gitee.com/dromara/hutool/issues/I79493