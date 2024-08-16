---
title: AtomicReference新jdk特性
date: 2024-01-13 22:36:45
tags: java
---

> 对人生命最大的威胁是以车代步，而不是交通事故。——怀特

对应的单元测试：

```java
import org.junit.jupiter.api.Test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class AtomicReferenceTest {

    @Test
    void testGetSetPlain() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.setPlain("new"));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("new", ref.getPlain());
    }

    @Test
    void testGetSetAcquireRelease() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.setRelease("new"));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("new", ref.getAcquire());
    }

    @Test
    void testGetSetOpaque() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.setOpaque("new"));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("new", ref.getOpaque());
    }

    @Test
    void testCompareAndExchange() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.compareAndExchange("initial", "changed"));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("changed", ref.get());
    }

    @Test
    void testCompareAndExchangeAcquireRelease() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.submit(() -> assertEquals("initial", ref.compareAndExchangeAcquire("initial", "changed")));
        executor.submit(() -> assertEquals("changed", ref.get()));
        executor.submit(() -> assertEquals("changed", ref.compareAndExchangeRelease("changed", "new")));
        executor.submit(() -> assertEquals("new", ref.get()));

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
    }

    @Test
    void testWeakCompareAndSetVolatile() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> assertTrue(ref.weakCompareAndSetVolatile("initial", "changed")));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("changed", ref.get());
    }

    @Test
    void testWeakCompareAndSetAcquireRelease() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        ExecutorService executor = Executors.newSingleThreadExecutor();

        executor.submit(() -> assertTrue(ref.weakCompareAndSetAcquire("initial", "changed")));
        executor.submit(() -> assertEquals("changed", ref.get()));
        executor.submit(() -> assertTrue(ref.weakCompareAndSetRelease("changed", "new")));
        executor.submit(() -> assertEquals("new", ref.get()));

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
    }

    @Test
    void testGetAndSet() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> assertEquals("initial", ref.getAndSet("new")));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals("new", ref.get());
    }

    @Test
    void testGetAndUpdate() throws InterruptedException {
        AtomicReference<Integer> ref = new AtomicReference<>(0);
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.getAndUpdate(x -> x + 1));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals(numberOfThreads, ref.get());
    }

    @Test
    void testUpdateAndGet() throws InterruptedException {
        AtomicReference<Integer> ref = new AtomicReference<>(0);
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.updateAndGet(x -> x + 1));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals(numberOfThreads, ref.get());
    }

    @Test
    void testGetAndAccumulate() throws InterruptedException {
        AtomicReference<Integer> ref = new AtomicReference<>(0);
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.getAndAccumulate(1, Integer::sum));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals(numberOfThreads, ref.get());
    }

    @Test
    void testAccumulateAndGet() throws InterruptedException {
        AtomicReference<Integer> ref = new AtomicReference<>(0);
        int numberOfThreads = 10;
        ExecutorService executor = Executors.newFixedThreadPool(numberOfThreads);

        for (int i = 0; i < numberOfThreads; i++) {
            executor.submit(() -> ref.accumulateAndGet(1, Integer::sum));
        }

        executor.shutdown();
        assertTrue(executor.awaitTermination(1, TimeUnit.MINUTES));
        assertEquals(numberOfThreads, ref.get());
    }

    @Test
    void compareSetAndGetPlainWithVolatile() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");

        // set/get (volatile access)
        ExecutorService executorVolatile = Executors.newFixedThreadPool(2);
        executorVolatile.execute(() -> ref.set("volatileUpdate"));
        executorVolatile.execute(() -> assertEquals("volatileUpdate", ref.get()));
        executorVolatile.shutdown();

        // setPlain/getPlain (non-volatile access)
        AtomicReference<String> refPlain = new AtomicReference<>("initial");
        ExecutorService executorPlain = Executors.newFixedThreadPool(2);
        executorPlain.execute(() -> refPlain.setPlain("plainUpdate"));
        executorPlain.execute(() -> assertEquals("plainUpdate", refPlain.getPlain()));
        executorPlain.shutdown();

        assertTrue(executorVolatile.awaitTermination(1, TimeUnit.SECONDS));
        assertTrue(executorPlain.awaitTermination(1, TimeUnit.SECONDS));
    }

    @Test
    void compareCompareAndSetWithWeakCompareAndSetVolatile() throws InterruptedException {
        AtomicReference<Integer> ref = new AtomicReference<>(0);

        // compareAndSet
        ExecutorService executorCAS = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 10; i++) {
            executorCAS.submit(() -> {
                while (!ref.compareAndSet(ref.get(), ref.get() + 1)) {
                    // retry
                }
            });
        }

        // weakCompareAndSetVolatile
        AtomicReference<Integer> refWeak = new AtomicReference<>(0);
        ExecutorService executorWeakCAS = Executors.newFixedThreadPool(10);
        for (int i = 0; i < 10; i++) {
            executorWeakCAS.submit(() -> {
                while (!refWeak.weakCompareAndSetVolatile(refWeak.get(), refWeak.get() + 1)) {
                    // retry
                }
            });
        }

        executorCAS.shutdown();
        executorWeakCAS.shutdown();
        assertTrue(executorCAS.awaitTermination(1, TimeUnit.SECONDS));
        assertTrue(executorWeakCAS.awaitTermination(1, TimeUnit.SECONDS));

        assertEquals(10, ref.get());
        assertEquals(10, refWeak.get());
    }

    @Test
    void compareGetAndSetWithCompareAndExchange() throws InterruptedException {
        AtomicReference<String> ref = new AtomicReference<>("initial");

        // getAndSet
        ExecutorService executorGetAndSet = Executors.newSingleThreadExecutor();
        executorGetAndSet.submit(() -> assertEquals("initial", ref.getAndSet("new")));
        executorGetAndSet.shutdown();

        // compareAndExchange
        AtomicReference<String> refExchange = new AtomicReference<>("initial");
        ExecutorService executorExchange = Executors.newSingleThreadExecutor();
        executorExchange.submit(() -> assertEquals("initial", refExchange.compareAndExchange("initial", "new")));
        executorExchange.shutdown();

        assertTrue(executorGetAndSet.awaitTermination(1, TimeUnit.SECONDS));
        assertTrue(executorExchange.awaitTermination(1, TimeUnit.SECONDS));
        assertEquals("new", ref.get());
        assertEquals("new", refExchange.get());
    }


}
```
