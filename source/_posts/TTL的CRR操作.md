---
title: TTL的CRR操作
date: 2022-01-24 15:57:42
tags: java
---

> 要有最朴素的梦想，即使明天天寒地冻，路远马亡。——海子

前段时间遇到的`TTL(TransmittableThreadLocal)`在异步编程中的上下文丢失问题，我是采用了[直接更换线程池](https://VampireAchao.github.io/2021/11/29/TransmittableThreadLocal%E5%9D%91/)的方式

但今天抽空看了下官方文档，发现了：

[所有TTL值的抓取、回放和恢复方法（即CRR操作）](https://github.com/alibaba/transmittable-thread-local/blob/master/docs/developer-guide.md#-框架中间件集成ttl传递)

`CRR`：`capture(快照)`、`replay(回放)`、`restore(备份)`

自己简单写了个测试用例，用于在`CompletableFuture`和并行流场景下解决`ThreadLocal`的上下文丢失问题

大伙一定要复制到本地跑一下，需要的`GAV`是这个：

```xml
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>transmittable-thread-local</artifactId>
            <version>2.12.4</version>
        </dependency>
```

代码：

```java
import com.alibaba.ttl.TransmittableThreadLocal;
import lombok.SneakyThrows;
import org.junit.Ignore;
import org.junit.jupiter.api.Assertions;
import org.junit.Test;

import java.util.concurrent.CompletableFuture;
import java.util.stream.Stream;

/**
 * TTL单元测试
 *
 * @author <achao1441470436@gmail.com>
 * @since 2022/1/24 18:41
 */
public class TtlTest {

    @Test
    @SneakyThrows
    public void testCompletableFuture() {
        ThreadLocal<Integer> threadLocal = new InheritableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(2).forEach(i -> {
            threadLocal.set(i);
            CompletableFuture.runAsync(() -> Assertions.assertEquals(i, threadLocal.get())).join();
            threadLocal.remove();
        });
    }

    @Test
    @SneakyThrows
    public void testCompletableFutureReplayRestore() {
        ThreadLocal<Integer> threadLocal = new TransmittableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(2).forEach(i -> {
            threadLocal.set(i);
            // (1) 抓取当前线程的所有TTL值
            final Object captured = TransmittableThreadLocal.Transmitter.capture();
            CompletableFuture.runAsync(() -> {
                // 异步
                // (2) 在线程 B中回放在capture方法中抓取的TTL值，并返回 回放前TTL值的备份
                final Object backup = TransmittableThreadLocal.Transmitter.replay(captured);
                try {
                    // 你的业务逻辑，这里你可以获取到外面设置的TTL值
                    Assertions.assertEquals(i, threadLocal.get());
                } finally {
                    // (3) 恢复线程 B执行replay方法之前的TTL值（即备份）
                    TransmittableThreadLocal.Transmitter.restore(backup);
                }
            }).join();
            threadLocal.remove();
        });
    }

    @Test
    @SneakyThrows
    public void testCompletableFutureTransmitter() {
        ThreadLocal<Integer> threadLocal = new TransmittableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(2).forEach(i -> {
            threadLocal.set(i);
            // (1) 抓取当前线程的所有TTL值
            final Object captured = TransmittableThreadLocal.Transmitter.capture();
            CompletableFuture.runAsync(() ->
                    // 异步
                    TransmittableThreadLocal.Transmitter.runSupplierWithCaptured(captured, () -> {
                        // 你的业务逻辑，这里你可以获取到外面设置的TTL值
                        Assertions.assertEquals(i, threadLocal.get());
                        return null;
                    })).join();
            threadLocal.remove();
        });
    }

    @Test
    public void testParallelStream() {
        ThreadLocal<Integer> threadLocal = new TransmittableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(1).peek(threadLocal::set)
                .flatMap(item -> Stream.of(item, item).parallel().peek(i -> Assertions.assertEquals(i, threadLocal.get())))
                .peek(t -> threadLocal.remove()).forEach(System.out::println);
    }

    @Test
    public void testParallelStreamReplayRestore() {
        ThreadLocal<Integer> threadLocal = new TransmittableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(1).peek(threadLocal::set)
                .flatMap(item -> {
                    // (1) 抓取当前线程的所有TTL值
                    final Object captured = TransmittableThreadLocal.Transmitter.capture();
                    return Stream.of(item, item).parallel().peek(i -> {
                        // 异步
                        // (2) 在线程 B中回放在capture方法中抓取的TTL值，并返回 回放前TTL值的备份
                        final Object backup = TransmittableThreadLocal.Transmitter.replay(captured);
                        try {
                            // 你的业务逻辑，这里你可以获取到外面设置的TTL值
                            Assertions.assertEquals(i, threadLocal.get());
                        } finally {
                            // (3) 恢复线程 B执行replay方法之前的TTL值（即备份）
                            TransmittableThreadLocal.Transmitter.restore(backup);
                        }
                    });
                })
                .peek(t -> threadLocal.remove()).forEach(System.out::println);
    }

    @Test
    public void testParallelStreamTransmitter() {
        ThreadLocal<Integer> threadLocal = new TransmittableThreadLocal<>();
        Stream.iterate(0, i -> ++i).limit(1).peek(threadLocal::set)
                .flatMap(item -> {
                    // (1) 抓取当前线程的所有TTL值
                    final Object captured = TransmittableThreadLocal.Transmitter.capture();
                    return Stream.of(item, item).parallel().peek(i ->
                            // 异步
                            TransmittableThreadLocal.Transmitter.runSupplierWithCaptured(captured, () -> {
                                // 你的业务逻辑，这里你可以获取到外面设置的TTL值
                                Assertions.assertEquals(i, threadLocal.get());
                                return null;
                            }));
                })
                .peek(t -> threadLocal.remove()).forEach(System.out::println);
    }

}
```

最后测试结果：

![image-20220124161010303](/imgs/oss/picGo/image-20220124161010303.png)

