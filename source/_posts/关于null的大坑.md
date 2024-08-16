---
title: 关于null的大坑
date: 2020-07-09 09:16:07
tags: java
---

今天跟前端对接口的时候。。。

有个关键字keyword，前端明明没传入进来，我执行判断的时候，一直进不去那段“如果为空就XXX的逻辑”

```java
if (StringUtils.isNoneBlank(commonQueryDtoEntity.getKeywords())) {
    //debug发现进不来
}
```

最后发现代码里我是这样写的

```java
commonQueryDtoEntity.getKeywords()+""
```

这样其实转换出来并不是空串，而是一个"null"字符串。。。

```java
"null"
```

希望引以为戒