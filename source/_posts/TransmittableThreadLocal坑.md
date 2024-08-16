---
title: TransmittableThreadLocal坑
date: 2021-11-29 20:15:41
tags: bug
---

> 巨大建筑，总是由一木一石叠起来，我们何妨做做这一木一石呢?我时常做些零碎事，就是为此。——鲁迅

今天遇到一个坑，在使用`TransimittableThreadLocal`(以下简称`TTL`)时，用了一会儿，在子线程中突然获取不到`TTL`在主线程中存储的变量了

翻了翻[官方项目地址](https://github.com/alibaba/transmittable-thread-local)，发现我这里使用的`CompletableFuture`没有指定线程池，后来指定使用`TtlExecutors`包装的线程池就可以了

具体实现如下：

修改前：

```java
	@SafeVarargs
    public static <T extends Model<T>, I> CompletableFuture<Map<I, List<T>>> asyncGroupBy(T entity, Collection<I> paramList, SFunction<T, I> sFunction, Consumer<T>... peeks) {
        return CompletableFuture.supplyAsync(() -> groupBy(entity, paramList, sFunction, peeks));
    }
```

修改后：

```java
    private static final Executor THREAD_POOL = TtlExecutors.getTtlExecutorService(ThreadUtil.newExecutor());
	
	@SafeVarargs
    public static <T extends Model<T>, I> CompletableFuture<Map<I, List<T>>> asyncGroupBy(T entity, Collection<I> paramList, SFunction<T, I> sFunction, Consumer<T>... peeks) {
        return CompletableFuture.supplyAsync(() -> groupBy(entity, paramList, sFunction, peeks), THREAD_POOL);
    }
```

关于我写的这个`groupBy`函数我之前博客也发过了，这里就不赘述了，这里是用`hutool`的`ThreadUtil.newExecutor()`创建的线程池