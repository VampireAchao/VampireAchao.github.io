---
title: jackson转范型
date: 2024-03-28 21:05:30
tags: java
---

> 不下决心培养思考习惯的人，便失去了生活中的最大乐趣。——爱迪生

代码很简单

```java
mapper.readValue(json, mapper.constructType(type))
```

这里主要是来源`com.alibaba.nacos.common.utils.JacksonUtils#toObj(java.lang.String, java.lang.reflect.Type)`

主要是这个`mapper.constructType(type)`

还可以

```java
TypeFactory typeFactory = mapper.getTypeFactory();
JavaType javaType = typeFactory.constructType(MyClass.class);
```
