---
title: 获取lambda代理
date: 2022-12-17 19:07:53
tags: java
---

> 伯乐不可欺以马，君子不可欺以人——荀子

代码如下：

```java
MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodHandle getR = lookup.findVirtual(B.class, "getR", MethodType.methodType(Object.class));
        SerFunc<Object, B> lambda = MethodHandleProxies.asInterfaceInstance(SerFunc.class, getR);
```

![image-20221217190937609](/imgs/oss/picGo/image-20221217190937609.png)

此处的`lambda`代理对象同样可以执行`lambda`对应的方法

