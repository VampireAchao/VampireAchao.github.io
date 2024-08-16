---
title: aop计时，超时输出日志
date: 2022-11-18 12:55:18
tags: java
---

> 一个正在顺着生活规律挺近的青年，首先应注意，自己的才能和愿望与事业相衡。——培根

代码如下：

```java
package com.ruben.simplestreamquery.aop;

import com.alibaba.ttl.TransmittableThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;

/**
 * @author VampireAchao
 * @since 2022/11/18 13:01
 */
@Slf4j
@Aspect
@Component
public class LogAop {

    public static final ThreadLocal<Boolean> HAS_FINISHED = TransmittableThreadLocal.withInitial(() -> false);

    @Around("execution (public * com..controller..*(..))")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        final ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        final HttpServletRequest request = requestAttributes.getRequest();

        AtomicReference<Object> captureRef = new AtomicReference<>(TransmittableThreadLocal.Transmitter.capture());
        try {
            new Timer().schedule(new TimerTask() {
                @Override
                public void run() {
                    TransmittableThreadLocal.Transmitter.replay(captureRef.get());
                    if (!HAS_FINISHED.get()) {
                        log.warn("Request timeout, url: {}, method: {}, uri: {}, params: {}",
                                request.getRequestURL(), request.getMethod(), request.getRequestURI(), request.getQueryString());
                        HAS_FINISHED.remove();
                    }
                    // 三十秒后执行
                }
            }, TimeUnit.SECONDS.toMillis(30));
            final Object result = pjp.proceed();
            HAS_FINISHED.set(true);
            captureRef.set(TransmittableThreadLocal.Transmitter.capture());
            return result;
        } finally {
            TransmittableThreadLocal.Transmitter.restore(captureRef.get());
        }
    }

    
}
```

所用依赖：

```xml
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-aop</artifactId>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>transmittable-thread-local</artifactId>
            <version>2.14.2</version>
        </dependency>
```

