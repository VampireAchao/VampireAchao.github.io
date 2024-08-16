---
title: mybatis-plus的select函数
date: 2021-08-23 19:26:44
tags: java
---

> 学问是异常珍贵的东西，从任何源泉吸收都不可耻。——阿卜·日·法拉兹

在`mybatis-plus`的条件构造器中如果我们想要过滤字段，则可以使用`select`函数

[官方文档](https://mp.baomidou.com/guide/wrapper.html#select)介绍如下：

![image-20210823192912635](/imgs/oss/picGo/image-20210823192912635.png)

这里分为两类，其中第一个例子：`select("id", "name", "age")`可以用于一般`Wrapper`

如果是`lambdaQueryWrapper`，则需要使用`lambda`，例如

```java
Wrappers.lambdaQuery(UserDetail.builder().build()).select(UserDetail::getUsername,UserDetail::getAvatar)
```

第二类，我们可以按照某种规则去匹配

例如这里我只要`password`以外的字段

写法如下：

```java
Wrappers.lambdaQuery(UserDetail.builder().build()).select(tableFieldInfo -> !tableFieldInfo.getProperty().equals(PropertyNamer.methodToProperty(LambdaUtils.resolve(UserDetail::getPassword).getImplMethodName())));
```

官方文档的例子是过滤出以`test`开头的属性

还有源码注释里的例子如下：

> 例1: 只要 `java` 字段名以 "`test`" 开头的 `-> select(i -> i.getProperty().startsWith("test"))`
> 例2: 只要 `java` 字段属性是 `CharSequence` 类型的 `-> select(TableFieldInfo::isCharSequence)`
> 例3: 只要 `java` 字段没有填充策略的 `-> select(i -> i.getFieldFill() == FieldFill.DEFAULT)`
> 例4: 要全部字段 `-> select(i -> true)`
> 例5: 只要主键字段 `-> select(i -> false)`

![image-20210823193740339](/imgs/oss/picGo/image-20210823193740339.png)

