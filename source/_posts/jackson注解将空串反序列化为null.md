---
title: jackson注解将空串反序列化为null
date: 2023-07-13 21:44:25
tags: java
---

> 了解生命而且热爱生活的人是幸福的——佚名

如题，可以直接指定注解

```java
@JsonSetter(nulls = Nulls.AS_EMPTY)
private String name;
```

这样即可实现传入

```json
{
    "name": ""
}
```

然后获取`name`为`null`
