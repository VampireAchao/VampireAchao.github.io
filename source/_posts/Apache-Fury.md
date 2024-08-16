---
title: Apache Fury
date: 2024-05-06 21:22:08
tags: java
---

> 得道者多助，失道者寡助。——孟子

https://fury.apache.org/

`Apache Fury` 是一个 Java 序列化库，它提供了线程安全和高性能的序列化解决方案。在这个示例中，我们通过继承一个抽象序列化类来实现自定义的序列化逻辑。

例如

我们定义了一个 `FurySerialize` 类，它扩展了一个抽象的 `AbsSerialize` 类。这个类实现了两个主要方法：`encode` 用于将对象序列化成字节，而 `decode` 用于将字节反序列化成对象。

```java
public class FurySerialize extends AbsSerialize {
    private static ThreadSafeFury fury;

    static {
        fury = Fury.builder()
            .withLanguage(Language.JAVA)
            .withRefTracking(true)
            .requireClassRegistration(false)
            .withNumberCompressed(false)
            .buildThreadLocalFury();
    }

    public static final FurySerialize me = new FurySerialize();

    private FurySerialize() { }

    @Override
    protected byte[] encode(Object object) {
        return fury.serialize(object);
    }

    @Override
    protected Object decode(byte[] bs) {
        return fury.deserialize(bs);
    }
}
```

实现细节

1. **初始化：** 我们通过 `Fury.builder()` 创建一个 `Fury` 实例的构建器，并配置了几个关键的选项：
   
   - `withLanguage(Language.JAVA)`: 指定使用 Java 语言。
   - `withRefTracking(true)`: 开启引用跟踪，以处理对象图中的循环引用。
   - `requireClassRegistration(false)`: 允许在不预先注册类的情况下进行序列化。
   - `withNumberCompressed(false)`: 禁用数字压缩。
   - `buildThreadLocalFury()`: 构建一个线程局部的 `Fury` 实例，保证线程安全。

2. **单例模式：** 通过私有构造函数和一个公开的静态实例 `me`，`FurySerialize` 使用单例模式来允许全局访问。

3. **方法实现：** `encode` 方法调用 `fury.serialize(object)` 来将对象转换成字节序列，而 `decode` 方法则相反，它使用 `fury.deserialize(bs)` 将字节序列还原成对象。

使用 `Fury` 库为 Java 对象提供序列化和反序列化功能既简单又高效，特别适用于需要高性能和线程安全的场景。通过此示例，我们可以看到，集成和使用 `Fury` 是直接且无缝的，使得 Java 应用可以更便捷地处理数据的存储和传输。
