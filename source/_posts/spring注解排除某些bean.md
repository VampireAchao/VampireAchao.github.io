---
title: spring注解排除某些bean
date: 2023-12-28 20:01:33
tags: java
---

> 劳动是唯一导向知识的道路。——萧伯纳

使用：

```java
@ComponentScan(excludeFilters = {@ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
        value = {WillExludeBean.class, AnotherWillExludeBean.class})})
```

即可

这里还有其他的过滤类型

例如注解

```java
@ComponentScan(excludeFilters = @Filter(
    type = FilterType.ANNOTATION,
    value = Service.class))
```

切面

```java
@ComponentScan(includeFilters = @Filter(
    type = FilterType.ASPECTJ,
    pattern = "com.example..*Service+"))
```

正则

```java
@ComponentScan(includeFilters = @Filter(
    type = FilterType.REGEX,
    pattern = "com\\.example\\..*Service"))
```
