---
title: CompletableFuture在超时后，能够停止执行吗？
date: 2022-11-19 21:19:33
tags: java
---

> 沉默可能产生误解，我需要说话，说话将我推向歧途，我必须沉默。赫塔·米勒——《国王鞠躬，国王杀人》

好问题，尝试一下

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.stream.Stream;

class Scratch {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        CompletableFuture.runAsync(() -> Stream.generate(Object::new).forEach(System.out::println)).get(2, TimeUnit.SECONDS);
        Thread.currentThread().join();
    }
}
```

发现两秒后断开了

![image-20221119212106573](/imgs/oss/blog/image-20221119212106573.png)

那我们`try`下异常

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.stream.Stream;

class Scratch {
    public static void main(String[] args) throws ExecutionException, InterruptedException, TimeoutException {
        try {
            CompletableFuture.runAsync(() -> Stream.generate(Object::new).forEach(System.out::println)).get(2, TimeUnit.SECONDS);
        } catch (TimeoutException e) {
            System.err.println("Timeout");
        }
        Thread.currentThread().join();
    }
}
```

并没有断开，仍然在执行

![image-20221119212209130](/imgs/oss/blog/image-20221119212209130.png)

因此，`CompletableFuture`的异步任务如果超时异常`try`掉了，是不会停止执行的