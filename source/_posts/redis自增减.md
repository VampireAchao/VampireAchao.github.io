---
title: redis自增减
date: 2021-04-25 23:23:56
tags: redis
---

> 是以太山不让土壤，故能成其大；河海不择细流，故能就其深。——李斯

多用于排行榜、统计访问量、签到天数等场景

```java
package com.ruben;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.support.atomic.RedisAtomicLong;
import org.springframework.test.annotation.Rollback;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

/**
 * 我还没有写描述
 *
 * @author <achao1441470436@gmail.com>
 * @date 2021/4/29 0029 22:37
 */
@SpringBootTest
@Rollback(false)
public class RedisDemo {

    @Resource
    private StringRedisTemplate stringRedisTemplate;


    @Test
    public void redisIncrementDemo() {
        RedisAtomicLong redisAtomicLong = Optional.ofNullable(stringRedisTemplate.getConnectionFactory()).map(factory -> new RedisAtomicLong("ruben", factory)).orElseThrow(() -> new RuntimeException("redis获取连接失败"));
        // 自增并获取 类比 ++i
        long longValue = redisAtomicLong.incrementAndGet();
        System.out.println("自增并获取" + longValue);        // 1
        // 获取并自增 类比 i++
        longValue = redisAtomicLong.getAndIncrement();
        System.out.println("获取并自增" + longValue);        // 1
        // 相加并获取 类比 +=
        longValue = redisAtomicLong.addAndGet(2L);
        System.out.println("相加并获取" + longValue);        // 4
        // 修改并获取
        longValue = redisAtomicLong.updateAndGet(i -> i + 2);
        System.out.println("修改并获取" + longValue);        // 6
        // 自减并获取 类比 --i
        longValue = redisAtomicLong.decrementAndGet();
        System.out.println("自减并获取" + longValue);        // 5
        // 计算和5的最大值并获取
        longValue = redisAtomicLong.accumulateAndGet(6L, Long::max);
        System.out.println("计算和5的最大值并获取" + longValue);  // 6
        // 计算两数相乘并获取
        longValue = redisAtomicLong.accumulateAndGet(5L, (left, right) -> new BigDecimal(left).multiply(new BigDecimal(right)).longValue());
        System.out.println("计算两数相乘并获取" + longValue);    //  30
        // 直接设置值（这里我们设为0表示重置）
        redisAtomicLong.set(0L);
        // 直接获取
        longValue = redisAtomicLong.get();
        System.out.println("获取" + longValue);           // 0
        // 设置过期时间30秒 过期后清除
        redisAtomicLong.expire(30, TimeUnit.SECONDS);
        redisAtomicLong.expire(Duration.of(30, ChronoUnit.SECONDS));
        // 获取过期时间
        Long expire = redisAtomicLong.getExpire();
        System.out.println("获取过期时间" + expire);      // 30
    }


}
```

![image-20210429232753816](/imgs/oss/picGo/image-20210429232753816.png)

写的应该是比较全了，常用的都放这里了