---
title: ThreadLocal子线程共享
date: 2021-10-23 17:07:13
tags: java
---

> 世人缺乏的是毅力，而非气力。——雨果

昨天聊了`ThreadLocal`可以用作单个线程中变量共享

其底层实现其实就是个`Map`，用线程作为`key`，不信可以看这部分源码：

```java
/**
 * Returns the value in the current thread's copy of this
 * thread-local variable.  If the variable has no value for the
 * current thread, it is first initialized to the value returned
 * by an invocation of the {@link #initialValue} method.
 *
 * @return the current thread's value of this thread-local
 */
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T)e.value;
            return result;
        }
    }
    return setInitialValue();
}
```

但是这里有个问题，如果是子线程，就访问不到了

我们深入源码看到这里有这么一个函数

```java
    /**
     * Method childValue is visibly defined in subclass
     * InheritableThreadLocal, but is internally defined here for the
     * sake of providing createInheritedMap factory method without
     * needing to subclass the map class in InheritableThreadLocal.
     * This technique is preferable to the alternative of embedding
     * instanceof tests in methods.
     */
    T childValue(T parentValue) {
        throw new UnsupportedOperationException();
    }
```

该方法在`ThreadLocalMap`的构造函数被调用，上面的注释说，该方法明显是在子类`InheritableThreadLocal`中定义的，这里提供这个方法，主要是能让`Thread`在构造函数中能调用上面说到的`InheritableThreadLocal`的`childValue`

可以看到`Thread`的构造函数中：

![image-20211023171819676](/imgs/oss/picGo/image-20211023171819676.png)

简单来说，如果是`inheritableThreadLocal`，就执行该方法。我们接着往里看`ThreadLocalMap`的构造方法

这里把`ThreadLocalMap`中所有的元素遍历出来，拿到`key`然后执行了`childValue`方法

![image-20211023172149935](/imgs/oss/picGo/image-20211023172149935.png)

这里`key`其实就是我们的子线程

![image-20211023172915857](/imgs/oss/picGo/image-20211023172915857.png)

我们再看`InheritableThreadLocal`中`childValue`的实现

他直接把传入的值`return`了出去(绕来绕去的，这里主要是考虑到如果还有别的行为，方便继承后可以拓展)

![image-20211023173009764](/imgs/oss/picGo/image-20211023173009764.png)

然后再将子线程作为的`key`和父`value`组成一个新的`Entry`元素，把它放到`map`里去

![image-20211023173245102](/imgs/oss/picGo/image-20211023173245102.png)

因此它可以在子线程中共享变量，因为它默认的实现就是子线程的`key`但是存的父值

写个`demo`测一下：

```java
package com.ruben.study;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

/**
 * ThreadLocal例子
 *
 * @author <achao1441470436@gmail.com>
 * @since 2021/10/23 16:43
 */
public class ThreadLocalDemo {

    private static final ThreadLocal<Long> MY_LONG_THREAD = new ThreadLocal<>();
    private static final ThreadLocal<Long> MY_LONG_INHERITABLE_THREAD = new InheritableThreadLocal<>();

    public static void main(String[] args) throws ExecutionException, InterruptedException {
        MY_LONG_THREAD.set(0L);
        MY_LONG_INHERITABLE_THREAD.set(1L);
        // 单线程共享变量
        CompletableFuture.runAsync(() -> {
            // 子线程尝试访问ThreadLocal中的值
            System.out.println(MY_LONG_THREAD.get());
            System.out.println(MY_LONG_INHERITABLE_THREAD.get());
        }).get();
        MY_LONG_THREAD.remove();
        MY_LONG_INHERITABLE_THREAD.remove();
    }
}
```

可以看到同样的代码，上面的`ThreadLocal`在子线程中获取不到，而它的实现`InheritableThreadLocal`就可以

![image-20211023173514822](/imgs/oss/picGo/image-20211023173514822.png)
