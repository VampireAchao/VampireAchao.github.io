---
title: java MethodHandle转反射对象
date: 2022-08-11 13:45:58
tags: java
---

> 春雨将半，各梦所欢。——送花的人走了

最近在看`MethodHandle`相关内容，我们将`MethodHandle`转反射的`Executable`对象，可以这么使用：

```java
    final Executable executable = MethodHandles.reflectAs(Executable.class, methodHandle);
```

当然你也可以这么用：

```java
final MethodHandles.Lookup lookup = MethodHandles.lookup();
        MethodHandle methodHandle = lookup
          .findStatic(Test.class, "myMethod", MethodType.methodType(resultType, paramerType));
        Method method = lookup.revealDirect(methodHandle).reflectAs(Method.class, lookup);
        System.out.println(method);
```

`javadoc api`：https://docs.oracle.com/javase/8/docs/api/java/lang/invoke/MethodHandles.html

![image-20220811135138437](/imgs/oss/picGo/image-20220811135138437.png)