---
title: isSynthetic
date: 2021-01-26 21:19:53
tags: java
---

> 巧诈不如拙诚。——韩非子

`isSynthetic`这个函数，在`Class`类中存在，在`Field`类中存在，一搜，发现还挺多地方都有这个函数

![image-20210126212938785](/imgs/oss/picGo/image-20210126212938785.png)

这个函数我们点进去看源码和注释

```java
    /**
     * Returns {@code true} if this class is a synthetic class;
     * returns {@code false} otherwise.
     * @return {@code true} if and only if this class is a synthetic class as
     *         defined by the Java Language Specification.
     * @jls 13.1 The Form of a Binary
     * @since 1.5
     */
    public boolean isSynthetic() {
        return (getModifiers() & SYNTHETIC) != 0;
    }
```

```java
    /**
     * Returns {@code true} if this field is a synthetic
     * field; returns {@code false} otherwise.
     *
     * @return true if and only if this field is a synthetic
     * field as defined by the Java Language Specification.
     * @since 1.5
     */
    public boolean isSynthetic() {
        return Modifier.isSynthetic(getModifiers());
    }
```

发现`Class`的和`Field`中的还不一样，一个是说

> 如果此类是综合类，则返回true，否则返回false
>
> 当且仅当此类是Java语言规范定义的综合类时，才返回true 

另一个

> 如果此字段是合成字段，则返回true，否则返回false
>
> 当且仅当此字段是Java语言规范定义的合成字段时，才返回true

什么意思呢？

很简单，如果这个是通过编译生成的类(字段)，就返回true

举几个很常见的例子，首先定义一个枚举

```java
    private enum Ruben {
    }
```

然后获取它的`$VALUES`字段，调用`isSynthetic`函数，打印结果

```java
System.out.println(Ruben.class.getDeclaredField("$VALUES").isSynthetic());
```

输出结果为`true`，我们知道枚举是在编译后会生成`$VALUES`字段，所以它是一个合成字段

还有类的，例如我们常见的`lambda`

```java
        System.out.println(((Consumer) (c) -> System.gc()).getClass().isSynthetic());
        System.out.println(((Supplier) System::nanoTime).getClass().isSynthetic());
        System.out.println(((Predicate) (p) -> Boolean.FALSE).getClass().isSynthetic());
        System.out.println(((Function) (f) -> "ruben").getClass().isSynthetic());
        System.out.println(((Runnable) new Runnable() {
            @Override
            public void run() {
            }
        }).getClass().isSynthetic());
        System.out.println(((Runnable) System::nanoTime).getClass().isSynthetic());
```

`lambda`在编译时生成匿名内部类，所以使用`lambda`属于我们的合成类

执行结果为

![image-20210126214200674](/imgs/oss/picGo/image-20210126214200674.png)

可以明显看出，倒数第二个我们自己写了一个匿名内部类，编译没有生成，所以它不是合成类