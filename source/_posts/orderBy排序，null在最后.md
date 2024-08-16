---
title: orderBy排序，null在最后
date: 2021-12-29 23:04:46
tags: 数据库
---

> 优于别人，并不高贵，真正的高贵应该是优于过去的自己。——海明威

我们进行排序查询时：

```mysql
SELECT * FROM `user` ORDER BY username
```

可以看到`null`值排到了最上

![image-20211229230611730](/imgs/oss/picGo/image-20211229230611730.png)

如果我们要将`null`值排到最下方可以使用：

```mysql
SELECT * FROM `user` ORDER BY ISNULL(username),username
```

执行结果：

![image-20211229230707321](/imgs/oss/picGo/image-20211229230707321.png)

这是因为`ISNULL`函数将其转换为了`0`和`1`，我们可以顺带查询出来看看：

```mysql
SELECT *,ISNULL(username) FROM `user` ORDER BY ISNULL(username),username
```

![image-20211229230747705](/imgs/oss/picGo/image-20211229230747705.png)