---
title: gitee代码评审建议
date: 2022-11-01 12:49:41
tags: 小技巧
---

> 对自己没犯过的错误，人们是不太会引起警觉的——博斯威尔

链接：https://gitee.com/VampireAchao/stream-query/pulls/255

上图：

![image-20221101125004716](/imgs/oss/picGo/image-20221101125004716.png)

如何实现？

可以使用`suggestion`代码块

```
​```suggestion
wrapper = Sf.mayColl(new HashSet(dataList)).mayLet(values -> wrapper.in(keyFunction, values)).orGet(() -> Database.notActive(wrapper));
​```
```

