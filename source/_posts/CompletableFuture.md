---
title: CompletableFuture
date: 2021-03-18 21:01:43
tags: java
---

> 一个能思想的人，才真是一个力量无边的人。——巴尔扎克

我们之前使用异步

```java
    public static ExecutorService executor = Executors.newFixedThreadPool(10);

        final Future<Integer> submit = executor.submit(new Callable<Integer>() {
            @Override
            public Integer call() throws Exception {
                print("原始异步Callable");
                return 1;
            }
        });
        executor.execute(new Runnable() {
            @Override
            public void run() {
                LineUtils.print("原始异步Runnable");
            }
        });
```

现在咱们使用`1.8`的`CompletableFuture`

```java
package com.ruben;

import java.util.concurrent.*;

/**
 * @ClassName: CompletableFutureDemo
 * @Description: 我还没有写描述
 * @Date: 2021/3/9 0009 21:13
 * *
 * @author: <achao1441470436@gmail.com>
 * @version: 1.0
 * @since: JDK 1.8
 */
public class CompletableFutureDemo {
    public static ExecutorService executor = Executors.newFixedThreadPool(10);

    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        final CompletableFuture<Integer> async = CompletableFuture.supplyAsync(() -> {
            System.out.println("1.8新版CompletableFuture调用Callable");
            return 1;
        });
        final CompletableFuture<Void> future = CompletableFuture.runAsync(new Runnable() {
            @Override
            public void run() {
                System.out.println("1.8新版CompletableFuture调用Runnable");
            }
        });
        // 等待并获取结果
        future.get();
        // 在1秒后直接获取结果
        future.get(1, TimeUnit.SECONDS);
        // 立马获取结果，如果获取不到则等待完成再获取结果
        future.getNow(CompletableFuture.allOf(future).get());
        // 获取依赖任务数
        future.getNumberOfDependents();
        menu();
    }

    private static void menu() throws InterruptedException, ExecutionException {
        // 无需返回值 5
        CompletableFuture.runAsync(CompletableFutureDemo::runnable, executor);
        CompletableFuture<Integer> future = CompletableFuture
                // 带返回值 5
                .supplyAsync(CompletableFutureDemo::supplier, executor)
                // 成功执行后触发 5
                .whenComplete(CompletableFutureDemo::biConsumer)
                // 异常时触发
                .exceptionally(CompletableFutureDemo::function)
                // 结束时触发 1
                .handle(CompletableFutureDemo::biFunction);
        System.out.println(future.get());
        // 串行
        // 任务结束后执行 无返回值 不需要上次线程执行结果
        future.thenRun(CompletableFutureDemo::runnable);
        // 任务结束后执行 无返回值 需要上次线程执行结果
        future.thenAccept(CompletableFutureDemo::consumer);
        // 使用指定线程池创建线程异步执行带返回值 需要上次线程执行结果
        Integer integer = future.thenApplyAsync(CompletableFutureDemo::function, executor).get();
        System.out.println(integer);
        // 两个任务都完成后 使用当前线程池创建线程异步执行 无返回值 不需要两个任务执行结果
        future.runAfterBothAsync(future, CompletableFutureDemo::runnable);
        // 两个任务都完成后执行 无返回值 需要两个任务执行结果
        future.thenAcceptBoth(future, CompletableFutureDemo::biConsumer);
        // 两个任务都完成后执行 带返回值 需要两个任务执行结果
        future.thenCombine(future, CompletableFutureDemo::biFunction);
        // 两个任务只要有一个执行完成就执行 无返回值 不需要上次线程执行结果
        future.runAfterEither(future, CompletableFutureDemo::runnable);
        // 两个任务只要有一个执行完成就执行 无返回值 需要上次线程执行结果
        future.acceptEither(future, CompletableFutureDemo::consumer);
        // 两个任务只要有一个执行完成就执行 带返回值 需要上次线程执行结果
        future.applyToEither(future, CompletableFutureDemo::function);
        // 任何一个执行完成
        CompletableFuture.anyOf(future, future, future).get();
        // 等待所有结果完成
        CompletableFuture.allOf(future, future, future).get();
    }


    public static Integer function(Throwable throwable) {
        System.out.println("function:" + Thread.currentThread().getId());
        return 0;
    }

    public static Integer function(Integer integer) {
        System.out.println("function:" + Thread.currentThread().getId());
        System.out.println(integer);
        integer++;
        return integer;
    }

    public static Integer biFunction(Integer integer, Throwable throwable) {
        System.out.println("biFunction:" + Thread.currentThread().getId());
        return 1;
    }

    public static Integer biFunction(Integer integer, Integer integer1) {
        System.out.println("biFunction:" + Thread.currentThread().getId());
        return integer + integer1;
    }


    public static void consumer(Integer integer) {
        System.out.println("consumer:" + Thread.currentThread().getId());
        function(integer);
    }

    public static void biConsumer(Integer integer, Throwable throwable) {
        System.out.println("biConsumer:" + Thread.currentThread().getId());
        consumer(integer);
        throw new RuntimeException();
    }

    public static void biConsumer(Integer integer, Integer integer1) {
        System.out.println("biConsumer:" + Thread.currentThread().getId());
        System.out.println(integer + integer1);
    }

    public static int supplier() {
        System.out.println("supplier:" + Thread.currentThread().getId());
        int i = 10 / 2;
        System.out.println(i);
        return i;
    }


    public static void runnable() {
        System.out.println("runnable:" + Thread.currentThread().getId());
        supplier();
    }


}
```

